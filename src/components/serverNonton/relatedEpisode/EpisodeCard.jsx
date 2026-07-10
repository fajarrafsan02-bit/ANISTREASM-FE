import { useTheme } from "../../../context/ThemeContext";
import { getEpisodeBadge, cleanEpisodeTitle } from "../../../utils/relatedUtils";

export default function EpisodeCard({
    ep,
    index,
    isActive,
    handleEpisodeClick,
    setHoveredIndex,
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const epBadge = getEpisodeBadge(ep.title);
    const cleanTitle = cleanEpisodeTitle(ep.title);

    return (
        <div
            data-active={isActive}
            onClick={() => handleEpisodeClick(ep.title)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative flex-none group/ep cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "scale-[1.02] z-10" : "scale-100 hover:z-10"
                }`}
            style={{ width: "clamp(8.1rem, 41vw, 11rem)" }}
        >
            {/* NEON BREATHING GLOW ── Denyut pendar ganda yang sangat halus untuk kartu aktif */}
            {isActive && (
                <div
                    className={`absolute -inset-1 rounded-xl -z-10 opacity-70 animate-[pulse_3s_infinite] ${isDark
                        ? "shadow-[0_0_20px_rgba(255,30,86,0.35),0_0_40px_rgba(255,30,86,0.15)]"
                        : "shadow-[0_0_20px_rgba(244,63,94,0.25),0_0_40px_rgba(244,63,94,0.1)]"
                        }`}
                />
            )}

            <div
                className={`relative w-full aspect-16/10 rounded-xl overflow-hidden border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                    ? isDark
                        ? "border-[#ff1e56]/80 shadow-[inset_0_0_20px_rgba(255,30,86,0.2),0_0_14px_rgba(255,30,86,0.25)]"
                        : "border-rose-400/80 shadow-[inset_0_0_20px_rgba(244,63,94,0.15),0_0_14px_rgba(244,63,94,0.2)]"
                    : isDark
                        ? "border-white/[0.06] shadow-[0_6px_18px_rgba(0,0,0,0.42)] group-hover/ep:border-[#ff1e56]/45 group-hover/ep:shadow-[0_12px_28px_rgba(255,30,86,0.15)]"
                        : "border-slate-200/80 shadow-[0_6px_18px_rgba(148,163,184,0.12)] group-hover/ep:border-rose-300/80 group-hover/ep:shadow-[0_12px_28px_rgba(244,63,94,0.15)]"
                    }`}
            >
                {/* DIAGONAL HOLOGRAPHIC SHEEN ── Efek kilau menyapu saat di-hover */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover/ep:translate-x-full transition-transform duration-[1.2s] ease-out z-15 pointer-events-none" />

                {/* NOW RADAR BADGE ── Denyut pendar ganda hijau/merah premium */}
                {isActive && (
                    <span
                        className={`absolute top-2 left-2 backdrop-blur-md border text-white text-[6px] sm:text-[7px] font-black px-2 py-0.5 rounded-md tracking-wider uppercase z-20 shadow-md flex items-center gap-1.5 ${isDark
                            ? "bg-[#ff1e56]/90 border-[#ff1e56]/50"
                            : "bg-rose-500/90 border-rose-300/50"
                            }`}
                    >
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                        </span>
                        NOW
                    </span>
                )}

                {/* EP BADGE ── Luxury glassmorphic tag */}
                {!isActive && (
                    <span
                        className={`absolute top-2 left-2 backdrop-blur-md border text-[6px] sm:text-[7px] font-black px-2 py-0.5 rounded-md tracking-wider uppercase z-20 shadow-md ${isDark
                            ? "bg-neutral-950/70 border-white/[0.08] text-neutral-300"
                            : "bg-white/90 border-slate-200/60 text-slate-600"
                            }`}
                    >
                        {epBadge}
                    </span>
                )}

                {/* DURATION BADGE */}
                {ep.duration && (
                    <span
                        className={`absolute top-2 right-2 backdrop-blur-md text-[6px] sm:text-[7px] font-extrabold px-2 py-0.5 rounded-md z-20 border tracking-wider flex items-center gap-1 ${isDark
                            ? "bg-neutral-950/70 text-slate-300 border-white/[0.05]"
                            : "bg-white/90 text-slate-600 border-slate-200/60"
                            }`}
                    >
                        <i className="fa-regular fa-clock text-[6px] sm:text-[7.5px]" />
                        {ep.duration}
                    </span>
                )}

                {/* Thumbnail dengan Ken-burns zoom halus */}
                {ep.poster ? (
                    <img
                        src={ep.poster}
                        alt={ep.title}
                        className={`w-full h-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                            ? "scale-105 brightness-[0.70] contrast-[1.05]"
                            : "group-hover/ep:scale-[1.08] group-hover/ep:brightness-[0.75] group-hover/ep:contrast-[1.02]"
                            }`}
                        loading="lazy"
                    />
                ) : (
                    <div
                        className={`w-full h-full flex items-center justify-center ${isDark
                            ? "bg-linear-to-br from-[#1a0a0f] to-[#0d0407]"
                            : "bg-linear-to-br from-slate-100 to-slate-200"
                            }`}
                    >
                        <i
                            className={`fa-solid fa-film text-lg ${isDark ? "text-slate-700" : "text-slate-400"
                                }`}
                        />
                    </div>
                )}

                {/* Gradient overlay */}
                <div
                    className={`absolute inset-0 bg-linear-to-t transition-opacity duration-500 ${isDark
                        ? "from-neutral-950 via-neutral-900/30 to-transparent"
                        : "from-white/95 via-white/20 to-transparent"
                        } ${isActive ? "opacity-100" : "opacity-75 group-hover/ep:opacity-100"
                        }`}
                />

                {/* Release date overlay */}
                <div
                    className={`absolute bottom-2 right-2 backdrop-blur-sm text-[6px] sm:text-[7px] font-mono font-black px-2 py-0.5 rounded-md z-10 border flex items-center gap-1 ${isDark
                        ? "bg-black/55 text-slate-400 border-white/[0.05]"
                        : "bg-white/80 text-slate-500 border-slate-200"
                        }`}
                >
                    <i className="fa-regular fa-calendar text-[6px] sm:text-[7px]" />
                    {ep.releaseDate}
                </div>

                {/* PLAY BUTTON HALO EFFECT */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${isActive
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75 group-hover/ep:opacity-100 group-hover/ep:scale-100"
                        }`}
                >
                    <div className="relative group/play">
                        {/* Glow halo */}
                        <div className="absolute inset-0 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#ff1e56]/30 blur-md group-hover/play:scale-135 transition-transform duration-500 animate-pulse" />
                        <div
                            className={`absolute -inset-1 rounded-full border backdrop-blur-[3px] transition-transform duration-500 group-hover/play:scale-115 ${isDark ? "border-white/15" : "border-white/40"
                                }`}
                        />
                        <div
                            className={`relative w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-linear-to-br from-[#ff1e56] to-[#c4143a] flex items-center justify-center transition-all duration-300 shadow-xl ${isActive
                                ? "shadow-[#ff1e56]/40"
                                : "shadow-black/60 group-hover/play:shadow-[#ff1e56]/50"
                                }`}
                        >
                            <i className="fa-solid fa-play text-white text-[8px] sm:text-[11px] ml-0.5 transition-transform duration-300 group-hover/play:scale-110" />
                        </div>
                    </div>
                </div>

                {/* Watermark EP Number */}
                <div
                    className={`absolute bottom-1 left-2 text-3xl sm:text-4xl font-extrabold z-5 select-none pointer-events-none leading-none tracking-tighter ${isDark ? "text-white/[0.025]" : "text-slate-900/[0.045]"
                        }`}
                >
                    {epBadge.replace("EP ", "")}
                </div>
            </div>

            {/* Info section */}
            <div className="mt-2.5 flex items-center justify-between px-0.5">
                <div className="min-w-0 flex-1 pr-1.5">
                    <h4
                        className={`font-black text-[10px] sm:text-[11px] leading-snug tracking-wide truncate transition-colors duration-300 ${isActive
                            ? "text-[#ff1e56]"
                            : isDark
                                ? "text-slate-100 group-hover/ep:text-white"
                                : "text-slate-700 group-hover/ep:text-slate-900"
                            }`}
                    >
                        {cleanTitle}
                    </h4>

                    <div className="flex items-center gap-1.5 mt-1.5">
                        <span
                            className={`inline-block w-1.5 h-1.5 rounded-full ${isActive
                                ? "bg-[#ff1e56] animate-pulse shadow-[0_0_6px_#ff1e56]"
                                : isDark
                                    ? "bg-neutral-600"
                                    : "bg-slate-300"
                                }`}
                        />
                        <span
                            className={`text-[8.5px] font-extrabold tracking-wider uppercase ${isDark ? "text-neutral-500" : "text-slate-400"
                                }`}
                        >
                            {ep.releaseDate}
                        </span>
                    </div>
                </div>

                {/* Small premium play icon */}
                <div
                    className={`shrink-0 transition-all duration-500 ${isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-1.5 group-hover/ep:opacity-100 group-hover/ep:translate-x-0"
                        }`}
                >
                    <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive
                            ? "bg-[#ff1e56]/20 border border-[#ff1e56]/50 shadow-[0_0_8px_rgba(255,30,86,0.2)]"
                            : isDark
                                ? "bg-white/[0.04] border border-white/10 hover:bg-[#ff1e56]/25 hover:border-[#ff1e56]/40"
                                : "bg-slate-50 border border-slate-200/80 hover:bg-rose-50 hover:border-rose-400"
                            }`}
                    >
                        <i
                            className={`fa-solid fa-play text-[6px] ml-0.5 ${isActive
                                ? "text-[#ff1e56]"
                                : isDark
                                    ? "text-neutral-400 group-hover/ep:text-[#ff1e56]"
                                    : "text-slate-400 group-hover/ep:text-rose-500"
                                }`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}