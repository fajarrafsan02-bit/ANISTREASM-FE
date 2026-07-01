import { useCallback, useState, useEffect } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function useRecentActivity() {
    const { isLoggedIn } = useAuth();
    const [recentWatched, setRecentWatched] = useState([]);
    const [recentWishlist, setRecentWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRecentActivity = useCallback(async () => {
        if (!isLoggedIn) return;
        setLoading(true);
        try {
            const res = await api.get("/user/recent-activity");
            const data = res.data?.data || {};
            setRecentWatched(data.recentWatched ?? []);
            setRecentWishlist(data.recentWishlist ?? []);
        } catch (error) {
            console.warn("[useRecentActivity] Gagal ambil recent activity:", error.message);
        } finally {
            setLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetchRecentActivity();
    }, [fetchRecentActivity]);

    return { recentWatched, recentWishlist, loading, fetchRecentActivity };
}
