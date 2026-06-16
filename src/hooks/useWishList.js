import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import useToast from "./useToast";
import { api } from "../api/axios";

export function useWishlist() {
    const { isLoggedIn } = useAuth();
    const toast = useToast();
    const [wishlistIds, setWishlistIds] = useState(new Set());
    const [wishlistItems, setWishlistItems] = useState([]); // State untuk menyimpan daftar item anime lengkap
    const [loadingIds, setLoadingIds] = useState(new Set());
    const [loadingItems, setLoadingItems] = useState(false); // State loading untuk fetch list wishlist

    // Fetch wishlist IDs saja saat login
    const fetchWishlistIds = useCallback(async () => {
        if (!isLoggedIn) {
            setWishlistIds(new Set());
            return;
        }
        try {
            const res = await api.get("/anime/wishlist/ids");
            const ids = res.data?.data || [];
            setWishlistIds(new Set(ids));
        } catch (err) {
            console.error("[useWishlist] fetch ids error:", err);
        }
    }, [isLoggedIn]);

    // Fetch data anime lengkap di wishlist (untuk ditampilkan di Profile)
    const fetchWishlistItems = useCallback(async () => {
        if (!isLoggedIn) {
            setWishlistItems([]);
            return;
        }
        setLoadingItems(true);
        try {
            const res = await api.get("/anime/wishlist");
            setWishlistItems(res.data?.data || []);
        } catch (err) {
            console.error("[useWishlist] fetch items error:", err);
        } finally {
            setLoadingItems(false);
        }
    }, [isLoggedIn]);

    // Toggle wishlist
    const toggleWishlist = useCallback(async (anime) => {
        const { animeId, title, image: poster } = anime || {};

        if (!animeId || !title) {
            toast.error("Data anime tidak lengkap", 3000);
            return { success: false, wishlisted: null };
        }

        setLoadingIds((prev) => {
            const next = new Set(prev);
            next.add(animeId);
            return next;
        });

        try {
            const res = await api.post("/anime/wishlist/toggle", {
                animeId,
                title,
                poster,
            });

            const result = res.data?.data || res.data;
            const isNowWishlisted = result?.wishlisted;

            setWishlistIds((prev) => {
                const next = new Set(prev);
                if (isNowWishlisted) next.add(animeId);
                else next.delete(animeId);
                return next;
            });

            // Sinkronkan ulang daftar wishlist setelah melakukan toggle
            fetchWishlistItems();

            toast.success(result?.message || "Wishlist diperbarui", 2500);
            return { success: true, wishlisted: isNowWishlisted };
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Terjadi kesalahan";
            toast.error(msg, 3000);
            return { success: false, wishlisted: null };
        } finally {
            setLoadingIds((prev) => {
                const next = new Set(prev);
                next.delete(animeId);
                return next;
            });
        }
    }, [toast, fetchWishlistItems]);

    // Fungsi tambahan untuk langsung menghapus dari UI Profile
    const removeWishlist = useCallback(async (animeId) => {
        setLoadingIds((prev) => {
            const next = new Set(prev);
            next.add(animeId);
            return next;
        });
        try {
            await api.delete(`/anime/wishlist/${animeId}`);
            setWishlistIds((prev) => {
                const next = new Set(prev);
                next.delete(animeId);
                return next;
            });
            setWishlistItems((prev) => prev.filter(item => (item.animeId || item.id) !== animeId));
            toast.success("Anime dihapus dari wishlist", 2500);
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Gagal menghapus wishlist";
            toast.error(msg, 3000);
        } finally {
            setLoadingIds((prev) => {
                const next = new Set(prev);
                next.delete(animeId);
                return next;
            });
        }
    }, [toast]);

    const isWishlisted = useCallback(
        (animeId) => wishlistIds.has(animeId),
        [wishlistIds]
    );

    const isLoading = useCallback(
        (animeId) => loadingIds.has(animeId),
        [loadingIds]
    );

    useEffect(() => {
        fetchWishlistIds();
        fetchWishlistItems();
    }, [fetchWishlistIds, fetchWishlistItems]);

    return {
        wishlistIds,
        wishlistItems,
        loadingItems,
        toggleWishlist,
        removeWishlist,
        isWishlisted,
        isLoading,
        refresh: () => {
            fetchWishlistIds();
            fetchWishlistItems();
        },
    };
}