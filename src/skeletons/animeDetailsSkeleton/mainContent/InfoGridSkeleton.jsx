import { useTheme } from "../../../context/ThemeContext";

export default function InfoGridSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

            {/* Trailer Card */}
            <div className="relative">
                <div
                    className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 h-full border ${
                        isDark
                            ? "bg-[#0d0407]/90 border-[#2a1117]/80"
                            : "bg-white border-slate-200"
                    }`}
                >
                    <div
                        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
                            isDark
                                ? "via-red-900/30"
                                : "via-slate-300/50"
                        } to-transparent`}
                    />

                    {/* Header */}
                    <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                        <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg da-animate-pulse ${
                                isDark
                                    ? "bg-[#1a0a0f]"
                                    : "bg-slate-300"
                            }`}
                        />

                        <div className="space-y-1.5">
                            <div
                                className={`h-3 sm:h-4 w-24 sm:w-28 rounded da-animate-pulse ${
                                    isDark
                                        ? "bg-[#1a0a0f]"
                                        : "bg-slate-300"
                                }`}
                            />
                            <div
                                className={`h-2.5 sm:h-3 w-16 sm:w-20 rounded da-animate-pulse ${
                                    isDark
                                        ? "bg-[#1a0a0f]"
                                        : "bg-slate-200"
                                }`}
                            />
                        </div>
                    </div>

                    {/* Trailer */}
                    <div
                        className={`relative h-[180px] sm:h-[220px] md:min-h-[240px] rounded-xl border overflow-hidden ${
                            isDark
                                ? "bg-[#0a0305] border-[#2a1117]"
                                : "bg-slate-100 border-slate-200"
                        }`}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full da-animate-pulse ${
                                    isDark
                                        ? "bg-[#1a0a0f]"
                                        : "bg-slate-300"
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Synopsis Card */}
            <div className="relative">
                <div
                    className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 h-full border ${
                        isDark
                            ? "bg-[#0d0407]/90 border-[#2a1117]/80"
                            : "bg-white border-slate-200"
                    }`}
                >
                    <div
                        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
                            isDark
                                ? "via-red-900/30"
                                : "via-slate-300/50"
                        } to-transparent`}
                    />

                    {/* Header */}
                    <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                        <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg da-animate-pulse ${
                                isDark
                                    ? "bg-[#1a0a0f]"
                                    : "bg-slate-300"
                            }`}
                        />

                        <div className="space-y-1.5">
                            <div
                                className={`h-3 sm:h-4 w-20 rounded da-animate-pulse ${
                                    isDark
                                        ? "bg-[#1a0a0f]"
                                        : "bg-slate-300"
                                }`}
                            />
                            <div
                                className={`h-2.5 sm:h-3 w-20 sm:w-24 rounded da-animate-pulse ${
                                    isDark
                                        ? "bg-[#1a0a0f]"
                                        : "bg-slate-200"
                                }`}
                            />
                        </div>
                    </div>

                    {/* Synopsis */}
                    <div
                        className={`space-y-2 pl-3 border-l-2 ${
                            isDark
                                ? "border-[#ff1e56]/10"
                                : "border-rose-200"
                        }`}
                    >
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`h-2.5 sm:h-3 rounded da-animate-pulse ${
                                    isDark
                                        ? "bg-[#1a0a0f]"
                                        : "bg-slate-300"
                                }`}
                                style={{
                                    width: `${95 - i * 8}%`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Divider */}
                    <div
                        className={`h-px my-3 sm:my-4 bg-gradient-to-r ${
                            isDark
                                ? "from-[#2a1117]/40"
                                : "from-slate-300"
                        } to-transparent`}
                    />

                    {/* Genre Header */}
                    <div className="flex items-center gap-2 sm:gap-2.5 mb-3">
                        <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg da-animate-pulse ${
                                isDark
                                    ? "bg-[#1a0a0f]"
                                    : "bg-slate-300"
                            }`}
                        />

                        <div className="space-y-1.5">
                            <div
                                className={`h-3 sm:h-4 w-14 sm:w-16 rounded da-animate-pulse ${
                                    isDark
                                        ? "bg-[#1a0a0f]"
                                        : "bg-slate-300"
                                }`}
                            />
                            <div
                                className={`h-2.5 sm:h-3 w-10 sm:w-12 rounded da-animate-pulse ${
                                    isDark
                                        ? "bg-[#1a0a0f]"
                                        : "bg-slate-200"
                                }`}
                            />
                        </div>
                    </div>

                    {/* Genre Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {[50, 70, 45, 60, 55, 65].map((w, i) => (
                            <div
                                key={i}
                                className={`h-5 sm:h-6 rounded-md da-animate-pulse ${
                                    isDark
                                        ? "bg-[#1a0a0f]"
                                        : "bg-slate-200"
                                }`}
                                style={{
                                    width: `${w}px`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}