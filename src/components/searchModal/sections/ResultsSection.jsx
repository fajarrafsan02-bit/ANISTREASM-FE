import { TrendingUp, X } from "lucide-react";
import AnimeItem from "../components/AnimeItem";

export default function ResultsSection({ isDark, results, query, onSelectAnime, onClose }) {
    return (
        <div className="flex flex-col min-h-0 flex-1 relative">
            <div
                className={`relative flex items-center justify-between px-4 sm:px-5 py-3 border-b shrink-0 ${isDark ? "border-[#2a1117]/60" : "border-slate-100"}`}
            >
                <div className="flex items-center gap-2 min-w-0">
                    <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "bg-[#ff1e56]/10 border border-[#ff1e56]/20" : "bg-rose-50 border border-rose-200"}`}
                    >
                        <TrendingUp
                            className={`w-3.5 h-3.5 ${isDark ? "text-[#ff1e56]" : "text-rose-500"}`}
                        />
                    </div>
                    <div className="min-w-0">
                        <p
                            className={`text-xs font-black uppercase tracking-wider truncate ${isDark ? "text-slate-200" : "text-slate-800"}`}
                        >
                            {results.length} Hasil Ditemukan
                        </p>
                        <p
                            className={`text-[9px] font-medium truncate ${isDark ? "text-slate-600" : "text-slate-400"}`}
                        >
                            untuk &ldquo;{query}&rdquo;
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className={`
                        p-2 rounded-xl transition-all duration-200 active:scale-90 shrink-0 ml-2
                        ${isDark
                            ? "hover:bg-white/5 text-slate-500 hover:text-slate-300"
                            : "hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                        }
                    `}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <ul className="overflow-y-auto flex-1 overscroll-contain py-1">
                {results.map((anime, i) => (
                    <li key={anime.animeId ?? i} className="px-2 block">

                        <AnimeItem
                            anime={anime}
                            isDark={isDark}
                            onClick={() => onSelectAnime(anime)}
                        />

                        {i < results.length - 1 && (
                            <div
                                className={`mx-4 h-px ${isDark ? "bg-white/[0.03]" : "bg-slate-50"}`}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}