import ShimmerBar from "./ShimmerBar";

export default function HeroControls({ isDark }) {
    return (
        <>
            {/* Slide Counter */}
            <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-6 md:left-16 lg:left-24 z-5 flex items-center gap-2 sm:gap-3">
                <div className="h-5 sm:h-6 flex items-center">
                    <div className="text-sm sm:text-lg font-black font-mono tracking-tight bg-linear-to-b from-red-500/40 to-red-600/40 bg-clip-text text-transparent">
                        01
                    </div>
                </div>
                <div className={`w-6 sm:w-10 h-[2px] rounded-full ${isDark ? "bg-white/15" : "bg-gray-300/50"}`} />
                <div className={`text-xs sm:text-sm font-mono font-semibold tracking-wide ${isDark ? "text-white/20" : "text-gray-300"}`}>
                    03
                </div>
            </div>

            {/* Desktop Thumbnail Strip */}
            <div
                className={`absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 z-5 hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-xl backdrop-blur-xl border shadow-xl ${isDark
                    ? "bg-black/30 border-white/[0.06] shadow-black/20"
                    : "bg-white/50 border-gray-200/40 shadow-black/5"
                    }`}
            >
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`relative overflow-hidden rounded-lg transition-all duration-500 ${i === 0
                            ? "w-20 h-12 ring-2 ring-red-500/30 shadow-lg shadow-red-500/10"
                            : "w-14 h-9 opacity-25"
                            }`}
                    >
                        <div className={`w-full h-full ${isDark ? "bg-zinc-800/60" : "bg-gray-300/60"}`}>
                            <ShimmerBar isDark={isDark} delay={`${i * 200}ms`} />
                        </div>
                        {i === 0 && (
                            <>
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-500/50">
                                    <div
                                        className="h-full bg-white/70 origin-left rounded-full"
                                        style={{ animation: "shrink 6s linear infinite" }}
                                    />
                                </div>
                                <div className="absolute inset-0 shadow-inner shadow-red-500/5 pointer-events-none" />
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile Dots */}
            <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-5 flex md:hidden gap-1.5 sm:gap-2 items-center">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`rounded-full transition-all duration-500 ${i === 0
                            ? "bg-red-500/50 w-6 sm:w-7 h-[3px] sm:h-[3px]"
                            : isDark
                                ? "bg-white/15 w-1.5 sm:w-2 h-[3px] sm:h-[3px]"
                                : "bg-gray-300/50 w-1.5 sm:w-2 h-[3px] sm:h-[3px]"
                            }`}
                    />
                ))}
            </div>

            {/* Desktop Nav Arrows */}
            <div className="hidden md:block">
                {/* Prev */}
                <div
                    className={`absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center cursor-pointer transition-all duration-300 ${isDark
                        ? "bg-black/30 border-white/[0.06] hover:bg-white/10"
                        : "bg-white/50 border-gray-200/40 hover:bg-white/80"
                        }`}
                >
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? "text-white/30" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>

                {/* Next */}
                <div
                    className={`absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center cursor-pointer transition-all duration-300 ${isDark
                        ? "bg-black/30 border-white/[0.06] hover:bg-white/10"
                        : "bg-white/50 border-gray-200/40 hover:bg-white/80"
                        }`}
                >
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? "text-white/30" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </>
    );
}