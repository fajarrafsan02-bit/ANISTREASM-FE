import { useTheme } from "../../../context/ThemeContext";

export default function StatusCardSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="relative">
            <div className={`relative rounded-xl p-2.5 sm:p-4 overflow-hidden border transition-colors duration-300 ${
                isDark
                    ? "bg-[#0d0407] sm:bg-[#0d0407]/90 border-[#2a1117]/60 sm:border-[#2a1117]/80 shadow-lg shadow-black/40"
                    : "bg-slate-100 border-slate-300 shadow-md shadow-slate-200/60"
            }`}>

                {/* Top line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent ${
                    isDark ? "via-red-900/30" : "via-slate-400/40"
                } to-transparent`} />

                {/* Corner accents */}
                {[
                    "top-1.5 left-1.5 border-l border-t rounded-tl-sm",
                    "top-1.5 right-1.5 border-r border-t rounded-tr-sm",
                    "bottom-1.5 left-1.5 border-l border-b rounded-bl-sm",
                    "bottom-1.5 right-1.5 border-r border-b rounded-br-sm",
                ].map((pos, i) => (
                    <div
                        key={i}
                        className={`absolute w-2 h-2 sm:w-3 sm:h-3 ${pos} ${
                            isDark ? "border-red-900/20" : "border-slate-400/30"
                        }`}
                    />
                ))}

                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* Left: Status indicator */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full da-animate-pulse ${
                            isDark ? "bg-[#2a1117]" : "bg-slate-300"
                        }`} />
                        <div className={`h-2.5 sm:h-3 w-16 sm:w-28 rounded da-animate-pulse ${
                            isDark ? "bg-[#2a1117]" : "bg-slate-300"
                        }`} />
                    </div>

                    {/* Right: Status badge */}
                    <div className={`h-5 sm:h-7 w-16 sm:w-24 rounded-md da-animate-pulse ${
                        isDark ? "bg-[#2a1117]" : "bg-slate-300"
                    }`} />
                </div>
            </div>
        </div>
    );
}