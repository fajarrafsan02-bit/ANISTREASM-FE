import { useTheme } from "../../../context/ThemeContext";

export default function RelatedHeader({
    episodesCount = 0,
    displayProgressNumber = 1,
    hasEpisodes = false,
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6 px-1 select-none">
            <div className="flex items-center gap-3 min-w-0">
                <div
                    className={`relative w-9 h-9 rounded-xl border flex items-center justify-center shadow-lg overflow-hidden ${
                        isDark
                            ? "bg-linear-to-br from-[#2a0a12] via-[#1a050a] to-[#0f0205] border-red-900/30 shadow-red-950/20"
                            : "bg-white border-slate-200 shadow-sm"
                    }`}
                >
                    <div
                        className={`absolute inset-0 rounded-xl animate-pulse ${
                            isDark ? "bg-[#ff1e56]/5" : "bg-rose-100/60"
                        }`}
                    />
                    <i className="fa-solid fa-list-ul text-sm text-[#ff1e56] relative z-10" />
                </div>

                <div className="min-w-0">
                    <h3
                        className={`font-black text-sm sm:text-base tracking-tight leading-tight ${
                            isDark ? "text-white" : "text-slate-900"
                        }`}
                    >
                        Episode Terkait
                    </h3>
                    <p
                        className={`text-[10px] sm:text-[11px] font-medium mt-0.5 ${
                            isDark ? "text-slate-600" : "text-slate-500"
                        }`}
                    >
                        {episodesCount} episode tersedia
                    </p>
                </div>
            </div>

            {hasEpisodes && (
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <div
                        className={`w-16 h-0.5 rounded-full overflow-hidden ${
                            isDark ? "bg-slate-800" : "bg-slate-200"
                        }`}
                    >
                        <div
                            className="h-full bg-linear-to-r from-[#ff1e56] to-[#ff6b8a] rounded-full transition-all duration-500"
                            style={{
                                width: `${Math.min(
                                    (displayProgressNumber / episodesCount) * 100,
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                    <span
                        className={`text-[10px] font-mono font-bold ${
                            isDark ? "text-slate-600" : "text-slate-500"
                        }`}
                    >
                        {displayProgressNumber} / {episodesCount}
                    </span>
                </div>
            )}
        </div>
    );
}