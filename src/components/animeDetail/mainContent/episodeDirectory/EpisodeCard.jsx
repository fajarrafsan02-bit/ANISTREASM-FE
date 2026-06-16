import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";

// ✅ Fungsi pembantu untuk memotong nama episode agar bersih di badge kartu
const extractEpisodeNumber = (title) => {
    if (!title) return "";
    const match = title.match(/episode\s*(\d+)/i);
    if (match) return match[1];
    const fallback = title.match(/\d+/);
    if (fallback) return fallback[0];
    return title;
};

export default function EpisodeCard({ episode, poster, duration }) {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // ✅ Menggunakan fungsi ekstraksi nomor yang baru
    const epNumber = extractEpisodeNumber(episode.title);

    const hasPoster = !!poster;

    return (
        <div
            onClick={() => navigate(`/episode/${episode.slug}`)}
            className={`group relative block rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border ${isDark
                ? "bg-[#13080c]/60 border-[#2a1117]/50 hover:border-red-900/40 hover:bg-[#1a0a10]/80"
                : "bg-white border-slate-200 hover:border-rose-300/60 hover:bg-slate-50"
                }`}
        >
            {/* Hover Glow */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t ${isDark
                    ? "from-red-900/10 via-transparent to-transparent"
                    : "from-rose-100/40 via-transparent to-transparent"
                    }`}
            />

            {/* Padding rapat p-1.5 di HP untuk menghemat ruang vertikal */}
            <div className="relative flex gap-2 sm:gap-3 p-1.5 sm:p-3">
                {/* Thumbnail */}
                <div
                    className={`relative w-[76px] sm:w-28 aspect-video rounded-lg overflow-hidden flex-shrink-0 border transition-colors ${isDark
                        ? "bg-[#1a0a0f] border-[#2a1117] group-hover:border-red-900/40"
                        : "bg-slate-200 border-slate-300 group-hover:border-rose-300/50"
                        }`}
                >
                    {hasPoster ? (
                        <img
                            src={poster}
                            alt={episode.title}
                            loading="lazy"
                            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${isDark
                                ? "opacity-50 group-hover:opacity-70"
                                : "opacity-75 group-hover:opacity-90"
                                }`}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <i
                                className={`fa-solid fa-film text-[10px] sm:text-sm ${isDark
                                    ? "text-slate-700"
                                    : "text-slate-400"
                                    }`}
                            />
                        </div>
                    )}

                    {/* Duration Badge */}
                    {duration && (
                        <span className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-sm text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded text-slate-300 border border-white/5 tracking-wider">
                            {duration}m
                        </span>
                    )}

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ff1e56]/90 flex items-center justify-center shadow-[0_0_20px_rgba(255,30,86,0.4)] backdrop-blur-sm">
                            <i className="fa-solid fa-play text-white text-[9px] sm:text-[10px] ml-0.5" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center min-w-0 flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between w-full mb-1">
                        <span
                            className={`inline-flex items-center gap-1 border text-[8px] sm:text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded ${isDark
                                ? "bg-[#ff1e56]/10 border-[#ff1e56]/20 text-[#ff1e56]"
                                : "bg-rose-50 border-rose-300/50 text-rose-500"
                                }`}
                        >
                            EP {epNumber}
                        </span>

                        <i
                            className={`fa-solid fa-arrow-up-right-from-square text-[8px] sm:text-[9px] transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isDark
                                ? "text-slate-600 group-hover:text-[#ff1e56]"
                                : "text-slate-400 group-hover:text-rose-500"
                                }`}
                        />
                    </div>

                    {/* Title */}
                    <h4
                        className={`font-bold text-[10px] sm:text-[11px] leading-tight line-clamp-1 sm:line-clamp-2 transition-colors ${isDark
                            ? "text-slate-200 group-hover:text-white"
                            : "text-slate-700 group-hover:text-slate-900"
                            }`}
                    >
                        {episode.title}
                    </h4>

                    {/* Status */}
                    <div className="flex items-center gap-1 mt-1 sm:mt-2">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                        <span
                            className={`text-[8px] sm:text-[9px] font-semibold tracking-wide ${isDark
                                ? "text-slate-500"
                                : "text-slate-400"
                                }`}
                        >
                            Tersedia
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}