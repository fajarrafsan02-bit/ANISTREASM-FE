import { useTheme } from '../../context/ThemeContext'; 

export default function HeroBanner({ bannerImage, title = "Anime" }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const hasBanner = bannerImage && bannerImage.trim() !== '';

    return (
        <div className="relative w-full h-[240px] sm:h-[320px] md:h-[460px] lg:h-[560px] overflow-hidden group">
            {/* Layer 0: Animated particles */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className={`absolute top-1/4 left-1/4 w-1 h-1 rounded-full animate-float-slow ${isDark ? "bg-[#ff1e56]/40" : "bg-rose-400/30"
                        }`}
                />
                <div
                    className={`absolute top-1/3 right-1/3 w-0.5 h-0.5 rounded-full animate-float-slower ${isDark ? "bg-[#ff1e56]/30" : "bg-rose-400/20"
                        }`}
                />
                <div
                    className={`absolute bottom-1/4 left-1/2 w-1 h-1 rounded-full animate-float-slow ${isDark ? "bg-red-400/20" : "bg-rose-300/20"
                        }`}
                />
            </div>

            {/* Layer 1: Main image / fallback */}
            {hasBanner ? (
                <div className="absolute inset-0 scale-105 group-hover:scale-110 transition-transform duration-1800 ease-out">
                    <img
                        src={bannerImage}
                        alt={title}
                        className={`w-full h-full object-cover object-center transition-all duration-1000 ${isDark
                                ? "opacity-55 sm:opacity-50 group-hover:opacity-60 contrast-[1.05]"
                                : "opacity-80 sm:opacity-75 group-hover:opacity-85 contrast-[1.08] saturate-[1.12]"
                            }`}
                        loading="eager"
                    />
                </div>
            ) : (
                <div
                    className={`absolute inset-0 ${isDark
                            ? "bg-linear-to-br from-[#1a0a0f] via-[#0d0407] to-black"
                            : "bg-linear-to-br from-rose-50 via-white to-slate-100"
                        }`}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            opacity: isDark ? 0.03 : 0.06,
                            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "#ff1e56" : "#f43f5e"} 1px, transparent 0)`,
                            backgroundSize: "32px 32px",
                        }}
                    />
                </div>
            )}

            {/* Layer 2: Ken Burns */}
            <div className="absolute inset-0 animate-ken-burns pointer-events-none" />

            {/* Layer 3: Vignette  */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    boxShadow: isDark
                        ? "inset 0 0 100px 35px rgba(7,2,4,0.92), inset 0 0 220px 80px rgba(7,2,4,0.55)"
                        : "inset 0 0 80px 20px rgba(255,255,255,0.45), inset 0 0 160px 40px rgba(255,255,255,0.2)",
                }}
            />
            <div
                className={`absolute top-0 left-0 right-0 h-[120px] sm:h-[160px] md:h-[200px] z-10 bg-linear-to-b ${isDark
                        ? "from-[#070204] via-[#070204]/80 to-transparent"
                        : "from-white via-white/40 to-transparent"
                    }`}
            />
            {/* Bottom */}
            <div
                className={`absolute bottom-0 left-0 right-0 h-[180px] sm:h-[240px] md:h-[300px] z-10 bg-linear-to-t ${isDark
                        ? "from-[#070204] via-[#070204]/75 to-transparent"
                        : "from-white via-white/50 to-transparent"
                    }`}
            />
            {/* Left */}
            <div
                className={`absolute inset-y-0 left-0 w-[55%] sm:w-[45%] md:w-[40%] z-10 bg-linear-to-r ${isDark
                        ? "from-[#070204]/95 via-[#070204]/55 to-transparent"
                        : "from-white/70 via-white/20 to-transparent"
                    }`}
            />
            {/* Right */}
            <div
                className={`absolute inset-y-0 right-0 w-[30%] sm:w-[28%] md:w-[25%] z-10 bg-linear-to-l ${isDark ? "from-[#070204]/60 to-transparent" : "from-white/20 to-transparent"
                    }`}
            />

            {/* Layer 5: Scanlines — dark only */}
            {isDark && (
                <div className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-size-[100%_3px]" />
            )}

            {/* Layer 6: Noise texture */}
            <div
                className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
                style={{
                    opacity: isDark ? 0.015 : 0.008,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Layer 7: Top accent line */}
            <div className="absolute top-0 left-0 right-0 z-20">
                <div
                    className={`h-[2px] bg-linear-to-r from-transparent ${isDark
                            ? "via-[#ff1e56] to-transparent shadow-[0_0_20px_rgba(255,30,86,0.8)]"
                            : "via-rose-400/60 to-transparent shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                        }`}
                />
                <div
                    className={`h-px mt-px blur-sm bg-linear-to-r ${isDark
                            ? "from-[#ff1e56]/50 via-[#ff1e56]/20 to-transparent"
                            : "from-rose-400/30 via-rose-300/10 to-transparent"
                        }`}
                />
            </div>

            {/* Layer 8: Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
                <div
                    className={`h-px bg-linear-to-r from-transparent ${isDark ? "via-[#2a1117]" : "via-slate-300/50"
                        } to-transparent`}
                />
            </div>

            {/* Layer 9: Corner accents on hover */}
            <div
                className={`absolute top-4 left-4 sm:top-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 border-l-2 border-t-2 rounded-tl-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isDark ? "border-[#ff1e56]/30" : "border-rose-400/30"
                    }`}
            />
            <div
                className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 border-r-2 border-t-2 rounded-tr-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isDark ? "border-[#ff1e56]/30" : "border-rose-400/30"
                    }`}
            />

            {/* Layer 10: Corner bracket */}
            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-20 flex items-end gap-1 opacity-70 sm:opacity-60">
                <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 border-l-2 border-b-2 rounded-bl-sm ${isDark ? "border-[#ff1e56]/40" : "border-rose-400/30"
                        }`}
                />
            </div>

            {/* Layer 11: Light sweep on hover */}
            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out" />
            </div>

            {/* Layer 12: Bottom ambient glow */}
            <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] sm:w-3/4 h-20 sm:h-24 md:h-32 blur-3xl rounded-full z-10 pointer-events-none ${isDark ? "bg-[#ff1e56]/5" : "bg-rose-400/5"
                    }`}
            />
        </div>
    );
}