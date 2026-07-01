import { useTheme } from "../../../context/ThemeContext";

export default function HeroCarouselSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section
            className={`relative h-[80vh] sm:h-[90vh] min-h-[500px] sm:min-h-[650px] max-h-[1000px] overflow-hidden select-none transition-colors duration-500 ${isDark ? "bg-[#050508]" : "bg-[#f8f9fa]"}`}
        >
            {/* ── ANIMATED BACKGROUND ── */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Base gradient */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: isDark
                            ? "linear-gradient(135deg, #0a0a14 0%, #14141f 30%, #1a0f14 60%, #0d0d18 100%)"
                            : "linear-gradient(135deg, #e8eaf0 0%, #f0f1f5 30%, #f5f0f2 60%, #eceef2 100%)",
                        backgroundSize: "400% 400%",
                        animation: "heroBgDrift 12s ease-in-out infinite alternate",
                    }}
                />

                {/* Color flare overlay */}
                <div
                    className="absolute top-0 right-0 w-[60vw] h-[60vh] pointer-events-none"
                    style={{
                        background: isDark
                            ? "radial-gradient(ellipse at top right, rgba(239,68,68,0.12), transparent 60%)"
                            : "radial-gradient(ellipse at top right, rgba(239,68,68,0.03), transparent 60%)",
                        mixBlendMode: isDark ? "screen" : "multiply",
                        animation: "heroFlarePulse 6s ease-in-out infinite alternate",
                    }}
                />

                {/* Mid soft glow */}
                <div
                    className="absolute top-1/4 right-1/4 w-[40vw] h-[40vh] blur-[120px] pointer-events-none"
                    style={{
                        background: isDark
                            ? "radial-gradient(circle, rgba(239,68,68,0.08), transparent 70%)"
                            : "radial-gradient(circle, rgba(239,68,68,0.015), transparent 70%)",
                    }}
                />

                {/* Floating light orb */}
                <div
                    className="absolute -top-16 -right-16 w-80 h-80 rounded-full pointer-events-none"
                    style={{
                        background: isDark
                            ? "radial-gradient(circle, rgba(239,68,68,0.1), transparent 70%)"
                            : "transparent",
                        filter: "blur(80px)",
                        animation: "heroDrift 14s ease-in-out infinite alternate",
                    }}
                />
            </div>

            {/* ── OVERLAYS ── */}
            {/* Right vignette */}
            <div
                className="absolute inset-0 z-2 pointer-events-none"
                style={{
                    background: isDark
                        ? "linear-gradient(to right, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.75) 25%, rgba(5,5,8,0.3) 50%, transparent 75%)"
                        : "linear-gradient(to right, rgba(248,249,250,0.6) 0%, rgba(248,249,250,0.35) 20%, rgba(248,249,250,0.12) 40%, transparent 60%)",
                }}
            />

            {/* Bottom vignette */}
            <div
                className="absolute inset-0 z-2 pointer-events-none"
                style={{
                    background: isDark
                        ? "linear-gradient(to top, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.55) 30%, transparent 55%)"
                        : "linear-gradient(to top, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.05) 20%, rgba(15,23,42,0.02) 35%, transparent 55%)",
                }}
            />

            {/* Bottom rim light */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[30vh] z-2 pointer-events-none"
                style={{
                    background: isDark
                        ? "linear-gradient(to top, rgba(239,68,68,0.04), transparent)"
                        : "none",
                }}
            />

            {/* Header gradient fade */}
            <div
                className="absolute -top-4 left-0 right-0 h-40 sm:h-80 z-4 pointer-events-none"
                style={{
                    background: isDark
                        ? "linear-gradient(to bottom, rgba(5,5,8,1) 0%, rgba(5,5,8,0.98) 15%, rgba(5,5,8,0.85) 30%, rgba(5,5,8,0.5) 55%, transparent 100%)"
                        : "linear-gradient(to bottom, rgba(248,249,250,0.98) 0%, rgba(241,245,249,0.95) 10%, rgba(241,245,249,0.8) 25%, rgba(241,245,249,0.5) 50%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
                    maskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
                }}
            />

            {/* Light leak — dark mode */}
            {isDark && (
                <div className="absolute top-0 right-0 w-[45vw] h-[45vh] bg-gradient-to-bl from-red-600/10 via-orange-500/5 to-transparent z-3 pointer-events-none blur-[100px] mix-blend-screen" />
            )}

            {/* Film grain */}
            <div
                className={`absolute inset-0 z-3 pointer-events-none mix-blend-overlay ${isDark ? "opacity-[0.04]" : "opacity-[0.015]"}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "180px 180px",
                }}
            />

            {/* Scanlines */}
            <div
                className="absolute inset-0 z-3 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                    backgroundSize: "100% 4px",
                }}
            />

            {/* Warm vignette — light mode */}
            {!isDark && (
                <div
                    className="absolute inset-0 z-1 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 35%, rgba(248,249,250,0.2) 100%)",
                    }}
                />
            )}

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-[5] h-full flex items-end pb-16 sm:pb-24 md:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24 w-full">
                    <div className="max-w-2xl">
                        {/* Decorative accent line */}
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="h-[3px] w-8 sm:w-12 bg-gradient-to-r from-red-500/40 to-red-500/0 rounded-full" />
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
                            <div className="group relative overflow-hidden h-10 sm:h-12 w-full sm:w-40 rounded-xl sm:rounded-2xl bg-gradient-to-b from-red-500/40 to-red-700/40">
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
            <div
                className={`absolute top-24 right-6 md:right-16 lg:right-24 z-[5] hidden md:block rounded-2xl p-4 w-52 backdrop-blur-xl border shadow-2xl ${isDark
                    ? "bg-black/30 border-white/[0.06] shadow-black/20"
                    : "bg-white/50 border-gray-200/40 shadow-black/5"
                    }`}
            >
                {/* Accent top border */}
                <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-red-500/0 via-red-500/60 to-red-500/0 rounded-full" />

                {/* Score row */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10">
                        <svg className="w-4 h-4 fill-yellow-500/40" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <div className={`h-2 w-12 rounded mb-1 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />
                        <div className={`h-4 w-16 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}>
                            <ShimmerBar isDark={isDark} delay="0ms" />
                        </div>
                    </div>
                    <div className={`text-lg font-black font-mono ${isDark ? "text-yellow-500/40" : "text-yellow-600/40"}`}>
                        8.5
                    </div>
                </div>

                {/* Divider */}
                <div className={`h-px mb-3 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />

                {/* Rank row */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m0 0a6.023 6.023 0 01-2.77-.896" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <div className={`h-2 w-10 rounded mb-1 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />
                        <div className={`h-4 w-14 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}>
                            <ShimmerBar isDark={isDark} delay="100ms" />
                        </div>
                    </div>
                    <div className={`text-sm font-bold font-mono ${isDark ? "text-red-400/40" : "text-red-600/40"}`}>
                        #123
                    </div>
                </div>

                {/* Divider */}
                <div className={`h-px mb-3 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />

                {/* Episodes row */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0 .621.504 1.125 1.125 1.125h7.5" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <div className={`h-2 w-14 rounded mb-1 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />
                        <div className={`h-4 w-12 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}>
                            <ShimmerBar isDark={isDark} delay="200ms" />
                        </div>
                    </div>
                    <div className={`text-sm font-bold font-mono ${isDark ? "text-blue-400/40" : "text-blue-600/40"}`}>
                        24 Ep
                    </div>
                </div>

                {/* Divider */}
                <div className={`h-px mb-3 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />

                {/* Popularity row */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <div className={`h-2 w-16 rounded mb-1 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />
                        <div className={`h-4 w-16 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}>
                            <ShimmerBar isDark={isDark} delay="300ms" />
                        </div>
                    </div>
                    <div className={`text-sm font-bold font-mono ${isDark ? "text-purple-400/40" : "text-purple-600/40"}`}>
                        12.4K
                    </div>
                </div>
            </div>

            {/* ── MOBILE STATS CARD ── */}
            <div
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-[5] md:hidden rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 backdrop-blur-xl border shadow-xl ${isDark
                    ? "bg-black/30 border-white/[0.06] shadow-black/20"
                    : "bg-white/50 border-gray-200/40 shadow-black/5"
                    }`}
            >
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Score */}
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 fill-yellow-500/40" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <div className={`h-3 w-6 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
                    </div>
                    <div className="w-px h-5 bg-current opacity-15" />
                    {/* Rank */}
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m0 0a6.023 6.023 0 01-2.77-.896" />
                        </svg>
                        <div className={`h-3 w-5 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
                    </div>
                    <div className="w-px h-5 bg-current opacity-15" />
                    {/* Episodes */}
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0 .621.504 1.125 1.125 1.125h7.5" />
                        </svg>
                        <div className={`h-3 w-5 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
                    </div>
                    <div className="w-px h-5 bg-current opacity-15" />
                    {/* Popularity */}
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <div className={`h-3 w-6 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
                    </div>
                </div>
            </div>
            {/* ── CONTROLS ── */}
            {/* Slide Counter */}
            <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-6 md:left-16 lg:left-24 z-[5] flex items-center gap-2 sm:gap-3">
                <div className="h-5 sm:h-6 flex items-center">
                    <div className="text-sm sm:text-lg font-black font-mono tracking-tight bg-gradient-to-b from-red-500/40 to-red-600/40 bg-clip-text text-transparent">
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
                className={`absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 z-[5] hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-xl backdrop-blur-xl border shadow-xl ${isDark
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
            <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-[5] flex md:hidden gap-1.5 sm:gap-2 items-center">
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
                    className={`absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-[5] w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center cursor-pointer transition-all duration-300 ${isDark
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
                    className={`absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[5] w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center cursor-pointer transition-all duration-300 ${isDark
                        ? "bg-black/30 border-white/[0.06] hover:bg-white/10"
                        : "bg-white/50 border-gray-200/40 hover:bg-white/80"
                        }`}
                >
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? "text-white/30" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* ── SCROLL INDICATOR ── */}
            <div className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-1.5">
                <div className={`text-[9px] sm:text-[11px] tracking-[0.35em] uppercase font-medium ${isDark ? "text-white/15" : "text-gray-300"}`}>
                    <div className="w-14 h-3 rounded bg-current opacity-50 animate-pulse" />
                </div>
                <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${isDark ? "text-white/15" : "text-gray-300"} animate-bounce`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

            {/* ── BOTTOM PROGRESS BAR ── */}
            <div className={`absolute bottom-0 left-0 right-0 h-[3px] z-[5] ${isDark ? "bg-white/5" : "bg-gray-200/50"}`}>
                <div
                    className="h-full bg-gradient-to-r from-red-600/50 via-red-400/50 to-red-500/50"
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

function ShimmerBar({ isDark, delay = "0ms" }) {
    return (
        <div
            className="w-full h-full"
            style={{
                background: isDark
                    ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)"
                    : "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.04) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: `shimmer 2.4s infinite`,
                animationDelay: delay,
            }}
        />
    );
}

const heroSkeletonKeyframes = `
    @keyframes heroBgDrift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    @keyframes heroFlarePulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }
    @keyframes heroDrift {
        0% { transform: scale(1.04) translateX(-40px) translateY(-20px); }
        100% { transform: scale(1.2) translateX(40px) translateY(20px); }
    }
    @keyframes shrink {
        from { transform: scaleX(1); }
        to { transform: scaleX(0); }
    }
    @keyframes heroProgress {
        0% { width: 15%; opacity: 0.4; }
        50% { width: 45%; opacity: 1; }
        100% { width: 35%; opacity: 0.6; }
    }
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;
