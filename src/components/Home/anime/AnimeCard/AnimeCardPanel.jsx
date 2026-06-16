// AnimeCardPanel.jsx
import { useTheme } from "../../../../context/ThemeContext";
import { stripHtml } from "../../../../utils/htmlParser";
import AnimeCardButtons from "./AnimeCardButtons";

export default function AnimeCardPanel({
    anime,
    isHovered,
    openLeft,
    panelWidth,
    transitionDuration,
    isMobile,
    breakpoint = {},
    onPlay,
    isBookmarked = false,
    onToggleBookmark,
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const bp = {
        isXs: breakpoint.isXs ?? false,
        isSm: breakpoint.isSm ?? isMobile,
        isMobile: breakpoint.isMobile ?? isMobile,
        width: breakpoint.width ?? (typeof window !== "undefined" ? window.innerWidth : 375),
    };

    const duration = transitionDuration;
    const exitDuration = duration * 1.3;

    // Optimalisasi ruang padding & ukuran font untuk layar ultra-kecil (320px)
    const panelPadding = bp.isXs ? "5px" : bp.isSm ? "8px" : "12px";

    const titleSize = bp.isXs ? "9.5px" : bp.isSm ? "11px" : "13px";
    const metaSize = bp.isXs ? "7.5px" : bp.isSm ? "9px" : "10px";
    const genreSize = bp.isXs ? "7.5px" : bp.isSm ? "9px" : "10px";
    const synopsisSize = bp.isXs ? "7.5px" : bp.isSm ? "9px" : "10px";

    // Line clamp dinamis: 1 baris untuk 320px, 3 baris untuk mobile sedang, 4 baris untuk desktop
    const synopsisClamp = bp.isXs ? 1 : bp.isSm ? 3 : 4;

    const slideOffset = bp.isMobile ? "12px" : "40px";
    const contentSlide = bp.isMobile ? "6px" : "20px";

    // Jarak margin antar section dirapatkan agar seluruh elemen muat dengan rapi
    const sectionGap = bp.isXs ? "2.5px" : bp.isSm ? "5px" : "8px";

    return (
        <div
            className={`shrink-0 flex flex-col overflow-hidden relative backdrop-blur-md transition-colors duration-300 ${isDark ? "bg-zinc-950/45" : "bg-white/85"
                }`}
            style={{
                width: isHovered ? `${panelWidth}px` : "0px",
                opacity: isHovered ? 1 : 0,
                transform: isHovered
                    ? "translateX(0) scaleX(1)"
                    : openLeft
                        ? `translateX(${slideOffset}) scaleX(0.85)`
                        : `translateX(-${slideOffset}) scaleX(0.85)`,
                transformOrigin: openLeft ? "right center" : "left center",
                padding: isHovered ? panelPadding : "0px",
                pointerEvents: isHovered ? "auto" : "none",
                visibility: isHovered ? "visible" : "hidden",
                transition: `
                    width   ${isHovered ? duration : exitDuration}ms cubic-bezier(0.4,0,0.2,1),
                    opacity ${isHovered ? duration * 0.8 : exitDuration}ms ease ${!isHovered ? "60ms" : "0ms"},
                    transform ${isHovered ? duration : exitDuration}ms cubic-bezier(0.4,0,0.2,1) ${!isHovered ? "40ms" : "0ms"},
                    padding ${isHovered ? duration : exitDuration}ms cubic-bezier(0.4,0,0.2,1),
                    visibility 0ms linear ${isHovered ? "0ms" : `${exitDuration}ms`}
                `,
                borderLeft: !openLeft
                    ? isHovered
                        ? isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)"
                        : "none"
                    : "none",
                borderRight: openLeft
                    ? isHovered
                        ? isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)"
                        : "none"
                    : "none",
            }}
        >
            {/* Glow background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: isDark
                        ? "radial-gradient(ellipse at top left, rgba(239,68,68,0.08) 0%, transparent 65%)"
                        : "radial-gradient(ellipse at top left, rgba(239,68,68,0.04) 0%, transparent 65%)",
                    opacity: isHovered ? 1 : 0,
                    transition: `opacity ${duration}ms ease`,
                }}
            />

            {/* Content wrapper */}
            <div
                className="min-w-0 relative z-10 flex flex-col h-full"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered
                        ? "translateX(0)"
                        : openLeft
                            ? `translateX(${contentSlide})`
                            : `translateX(-${contentSlide})`,
                    transition: `
                        opacity   ${duration * 0.6}ms ease ${isHovered ? "120ms" : "0ms"},
                        transform ${duration * 0.6}ms cubic-bezier(0.4,0,0.2,1) ${isHovered ? "100ms" : "0ms"}
                    `,
                }}
            >
                {/* Judul dengan Tracking-Tight */}
                <h3
                    className={`font-bold leading-tight line-clamp-2 wrap-break-word tracking-tight ${isDark ? "text-zinc-50" : "text-zinc-900"
                        }`}
                    style={{
                        fontSize: titleSize,
                        marginBottom: sectionGap,
                    }}
                >
                    {anime.title}
                </h3>

                {/* Genre & Tahun */}
                <div className="flex items-center gap-1.5 truncate" style={{ marginBottom: sectionGap }}>
                    <p className={`font-bold tracking-wide ${isDark ? "text-red-400" : "text-red-500"}`} style={{ fontSize: genreSize }}>
                        {anime.genre}
                    </p>
                    <span className={`w-1 h-1 rounded-full shrink-0 ${isDark ? "bg-zinc-700" : "bg-zinc-300"}`} />
                    <p className={`font-semibold tracking-wide shrink-0 ${isDark ? "text-zinc-400" : "text-zinc-500"}`} style={{ fontSize: genreSize }}>
                        {anime.year || "2024"}
                    </p>
                </div>

                {/* Sinopsis (Diaktifkan untuk semua layar dengan batasan line-clamp ketat) */}
                <p
                    className={`leading-relaxed wrap-break-word ${isDark ? "text-zinc-300" : "text-zinc-600"}`}
                    style={{
                        fontSize: synopsisSize,
                        display: "-webkit-box",
                        WebkitLineClamp: synopsisClamp,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        marginBottom: sectionGap,
                    }}
                >
                    {stripHtml(anime.synopsis) || "Sinopsis belum tersedia..."}
                </p>

                {/* Divider Memudar (Gradient) */}
                <div
                    className={`h-[1px] w-full ${isDark ? "from-transparent via-zinc-800/80 to-transparent" : "from-transparent via-zinc-200/80 to-transparent"
                        } bg-gradient-to-r`}
                    style={{ marginBottom: sectionGap }}
                />

                {/* Meta Info */}
                <AnimeMeta anime={anime} isDark={isDark} bp={bp} metaSize={metaSize} />

                {/* Divider Memudar (Gradient) */}
                <div
                    className={`h-[1px] w-full ${isDark ? "from-transparent via-zinc-800/80 to-transparent" : "from-transparent via-zinc-200/80 to-transparent"
                        } bg-gradient-to-r`}
                    style={{ marginBottom: sectionGap }}
                />

                {/* Tombol Utama - Dikunci di dasar kartu menggunakan mt-auto */}
                <div className="mt-auto">
                    <AnimeCardButtons
                        anime={anime}
                        isHovered={isHovered}
                        isDark={isDark}
                        isMobile={bp.isMobile}
                        onPlay={onPlay}
                        isBookmarked={isBookmarked}
                        onToggleBookmark={onToggleBookmark}
                    />
                </div>
            </div>
        </div>
    );
}

