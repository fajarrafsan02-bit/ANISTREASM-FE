import { motion } from "motion/react";
import { memo, useMemo } from "react";
import { stripHtml } from "../../../utils/htmlParser";
import { useNavigate } from "react-router";

import { useAuth } from "../../../context/AuthContext";
import { useAuthModal } from "../../../context/AuthModalContext";
import { useWishlist } from "../../../context/WishlistContext";
import useToast from "../../../hooks/useToast";

const titleVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.035, delayChildren: 0.15 },
    },
};

const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const badgeVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
};

const descVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
};

const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

export default memo(function HeroContent({ current, isDark, animationKey }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { openModal } = useAuthModal();
    const toast = useToast();
    const { toggleWishlist, isWishlisted, isLoading } = useWishlist();

    const isBookmarked = current?.animeId ? isWishlisted(current.animeId) : false;
    const wishlistLoading = current?.animeId ? isLoading(current.animeId) : false;

    const titleWords = useMemo(() => current?.title?.split(" ") || [], [current?.title]);

    const handleWatch = () => {
        if (!current?.animeId) return;
        if (!isLoggedIn) {
            toast.warning("Silakan login terlebih dahulu untuk menonton", 3000);
            openModal({
                redirectAction: () => {
                    if (current?.animeId && isLoggedIn) {
                        navigate(`/anime/detail/${current.animeId}`);
                    }
                },
                mode: "login"
            });
            return;
        }
        navigate(`/anime/detail/${current.animeId}`);
    };

    const handleBookmarkClick = async (e) => {
        e?.stopPropagation();
        e?.preventDefault();

        if (!isLoggedIn) {
            toast.warning("Silakan login terlebih dahulu untuk menyimpan ke Watchlist", 3000);
            openModal({
                redirectAction: () => {
                    if (current?.animeId && isLoggedIn) {
                        toggleWishlist({ animeId: current.animeId, title: current.title, image: current.image || current.poster });
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

        await toggleWishlist({ animeId: current.animeId, title: current.title, image: current.image || current.poster });
    };

    if (!current) return null;

    return (
        <div className="relative z-5 h-full flex items-end pb-14 xs:pb-16 sm:pb-24 md:pb-32">
            <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-16 lg:px-24 w-full">
                <div className="max-w-2xl">
                    {/* Decorative accent line - animated */}
                    <motion.div
                        key={`accent-${animationKey}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-2 xs:gap-3 mb-3 xs:mb-4 sm:mb-6"
                    >
                        <span className="h-[3px] w-6 xs:w-8 sm:w-12 bg-linear-to-r from-red-500 via-red-400 to-red-500/0 rounded-full" />
                        <span className="h-[3px] w-2.5 xs:w-3 sm:w-4 bg-red-500/40 rounded-full" />
                        <span className="h-[2px] w-16 sm:w-24 bg-linear-to-r from-red-500/20 to-transparent rounded-full hidden sm:block" />
                    </motion.div>

                    {/* Status + Meta Badges */}
                    {(current?.status || current?.rating) && (
                        <motion.div
                            key={`badges-${animationKey}`}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap items-center gap-1.5 xs:gap-2 sm:gap-3 mb-3 xs:mb-4 sm:mb-8"
                        >
                            {current?.status && (
                                <motion.span
                                    custom={0}
                                    variants={badgeVariants}
                                    className="relative px-2.5 py-0.5 xs:px-3 xs:py-1 sm:px-5 sm:py-1.5 bg-linear-to-r from-red-600 to-red-500 text-white text-[9px] xs:text-[10px] sm:text-[11px] font-black tracking-[0.15em] xs:tracking-[0.2em] uppercase rounded-full shadow-lg shadow-red-600/30"
                                >
                                    {current.status === "ONGOING" ? "ONGOING" : "COMPLETE"}
                                    <span className="absolute inset-0 rounded-full bg-red-400/20 animate-ping" />
                                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
                                </motion.span>
                            )}

                            {current?.rating && current.rating !== "0.0" && (
                                <motion.div
                                    custom={1}
                                    variants={badgeVariants}
                                    className="flex items-center gap-1 xs:gap-1.5 px-2 py-0.5 xs:py-1 sm:px-3 sm:py-1.5 rounded-full bg-yellow-400/10 dark:bg-yellow-400/5 border border-yellow-400/20"
                                >
                                    <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 fill-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="font-bold text-[9px] xs:text-[10px] sm:text-xs text-yellow-500">
                                        {current.rating}
                                    </span>
                                </motion.div>
                            )}

                            {current?.genre && (
                                <motion.span
                                    custom={2}
                                    variants={badgeVariants}
                                    className={`text-[9px] xs:text-[10px] sm:text-sm font-medium transition-colors duration-500 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                                >
                                    • {current.genre}
                                </motion.span>
                            )}

                            {current?.year && (
                                <motion.span
                                    custom={3}
                                    variants={badgeVariants}
                                    className={`text-[9px] xs:text-[10px] sm:text-sm transition-colors duration-500 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                                >
                                    • {current.year}
                                </motion.span>
                            )}
                        </motion.div>
                    )}

                    {/* Title - staggered word reveal */}
                    {current?.title && (
                        <motion.h1
                            key={`title-${animationKey}`}
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                            className={`font-display text-[26px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-1.5 xs:mb-2 sm:mb-4 leading-[1.1] xs:leading-[1.05] sm:leading-[0.95] line-clamp-2 transition-colors duration-500 ${
                                isDark ? "text-white" : "text-gray-900"
                            }`}
                        >
                            {titleWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={wordVariants}
                                    className="inline-block mr-[0.25em] last:mr-0"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>
                    )}

                    {/* Subtitle */}
                    {current?.subtitle && (
                        <motion.p
                            key={`subtitle-${animationKey}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-linear-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent font-bold text-[11px] xs:text-xs sm:text-lg md:text-xl tracking-wide mb-2 xs:mb-2 sm:mb-5"
                        >
                            {current.subtitle}
                        </motion.p>
                    )}

                    {/* Description card */}
                    {current?.description && (
                        <motion.div
                            key={`desc-${animationKey}`}
                            variants={descVariants}
                            initial="hidden"
                            animate="visible"
                            className={`relative mb-3 xs:mb-4 sm:mb-10 p-2.5 xs:p-3 sm:p-5 rounded-lg xs:rounded-xl border max-w-lg backdrop-blur-sm transition-colors duration-500 ${
                                isDark
                                    ? "bg-white/[0.03] border-white/[0.06]"
                                    : "bg-black/[0.02] border-black/[0.06]"
                            }`}
                        >
                            {/* Top accent glow */}
                            <div className="absolute -top-px left-4 right-4 h-px bg-linear-to-r from-red-500/0 via-red-500/40 to-red-500/0" />
                            <p className={`text-[10px] xs:text-[11px] sm:text-sm md:text-base leading-relaxed line-clamp-2 transition-colors duration-500 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                {stripHtml(current.description)}
                            </p>
                        </motion.div>
                    )}

                    {/* CTA Buttons */}
                    <motion.div
                        key={`cta-${animationKey}`}
                        variants={ctaVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-row items-center justify-start gap-2 xs:gap-2.5 sm:gap-4 w-full sm:w-auto"
                    >
                        <motion.button
                            onClick={handleWatch}
                            whileHover={{ y: -4, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative overflow-hidden bg-linear-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white h-9 xs:h-10 sm:h-12 px-3.5 xs:px-5 sm:px-8 rounded-lg xs:rounded-xl sm:rounded-2xl font-bold text-[11px] xs:text-xs sm:text-sm flex items-center justify-center gap-1.5 xs:gap-2 shadow-xl shadow-red-600/30 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] cursor-pointer flex-1 sm:flex-initial transition-all duration-300"
                        >
                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <span className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors duration-300">
                                <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                            <span className="relative whitespace-nowrap font-extrabold tracking-wide">
                                <span className="hidden sm:inline">Tonton Sekarang</span>
                                <span className="sm:hidden">Tonton</span>
                            </span>
                        </motion.button>

                        <motion.button
                            onClick={handleBookmarkClick}
                            disabled={wishlistLoading}
                            whileHover={{ y: -4, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`group flex items-center justify-center gap-1.5 xs:gap-2 h-9 xs:h-10 sm:h-12 px-3 xs:px-4 sm:px-8 rounded-lg xs:rounded-xl sm:rounded-2xl border text-[11px] xs:text-xs sm:text-sm font-bold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex-1 sm:flex-initial backdrop-blur-sm
                                ${isBookmarked
                                    ? "bg-red-600/20 border-red-500/40 text-red-400 shadow-lg shadow-red-600/10"
                                    : isDark
                                        ? "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.1] hover:border-white/20 text-white/80 hover:text-white"
                                        : "bg-white/60 border-gray-200 hover:bg-white/80 text-gray-700 hover:text-gray-900 shadow-sm"
                                }`}
                        >
                            <span
                                className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0
                                    ${isBookmarked
                                        ? "border-red-500/40 bg-red-500 text-white shadow-md shadow-red-500/20"
                                        : isDark
                                            ? "border-white/10 group-hover:border-white/20"
                                            : "border-gray-200 group-hover:border-gray-300"
                                    }`}
                            >
                                {wishlistLoading ? (
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : isBookmarked ? (
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M21 7L9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.58 21 7z" />
                                    </svg>
                                ) : (
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                )}
                            </span>
                            <span className="relative whitespace-nowrap">
                                {isBookmarked ? (
                                    <>
                                        <span className="hidden sm:inline">Tersimpan</span>
                                        <span className="sm:hidden">Simpan</span>
                                    </>
                                ) : (
                                    "Watchlist"
                                )}
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
});