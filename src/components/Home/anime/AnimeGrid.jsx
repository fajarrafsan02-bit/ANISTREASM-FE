import { useTheme } from "../../../context/ThemeContext";
import { useState, useEffect } from "react";
import AnimeCards from "./AnimeCard/AnimeCards";
import { useScrollReveal } from "../../../hooks/useScrollReveal";

// ─── Wrapper animasi per card ─────────────────────────────────────────────────
function RevealCard({ children, index, cols, isMobile, isActive }) {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
    const [isHovered, setIsHovered] = useState(false);

    const posInRow = index % cols;
    const delay = isVisible ? `${posInRow * 80}ms` : "0ms";
    const exitDelay = "200ms";

    const handleMouseEnter = () => {
        if (!isMobile) setIsHovered(true);
    };
    const handleMouseLeave = () => {
        if (!isMobile) setIsHovered(false);
    };

    return (
        <div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0px)" : "translateY(24px)",
                transitionProperty: "opacity, transform, z-index",
                transitionDuration: `500ms, 500ms, 0ms`,
                transitionTimingFunction: `ease, cubic-bezier(0.4, 0, 0.2, 1), linear`,
                transitionDelay: `${delay}, ${delay}, ${isHovered ? "0ms" : exitDelay}`,
                overflow: "visible",
                position: "relative",
                // PERBAIKAN Z-INDEX: Paksa z-index pembungkus naik jika kartu ini aktif di mobile
                zIndex: isActive ? 100 : (isHovered ? 50 : 1),
            }}
        >
            {children}
        </div>
    );
}

// ─── AnimeGrid ────────────────────────────────────────────────────────────────
export default function AnimeGrid({ animes = [] }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isMobile, setIsMobile] = useState(false);
    const [cols, setCols] = useState(2);

    // State terpusat untuk melacak kartu mana yang sedang aktif dibuka di mobile
    const [activeCardId, setActiveCardId] = useState(null);

    useEffect(() => {
        const updateCols = () => {
            const w = window.innerWidth;
            const mobileCheck = w < 640;
            setIsMobile(mobileCheck);
            if (mobileCheck) setCols(2);       // mobile
            else if (w < 768) setCols(3);  // sm
            else if (w < 1024) setCols(4);  // md
            else setCols(5);                 // lg+
        };
        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, []);

    // Reset kartu aktif jika ukuran layar berubah ke desktop
    useEffect(() => {
        setActiveCardId(null);
    }, [isMobile]);

    if (!animes || animes.length === 0) {
        return (
            <div className={`text-center py-8 transition-colors duration-300 ${isDark ? "text-gray-400" : "text-gray-500"
                }`}>
                Tidak ada data anime
            </div>
        );
    }

    return (
        <div
            className={`grid gap-3 sm:gap-5 relative ${isMobile
                ? "grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                }`}
            style={{
                overflow: "visible",
                position: "relative",
            }}
        >
            {animes.map((anime, index) => {
                const animeKey = anime.id ?? anime.animeId ?? index;
                const isActive = activeCardId === animeKey;

                return (
                    <RevealCard
                        key={animeKey}
                        index={index}
                        cols={cols}
                        isMobile={isMobile}
                        isActive={isActive} // Meneruskan status aktif ke pembungkus animasi
                    >
                        <AnimeCards
                            anime={anime}
                            index={index}       // Meneruskan indeks untuk deteksi kolom
                            cols={cols}         // Meneruskan jumlah kolom aktif
                            activeCardId={activeCardId}
                            setActiveCardId={setActiveCardId}
                        />
                    </RevealCard>
                );
            })}
        </div>
    );
}