import { useTheme } from "../../context/ThemeContext"; 

import ShimmerBar from "./ShimmerBar";
import HeroBgEffects from "./HeroBgEffects";
import { DesktopStatsCard, MobileStatsCard } from "./HeroStatsCard";
import HeroControls from "./HeroControls";
import { heroSkeletonKeyframes } from "./styles";

export default function HeroCarouselSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section
            className={`relative h-[80vh] sm:h-[90vh] min-h-[500px] sm:min-h-[650px] max-h-[1000px] overflow-hidden select-none transition-colors duration-500 ${isDark ? "bg-[#050508]" : "bg-[#f8f9fa]"}`}
        >
            {/* ── BACKGROUND & OVERLAY EFFECTS ── */}
            <HeroBgEffects isDark={isDark} />

            {/* ── MAIN CONTENT SKELETON ── */}
            <div className="relative z-5 h-full flex items-end pb-16 sm:pb-24 md:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24 w-full">
                    <div className="max-w-2xl">
                        {/* Decorative accent line */}
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="h-[3px] w-8 sm:w-12 bg-linear-to-r from-red-500/40 to-red-500/0 rounded-full" />
                            <div className="h-[3px] w-3 sm:w-4 bg-red-500/20 rounded-full" />
                        </div>

                        {/* Status + Meta Badges */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
                            {/* Status badge */}
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-red-500/10 blur-sm animate-pulse" />
                                <div className={`relative px-3 py-1 sm:px-5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase backdrop-blur-sm ${isDark ? "bg-red-600/30 text-white/20" : "bg-red-200/50 text-red-800/20"
                                    }`}>
                                    <div className="w-12 sm:w-16 h-3 rounded bg-current opacity-30 animate-pulse" />
                                    <div className="absolute inset-0 rounded-full bg-red-400/10 animate-ping" />
                                </div>
                            </div>

                            {/* Rating badge */}
                            <div className={`flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full ${isDark ? "bg-yellow-400/5" : "bg-yellow-400/10"
                                }`}>
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-500/40" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <div className="w-6 sm:w-8 h-3 rounded bg-yellow-500/30 animate-pulse" />
                            </div>

                            {/* Genre skeleton */}
                            <div className={`text-[10px] sm:text-sm font-medium ${isDark ? "text-gray-500/50" : "text-gray-400/50"}`}>
                                <div className="w-16 sm:w-24 h-3 rounded bg-current opacity-30 animate-pulse" />
                            </div>

                            {/* Year skeleton */}
                            <div className={`text-[10px] sm:text-sm ${isDark ? "text-gray-600/50" : "text-gray-500/50"}`}>
                                <div className="w-10 h-3 rounded bg-current opacity-30 animate-pulse" />
                            </div>
                        </div>

                        {/* Title */}
                        <div className="mb-2 sm:mb-4 space-y-1.5 sm:space-y-2">
                            <div
                                className="font-display text-[26px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] xs:leading-[1.05] sm:leading-[0.95]"
                                style={{
                                    background: isDark
                                        ? "linear-gradient(to right, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0.08))"
                                        : "linear-gradient(to right, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.05))",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                <div className="h-[0.8em] w-[90%] sm:w-[80%] rounded" />
                            </div>
                            <div
                                className="font-display text-[26px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] xs:leading-[1.05] sm:leading-[0.95]"
                                style={{
                                    background: isDark
                                        ? "linear-gradient(to right, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0.08))"
                                        : "linear-gradient(to right, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.05))",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                <div className="h-[0.8em] w-[70%] sm:w-[60%] rounded" />
                            </div>
                        </div>

                        {/* Subtitle */}
                        <div className="h-3 sm:h-4 w-32 sm:w-48 rounded mb-2 sm:mb-5 bg-red-500/20 animate-pulse" />

                        {/* Description in glass card */}
                        <div
                            className={`relative mb-4 sm:mb-10 p-3 sm:p-5 rounded-xl border max-w-lg backdrop-blur-sm ${isDark
                                ? "bg-white/[0.02] border-white/[0.04]"
                                : "bg-black/[0.01] border-black/[0.04]"
                                }`}
                        >
                            <div className="space-y-2 sm:space-y-3">
                                <div className={`h-3 sm:h-4 w-full rounded ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`}>
                                    <ShimmerBar isDark={isDark} delay="0ms" />
                                </div>
                                <div className={`h-3 sm:h-4 w-[95%] rounded ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`}>
                                    <ShimmerBar isDark={isDark} delay="100ms" />
                                </div>
                                <div className={`h-3 sm:h-4 w-[75%] rounded ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`}>
                                    <ShimmerBar isDark={isDark} delay="200ms" />
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-row items-center justify-start gap-2 sm:gap-4 w-full sm:w-auto">
                            {/* Tonton Sekarang button */}
                            <div className="group relative overflow-hidden h-10 sm:h-12 w-full sm:w-40 rounded-xl sm:rounded-2xl bg-linear-to-b from-red-500/40 to-red-700/40">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                                        backgroundSize: "200% 100%",
                                        animation: "shimmer 2.5s infinite",
                                    }}
                                />
                                <div className="relative h-full w-full flex items-center justify-center gap-2">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10" />
                                    <div className="w-16 sm:w-24 h-3 rounded bg-white/20" />
                                </div>
                            </div>

                            {/* Watchlist button */}
                            <div
                                className={`flex items-center justify-center gap-2 h-10 sm:h-12 w-full sm:w-36 rounded-xl sm:rounded-2xl border backdrop-blur-md ${isDark
                                    ? "bg-white/[0.02] border-white/[0.06]"
                                    : "bg-white/40 border-gray-200/30"
                                    }`}
                            >
                                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center ${isDark ? "border-white/10" : "border-gray-200/50"
                                    }`}>
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <div className={`w-10 sm:w-14 h-3 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── DESKTOP STATS CARD ── */}
            <DesktopStatsCard isDark={isDark} />

            {/* ── MOBILE STATS CARD ── */}
            <MobileStatsCard isDark={isDark} />

            {/* ── CONTROLS & NAVIGATOR ── */}
            <HeroControls isDark={isDark} />

            {/* ── SCROLL INDICATOR ── */}
            <div className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 z-5 flex flex-col items-center gap-1.5">
                <div className={`text-[9px] sm:text-[11px] tracking-[0.35em] uppercase font-medium ${isDark ? "text-white/15" : "text-gray-300"}`}>
                    <div className="w-14 h-3 rounded bg-current opacity-50 animate-pulse" />
                </div>
                <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${isDark ? "text-white/15" : "text-gray-300"} animate-bounce`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

            {/* ── BOTTOM PROGRESS BAR ── */}
            <div className={`absolute bottom-0 left-0 right-0 h-[3px] z-5 ${isDark ? "bg-white/5" : "bg-gray-200/50"}`}>
                <div
                    className="h-full bg-linear-to-r from-red-600/50 via-red-400/50 to-red-500/50"
                    style={{
                        width: "33%",
                        animation: "heroProgress 6s ease-in-out infinite alternate",
                    }}
                />
            </div>

            {/* ── INJECT KEYFRAMES ── */}
            <style>{heroSkeletonKeyframes}</style>
        </section>
    );
}