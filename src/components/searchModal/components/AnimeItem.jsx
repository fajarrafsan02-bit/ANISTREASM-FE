import { TYPE_ICON, TYPE_GRADIENT } from "../constants";

export default function AnimeItem({ anime, isDark, onClick }) {
    const TypeIcon = TYPE_ICON[anime.type] ?? TYPE_ICON.Special;
    const typeStyle = TYPE_GRADIENT[anime.type] ?? TYPE_GRADIENT.Special;

    return (
        <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            className={`
                w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 text-left rounded-xl
                transition-all duration-200 hover:scale-[1.01]
                ${isDark
                    ? "hover:bg-white/[0.03] active:bg-white/[0.06]"
                    : "hover:bg-slate-50 active:bg-slate-100"
                }
            `}
        >
            <div
                className={`shrink-0 w-11 h-[58px] sm:w-12 sm:h-16 rounded-xl overflow-hidden border shadow-md ${isDark ? "border-white/5" : "border-slate-200"}`}
            >
                {anime.poster ? (
                    <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div
                        className={`w-full h-full flex items-center justify-center ${isDark ? "bg-zinc-800" : "bg-slate-100"}`}
                    >
                        <TypeIcon
                            className={`w-4 h-4 ${isDark ? "text-slate-600" : "text-slate-400"}`}
                        />
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0 overflow-hidden">
                <p
                    className={`text-[13px] font-black truncate leading-snug ${isDark ? "text-slate-100" : "text-slate-800"}`}
                >
                    {anime.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border bg-linear-to-r ${typeStyle}`}
                    >
                        <TypeIcon className="w-2.5 h-2.5" />
                        {anime.type}
                    </span>
                    {anime.score && (
                        <span
                            className={`flex items-center gap-0.5 text-[10px] font-bold ${isDark ? "text-amber-400" : "text-amber-600"}`}
                        >
                            <span className="text-amber-400">★</span>
                            {anime.score}
                        </span>
                    )}
                </div>
                {anime.genres && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                        {anime.genres.slice(0, 3).map((genre) => (
                            <span
                                key={genre}
                                className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold ${isDark ? "bg-white/[0.04] text-slate-500 border border-white/5" : "bg-slate-100 text-slate-500 border border-slate-200"}`}
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </button>
    );
}
