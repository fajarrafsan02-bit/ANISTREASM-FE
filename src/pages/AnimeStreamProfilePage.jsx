// AniStreamProfilePage.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import CurrentlyWatching from '../components/profile/CurrentlyWatching';
import RecentActivity from '../components/profile/RecentActivity';
import Wishlist from "../components/profile/Wishlist";
import ProfileHeader from '../components/profile/profileHeader/ProfileHeader';
import { useScrollReveal } from "../hooks/useScrollReveal"
import { useWishlist } from '../hooks/useWishList'; 
import useWatchHistory from '../hooks/useWatchHistory'; 
import useRecentActivity from '../hooks/useRecentActivity'; 

// Helper function untuk relative time
function getRelativeTime(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} mnt lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays === 1) return "Kemarin";
    return `${diffDays} hari lalu`;
}

export default function AniStreamProfilePage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { wishlistItems, loadingItems, removeWishlist } = useWishlist();
    
    // ✅ Kita akan menggunakan historyLoading ini untuk trigger skeleton
    const { history, historyLoading } = useWatchHistory(); 

    const { recentWatched, recentWishlist, loading: recentLoading } = useRecentActivity();

    const [animeWatchedCount, setAnimeWatchedCount] = useState(0);
    const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(false);
    const [isWishlistExpanded, setIsWishlistExpanded] = useState(false); 

    const [mounted, setMounted] = useState(false);

    const revealGrid = useScrollReveal({ threshold: 0.1, once: true });
    const revealFavorites = useScrollReveal({ threshold: 0.1, once: true });
    const revealWishlist = useScrollReveal({ threshold: 0.1, once: true }); 

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (history) {
            setAnimeWatchedCount(history.length);
        }
    }, [history]);

    const watchingList = history.map((item) => ({
        id: item.id,
        episodeId: item.episodeId,
        title: item.title,
        episode: item.episodeTitle || "Episode Baru",
        image: item.poster || "https://lh3.googleusercontent.com/aida-public/AB6AXuBtETzdVxgDy-r-GfUJ0Zh2NVGToYHg6YvQilrN0Juq5_DDr_GxxN6wzLDq5s4kD44rake8-LC5-kjwkS1oKqtPzCPmmbuUgTXHFh570SrtFPvSeUPDhEAjRqD2TWsYsfccSdtWp7cKbYUDrPfAHPh-p-yawViMKDmLMNRFeeoX5JEdi3BxL8qQudt9e3Jw8pmQSso-1aLEo8uis0nZB4dA8ZMx95s4DUlfFqPKLhuqDz-bkEktP6uxu1OYs-yFEQzWBzmfKufs1lh3",
        duration: getRelativeTime(item.watchedAt),
        progress: 100
    }));

    return (
        <div
            className="min-h-screen font-sans antialiased selection:bg-red-600 selection:text-white overflow-x-hidden relative transition-colors duration-500"
            style={{
                backgroundColor: isDark ? "#070707" : "#fafafa",
                color: isDark ? "#e5e2e1" : "#1a1a1a",
            }}
        >
            <div
                className="absolute top-[-5%] left-[10%] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[160px] pointer-events-none z-0 transition-colors duration-500"
                style={{ backgroundColor: isDark ? "rgba(236,0,29,0.06)" : "rgba(239,68,68,0.06)" }}
            />
            <div
                className="absolute top-[40%] right-[5%] w-[260px] h-[260px] sm:w-[450px] sm:h-[450px] rounded-full blur-[90px] sm:blur-[130px] pointer-events-none z-0 transition-colors duration-500"
                style={{ backgroundColor: isDark ? "rgba(236,0,29,0.04)" : "rgba(249,115,22,0.04)" }}
            />
            <div
                className="absolute bottom-[10%] left-[30%] w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0 transition-colors duration-500"
                style={{ backgroundColor: isDark ? "rgba(236,0,29,0.03)" : "rgba(220,38,38,0.04)" }}
            />

            <main className="pt-6 sm:pt-12 pb-16 sm:pb-24 px-3.5 sm:px-6 max-w-7xl mx-auto z-10 relative space-y-8 sm:space-y-14">

                <div
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0px)" : "translateY(20px)",
                        transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <ProfileHeader animeWatchedCount={animeWatchedCount} />
                </div>

                <div
                    ref={revealGrid.ref}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch"
                    style={{
                        opacity: revealGrid.isVisible ? 1 : 0,
                        transform: revealGrid.isVisible ? "translateY(0px)" : "translateY(25px)",
                        transition: "opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <div className="lg:col-span-8 flex flex-col">
                        <CurrentlyWatching shows={watchingList} loading={historyLoading} />
                    </div>
                    <div className="lg:col-span-4 flex flex-col">
                        <RecentActivity
                            recentWatched={recentWatched}
                            recentWishlist={recentWishlist}
                            loading={recentLoading}
                        />
                    </div>
                </div>

                <div
                    ref={revealWishlist.ref}
                    className="w-full pt-2"
                    style={{
                        opacity: revealWishlist.isVisible ? 1 : 0,
                        transform: revealWishlist.isVisible ? "translateY(0px)" : "translateY(25px)",
                        transition: "opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <Wishlist
                        wishlist={wishlistItems}
                        loading={loadingItems}
                        onRemove={removeWishlist}
                        isExpanded={isWishlistExpanded}
                        setIsExpanded={setIsWishlistExpanded}
                    />
                </div>
            </main>
        </div>
    );
}