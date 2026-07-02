import { useTheme } from "../../../../context/ThemeContext";
import EpisodeCardSkeleton from "./EpisodeCardSkeleton";

export default function EpisodeDirectorySkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 shadow-xl space-y-5 sm:space-y-6 border ${
                isDark
                    ? "bg-[#10070a]/95 border-[#2a1117]"
                    : "bg-white border-slate-200 shadow-slate-200/50"
            }`}
        >
            {/* Header */}
            <div
                className={`flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b pb-4 ${
                    isDark
                        ? "border-[#2a1117]"
                        : "border-slate-200"
                }`}
            >
                <div className="space-y-2 min-w-0">
                    <div
                        className={`h-5 w-40 sm:w-56 rounded da-animate-pulse ${
                            isDark
                                ? "bg-[#2a1117]"
                                : "bg-slate-300"
                        }`}
                    />

                    <div
                        className={`h-3 w-full max-w-[280px] sm:max-w-[320px] rounded da-animate-pulse ${
                            isDark
                                ? "bg-[#2a1117]"
                                : "bg-slate-200"
                        }`}
                    />
                </div>

                <div
                    className={`w-24 sm:w-28 h-8 rounded-lg da-animate-pulse ${
                        isDark
                            ? "bg-[#2a1117]"
                            : "bg-slate-300"
                    }`}
                />
            </div>

            {/* Episode Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {[...Array(6)].map((_, i) => (
                    <EpisodeCardSkeleton key={i} />
                ))}
            </div>

            {/* Pagination */}
            <div
                className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t ${
                    isDark
                        ? "border-[#2a1117]"
                        : "border-slate-200"
                }`}
            >
                <div
                    className={`h-3 w-24 sm:w-32 rounded da-animate-pulse ${
                        isDark
                            ? "bg-[#2a1117]"
                            : "bg-slate-200"
                    }`}
                />

                <div className="flex items-center gap-1.5 sm:gap-2">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg da-animate-pulse ${
                                isDark
                                    ? "bg-[#2a1117]"
                                    : "bg-slate-200"
                            }`}
                        />
                    ))}

                    <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg da-animate-pulse ${
                            isDark
                                ? "bg-[#ff1e56]/10"
                                : "bg-rose-100"
                        }`}
                    />
                </div>
            </div>
        </div>
    );
}