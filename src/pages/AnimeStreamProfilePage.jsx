import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import CurrentlyWatching from '../components/profile/CurrentlyWatching';
import RecentActivity from '../components/profile/RecentActivity';
import Wishlist from '../components/profile/Wishlist'; // 1. Import komponen Wishlist baru
import ProfileHeader from '../components/profile/profileHeader/ProfileHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useWishlist } from '../hooks/useWishlist'; // 2. Import hook useWishlist

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

    const [favoritesList] = useState([
        { id: 1, title: 'Jujutsu Kaisen', rating: '9.8', genre: 'Action', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9-RyhkyibazP843BJbgX8Eu5dxe268gGdU1j43ykaQ-gJSKNz9Uo73YYR4b_ESzGhE2es9rSzLWBAEAe6xdzws-MREN0VijjLiNtEnrw6eyFvg_smRWhApckqWfXtVr_TcInZs6p9XUvuwIiIAeYPa56aIYsV2dVeuGUuZPtObB4HmrlfSeoVdrSPBnhRsgUJyCtYewA7dkbLCkJaJP1mjInYIJFQPAwb9H2LC4fHb2Rs95k-cfIpAaMJpiCS8umyw3jTNLNumKS2' },
        { id: 2, title: 'Naruto Shippuden', rating: '9.5', genre: 'Adventure', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACpBEb2n7goXhY2Eb3AZEf01sl5QlFgEL_V3HOPBAo5b_6gpjYAW_Tcem52m9U7jZAi548b81mr62GNVhCE_6YFINmJvH22H2j0OzHxdi4S5Zn_cfyPPAMRAYjwK_18ATilyG5cPn6fbCBMeiTDJzvYX-x0gIqoAX5UwLz5aKU-6FNIoY84-NBAPP5CBz2jsgy86nVDcbiZHJyJlPatVlgTvI1ZOdSK66fqsPcNZ4yJIRekDVBpUk3rwJIclGNUy6dPFuqtPEvzDH-' },
        { id: 3, title: 'Cowboy Bebop', rating: '9.4', genre: 'Sci-Fi', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMHXDeWiIv6DD2JcNTv7qy5hRL4DBnnQuuZs9TEGo65t-fEuY1BSS7OF-nZmvTv98iKLc8R8Bz_mCHJ--nONBVl1FbZArXQoS8t6CX1OH-zA4oMA5SWr9O-18yZccROSFkwzhHshnHIfXxI-0ETdXB916h6JUylgl247vhft9xJ-2VpEra4egGS9HNDNOJFuznVPdsa4By_GG_bznd_FJ-1DGaERbqHbVc4srA0q1-OZfrupEhndm_Y5TatrdJBFAdwdIfVfBOwQX1' },
        { id: 4, title: 'Attack on Titan', rating: '9.6', genre: 'Action, Thriller', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtJgt2m0FtqMoEKf2kTEkLhRwFmaTuxeEGZCvSRimepwrxiNvQwYhP-No82HP5bzB0P5vaYt0VS5S3ZZdiiv3mtqlv2-DwO2sk9yfkRGOpduyiywblN3_2pgtysqRbhSad8nuePVdt7FQO9jc5rRz_1mTZ9jFcO4rv794U0S5bPSIRre5ZVSMvUlQvZGAPHd4_YdQGqfOFxSTarHHEwGCN-103nh2BYIYngUPJal_tYPmM-1_pX6zqxX3rFJ7SFcGt7k07fhcdAqq' },
        { id: 5, title: 'Demon Slayer', rating: '9.3', genre: 'Fantasy, Action', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpbe4CeJcQGKo84yLw__dh8NIZesVqQupqvdDJuNHVpVV152fc7dv7kBixoHGPnk3N2PE-4dhvEfwVSOxbwOwdStqFSlKPAdvtfEURZ62nOvp5nDHPggK3dEMZFayAbAaq4GA_0COh0B70X9-Qvczr71Rr3-CRYrXlIwF4MTm-DzR-aGxPJDJwcqfK1xXksgexh1oV4G2B4RtXMz-C9ofMqP7KqGWrTeLwh4V8y_hyo-qrSySMpvbdxxewbrdnz30Da-5m3jpLksvB' },
        { id: 6, title: 'Death Note', rating: '9.2', genre: 'Mystery, Psychological', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCXnGFmJjCOypAgBqLkHFNNSfwojrHiCTEomxlXWdGbY2MBwUG4hAD70sdviH4adZ2fbFOuVcgfogEPHN24BpuqSIiGEebps9biRNbfZRkUyrrcWlFISKl4yL0_sFfGy5ggGBfDlb8GeEfM0Fl8VIzXPckcxkrfPkT2Tru1bC5yQYKwkazOLY5a6Xd_r9ZUTybtWVAg_0BOoltG03iQQOQ8_XvWQWmFOsXdeQV-OOSKSpMiIYq8u5dZtC04Ofl9TQ-iWD7VWUsphF4' },
    ]);

    return (
        <div
            className="min-h-screen font-sans antialiased selection:bg-red-600 selection:text-white overflow-x-hidden relative transition-colors duration-500"
            style={{
                backgroundColor: isDark ? "#070707" : "#fafafa",
                color: isDark ? "#e5e2e1" : "#1a1a1a",
            }}
        >
            {/* Ambient Glow */}
            <div
                className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 transition-colors duration-500"
                style={{ backgroundColor: isDark ? "rgba(236,0,29,0.05)" : "rgba(239,68,68,0.08)" }}
            />
            <div
                className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none z-0 transition-colors duration-500"
                style={{ backgroundColor: isDark ? "rgba(236,0,29,0.03)" : "rgba(249,115,22,0.05)" }}
            />

            <main className="pt-10 pb-24 px-6 max-w-7xl mx-auto z-10 relative space-y-12">

                {/* 1. ProfileHeader */}
                <div
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0px)" : "translateY(25px)",
                        transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <ProfileHeader animeWatchedCount={animeWatchedCount} />
                </div>

                {/* 2. Grid Sections */}
                <div
                    ref={revealGrid.ref}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
                    style={{
                        opacity: revealGrid.isVisible ? 1 : 0,
                        transform: revealGrid.isVisible ? "translateY(0px)" : "translateY(30px)",
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

                

                {/* 4. Wishlist Section (Baru) */}
                <div
                    ref={revealWishlist.ref}
                    className="w-full pt-4"
                    style={{
                        opacity: revealWishlist.isVisible ? 1 : 0,
                        transform: revealWishlist.isVisible ? "translateY(0px)" : "translateY(30px)",
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