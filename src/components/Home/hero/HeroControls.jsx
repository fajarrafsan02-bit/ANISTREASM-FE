// HeroControls.jsx
import { motion, AnimatePresence } from "motion/react";
import HeroNavButton from "./HeroNavButton";

export default function HeroControls({
    heroAnime,
    currentSlide,
    total,
    isDark,
    goTo,
    handlePrev,
    handleNext,
}) {
    const glassClasses = `border shadow-xl transition-all duration-500 backdrop-blur-xl
        ${isDark
            ? "bg-black/30 border-white/[0.06]"
            : "bg-white/50 border-gray-200/40"
        }`;

    return (
        <>
            {/* Slide Counter */}
            <div className="absolute bottom-3 xs:bottom-4 sm:bottom-10 left-3 xs:left-4 sm:left-6 md:left-16 lg:left-24 z-[5] flex items-center gap-1.5 xs:gap-2 sm:gap-3">
                <div className="h-4 xs:h-5 sm:h-6 overflow-hidden flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentSlide}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="text-xs xs:text-sm sm:text-lg font-black font-mono tracking-tight bg-gradient-to-b from-red-500 to-red-600 bg-clip-text text-transparent"
                        >
                            {String(currentSlide + 1).padStart(2, "0")}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <span className={`w-4 xs:w-6 sm:w-10 h-[2px] rounded-full transition-colors duration-500 ${isDark ? "bg-white/15" : "bg-gray-300"}`} />
                <span className={`text-[10px] xs:text-xs sm:text-sm font-mono font-semibold tracking-wide transition-colors duration-500 ${isDark ? "text-white/35" : "text-gray-400"}`}>
                    {String(total).padStart(2, "0")}
                </span>
            </div>

            {/* Desktop Thumbnail Strip */}
            <div
                className={`${glassClasses} absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 z-[5] hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-xl`}
            >
                {heroAnime.map((anime, i) => {
                    const isActive = i === currentSlide;
                    const showImg = Math.abs(i - currentSlide) <= 2 || isActive;
                    return (
                        <motion.button
                            key={i}
                            onClick={() => goTo(i, i > currentSlide ? 1 : -1)}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative group overflow-hidden rounded-lg transition-all duration-500 cursor-pointer ${isActive
                                ? "w-20 h-12 ring-2 ring-red-500 shadow-lg shadow-red-500/20 z-10 opacity-100"
                                : "w-14 h-9 opacity-25 hover:opacity-60"
                            }`}
                        >
                            <div className={`absolute inset-0 ${isDark ? "bg-zinc-800" : "bg-gray-300"}`} />
                            {anime.banner && showImg && (
                                <img
                                    src={anime.banner}
                                    alt=""
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${isActive ? 'group-hover:scale-110' : ''}`}
                                    loading="lazy"
                                    onError={(e) => { e.target.style.opacity = '0'; }}
                                />
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Active progress bar */}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-500/80">
                                    <motion.div
                                        className="h-full origin-left"
                                        style={{
                                            background: "linear-gradient(90deg, #ef4444 0%, #f87171 50%, #fff 100%)",
                                            boxShadow: "0 0 8px rgba(239,68,68,0.6), 0 0 20px rgba(239,68,68,0.2)",
                                        }}
                                        key={`thumb-progress-${currentSlide}`}
                                        initial={{ scaleX: 1 }}
                                        animate={{ scaleX: 0 }}
                                        transition={{ duration: 6, ease: "linear" }}
                                    />
                                </div>
                            )}

                            {/* Active glow ring */}
                            {isActive && (
                                <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500/10 blur-sm" />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Mobile Dots */}
            <div className="absolute bottom-3 xs:bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-[5] flex md:hidden gap-1 xs:gap-1.5 sm:gap-2 items-center max-w-[55%] xs:max-w-[60%] flex-wrap justify-center">
                {heroAnime.map((_, i) => (
                    <motion.button
                        key={i}
                        onClick={() => goTo(i, i > currentSlide ? 1 : -1)}
                        whileTap={{ scale: 0.8 }}
                        className={`rounded-full transition-all duration-500 cursor-pointer h-[3px] ${i === currentSlide
                            ? "bg-red-500 w-5 xs:w-6 sm:w-7 shadow-md shadow-red-500/25"
                            : isDark
                                ? "bg-white/15 w-1.5 sm:w-2 hover:bg-white/30"
                                : "bg-gray-300 w-1.5 sm:w-2 hover:bg-gray-400"
                        }`}
                    />
                ))}
            </div>

            {/* Desktop Nav Arrows */}
            <div className="hidden md:block">
                <HeroNavButton direction="prev" onClick={handlePrev} isDark={isDark} />
                <HeroNavButton direction="next" onClick={handleNext} isDark={isDark} />
            </div>

            {/* Mobile Nav Arrows — sembunyi di 320px (pakai dots + swipe), muncul mulai xs (>=400px) */}
            <div className="hidden xs:flex md:hidden absolute top-1/2 -translate-y-1/2 left-2 right-2 z-[5] justify-between pointer-events-none">
                <div className="pointer-events-auto">
                    <HeroNavButton direction="prev" onClick={handlePrev} isDark={isDark} isMobile />
                </div>
                <div className="pointer-events-auto">
                    <HeroNavButton direction="next" onClick={handleNext} isDark={isDark} isMobile />
                </div>
            </div>

            {/* Bottom Progress Bar — enhanced */}
            <div className={`absolute bottom-0 left-0 right-0 z-[5] transition-colors duration-500 ${isDark ? "bg-white/5" : "bg-gray-200/50"}`}>
                <div className="relative h-[3px] w-full overflow-hidden">
                    <div
                        key={currentSlide}
                        className="h-full relative"
                        style={{
                            background: "linear-gradient(90deg, #dc2626 0%, #ef4444 25%, #f87171 50%, #ef4444 75%, #dc2626 100%)",
                            backgroundSize: "200% 100%",
                            boxShadow: "0 0 6px rgba(239,68,68,0.5), 0 0 12px rgba(239,68,68,0.15)",
                            animation: "heroProgress 6s linear forwards, gradientShift 3s ease-in-out infinite",
                        }}
                    />
                </div>
            </div>
        </>
    );
}