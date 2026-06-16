// HeroContent.jsx
import { motion } from "motion/react";
import { stripHtml } from "../../../utils/htmlParser";
import { useNavigate } from "react-router";

// --- IMPORTS CONTEXTS & HOOKS ---
import { useAuth } from "../../../context/AuthContext"; // ← Sesuaikan path
import { useAuthModal } from "../../../context/AuthModalContext"; // ← Sesuaikan path
import { useWishlist } from "../../../context/WishlistContext"; // ← Sesuaikan path
import useToast from "../../../hooks/useToast"; // ← Sesuaikan path

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            ease: [0.215, 0.61, 0.355, 1],
            duration: 0.8,
        },
    },
};

export default function HeroContent({ current, isDark, animationKey }) {
    const navigate = useNavigate();

    // --- HOOKS ---
    const { isLoggedIn } = useAuth();
    const { openModal } = useAuthModal();
    const toast = useToast();
    const { toggleWishlist, isWishlisted, isLoading } = useWishlist();

    // Menentukan state aktif wishlist untuk anime saat ini
    const isBookmarked = current?.animeId ? isWishlisted(current.animeId) : false;
    const wishlistLoading = current?.animeId ? isLoading(current.animeId) : false;

    const handleWatch = () => {
        if (!current?.animeId) return;
        navigate(`/anime/${current.animeId}`);
    };

    // --- FUNGSI TOGGLE WATCHLIST ---
    const handleBookmarkClick = async (e) => {
        e?.stopPropagation();
        e?.preventDefault();

        // Cek login terlebih dahulu
        if (!isLoggedIn) {
            toast.warning("Silakan login terlebih dahulu untuk menyimpan ke Watchlist", 3000);
            openModal({
                redirectAction: () => {
                    if (current?.animeId && isLoggedIn) {
                        toggleWishlist({
                            animeId: current.animeId,
                            title: current.title,
                            image: current.image || current.poster
                        });
                    }
                },
                mode: "login"
            });
            return;
        }

        if (!current?.animeId || !current?.title) {
            toast.error("Data anime tidak lengkap", 3000);
            return;
        }

        // Jalankan toggle ke backend
        await toggleWishlist({
            animeId: current.animeId,
            title: current.title,
            image: current.image || current.poster
        });
    };

    return (
        /* 
          ✅ PERBAIKAN 3: Padding bawah di HP disesuaikan menjadi pb-14 (56px) untuk memberikan 
          selisih ruang bebas vertikal (sekitar 30px) di atas tombol angka navigasi bawah.
        */
        <div className="relative z-[5] h-full flex items-end pb-14 sm:pb-20 md:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24 w-full">
                <motion.div
                    key={animationKey}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl"
                >
                    {/* Status Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex flex-wrap items-center gap-1.5 sm:gap-3 mb-3.5 sm:mb-7"
                    >
                        <span className="relative px-2 py-0.5 sm:px-4 sm:py-1.5 bg-red-500 text-white text-[9px] sm:text-[11px] font-black tracking-widest uppercase rounded-full shadow-lg shadow-red-500/20">
                            {current?.status}
                            <span className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
                        </span>

                        <div className="flex items-center gap-1 bg-yellow-400/10 dark:bg-yellow-400/5 px-2 py-0.5 rounded-full text-yellow-500 dark:text-yellow-400">
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="font-bold text-[10px] sm:text-xs">
                                {current?.rating}
                            </span>
                        </div>

                        <span className={`text-[9px] sm:text-sm font-medium transition-colors duration-700 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            • {current?.genre}
                        </span>

                        <span className={`text-[9px] sm:text-sm transition-colors duration-700 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                            • {current?.year}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        variants={itemVariants}
                        className={`font-display text-2xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-2 sm:mb-4 leading-[1.05] sm:leading-[0.9] line-clamp-2 break-words transition-colors duration-700 ${isDark ? "text-white" : "text-gray-900"}`}
                        style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                    >
                        {current?.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="text-red-500 text-xs xs:text-sm sm:text-lg md:text-xl font-bold tracking-wide mb-2 sm:mb-5"
                    >
                        {current?.subtitle}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className={`text-[10px] sm:text-sm md:text-base max-w-lg leading-relaxed mb-4 sm:mb-10 line-clamp-2 transition-colors duration-700 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                        {stripHtml(current?.description) || "Sinopsis belum tersedia..."}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-row items-center justify-start gap-1.5 sm:gap-4 w-full sm:w-auto"
                    >
                        {/* Tombol Tonton Sekarang */}
                        <motion.button
                            onClick={handleWatch}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white h-9 sm:h-12 px-3 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-colors duration-300 cursor-pointer flex-1 sm:flex-initial"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <span className="relative w-5 h-5 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                                <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                            <span className="relative whitespace-nowrap">
                                <span className="hidden sm:inline">Tonton Sekarang</span>
                                <span className="sm:hidden">Tonton</span>
                            </span>
                        </motion.button>

                        {/* Tombol Watchlist */}
                        <motion.button
                            onClick={handleBookmarkClick}
                            disabled={wishlistLoading}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`group flex items-center justify-center gap-2 h-9 sm:h-12 px-3 sm:px-8 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-bold backdrop-blur-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex-1 sm:flex-initial
                                ${isBookmarked
                                    ? "bg-red-600/20 border-red-500/50 text-red-500 dark:text-red-400 font-extrabold shadow-lg shadow-red-600/5"
                                    : isDark
                                        ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                                        : "bg-white border-gray-200 hover:bg-gray-50 text-gray-800 shadow-sm"
                                }`}
                        >
                            <span
                                className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0
                                    ${isBookmarked
                                        ? "border-red-500/30 bg-red-500 text-white shadow-md shadow-red-500/20"
                                        : "border-white/10 group-hover:bg-white/10"
                                            ? "border-white/10 group-hover:bg-white/10"
                                            : "border-gray-200 group-hover:bg-gray-100"
                                    }`}
                            >
                                {wishlistLoading ? (
                                    <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 animate-spin text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : isBookmarked ? (
                                    <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 fill-current animate-pulse" viewBox="0 0 24 24">
                                        <path d="M21 7L9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.58 21 7z" />
                                    </svg>
                                ) : (
                                    <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                )}
                            </span>
                            <span className="relative whitespace-nowrap">
                                {isBookmarked ? (
                                    <>
                                        <span className="hidden sm:inline">Tersimpan di Watchlist</span>
                                        <span className="sm:hidden">Tersimpan</span>
                                    </>
                                ) : (
                                    "Watchlist"
                                )}
                            </span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}