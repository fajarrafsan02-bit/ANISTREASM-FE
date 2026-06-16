// HeroControls.jsx
import { motion, AnimatePresence } from "motion/react";
import HeroNavButton from "./HeroNavButton";

export default function HeroControls({
    heroAnime,
    currentSlide,
    total,
    isDark,
    progressRef,
    goTo,
    resetAuto,
    handlePrev,
    handleNext,
}) {
    return (
        <>
            {/* Slide Counter (✅ PERBAIKAN 1: Diturunkan dari bottom-12 ke bottom-3 di HP agar tidak tertindih tombol) */}
            <div className="absolute bottom-3 sm:bottom-8 left-3.5 sm:left-6 md:left-16 lg:left-24 z-[5] font-mono text-[9px] sm:text-xs tracking-[0.15em] sm:tracking-[0.3em] flex items-center gap-1.5 sm:gap-2">
                <div className="h-4 sm:h-5 overflow-hidden flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentSlide}
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -8, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className={`text-xs sm:text-base font-bold transition-colors duration-700 ${isDark ? "text-white" : "text-gray-900"
                                }`}
                        >
                            {String(currentSlide + 1).padStart(2, "0")}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <span className={`w-4 sm:w-8 h-px transition-colors duration-700 ${isDark ? "bg-white/20" : "bg-gray-300"}`} />
                <span className={`transition-colors duration-700 ${isDark ? "text-white/40" : "text-gray-400"}`}>
                    {String(total).padStart(2, "0")}
                </span>
            </div>

            {/* Thumbnail Strip (Desktop only) */}
            <div
                className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-[5] hidden md:flex items-center gap-2.5 backdrop-blur-xl px-4 py-2.5 rounded-xl border shadow-xl transition-all duration-700 ${isDark
                    ? "bg-black/35 border-white/5"
                    : "bg-white/50 border-gray-200/40"
                    }`}
            >
                {heroAnime.map((anime, i) => {
                    const isActive = i === currentSlide;
                    return (
                        <motion.button
                            layout
                            key={i}
                            onClick={() => {
                                goTo(i, i > currentSlide ? 1 : -1);
                                resetAuto();
                            }}
                            whileHover={{ scale: isActive ? 1 : 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={`relative group overflow-hidden rounded-lg transition-opacity duration-300 ${isActive
                                ? "w-20 h-12 ring-2 ring-red-500 shadow-lg shadow-red-500/20 z-10 opacity-100"
                                : "w-14 h-9 opacity-40 hover:opacity-80"
                                }`}
                        >
                            <img src={anime.banner} alt="" className="w-full h-full object-cover" />

                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500">
                                    <div
                                        ref={progressRef}
                                        className="h-full bg-white/90 origin-left"
                                        style={{ animation: "shrink 6s linear forwards" }}
                                    />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Mobile Dots (✅ PERBAIKAN 2: Diturunkan dari bottom-12 ke bottom-3 di HP agar seimbang dengan angka counter) */}
            <div className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 z-[5] flex md:hidden gap-1 sm:gap-1.5 items-center">
                {heroAnime.map((_, i) => {
                    const isActive = i === currentSlide;
                    return (
                        <motion.button
                            layout
                            key={i}
                            onClick={() => {
                                goTo(i, i > currentSlide ? 1 : -1);
                                resetAuto();
                            }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className={`h-[3px] sm:h-1 rounded-full transition-colors duration-300 ${isActive
                                ? "bg-red-500 w-5 sm:w-6 shadow-md shadow-red-500/25"
                                : isDark
                                    ? "bg-white/20 w-1 sm:w-1.5 hover:bg-white/40"
                                    : "bg-gray-300 w-1 sm:w-1.5 hover:bg-gray-400"
                                }`}
                        />
                    );
                })}
            </div>

            {/* Desktop Nav Arrows */}
            <div className="hidden md:block">
                <HeroNavButton direction="prev" onClick={handlePrev} isDark={isDark} />
                <HeroNavButton direction="next" onClick={handleNext} isDark={isDark} />
            </div>

            {/* Mobile Nav Arrows */}
            <div className="md:hidden absolute top-1/2 -translate-y-1/2 left-1.5 right-1.5 z-[5] flex justify-between pointer-events-none">
                <div className="pointer-events-auto">
                    <HeroNavButton direction="prev" onClick={handlePrev} isDark={isDark} isMobile />
                </div>
                <div className="pointer-events-auto">
                    <HeroNavButton direction="next" onClick={handleNext} isDark={isDark} isMobile />
                </div>
            </div>

            {/* Bottom Progress Line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 z-[5] transition-colors duration-700 ${isDark ? "bg-white/5" : "bg-gray-150"}`}>
                <motion.div
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                    animate={{ width: `${((currentSlide + 1) / total) * 100}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
            </div>
        </>
    );
}