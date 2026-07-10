import { useCallback } from "react";
import { likeCommentApi } from "./commentService";

export default function useCommentLikes({
    cacheRef,
    sortRef,
    toastRef,
    likedIds,
    setLikedIds,
    setComments,
    requireLogin,
}) {
    const likeMapper = useCallback(
        (id, liked) => (c) =>
            c.id === id
                ? { ...c, _count: { ...c._count, likes: Math.max(0, (c._count?.likes ?? 0) + (liked ? 1 : -1)) } }
                : c,
        []
    );

    const syncCacheLikes = useCallback(
        (id, liked) => {
            const cur = sortRef.current;
            if (cacheRef.current[cur]) {
                cacheRef.current[cur].comments = cacheRef.current[cur].comments.map(likeMapper(id, liked));
            }
        },
        [cacheRef, sortRef, likeMapper]
    );

    const toggleLike = useCallback(
        async (id) => {
            if (!requireLogin("Silakan login untuk menyukai komentar")) return;

            const wasLiked = likedIds.has(id);

            setLikedIds((prev) => {
                const next = new Set(prev);
                if (wasLiked) next.delete(id);
                else next.add(id);
                return next;
            });
            setComments((prev) => prev.map(likeMapper(id, !wasLiked)));
            syncCacheLikes(id, !wasLiked);

            try {
                const { liked, likeCount } = await likeCommentApi(id);

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
        },
        [requireLogin, likedIds, likeMapper, syncCacheLikes, cacheRef, sortRef, toastRef, setLikedIds, setComments]
    );

    const isLiked = useCallback((id) => likedIds.has(id), [likedIds]);

    return { toggleLike, isLiked };
}
