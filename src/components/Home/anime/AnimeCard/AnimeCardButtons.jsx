import { useTheme } from "../../../../context/ThemeContext";
import { useAuth } from "../../../../context/AuthContext";
import { useAuthModal } from "../../../../context/AuthModalContext";
import useToast from "../../../../hooks/useToast";
import { useWishlist } from "../../../../context/WishlistContext";
import { WatchButton } from "../../../ui/WatchButton";
import { BookmarkCheck, Loader2 } from "lucide-react";

export default function AnimeCardButtons({
    anime,
    isHovered,
    isDark,
    onPlay,
    isMobile: propIsMobile,
}) {
    const { theme } = useTheme();
    const dark = isDark !== undefined ? isDark : theme === "dark";

    const { isLoggedIn } = useAuth();
    const { openModal } = useAuthModal();
    const toast = useToast();
    const { toggleWishlist, isWishlisted, isLoading } = useWishlist();

    const isMobile = propIsMobile !== undefined
        ? propIsMobile
        : (typeof window !== "undefined" && window.innerWidth < 640);

    const isBookmarked = anime?.animeId ? isWishlisted(anime.animeId) : false;
    const wishlistLoading = anime?.animeId ? isLoading(anime.animeId) : false;

    const handlePlayClick = (e) => {
        e?.stopPropagation();
        e?.preventDefault();

        if (!isLoggedIn) {
            toast.warning("Silakan login terlebih dahulu untuk menonton anime ini", 3000);
            openModal({
                redirectAction: () => onPlay?.(),
                mode: "login"
            });
            return;
        }
        onPlay?.();
    };

    const handleBookmarkClick = async (e) => {
        e?.stopPropagation();
        e?.preventDefault();

        if (!isLoggedIn) {
            toast.warning("Silakan login terlebih dahulu untuk menyimpan ke Watchlist", 3000);
            openModal({
                redirectAction: () => {
                    if (anime?.animeId && isLoggedIn) {
                        toggleWishlist(anime);
                    }
                },
                mode: "login"
            });
            return;
        }

        if (!anime?.animeId || !anime?.title) {
            toast.error("Data anime tidak lengkap", 3000);
            return;
        }

        await toggleWishlist(anime);
    };

    return (
        <div className={`flex flex-col ${isMobile ? "gap-1" : "gap-1.5"}`}>
            {/* Tombol Tonton */}
            <div
                style={{
                    transform: isHovered ? "translateX(0) scale(1)" : `translateX(${isMobile ? "12px" : "20px"}) scale(0.95)`,
                    opacity: isHovered ? 1 : 0,
                    transition: `transform ${isMobile ? "300ms" : "350ms"} cubic-bezier(0.34, 1.56, 0.64, 1) 100ms, opacity 300ms ease 100ms`,
                }}
            >
                <WatchButton onClick={handlePlayClick} isDark={dark} isMobile={isMobile} />
            </div>

            {/* Tombol Watchlist */}
            <button
                onClick={handleBookmarkClick}
                disabled={wishlistLoading}
                className={`w-full font-semibold rounded-md hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer border disabled:opacity-60 disabled:cursor-not-allowed transition-all ${isMobile ? "text-[9px] py-1" : "text-[10px] py-1.5"
                    } ${isBookmarked
                        ? "bg-red-500 border-red-500 text-white shadow-red-500/30 font-bold"
                        : dark
                            ? "bg-white/10 border-white/10 text-white hover:bg-white/20"
                            : "bg-gray-100 border-gray-200 text-gray-850 hover:bg-gray-200"
                    }`}
                style={{
                    transform: isHovered ? "translateX(0) scale(1)" : `translateX(${isMobile ? "12px" : "20px"}) scale(0.95)`,
                    opacity: isHovered ? 1 : 0,
                    transition: `transform ${isMobile ? "300ms" : "350ms"} cubic-bezier(0.34, 1.56, 0.64, 1) 180ms, opacity 300ms ease 180ms, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease`,
                }}
            >
                <span className={`flex items-center justify-center ${isMobile ? "gap-0.5" : "gap-1"}`}>
                    {wishlistLoading ? (
                        <Loader2 className={`${isMobile ? "w-2.5 h-2.5" : "w-3 h-3"} animate-spin`} />
                    ) : isBookmarked ? (
                        <BookmarkCheck className={`${isMobile ? "w-2.5 h-2.5" : "w-3 h-3"} text-white fill-current animate-pulse`} />
                    ) : (
                        <PlusIcon dark={dark} isMobile={isMobile} />
                    )}
                    {/* Teks ditampilkan konsisten dengan perlindungan wrap */}
                    <span className="whitespace-nowrap">
                        {isBookmarked ? "Tersimpan" : "Watchlist"}
                    </span>
                </span>
            </button>
        </div>
    );
}

function PlusIcon({ dark, isMobile }) {
    const size = isMobile ? "8" : "10";
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors duration-300 ${dark ? "text-white" : "text-gray-600"}`}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}