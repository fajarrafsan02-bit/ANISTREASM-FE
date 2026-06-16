import { useTheme } from "../../../../context/ThemeContext";

export default function EpisodeCardSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`relative block rounded-xl overflow-hidden p-2 sm:p-2.5 border ${
                isDark
                    ? "bg-[#13080c]/60 border-[#2a1117]/50"
                    : "bg-white border-slate-200"
            }`}
        >
            <div className="flex gap-2 sm:gap-3">

                {/* Thumbnail */}
                <div
                    className={`relative
                        w-24 h-16
                        sm:w-28 sm:h-[4.5rem]
                        rounded-lg
                        flex-shrink-0
                        border
                        da-animate-pulse
                        ${
                            isDark
                                ? "bg-[#1a0a0f] border-[#2a1117]"
                                : "bg-slate-300 border-slate-300"
                        }`}
                />

                {/* Content */}
                <div className="flex flex-col justify-center min-w-0 flex-1 py-0.5 space-y-1.5 sm:space-y-2">

                    {/* Episode badge */}
                    <div className="flex items-center gap-1.5">
                        <div
                            className={`w-9 sm:w-10 h-4 sm:h-5 rounded da-animate-pulse ${
                                isDark
                                    ? "bg-[#ff1e56]/8"
                                    : "bg-rose-100"
                            }`}
                        />
                    </div>

                    {/* Title */}
                    <div
                        className={`h-3.5 sm:h-4 w-[85%] rounded da-animate-pulse ${
                            isDark
                                ? "bg-[#1a0a0f]"
                                : "bg-slate-300"
                        }`}
                    />

                    {/* Subtitle */}
                    <div
                        className={`h-2.5 sm:h-3 w-14 sm:w-16 rounded da-animate-pulse ${
                            isDark
                                ? "bg-[#1a0a0f]"
                                : "bg-slate-200"
                        }`}
                    />
                </div>
            </div>
        </div>
    );
}