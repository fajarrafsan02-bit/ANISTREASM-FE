import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";
import useToast from "./useToast";
import useCommentFetch from "./comments/useCommentFetch";
import useCommentMutations from "./comments/useCommentMutations";
import useCommentLikes from "./comments/useCommentLikes";

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

    const shared = {
        animeId,
        cacheRef,
        sortRef,
        toastRef,
        setComments,
        setTotal,
        setPage,
        setHasMore,
        setLikedIds,
    };

    const { changeSort, loadMore, fetchReplies } = useCommentFetch({
        ...shared,
        setSort,
        setLoading,
        setLoadingMore,
        loadingMore,
        hasMore,
        page,
    });

    const requireLogin = useCallback((message) => {
        if (isLoggedIn) return true;
        toastRef.current.warning(message, 3000);
        openModal({ mode: "login" });
        return false;
    }, [isLoggedIn, openModal, toastRef]);

    const { addComment, editComment, deleteComment } = useCommentMutations({
        ...shared,
        requireLogin,
        setPosting,
    });

    const { toggleLike, isLiked } = useCommentLikes({
        ...shared,
        likedIds,
        requireLogin,
    });

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
