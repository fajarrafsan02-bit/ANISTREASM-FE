import { useTheme } from "../../../context/ThemeContext";

export default function TitleSectionSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="relative w-full max-w-4xl space-y-3 sm:space-y-4">

            {/* Accent line */}
            <div
                className={`w-12 sm:w-16 h-px bg-gradient-to-r ${
                    isDark
                        ? "from-[#ff1e56]/30"
                        : "from-rose-400/50"
                } to-transparent`}
            />

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <div
                    className={`w-16 sm:w-20 h-5 sm:h-6 rounded-md da-animate-pulse ${
                        isDark
                            ? "bg-[#ff1e56]/10"
                            : "bg-rose-100"
                    }`}
                />

                <div
                    className={`w-16 sm:w-20 h-5 sm:h-6 rounded-md da-animate-pulse ${
                        isDark
                            ? "bg-[#2a1117]"
                            : "bg-slate-200"
                    }`}
                />

                <div
                    className={`w-12 sm:w-16 h-3 sm:h-4 rounded da-animate-pulse ${
                        isDark
                            ? "bg-[#2a1117]"
                            : "bg-slate-200"
                    }`}
                />
            </div>

            {/* Main title */}
            <div
                className={`h-8 sm:h-10 md:h-12 lg:h-14 w-[92%] sm:w-[85%] rounded-lg da-animate-pulse ${
                    isDark
                        ? "bg-[#2a1117]"
                        : "bg-slate-300"
                }`}
            />

            {/* Subtitle */}
            <div className="flex flex-wrap gap-2">
                <div
                    className={`h-3 sm:h-4 w-24 sm:w-32 rounded da-animate-pulse ${
                        isDark
                            ? "bg-[#2a1117]"
                            : "bg-slate-200"
                    }`}
                />

                <div
                    className={`h-3 sm:h-4 w-20 sm:w-24 rounded da-animate-pulse ${
                        isDark
                            ? "bg-[#2a1117]"
                            : "bg-slate-200"
                    }`}
                />
            </div>

            {/* Divider */}
            <div
                className={`w-8 sm:w-10 h-px bg-gradient-to-r ${
                    isDark
                        ? "from-[#ff1e56]/30"
                        : "from-rose-400/50"
                } to-transparent`}
            />

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2">
                <div
                    className={`w-28 sm:w-32 h-8 sm:h-9 rounded-lg da-animate-pulse ${
                        isDark
                            ? "bg-[#ff1e56]/10"
                            : "bg-rose-100"
                    }`}
                />

                <div
                    className={`w-20 sm:w-24 h-8 sm:h-9 rounded-lg da-animate-pulse ${
                        isDark
                            ? "bg-[#2a1117]"
                            : "bg-slate-200"
                    }`}
                />

                <div
                    className={`w-20 sm:w-24 h-8 sm:h-9 rounded-lg da-animate-pulse ${
                        isDark
                            ? "bg-[#2a1117]"
                            : "bg-slate-200"
                    }`}
                />
            </div>
        </div>
    );
}