import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function ScheduleCard({ anime }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [timeLeft, setTimeLeft] = useState(anime.airingInSeconds);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatCountdown = (s) => {
        if (s <= 0) return { label: "NOW AIRING", parts: null };
        const d = Math.floor(s / 86400);
        const h = Math.floor((s % 86400) / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = Math.floor(s % 60);
        return {
            label: "COMING SOON",
            parts: [
                { value: d, unit: "D" },
                { value: h, unit: "H" },
                { value: m, unit: "M" },
                { value: sec, unit: "S" },
            ]
        };
    };

    const countdown = formatCountdown(timeLeft);
    const isAired = timeLeft <= 0;

    const genres = (Array.isArray(anime.genres)
        ? anime.genres
        : typeof anime.genres === "string"
            ? anime.genres.split(",").map((g) => g.trim()).filter(Boolean)
            : []
    ).slice(0, 3);

    return (
        <article className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer
            ${isDark
                ? 'bg-linear-to-b from-[#15080d] via-[#0d0407] to-[#0a0305] border border-[#2a1117]/40 hover:border-[#ff1e56]/30'
                : 'bg-white border border-slate-200/60 hover:border-rose-200'
            }
            hover:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.3)] sm:hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] 
            hover:-translate-y-1 sm:hover:-translate-y-2
        `}>
            {/* Ambient glow */}
            <div className={`absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10
                ${isDark ? 'bg-[#ff1e56]/8' : 'bg-rose-400/8'}`}
            />

            {/* ═══ COVER SECTION ═══ */}
            <div className="relative w-full aspect-16/9 overflow-hidden">
                {/* Image */}
                <img
                    alt={anime.title}
                    src={anime.poster}
                    className="w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-110"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    ${isDark ? 'bg-[#ff1e56]/5' : 'bg-rose-500/3'}`}
                />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]" />

                {/* Shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                    <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.2s] ease-in-out
                        ${isDark ? 'bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-12' : 'bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12'}`}
                    />
                </div>

                {/* ══ TOP BADGES ROW (Dioptimalkan jaraknya agar tidak menabrak batas kartu) ══ */}
                <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 z-10 flex items-start justify-between gap-1.5">
                    {/* Status */}
                    <div className={`flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-xl border
                        ${isDark ? 'bg-black/40 border-white/8' : 'bg-white/70 border-white/30'}`}
                    >
                        <span className={`relative flex h-1.5 w-1.5`}>
                            {!isAired && (
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-[#ff1e56]' : 'bg-rose-500'}`} />
                            )}
                            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isAired ? 'bg-emerald-400' : isDark ? 'bg-[#ff1e56]' : 'bg-rose-500'}`} />
                        </span>
                        <span className={`text-[7px] min-[360px]:text-[8px] font-black uppercase tracking-widest ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                            {isAired ? 'NOW AIRING' : 'UPCOMING'}
                        </span>
                    </div>

                    {/* Score */}
                    {anime.score && (
                        <div className={`flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg backdrop-blur-xl border
                            ${isDark ? 'bg-amber-500/15 border-amber-500/20' : 'bg-amber-50/80 border-amber-200'}`}
                        >
                            <span className="text-amber-400 text-[8px] sm:text-[9px]">★</span>
                            <span className={`font-black text-[9px] min-[360px]:text-[10px] sm:text-[11px] leading-none ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                                {anime.score}
                            </span>
                        </div>
                    )}
                </div>

                {/* ══ BOTTOM GENRES ══ */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 z-10">
                    <div className="flex flex-wrap gap-1">
                        {genres.map((g) => (
                            <span key={g} className={`px-1.5 py-[1.5px] sm:px-2 sm:py-[2px] rounded-md text-[7px] min-[360px]:text-[8px] font-black uppercase tracking-wider backdrop-blur-md border
                                ${isDark
                                    ? 'bg-[#ff1e56]/15 text-[#ff1e56] border-[#ff1e56]/25'
                                    : 'bg-rose-50 text-rose-600 border-rose-200'
                                }`}
                            >
                                {g}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ INFO SECTION ═══ */}
            <div className="p-2 sm:p-3 flex flex-col gap-2 relative">

                {/* Decorative line */}
                <div className={`absolute top-0 left-3 right-3 h-px 
                    ${isDark ? 'bg-linear-to-r from-transparent via-[#ff1e56]/15 to-transparent' : 'bg-linear-to-r from-transparent via-slate-200 to-transparent'}`}
                />

                {/* Title */}
                <h3 className={`font-black text-[11px] min-[360px]:text-[12px] sm:text-[13px] leading-snug line-clamp-2 transition-colors duration-300
                    ${isDark ? 'text-slate-100 group-hover:text-white' : 'text-slate-800'}`}
                >
                    {anime.title}
                </h3>

                {/* Countdown (Dioptimalkan padding & isinya agar muat di semua layar mobile) */}
                <div className={`relative rounded-xl border p-2 sm:p-2.5 overflow-hidden
                    ${isAired
                        ? isDark ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-200'
                        : isDark
                            ? 'bg-[#ff1e56]/5 border-[#ff1e56]/15'
                            : 'bg-rose-50 border-rose-200'
                    }`}
                >
                    {!isAired && isDark && (
                        <div className="absolute -right-3 -top-3 w-12 h-12 bg-[#ff1e56]/8 blur-xl rounded-full" />
                    )}

                    {/* Header row */}
                    <div className="flex items-center justify-between relative z-10 mb-1.5 sm:mb-2">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center border
                                ${isAired
                                    ? isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-100 border-emerald-200'
                                    : isDark ? 'bg-[#ff1e56]/10 border-[#ff1e56]/20' : 'bg-rose-100 border-rose-200'
                                }`}
                            >
                                <i className={`fa-solid fa-clock text-[6px] sm:text-[7px] ${isAired ? 'text-emerald-400' : isDark ? 'text-[#ff1e56]' : 'text-rose-500'}`} />
                            </div>
                            <span className={`text-[7px] min-[360px]:text-[8px] font-black uppercase tracking-[0.12em] sm:tracking-[0.15em]
                                ${isAired ? 'text-emerald-400' : isDark ? 'text-slate-500' : 'text-slate-400'}`}
                            >
                                {countdown.label}
                            </span>
                        </div>
                    </div>

                    {/* Countdown digits - Diskalakan khusus untuk mencegah layout rusak di mobile */}
                    {countdown.parts ? (
                        <div className="flex items-center justify-center gap-0.5 sm:gap-1 relative z-10">
                            {countdown.parts.map((part, i) => (
                                <div key={part.unit} className="flex items-center gap-0.5 sm:gap-1">
                                    <div className={`flex flex-col items-center px-1 py-0.5 sm:px-1.5 sm:py-1 rounded-lg border min-w-[24px] min-[360px]:min-w-[28px] sm:min-w-[32px]
                                        ${isDark
                                            ? 'bg-[#13080c]/80 border-[#2a1117]/60'
                                            : 'bg-white border-slate-200'
                                        }`}
                                    >
                                        <span className={`font-mono font-black text-xs min-[360px]:text-[13px] sm:text-sm leading-none
                                            ${isDark ? 'text-[#ff1e56]' : 'text-rose-600'}`}
                                        >
                                            {String(part.value).padStart(2, '0')}
                                        </span>
                                        <span className={`text-[4px] min-[360px]:text-[5px] font-bold uppercase tracking-wider mt-0.5
                                            ${isDark ? 'text-slate-600' : 'text-slate-400'}`}
                                        >
                                            {part.unit}
                                        </span>
                                    </div>
                                    {i < countdown.parts.length - 1 && (
                                        <span className={`font-black text-[8px] sm:text-[10px] ${isDark ? 'text-[#ff1e56]/50' : 'text-rose-300'}`}>:</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 sm:gap-2 relative z-10">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-400">
                                Episode tersedia sekarang
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Corner accents */}
            <div className={`absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 rounded-tl-2xl transition-all duration-500 opacity-0 group-hover:opacity-100
                ${isDark ? 'border-[#ff1e56]/20' : 'border-rose-300/30'}`}
            />
            <div className={`absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 rounded-tr-2xl transition-all duration-500 opacity-0 group-hover:opacity-100
                ${isDark ? 'border-[#ff1e56]/20' : 'border-rose-300/30'}`}
            />
        </article>
    );
}