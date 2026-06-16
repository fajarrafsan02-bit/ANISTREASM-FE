// AniStreamProfilePage.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import CurrentlyWatching from '../components/profile/CurrentlyWatching';
import RecentActivity from '../components/profile/RecentActivity';
import Wishlist from "../components/profile/Wishlist";// Import komponen Wishlist baru
import ProfileHeader from '../components/profile/profileHeader/ProfileHeader';
import { useScrollReveal } from "../hooks/useScrollReveal"
import { useWishlist } from '../hooks/useWishlist'; // Import hook useWishlist

export default function AniStreamProfilePage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [animeWatchedCount] = useState(120);
    const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(false);
    const [isWishlistExpanded, setIsWishlistExpanded] = useState(false); // State ekspansi Wishlist

    // Integrasi state & fungsi dari useWishlist hook
    const { wishlistItems, loadingItems, removeWishlist } = useWishlist();

    const [mounted, setMounted] = useState(false);

    const revealGrid = useScrollReveal({ threshold: 0.1, once: true });
    const revealFavorites = useScrollReveal({ threshold: 0.1, once: true });
    const revealWishlist = useScrollReveal({ threshold: 0.1, once: true }); // Scroll reveal khusus Wishlist

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60);
        return () => clearTimeout(t);
    }, []);

    const [watchingList] = useState([
        { id: 1, title: 'Cyberpunk Edgerunners', episode: 'Episode 12', progress: 50, duration: '24 min', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtETzdVxgDy-r-GfUJ0Zh2NVGToYHg6YvQilrN0Juq5_DDr_GxxN6wzLDq5s4kD44rake8-LC5-kjwkS1oKqtPzCPmmbuUgTXHFh570SrtFPvSeUPDhEAjRqD2TWsYsfccSdtWp7cKbYUDrPfAHPh-p-yawViMKDmLMNRFeeoX5JEdi3BxL8qQudt9e3Jw8pmQSso-1aLEo8uis0nZB4dA8ZMx95s4DUlfFqPKLhuqDz-bkEktP6uxu1OYs-yFEQzWBzmfKufs1lh3' },
        { id: 2, title: 'Solo Leveling', episode: 'Episode 04', progress: 33, duration: '23 min', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA__V2pEdAy_hVIn4DpQ_W-e43MZmyemnmwGF8-zGq7ZlJp6ATLo4LaZRGPLTdbEDkxuvMzAeog2Y9klMqKDzFhNjtdAUx1yB54486f6Qa4tKHZnjRvtNQ543T8xol_zt1I5Rtf84URYdR833-ZlVW99CvrDUdXgYW41mewOwAuVuQ5xaLXy1GoLTl0aQ6p89CAWZPP0QZeRxLsDov0xZwU2pc5U_Ha-OHyJCKVi0QaNrx2kDUHRLmwJfepXd3ShqdpUuEbdZgPHsMP' },
        { id: 3, title: "Frieren: Beyond Journey's End", episode: 'Episode 21', progress: 75, duration: '25 min', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT-jE6FksyuNlsfwNy8sXsi-wHaIUsY3WHOOGeget22NgXbIjN0Q8QY4Z1mPVW-CtTMUsH0G97elyg8LnVA1Rt6GTpm66y4PrQzDQ4q1PiEaiZcuaxNAZzet_hrOCcv3cLDkxvpqGh9Gk72fDpaZs07Od7Fxm6A-hQ61BdZ40o3JPBq3GQYaMdu0q9BMQYwTx-DMcn98cnF4IvapinB2-QYuNXeUvd2mFXpDy0I4oTKJxxouJwfm7QK5XXvUHJJT8x-dLfpPDE6DvR' },
    ]);

    return (
        <div
            className="min-h-screen font-sans antialiased selection:bg-red-600 selection:text-white overflow-x-hidden relative transition-colors duration-500"
            style={{
                backgroundColor: isDark ? "#070707" : "#fafafa",
                color: isDark ? "#e5e2e1" : "#1a1a1a",
            }}
        >
            {/* Ambient Glow responsif ukuran HP */}
            <div
                className="absolute top-0 left-1/4 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[140px] pointer-events-none z-0 transition-colors duration-500"
                style={{ backgroundColor: isDark ? "rgba(236,0,29,0.05)" : "rgba(239,68,68,0.08)" }}
            />
            <div
                className="absolute top-1/2 right-1/4 w-[240px] h-[240px] sm:w-[400px] sm:h-[400px] rounded-full blur-[70px] sm:blur-[120px] pointer-events-none z-0 transition-colors duration-500"
                style={{ backgroundColor: isDark ? "rgba(236,0,29,0.03)" : "rgba(249,115,22,0.05)" }}
            />

            {/* Jarak padding vertikal dan spasi antar-seksi disesuaikan responsif */}
            <main className="pt-6 sm:pt-10 pb-16 sm:pb-24 px-3.5 sm:px-6 max-w-7xl mx-auto z-10 relative space-y-7 sm:space-y-12">

                {/* 1. ProfileHeader */}
                <div
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0px)" : "translateY(20px)",
                        transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <ProfileHeader animeWatchedCount={animeWatchedCount} />
                </div>

                {/* 2. Grid Sections (Gap disesuaikan responsif) */}
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
                        <CurrentlyWatching shows={watchingList} />
                    </div>
                    <div className="lg:col-span-4 flex flex-col">
                        <RecentActivity />
                    </div>
                </div>

                {/* 4. Wishlist Section */}
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