// HeroOverlays.jsx
import { useMemo } from "react";
import {
    getRightOverlayStyle,
    getTopOverlayStyle,
    getHeaderGradientStyle,
    filmGrainSvg,
} from "../hero/HeroStyle";

const PRESETS = [
    { rgb: "220,38,38", name: "crimson" },
    { rgb: "59,130,246", name: "ocean" },
    { rgb: "245,158,11", name: "amber" },
    { rgb: "139,92,246", name: "violet" },
    { rgb: "16,185,129", name: "emerald" },
];

export default function HeroOverlays({ isDark, isLoaded, currentSlide = 0 }) {
    const c = PRESETS[currentSlide % PRESETS.length];

    const rightOverlay = useMemo(() => getRightOverlayStyle(isDark), [isDark]);
    const topOverlay = useMemo(() => getTopOverlayStyle(isDark), [isDark]);
    const headerGradient = useMemo(() => getHeaderGradientStyle(isDark), [isDark]);

    return (
        <>
            {/* Right vignette */}
            <div
                className={`absolute inset-0 z-2 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={rightOverlay}
            />

            {/* Bottom vignette */}
            <div
                className={`absolute inset-0 z-2 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={topOverlay}
            />

            {/* Cinematic color grade — animated transitions */}
            <div
                key={`grade-${currentSlide}`}
                className="absolute inset-0 z-2 pointer-events-none transition-all duration-1000"
                style={{ opacity: isLoaded ? 1 : 0 }}
            >
                {/* Primary color flare */}
                <div
                    className="absolute top-0 right-0 w-[60vw] h-[60vh]"
                    style={{
                        background: isDark
                            ? `radial-gradient(ellipse at top right, rgba(${c.rgb},0.25), transparent 60%)`
                            : `radial-gradient(ellipse at top right, rgba(${c.rgb},0.06), transparent 60%)`,
                        mixBlendMode: isDark ? "screen" : "multiply",
                        transition: "background 1s ease",
                    }}
                />
                {/* Secondary glow orb */}
                <div
                    className="absolute top-1/4 right-1/4 w-[40vw] h-[40vh] blur-[120px]"
                    style={{
                        background: isDark
                            ? `radial-gradient(circle, rgba(${c.rgb},0.15), transparent 70%)`
                            : `radial-gradient(circle, rgba(${c.rgb},0.03), transparent 70%)`,
                        transition: "background 1s ease",
                    }}
                />
                {/* Bottom rim light */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[30vh]"
                    style={{
                        background: isDark
                            ? `linear-gradient(to top, rgba(${c.rgb},0.08), transparent)`
                            : "none",
                        transition: "background 1s ease",
                    }}
                />
            </div>

            {/* Film grain */}
            <div
                className={`absolute inset-0 z-3 pointer-events-none mix-blend-overlay transition-opacity duration-1000 ${isDark ? "opacity-[0.04]" : "opacity-[0.015]"}`}
                style={{
                    backgroundImage: filmGrainSvg,
                    backgroundSize: "180px 180px",
                }}
            />

            {/* Light leak — dark mode (enhanced) */}
            {isDark && (
                <div className="absolute top-0 right-0 w-[45vw] h-[45vh] bg-linear-to-bl from-red-600/20 via-orange-500/10 to-transparent z-3 pointer-events-none blur-[100px] mix-blend-screen" />
            )}

            {/* Secondary light leak — bottom right */}
            {isDark && (
                <div className="absolute bottom-0 right-0 w-[30vw] h-[30vh] bg-linear-to-tl from-red-500/10 via-purple-500/5 to-transparent z-3 pointer-events-none blur-[80px] mix-blend-screen" />
            )}

            {/* Warm vignette — light mode */}
            {!isDark && (
                <div
                    className="absolute inset-0 z-1 pointer-events-none transition-opacity duration-1000"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 35%, rgba(248,249,250,0.25) 100%)",
                        opacity: isLoaded ? 1 : 0,
                    }}
                />
            )}

            {/* Top header gradient */}
            <div
                className={`absolute -top-4 left-0 right-0 h-40 sm:h-80 z-4 pointer-events-none transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={headerGradient}
            />

            {/* Scanline overlay — subtle horizontal lines */}
            <div
                className="absolute inset-0 z-3 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                    backgroundSize: "100% 4px",
                }}
            />
        </>
    );
}