// ─── Sub-component: Meta Info ─────────────────────────────────────────────────
function AnimeMeta({ anime, isDark, bp, metaSize }) {
    const allItems = [
        { label: "Studio", value: anime.studio || "Unknown" },
        { label: "Season", value: anime.season || "Spring" },
        { label: "Durasi", value: anime.duration || "24 min" },
        { label: "Kualitas", value: "HD", isHighlight: true },
    ];

    // PERBAIKAN METADATA: Tampilkan data secara lengkap untuk memberikan visual penuh layaknya desktop
    const displayItems = allItems;

    const rowGap = bp.isXs ? "2px" : bp.isSm ? "4px" : "5px";

    return (
        <div
            className="min-w-0"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: rowGap,
                marginBottom: bp.isXs ? "2px" : "6px",
                fontSize: metaSize,
            }}
        >
            {displayItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-1 min-w-0">
                    <span
                        className="shrink-0"
                        style={{
                            color: isDark ? "rgba(156,163,175,0.7)" : "rgba(107,114,128,1)",
                        }}
                    >
                        {item.label}
                    </span>

                    {/* Garis putus-putus tipis */}
                    <span
                        className="flex-1 mx-1"
                        style={{
                            borderBottom: `1px dashed ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                            minWidth: "8px",
                            marginBottom: "2px",
                        }}
                    />

                    {/* Badge berpendar untuk HD */}
                    {item.isHighlight ? (
                        <span
                            className="font-black shrink-0 text-right text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        >
                            {item.value}
                        </span>
                    ) : (
                        <span
                            className="font-semibold shrink-0 text-right truncate max-w-[50px] sm:max-w-none"
                            style={{
                                color: isDark ? "#f4f4f5" : "#27272a",
                            }}
                        >
                            {item.value}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}