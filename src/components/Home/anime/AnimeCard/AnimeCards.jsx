// AnimeCards.jsx
import { useAnimeCard } from "./UseAnimeCard";
import AnimeCardImage from "./AnimeCardImage";
import AnimeCardInfo from "./AnimeCardInfo";
import AnimeCardPanel from "./AnimeCardPanel";
import { useTheme } from "../../../../context/ThemeContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useBreakpoint() {
    const [width, setWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 375
    );
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return {
        isXs: width < 360,
        isSm: width >= 360 && width < 480,
        isMd: width >= 480 && width < 768,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
    };
}

export default function AnimeCards({
    anime,
    index,              // Terima indeks kartu
    cols,               // Terima jumlah kolom aktif
    activeCardId,       // Terima state aktif dari Grid
    setActiveCardId,    // Terima setter aktif dari Grid
    isBookmarked = false,
    onToggleBookmark,
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const isOngoing = anime.status === "ONGOING";
    const bp = useBreakpoint();
    const navigate = useNavigate();

    const {
        isHovered,
        isElevated,
        openLeft,
        wrapperRef, // Tetap dipertahankan jika useAnimeCard membutuhkannya secara internal
        handleMouseEnter,
        handleMouseLeave,
        panelWidth: basePanelWidth,
        transitionDuration,
    } = useAnimeCard();

    const animeKey = anime.id ?? anime.animeId ?? index;
    const isThisCardActiveOnMobile = activeCardId === animeKey;

    // Tentukan status aktif terpadu
    const activeHovered = bp.isMobile ? isThisCardActiveOnMobile : isHovered;

    // Kalkulasi arah ekspansi berdasarkan posisi kolom kartu saat ini
    const colIndex = index % cols;
    const isRightmost = colIndex === cols - 1;
    // Jika di mobile dan berada di kolom paling kanan, paksa terbuka ke kiri (finalOpenLeft = true)
    const finalOpenLeft = bp.isMobile ? isRightmost : openLeft;

    // Handler tonton
    const handlePlay = () => {
        navigate(`/anime/detail/${anime.animeId}`);
    };

    const getPanelWidth = () => {
        if (bp.isXs) return Math.min(basePanelWidth * 0.40, bp.width * 0.35); // ~100px di layar 320px
        if (bp.isSm) return Math.min(basePanelWidth * 0.50, bp.width * 0.42);
        if (bp.isMd) return Math.min(basePanelWidth * 0.65, bp.width * 0.45);
        return basePanelWidth;
    };
    const responsivePanelWidth = getPanelWidth();

    const cardPadding = bp.isXs ? "p-1.5" : bp.isSm ? "p-2" : "p-3";

    const liftY = bp.isMobile ? "-3px" : "-6px";
    const glowRadius = bp.isMobile ? "12px" : "25px";
    const shadowDrop = bp.isMobile ? "18px" : "40px";
    const shadowY = bp.isMobile ? "8px" : "20px";

    const handleCardClick = (e) => {
        if (bp.isMobile) {
            e.stopPropagation();
            if (isThisCardActiveOnMobile) {
                setActiveCardId(null); // Tutup jika di-tap kembali
            } else {
                setActiveCardId(animeKey); // Aktifkan kartu ini, otomatis menutup kartu lainnya
            }
        }
    };

    return (
        <div
            ref={wrapperRef}
            className="relative overflow-visible"
            style={{
                zIndex: isElevated || activeHovered ? 100 : 1,
                perspective: "1000px",
            }}
            onMouseEnter={!bp.isMobile ? handleMouseEnter : undefined}
            onMouseLeave={!bp.isMobile ? handleMouseLeave : undefined}
        >
            {/* ── MURNI REACT: Backdrop Pendeteksi Klik di Luar (Hanya Aktif di Mobile) ── */}
            {activeHovered && bp.isMobile && (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveCardId(null);
                    }}
                    className="fixed inset-0 bg-transparent z-10 cursor-default"
                />
            )}

            {/* Placeholder */}
            <div className="invisible pointer-events-none" aria-hidden="true">
                <div className="aspect-3/4" />
                <div className={cardPadding}>
                    <div className="h-4 mb-1" />
                    <div className="h-3" />
                </div>
            </div>

            {/* Kartu Utama */}
            <div
                className={`absolute top-0 rounded-xl overflow-hidden cursor-pointer flex transition-colors duration-300 ${isDark ? "bg-[#111118]" : "bg-white"
                    }`}
                style={{
                    width: activeHovered ? `calc(100% + ${responsivePanelWidth}px)` : "100%",
                    left: finalOpenLeft ? "auto" : 0,
                    right: finalOpenLeft ? 0 : "auto",
                    transform: activeHovered ? `translateY(${liftY}) scale(1.02)` : "translateY(0) scale(1)",
                    border: activeHovered
                        ? isDark ? "1px solid rgba(239,68,68,0.6)" : "1px solid rgba(220,38,38,0.5)"
                        : isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                    boxShadow: activeHovered
                        ? isDark
                            ? `0 0 0 1px rgba(239,68,68,0.3), 0 0 ${glowRadius} rgba(239,68,68,0.25), 0 0 ${parseInt(glowRadius) * 2}px -4px rgba(239,68,68,0.15), 0 ${shadowY} ${shadowDrop} -8px rgba(0,0,0,0.9)`
                            : `0 0 0 1px rgba(220,38,38,0.2), 0 0 ${glowRadius} rgba(220,38,38,0.2), 0 0 ${parseInt(glowRadius) * 2}px -4px rgba(220,38,38,0.1), 0 ${shadowY} ${shadowDrop} -8px rgba(0,0,0,0.15)`
                        : isDark
                            ? "0 4px 16px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)"
                            : "0 4px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                    transition: `
                        width ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1),
                        transform ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1),
                        box-shadow ${transitionDuration}ms ease,
                        border ${transitionDuration}ms ease,
                        background-color 300ms ease
                    `,
                    flexDirection: finalOpenLeft ? "row-reverse" : "row",
                    transformStyle: "preserve-3d",
                    willChange: activeHovered ? "transform, box-shadow" : "auto",
                    zIndex: 20, // Menjamin kartu utama berada di atas backdrop transparan pendeteksi klik
                }}
            >
                {/* Animated border gradient (Hanya aktif di desktop) */}
                {activeHovered && !bp.isMobile && (
                    <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                            padding: "1px",
                            background: "linear-gradient(135deg, #ef4444, #dc2626, #f97316, #ef4444)",
                            backgroundSize: "300% 300%",
                            animation: "ac-borderGlowMove 3s ease infinite",
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                            zIndex: 11,
                        }}
                    />
                )}

                {/* Sisi Kiri: Gambar + Info */}
                <div
                    className="relative shrink-0 flex flex-col overflow-hidden min-w-0"
                    style={{
                        width: activeHovered ? `calc(100% - ${responsivePanelWidth}px)` : "100%",
                        transition: `width ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1)`,
                        zIndex: 5,
                    }}
                    onClick={handleCardClick}
                >
                    <AnimeCardImage
                        anime={anime}
                        isHovered={activeHovered}
                        isOngoing={isOngoing}
                        isDark={isDark}
                        isMobile={bp.isMobile}
                    />
                    <AnimeCardInfo
                        anime={anime}
                        isHovered={activeHovered}
                        isDark={isDark}
                        isMobile={bp.isMobile}
                    />
                </div>

                {/* Panel Detail */}
                <div
                    className="anime-card-panel-container"
                    style={{ zIndex: activeHovered ? 10 : 0, position: "relative" }}
                    onClick={(e) => bp.isMobile && e.stopPropagation()}
                >
                    <AnimeCardPanel
                        anime={anime}
                        isHovered={activeHovered}
                        openLeft={finalOpenLeft} // Menggunakan arah kalkulasi dinamis terbaru
                        panelWidth={responsivePanelWidth}
                        transitionDuration={transitionDuration}
                        isMobile={bp.isMobile}
                        breakpoint={bp}
                        onPlay={handlePlay}
                        isBookmarked={isBookmarked}
                        onToggleBookmark={onToggleBookmark}
                    />
                </div>
            </div>
        </div>
    );
}