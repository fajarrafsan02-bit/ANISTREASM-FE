// src/hooks/useSearchHistory.js
import { useCallback, useState, useEffect } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function useSearchHistory() {
    const { isLoggedIn } = useAuth();
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    // Fetch history saat user login
    const fetchHistory = useCallback(async () => {
        if (!isLoggedIn) return;
        setHistoryLoading(true);
        try {
            const res = await api.get("/search-history");
            setHistory(res.data.data ?? []);
        } catch (error) {
            console.warn("[useSearchHistory] Gagal ambil history:", error.message);
        } finally {
            setHistoryLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const saveHistory = useCallback(async ({ keyword, animeId, title, poster, type }) => {
        try {
            await api.post("/search-history", { keyword, animeId, title, poster, type });
            // Update local state langsung tanpa refetch
            setHistory(prev => {
                const filtered = prev.filter(h => h.animeId !== animeId);
                return [{ animeId, title, poster, type, keyword, createdAt: new Date() }, ...filtered].slice(0, 20);
            });
        } catch (error) {
            console.warn("[useSearchHistory] Gagal simpan history:", error.message);
        }
    }, []);

    const deleteOne = useCallback(async (id) => {
        try {
            await api.delete(`/search-history/${id}`);
            setHistory(prev => prev.filter(h => h.id !== id));
        } catch (error) {
            console.warn("[useSearchHistory] Gagal hapus history:", error.message);
        }
    }, []);

    const deleteAll = useCallback(async () => {
        try {
            await api.delete("/search-history/all");
            setHistory([]);
        } catch (error) {
            console.warn("[useSearchHistory] Gagal hapus semua history:", error.message);
        }
    }, []);

    return { history, historyLoading, saveHistory, deleteOne, deleteAll, fetchHistory };
}