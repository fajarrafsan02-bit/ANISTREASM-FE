// HeroOverlays.jsx
import {
    getRightOverlayStyle,
    getTopOverlayStyle,
    getRadialOverlayStyle,
    getHeaderGradientStyle,
    filmGrainSvg,
} from "../hero/HeroStyle";

export default function HeroOverlays({ isDark, isLoaded }) {
    return (
        <>
            {/* Right gradient overlay */}
            <div
                className={`absolute inset-0 z-2 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                style={getRightOverlayStyle(isDark)}
            />

            {/* Top gradient overlay */}
            <div
                className={`absolute inset-0 z-2 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                style={getTopOverlayStyle(isDark)}
            />

            {/* Radial overlay */}
            <div
                className="absolute inset-0 z-2 transition-opacity duration-700"
                style={getRadialOverlayStyle(isDark)}
            />

            {/* Film Grain - dark mode only */}
            {isDark && (
                <div
                    className="absolute inset-0 z-3 opacity-[0.035] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: filmGrainSvg,
                        backgroundSize: "200px 200px",
                    }}
                />
            )}

            {/* Light Leak - dark mode only (✅ PERBAIKAN 1: Dimensi pendaran cahaya bocor dirampingkan ke 40vw/40vh pada HP agar rapi) */}
            {isDark && (
                <div className="absolute top-0 right-0 w-[40vw] sm:w-[50vw] h-[40vh] sm:h-[50vh] bg-linear-to-bl from-red-600/10 via-orange-500/5 to-transparent z-3 pointer-events-none blur-3xl mix-blend-screen animate-pulse" />
            )}

            {/* Light mode subtle warm vignette */}
            {!isDark && (
                <div
                    className="absolute inset-0 z-1 pointer-events-none transition-opacity duration-1000"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 40%, rgba(248,249,250,0.15) 100%)",
                        opacity: isLoaded ? 1 : 0,
                    }}
                />
            )}

            {/* Top gradient header (✅ PERBAIKAN 2: Mengompresi tinggi masker dari h-72 (288px) menjadi h-36 (144px) di ponsel agar warna visual asli banner terlihat jernih) */}
            <div
                className={`absolute -top-4 left-0 right-0 h-36 sm:h-72 z-4 pointer-events-none transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                style={getHeaderGradientStyle(isDark)}
            />
        </>
    );
}