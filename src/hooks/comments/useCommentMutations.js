import { useCallback } from "react";
import { createCommentApi, updateCommentApi, deleteCommentApi } from "./commentService";
import { SORT_LIST } from "./constants";

export default function useCommentMutations({
    animeId,
    requireLogin,
    cacheRef,
    sortRef,
    toastRef,
    setComments,
    setTotal,
    setPosting,
}) {
    const invalidateOtherCaches = useCallback(
        (currentSort) => {
            SORT_LIST.forEach((s) => {
                if (s !== currentSort) delete cacheRef.current[s];
            });
        },
        [cacheRef]
    );

    const addComment = useCallback(
        async ({ content, parentId = null }) => {
            if (!requireLogin("Silakan login untuk menulis komentar")) return null;
            if (!content?.trim()) {
                toastRef.current.error("Komentar tidak boleh kosong", 2500);
                return null;
            }

            setPosting(true);
            try {
                const created = await createCommentApi(animeId, content.trim(), parentId);

                if (!parentId) {
                    setComments((prev) => [created, ...prev]);
                    setTotal((t) => t + 1);

                    const cur = sortRef.current;
                    if (cacheRef.current[cur]) {
                        cacheRef.current[cur].comments = [created, ...cacheRef.current[cur].comments];
                        cacheRef.current[cur].total += 1;
                    }
                    invalidateOtherCaches(cur);
                } else {
                    setComments((prev) =>
                        prev.map((c) =>
                            c.id === parentId
                                ? { ...c, _count: { ...c._count, replies: (c._count?.replies ?? 0) + 1 } }
                                : c
                        )
                    );

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
        },
        [animeId, requireLogin, invalidateOtherCaches, cacheRef, sortRef, toastRef, setComments, setTotal, setPosting]
    );

    const editComment = useCallback(
        async (id, content) => {
            if (!content?.trim()) {
                toastRef.current.error("Komentar tidak boleh kosong", 2500);
                return null;
            }
            try {
                const updated = await updateCommentApi(id, content.trim());

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
        },
        [cacheRef, sortRef, toastRef, setComments]
    );

    const deleteComment = useCallback(
        async (id, { isReply = false, parentId = null } = {}) => {
            try {
                await deleteCommentApi(id);
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
        },
        [cacheRef, sortRef, toastRef, setComments, setTotal, invalidateOtherCaches]
    );

    return { addComment, editComment, deleteComment };
}
