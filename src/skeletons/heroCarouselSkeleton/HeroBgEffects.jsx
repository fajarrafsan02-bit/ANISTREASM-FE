export default function HeroBgEffects({ isDark }) {
    return (
        <>
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
                <div className="absolute top-0 right-0 w-[45vw] h-[45vh] bg-linear-to-bl from-red-600/10 via-orange-500/5 to-transparent z-3 pointer-events-none blur-[100px] mix-blend-screen" />
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
        </>
    );
}