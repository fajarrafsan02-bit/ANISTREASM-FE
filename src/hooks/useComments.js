import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";
import useToast from "./useToast";

const DEFAULT_LIMIT = 10;
const SORT_LIST = ["newest", "oldest", "popular"];

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
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [posting, setPosting] = useState(false);

    const sortRef = useRef(sort);
    useEffect(() => { sortRef.current = sort; }, [sort]);
    const toastRef = useRef(toast);
    useEffect(() => { toastRef.current = toast; }, [toast]);
    const cacheRef = useRef({});

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

            // Update cache untuk sort ini
            cacheRef.current[effectiveSort] = {
                comments: isFirstPage ? fetched : [...(cacheRef.current[effectiveSort]?.comments || []), ...fetched],
                total: data.total ?? 0,
                page: data.page ?? nextPage,
                hasMore: Boolean(data.hasMore),
                likedIds: isFirstPage ? (data.likedIds || []) : [...(cacheRef.current[effectiveSort]?.likedIds || []), ...(data.likedIds || [])],
            };
        } catch (err) {
            console.error("[useComments] fetch error:", err);
            if (isFirstPage) toastRef.current.error("Gagal memuat komentar", 3000);
        } finally {
            if (isFirstPage) setLoading(false);
            else setLoadingMore(false);
        }
    }, [animeId]);

    // Ambil data dari cache tanpa loading
    const applyCache = useCallback((sortType) => {
        const cached = cacheRef.current[sortType];
        if (!cached) return false;
        setComments(cached.comments);
        setTotal(cached.total);
        setPage(cached.page);
        setHasMore(cached.hasMore);
        setLikedIds(new Set(cached.likedIds));
        return true;
    }, []);

    // Muat ulang saat anime berganti: fetch semua sort sekaligus
    useEffect(() => {
        if (!animeId) return;
        let cancelled = false;

        const initial = async () => {
            if (cancelled) return;
            setLoading(true);
            setComments([]);
            setTotal(0);
            setPage(1);
            setSort("newest");
            sortRef.current = "newest";
            cacheRef.current = {};

            try {
                const results = await Promise.all(
                    SORT_LIST.map((s) =>
                        api.get("/comments", {
                            params: { animeId, sort: s, page: 1, limit: DEFAULT_LIMIT }
                        }).then((r) => ({ sort: s, data: r.data?.data || {} }))
                    )
                );

                if (cancelled) return;
                results.forEach(({ sort: s, data }) => {
                    cacheRef.current[s] = {
                        comments: data.comments || [],
                        total: data.total ?? 0,
                        page: data.page ?? 1,
                        hasMore: Boolean(data.hasMore),
                        likedIds: data.likedIds || [],
                    };
                });

                const newest = cacheRef.current["newest"];
                setComments(newest.comments);
                setTotal(newest.total);
                setPage(newest.page);
                setHasMore(newest.hasMore);
                setLikedIds(new Set(newest.likedIds));
            } catch (err) {
                if (cancelled) return;
                console.error("[useComments] initial fetch error:", err);
                toastRef.current.error("Gagal memuat komentar", 3000);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        initial();
        return () => { cancelled = true; };
    }, [animeId]);

    const changeSort = useCallback((newSort) => {
        if (newSort === sortRef.current) return;
        setSort(newSort);
        sortRef.current = newSort;

        const cached = cacheRef.current[newSort];
        if (cached) {
            applyCache(newSort);
        } else {
            fetchComments({ nextSort: newSort, nextPage: 1 });
        }
    }, [fetchComments, applyCache]);

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
    const invalidateOtherCaches = useCallback((currentSort) => {
        SORT_LIST.forEach((s) => {
            if (s !== currentSort) delete cacheRef.current[s];
        });
    }, []);

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
                setComments((prev) => [created, ...prev]);
                setTotal((t) => t + 1);
                // Update cache
                const cur = sortRef.current;
                if (cacheRef.current[cur]) {
                    cacheRef.current[cur].comments = [created, ...cacheRef.current[cur].comments];
                    cacheRef.current[cur].total += 1;
                }
                invalidateOtherCaches(cur);
            } else {
                setComments((prev) => prev.map((c) =>
                    c.id === parentId
                        ? { ...c, _count: { ...c._count, replies: (c._count?.replies ?? 0) + 1 } }
                        : c
                ));
                // Update cache
                const cur = sortRef.current;
                if (cacheRef.current[cur]) {
                    cacheRef.current[cur].comments = cacheRef.current[cur].comments.map((c) =>
                        c.id === parentId
                            ? { ...c, _count: { ...c._count, replies: (c._count?.replies ?? 0) + 1 } }
                            : c
                    );
                }
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
    }, [animeId, requireLogin, invalidateOtherCaches]);

    const editComment = useCallback(async (id, content) => {
        if (!content?.trim()) {
            toastRef.current.error("Komentar tidak boleh kosong", 2500);
            return null;
        }
        try {
            const res = await api.patch(`/comments/${id}`, { content: content.trim() });
            const updated = res.data?.data;

            const mapper = (c) => (c.id === id ? { ...c, ...updated } : c);
            setComments((prev) => prev.map(mapper));

            const cur = sortRef.current;
            if (cacheRef.current[cur]) {
                cacheRef.current[cur].comments = cacheRef.current[cur].comments.map(mapper);
            }

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
            const cur = sortRef.current;

            if (isReply && parentId) {
                const mapper = (c) =>
                    c.id === parentId
                        ? { ...c, _count: { ...c._count, replies: Math.max(0, (c._count?.replies ?? 1) - 1) } }
                        : c;
                setComments((prev) => prev.map(mapper));
                if (cacheRef.current[cur]) {
                    cacheRef.current[cur].comments = cacheRef.current[cur].comments.map(mapper);
                }
            } else {
                setComments((prev) => prev.filter((c) => c.id !== id));
                setTotal((t) => Math.max(0, t - 1));
                if (cacheRef.current[cur]) {
                    cacheRef.current[cur].comments = cacheRef.current[cur].comments.filter((c) => c.id !== id);
                    cacheRef.current[cur].total = Math.max(0, (cacheRef.current[cur].total ?? 1) - 1);
                }
                invalidateOtherCaches(cur);
            }
            toastRef.current.success("Komentar dihapus", 2000);
            return true;
        } catch (err) {
            const msg = err.response?.data?.errors || err.message || "Gagal menghapus komentar";
            toastRef.current.error(msg, 3000);
            return false;
        }
    }, [invalidateOtherCaches]);

    const likeMapper = useCallback((id, liked) => (c) =>
        c.id === id
            ? { ...c, _count: { ...c._count, likes: Math.max(0, (c._count?.likes ?? 0) + (liked ? 1 : -1)) } }
            : c
    , []);

    const syncCacheLikes = useCallback((id, liked) => {
        const cur = sortRef.current;
        if (cacheRef.current[cur]) {
            cacheRef.current[cur].comments = cacheRef.current[cur].comments.map(likeMapper(id, liked));
        }
    }, [likeMapper]);

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
        setComments((prev) => prev.map(likeMapper(id, !wasLiked)));
        syncCacheLikes(id, !wasLiked);

        try {
            const res = await api.post(`/comments/${id}/like`);
            const { liked, likeCount } = res.data?.data || {};
            // Sinkronkan dengan angka pasti dari server
            const syncer = (c) =>
                c.id === id ? { ...c, _count: { ...c._count, likes: likeCount ?? c._count?.likes } } : c;
            setLikedIds((prev) => {
                const next = new Set(prev);
                if (liked) next.add(id);
                else next.delete(id);
                return next;
            });
            setComments((prev) => prev.map(syncer));
            const cur = sortRef.current;
            if (cacheRef.current[cur]) {
                cacheRef.current[cur].comments = cacheRef.current[cur].comments.map(syncer);
            }
        } catch (err) {
            // Rollback bila gagal
            const rollback = likeMapper(id, wasLiked);
            setLikedIds((prev) => {
                const next = new Set(prev);
                if (wasLiked) next.add(id);
                else next.delete(id);
                return next;
            });
            setComments((prev) => prev.map(rollback));
            const cur = sortRef.current;
            if (cacheRef.current[cur]) {
                cacheRef.current[cur].comments = cacheRef.current[cur].comments.map(rollback);
            }
            const msg = err.response?.data?.errors || "Gagal menyukai komentar";
            toastRef.current.error(msg, 2500);
        }
    }, [requireLogin, likedIds, likeMapper, syncCacheLikes]);

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
