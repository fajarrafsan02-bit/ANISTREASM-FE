import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";
import useToast from "./useToast";

const DEFAULT_LIMIT = 10;

export default function useComments(animeId) {
    const { isLoggedIn, user } = useAuth();
    const { openModal } = useAuthModal();
    const toast = useToast();

    const [comments, setComments] = useState([]);
    const [total, setTotal] = useState(0);
    const [likedIds, setLikedIds] = useState(new Set());
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [posting, setPosting] = useState(false);

    // Simpan referensi terkini agar tak memicu re-create callback berlebihan
    const sortRef = useRef(sort);
    useEffect(() => { sortRef.current = sort; }, [sort]);
    const toastRef = useRef(toast);
    useEffect(() => { toastRef.current = toast; }, [toast]);

    // Ambil daftar komentar (page 1 = ganti, page > 1 = append)
    const fetchComments = useCallback(async ({ nextSort, nextPage = 1 } = {}) => {
        if (!animeId) return;

        const effectiveSort = nextSort ?? sortRef.current;
        const isFirstPage = nextPage === 1;

        if (isFirstPage) setLoading(true);
        else setLoadingMore(true);

        try {
            const res = await api.get("/comments", {
                params: { animeId, sort: effectiveSort, page: nextPage, limit: DEFAULT_LIMIT }
            });
            const data = res.data?.data || {};
            const fetched = data.comments || [];

            setComments((prev) => (isFirstPage ? fetched : [...prev, ...fetched]));
            setTotal(data.total ?? 0);
            setHasMore(Boolean(data.hasMore));
            setPage(data.page ?? nextPage);

            if (isFirstPage) {
                setLikedIds(new Set(data.likedIds || []));
            } else {
                setLikedIds((prev) => {
                    const next = new Set(prev);
                    (data.likedIds || []).forEach((id) => next.add(id));
                    return next;
                });
            }
        } catch (err) {
            console.error("[useComments] fetch error:", err);
            if (isFirstPage) toastRef.current.error("Gagal memuat komentar", 3000);
        } finally {
            if (isFirstPage) setLoading(false);
            else setLoadingMore(false);
        }
    }, [animeId]);

    // Muat ulang saat anime berganti
    useEffect(() => {
        setComments([]);
        setTotal(0);
        setPage(1);
        setSort("newest");
        sortRef.current = "newest";
        fetchComments({ nextSort: "newest", nextPage: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animeId]);

    const changeSort = useCallback((newSort) => {
        if (newSort === sortRef.current) return;
        setSort(newSort);
        sortRef.current = newSort;
        setPage(1);
        fetchComments({ nextSort: newSort, nextPage: 1 });
    }, [fetchComments]);

    const loadMore = useCallback(() => {
        if (loadingMore || !hasMore) return;
        fetchComments({ nextPage: page + 1 });
    }, [loadingMore, hasMore, page, fetchComments]);

    // Pastikan user login sebelum aksi tulis; jika tidak → buka modal login
    const requireLogin = useCallback((message) => {
        if (isLoggedIn) return true;
        toastRef.current.warning(message, 3000);
        openModal({ mode: "login" });
        return false;
    }, [isLoggedIn, openModal]);

    // Tambah komentar utama atau balasan.
    // Return objek komentar baru (agar CommentItem bisa sisipkan ke daftar balasan lokalnya).
    const addComment = useCallback(async ({ content, parentId = null }) => {
        if (!requireLogin("Silakan login untuk menulis komentar")) return null;
        if (!content?.trim()) {
            toastRef.current.error("Komentar tidak boleh kosong", 2500);
            return null;
        }

        setPosting(true);
        try {
            const res = await api.post("/comments", { animeId, content: content.trim(), parentId });
            const created = res.data?.data;

            if (!parentId) {
                // Komentar utama → sisipkan di atas + naikkan total
                setComments((prev) => [created, ...prev]);
                setTotal((t) => t + 1);
            } else {
                // Balasan → naikkan _count.replies pada komentar induk
                setComments((prev) => prev.map((c) =>
                    c.id === parentId
                        ? { ...c, _count: { ...c._count, replies: (c._count?.replies ?? 0) + 1 } }
                        : c
                ));
            }

            toastRef.current.success(parentId ? "Balasan terkirim" : "Komentar terkirim", 2000);
            return created;
        } catch (err) {
            const msg = err.response?.data?.errors || err.message || "Gagal mengirim komentar";
            toastRef.current.error(msg, 3000);
            return null;
        } finally {
            setPosting(false);
        }
    }, [animeId, requireLogin]);

    const editComment = useCallback(async (id, content) => {
        if (!content?.trim()) {
            toastRef.current.error("Komentar tidak boleh kosong", 2500);
            return null;
        }
        try {
            const res = await api.patch(`/comments/${id}`, { content: content.trim() });
            const updated = res.data?.data;
            setComments((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
            toastRef.current.success("Komentar diperbarui", 2000);
            return updated;
        } catch (err) {
            const msg = err.response?.data?.errors || err.message || "Gagal memperbarui komentar";
            toastRef.current.error(msg, 3000);
            return null;
        }
    }, []);

    const deleteComment = useCallback(async (id, { isReply = false, parentId = null } = {}) => {
        try {
            await api.delete(`/comments/${id}`);
            if (isReply && parentId) {
                setComments((prev) => prev.map((c) =>
                    c.id === parentId
                        ? { ...c, _count: { ...c._count, replies: Math.max(0, (c._count?.replies ?? 1) - 1) } }
                        : c
                ));
            } else {
                setComments((prev) => prev.filter((c) => c.id !== id));
                setTotal((t) => Math.max(0, t - 1));
            }
            toastRef.current.success("Komentar dihapus", 2000);
            return true;
        } catch (err) {
            const msg = err.response?.data?.errors || err.message || "Gagal menghapus komentar";
            toastRef.current.error(msg, 3000);
            return false;
        }
    }, []);

    // Toggle like optimistic (mirip toggleWishlist). Bekerja untuk komentar utama & balasan.
    const toggleLike = useCallback(async (id) => {
        if (!requireLogin("Silakan login untuk menyukai komentar")) return;

        const wasLiked = likedIds.has(id);

        // Optimistic: update set likedIds + _count.likes pada komentar utama (jika ada)
        setLikedIds((prev) => {
            const next = new Set(prev);
            if (wasLiked) next.delete(id);
            else next.add(id);
            return next;
        });
        setComments((prev) => prev.map((c) =>
            c.id === id
                ? { ...c, _count: { ...c._count, likes: Math.max(0, (c._count?.likes ?? 0) + (wasLiked ? -1 : 1)) } }
                : c
        ));

        try {
            const res = await api.post(`/comments/${id}/like`);
            const { liked, likeCount } = res.data?.data || {};
            // Sinkronkan dengan angka pasti dari server
            setLikedIds((prev) => {
                const next = new Set(prev);
                if (liked) next.add(id);
                else next.delete(id);
                return next;
            });
            setComments((prev) => prev.map((c) =>
                c.id === id ? { ...c, _count: { ...c._count, likes: likeCount ?? c._count?.likes } } : c
            ));
        } catch (err) {
            // Rollback bila gagal
            setLikedIds((prev) => {
                const next = new Set(prev);
                if (wasLiked) next.add(id);
                else next.delete(id);
                return next;
            });
            setComments((prev) => prev.map((c) =>
                c.id === id
                    ? { ...c, _count: { ...c._count, likes: Math.max(0, (c._count?.likes ?? 0) + (wasLiked ? 1 : -1)) } }
                    : c
            ));
            const msg = err.response?.data?.errors || "Gagal menyukai komentar";
            toastRef.current.error(msg, 2500);
        }
    }, [requireLogin, likedIds]);

    // Ambil balasan sebuah komentar (dipanggil saat user klik "Lihat balasan")
    const fetchReplies = useCallback(async (parentId) => {
        try {
            const res = await api.get(`/comments/${parentId}/replies`);
            return res.data?.data || [];
        } catch (err) {
            console.error("[useComments] fetch replies error:", err);
            toastRef.current.error("Gagal memuat balasan", 2500);
            return [];
        }
    }, []);

    const isLiked = useCallback((id) => likedIds.has(id), [likedIds]);

    return {
        comments,
        total,
        sort,
        loading,
        loadingMore,
        posting,
        hasMore,
        currentUser: user,
        isLoggedIn,
        changeSort,
        loadMore,
        addComment,
        editComment,
        deleteComment,
        toggleLike,
        fetchReplies,
        isLiked,
    };
}
