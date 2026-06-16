import { useTheme } from '../../context/ThemeContext';

export default function MovieCard({ anime, variant = 'default', onClick }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const isRecent = variant === 'recent';

    const isOngoing = anime.status === 'Ongoing' || anime.status === 'Berjalan';
    const statusLabel = isOngoing ? 'Ongoing' : 'Selesai';

    const fullStars = Math.floor((anime.score || 0) / 2);
    const hasHalfStar = ((anime.score || 0) / 2) % 1 >= 0.5;

    const formatRecentTime = (text = '') => {
        return text
            .replace(/seconds yang lalu/g, 'DETIK')
            .replace(/second yang lalu/g, 'DETIK')
            .replace(/minuts yang lalu/g, 'MENIT')
            .replace(/minute yang lalu/g, 'MENIT')
            .replace(/hours yang lalu/g, 'JAM')
            .replace(/hour yang lalu/g, 'JAM')
            .replace(/days yang lalu/g, 'HARI')
            .replace(/day yang lalu/g, 'HARI');
    };

    const recentLabel = anime.releasedOn ? formatRecentTime(anime.releasedOn) : '';

    return (
        <article
            // 1. Hapus event onClick dari sini dan ubah 'cursor-pointer' menjadi 'cursor-default'
            className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 cursor-default
                ${isDark
                    ? 'bg-gradient-to-b from-[#15080d] via-[#0d0407] to-[#0a0305] border border-[#2a1117]/50 hover:border-[#ff1e56]/40'
                    : 'bg-gradient-to-b from-white via-white to-slate-50/80 border border-slate-200/80 hover:border-rose-300/70'
                }
                hover:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.3)] sm:hover:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.3)] 
                hover:-translate-y-1 sm:hover:-translate-y-2.5
            `}
        >
            {/* Ambient glow behind */}
            <div
                className={`absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10
                ${isDark ? 'bg-[#ff1e56]/10' : 'bg-rose-400/10'}`}
            />

            {/* ── COVER SECTION ── */}
            <div className={`relative w-full overflow-hidden ${isRecent ? 'aspect-[3/4]' : 'aspect-[2/3]'}`}>
                {/* Image with Ken Burns */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-[1.2s] ease-out group-hover:scale-110 group-hover:brightness-110"
                    style={{ backgroundImage: `url('${anime.poster}')` }}
                />

                {/* Multi-layer cinematic gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff1e56]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)]" />

                {/* Shimmer / gleam effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30 overflow-hidden">
                    <div
                        className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.2s] ease-in-out skew-x-12
                        ${isDark
                                ? 'bg-gradient-to-r from-transparent via-white/8 to-transparent'
                                : 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
                            }`}
                    />
                </div>

                {/* Subtle pulse glow on hover */}
                <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20
                    ${isDark ? 'bg-[#ff1e56]/5' : 'bg-rose-400/5'}`}
                />

                {/* ── TOP BADGES ── */}
                <div className="absolute top-1.5 left-1.5 right-1.5 sm:top-2 sm:left-2 sm:right-2 z-10 flex items-start justify-between gap-1.5">
                    {/* Status */}
                    <div
                        className={`flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-xl border shrink-0 max-w-[58%]
                        ${isDark ? 'bg-black/40 border-white/8' : 'bg-white/70 border-white/30'}`}
                    >
                        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                            <span
                                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOngoing ? 'bg-emerald-400' : 'bg-rose-400'
                                    }`}
                            />
                            <span
                                className={`relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 ${isOngoing ? 'bg-emerald-400' : 'bg-rose-400'
                                    }`}
                            />
                        </span>
                        <span
                            className={`text-[7px] min-[360px]:text-[8px] sm:text-[10px] font-black uppercase tracking-wider whitespace-nowrap truncate ${isDark ? 'text-slate-200' : 'text-slate-800'
                                }`}
                        >
                            {statusLabel}
                        </span>
                    </div>

                    {/* Recent label / score */}
                    {isRecent && recentLabel ? (
                        <div
                            className={`px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-xl border text-[7px] min-[360px]:text-[8px] sm:text-[10px] font-black uppercase tracking-wider whitespace-nowrap shrink-0 max-w-[42%] truncate
                            ${isDark ? 'bg-black/40 border-white/8 text-slate-300' : 'bg-white/70 border-white/30 text-slate-600'}`}
                            title={recentLabel}
                        >
                            {recentLabel}
                        </div>
                    ) : !isRecent && anime.score ? (
                        <div
                            className={`flex flex-col items-center px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-xl backdrop-blur-xl border gap-0.5 shrink-0
                            ${isDark ? 'bg-black/40 border-amber-500/20' : 'bg-white/70 border-amber-200'}`}
                        >
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-[7px] min-[360px]:text-[8px] sm:text-[9px] ${i < fullStars
                                            ? 'text-amber-400'
                                            : i === fullStars && hasHalfStar
                                                ? 'text-amber-400/60'
                                                : 'text-slate-600/50'
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className={`font-black text-[9px] min-[360px]:text-[10px] sm:text-[11px] leading-none ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                                {anime.score}
                            </span>
                        </div>
                    ) : null}
                </div>

                {/* ── BOTTOM OVERLAY ── */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 z-10">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                            {anime.type && (
                                <span
                                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[8px] min-[360px]:text-[9px] font-black uppercase tracking-wider backdrop-blur-md border
                                    ${isDark
                                            ? 'bg-[#ff1e56]/20 text-[#ff1e56] border-[#ff1e56]/30'
                                            : 'bg-rose-50 text-rose-600 border-rose-200'
                                        }`}
                                >
                                    {anime.type}
                                </span>
                            )}
                            {isRecent && anime.episodes && (
                                <span
                                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[8px] min-[360px]:text-[9px] font-black uppercase tracking-wider backdrop-blur-md border
                                    ${isDark
                                            ? 'bg-white/5 text-slate-400 border-white/10'
                                            : 'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}
                                >
                                    EP {anime.episodes}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Progress bar */}
                    {isOngoing && anime.currentEpisode && anime.totalEpisodes && (
                        <div className="w-full">
                            <div className="flex items-center justify-between text-[7px] min-[360px]:text-[8px] font-bold uppercase tracking-wider mb-1 text-slate-400">
                                <span>Progress</span>
                                <span>{anime.currentEpisode} / {anime.totalEpisodes}</span>
                            </div>
                            <div className="w-full h-1 bg-black/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#ff1e56] to-rose-400 rounded-full transition-all duration-1000"
                                    style={{ width: `${(anime.currentEpisode / anime.totalEpisodes) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── INFO SECTION ── */}
            <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2 sm:gap-3 relative">
                {/* Decorative top line */}
                <div
                    className={`absolute top-0 left-4 right-4 sm:left-5 sm:right-5 h-px
                    ${isDark ? 'bg-gradient-to-r from-transparent via-[#ff1e56]/20 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'}`}
                />

                {/* Genres */}
                {!isRecent && anime.genres?.length > 0 && (
                    <div className="flex items-center flex-wrap gap-x-1.5 sm:gap-x-2 gap-y-1">
                        {anime.genres.slice(0, 3).map((genre, i, arr) => (
                            <span key={genre} className="flex items-center gap-1 sm:gap-2">
                                <span
                                    className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest
                                    ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
                                >
                                    {genre}
                                </span>
                                {i < arr.length - 1 && (
                                    <span className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${isDark ? 'bg-[#2a1117]' : 'bg-slate-300'}`} />
                                )}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h3
                    className={`font-black text-[11px] min-[360px]:text-[12px] sm:text-[13px] leading-snug line-clamp-2 transition-all duration-300
                    ${isDark
                            ? 'text-slate-100 group-hover:text-white'
                            : 'text-slate-800 group-hover:text-slate-900'
                        }`}
                >
                    {anime.title}
                </h3>

                {/* Meta info */}
                <div className="flex items-center gap-2 sm:gap-3 mt-auto">
                    {!isRecent && anime.year && (
                        <span className={`text-[8px] sm:text-[9px] font-bold ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                            {anime.year}
                        </span>
                    )}
                    {!isRecent && anime.duration && (
                        <span className={`flex items-center gap-1 text-[8px] sm:text-[9px] font-bold ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                            <span className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                            {anime.duration}
                        </span>
                    )}
                    {!isRecent && anime.totalEpisodes && (
                        <span className={`flex items-center gap-1 text-[8px] sm:text-[9px] font-bold ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                            <span className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                            {anime.totalEpisodes} EP
                        </span>
                    )}
                </div>

                {/* CTA Button */}
                <button
                    // 2. Pasang event onClick murni di sini
                    onClick={onClick}
                    className={`relative w-full py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-black text-[8px] min-[360px]:text-[9px] sm:text-[10px] uppercase tracking-[0.1em] min-[360px]:tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 overflow-hidden group/btn mt-1 cursor-pointer
                    ${isDark
                            ? 'bg-gradient-to-r from-[#1a0a10] to-[#13080c] border border-[#2a1117] text-[#ff1e56] hover:border-[#ff1e56]/50'
                            : 'bg-gradient-to-r from-slate-50 to-white border border-slate-200 text-slate-700 hover:border-rose-300'
                        }`}
                >
                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
                        {isRecent ? 'Tonton Sekarang' : 'Lihat Detail'}
                    </span>

                    <span className="relative z-10 flex items-center overflow-hidden w-0 group-hover/btn:w-4 transition-all duration-500">
                        <svg className="w-3 h-3 transform -translate-x-4 group-hover/btn:translate-x-0 transition-transform duration-500 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>

                    <span
                        className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500
                        ${isDark ? 'bg-gradient-to-r from-[#ff1e56] to-rose-600' : 'bg-gradient-to-r from-slate-800 to-slate-900'}`}
                    />
                </button>
            </div>

            {/* ── CORNER ACCENTS ── */}
            <div
                className={`absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 rounded-tl-[14px] sm:rounded-tl-2xl transition-all duration-500 opacity-50 group-hover:opacity-100 group-hover:w-6 sm:group-hover:w-8 group-hover:h-6 sm:group-hover:h-8
                ${isDark ? 'border-[#ff1e56]/30' : 'border-rose-300/40'}`}
            />
            <div
                className={`absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-t-2 rounded-tr-[14px] sm:rounded-tr-2xl transition-all duration-500 opacity-50 group-hover:opacity-100 group-hover:w-6 sm:group-hover:w-8 group-hover:h-6 sm:group-hover:h-8
                ${isDark ? 'border-[#ff1e56]/30' : 'border-rose-300/40'}`}
            />
            <div
                className={`absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-b-2 rounded-bl-[14px] sm:rounded-bl-2xl transition-all duration-500 opacity-50 group-hover:opacity-100 group-hover:w-6 sm:group-hover:w-8 group-hover:h-6 sm:group-hover:h-8
                ${isDark ? 'border-[#ff1e56]/30' : 'border-rose-300/40'}`}
            />
            <div
                className={`absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 rounded-br-[14px] sm:rounded-br-2xl transition-all duration-500 opacity-50 group-hover:opacity-100 group-hover:w-6 sm:group-hover:w-8 group-hover:h-6 sm:group-hover:h-8
                ${isDark ? 'border-[#ff1e56]/30' : 'border-rose-300/40'}`}
            />

            {/* ── SIDE GLOW LINES ── */}
            <div
                className={`absolute top-1/4 -left-px w-px h-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100
                ${isDark ? 'bg-gradient-to-b from-transparent via-[#ff1e56]/50 to-transparent' : 'bg-gradient-to-b from-transparent via-rose-400/30 to-transparent'}`}
            />
            <div
                className={`absolute top-1/4 -right-px w-px h-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100
                ${isDark ? 'bg-gradient-to-b from-transparent via-[#ff1e56]/50 to-transparent' : 'bg-gradient-to-b from-transparent via-rose-400/30 to-transparent'}`}
            />

            {/* ── BOTTOM AMBIENT ── */}
            <div
                className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 blur-3xl rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none
                ${isDark ? 'bg-[#ff1e56]/20' : 'bg-rose-400/20'}`}
            />
        </article>
    );
}