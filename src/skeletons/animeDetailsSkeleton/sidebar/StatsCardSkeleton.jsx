import { useTheme } from "../../../context/ThemeContext";

export default function StatsCardSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="relative">
            <div className={`relative rounded-xl p-2.5 sm:p-4 overflow-hidden border transition-colors duration-300 ${
                isDark
                    ? "bg-[#0d0407]/90 border-[#2a1117]/80 shadow-xl shadow-black/40"
                    : "bg-slate-100 border-slate-300 shadow-lg shadow-slate-200/60"
                    // ✅ light: bg-slate-100 bukan white, border lebih gelap
            }`}>

                {/* Top line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
                    isDark ? "via-red-900/50" : "via-slate-400/40"
                } to-transparent`} />

                {/* Corner accents */}
                {[
                    "top-1.5 left-1.5 border-l border-t rounded-tl-md",
                    "top-1.5 right-1.5 border-r border-t rounded-tr-md",
                    "bottom-1.5 left-1.5 border-l border-b rounded-bl-md",
                    "bottom-1.5 right-1.5 border-r border-b rounded-br-md",
                ].map((pos, i) => (
                    <div
                        key={i}
                        className={`absolute w-2.5 h-2.5 sm:w-5 sm:h-5 ${pos} ${
                            isDark ? "border-red-900/30" : "border-slate-400/40"
                        }`}
                    />
                ))}

                <div className="space-y-0">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-2 sm:gap-3 py-2 sm:py-2.5 px-1 ${
                                index > 0
                                    ? isDark
                                        ? "border-t border-[#2a1117]/50"
                                        : "border-t border-slate-300/70"
                                    : ""
                            }`}
                        >
                            {/* Icon placeholder */}
                            <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex-shrink-0 da-animate-pulse ${
                                isDark
                                    ? "bg-[#1a0a0f] border border-red-950/30"
                                    : "bg-slate-300 border border-slate-400/20"
                                    // ✅ light: bg-slate-300 supaya kontras di atas slate-100
                            }`} />

                            {/* Content */}
                            <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
                                <div className={`h-2 sm:h-2.5 w-20 sm:w-24 rounded da-animate-pulse ${
                                    isDark ? "bg-[#1a0a0f]" : "bg-slate-300"
                                }`} />
                                <div className="flex items-center gap-1 sm:gap-1.5">
                                    <div className={`h-4 sm:h-5 w-10 sm:w-12 rounded da-animate-pulse ${
                                        isDark ? "bg-[#1a0a0f]" : "bg-slate-300"
                                    }`} />
                                    <div className={`h-3 sm:h-4 w-8 sm:w-10 rounded da-animate-pulse ${
                                        isDark ? "bg-[#1a0a0f]" : "bg-slate-200"
                                        // ✅ sedikit lebih terang untuk variasi
                                    }`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}