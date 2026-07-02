import { useTheme } from "../../../context/ThemeContext";

export default function MetadataCardSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={`relative rounded-[1rem] p-4 shadow-xl overflow-hidden border transition-all duration-500 ${
            isDark 
                ? "bg-[#080204] border-[#1b0a0e] shadow-black/20" 
                : "bg-white border-slate-200 shadow-slate-200/40"
        }`}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-[2px] mt-[1px]">
                    <div className={`w-0.5 h-3 rounded-[1px] animate-pulse ${
                        isDark ? "bg-[#2a1117]" : "bg-slate-300"
                    }`} />
                    <div className={`w-0.5 h-2 rounded-[1px] mt-[4px] animate-pulse ${
                        isDark ? "bg-[#2a1117]" : "bg-slate-300"
                    }`} />
                    <div className={`w-0.5 h-1 rounded-[1px] mt-[8px] animate-pulse ${
                        isDark ? "bg-[#2a1117]" : "bg-slate-300"
                    }`} />
                </div>
                <div className={`h-3 w-28 rounded animate-pulse ${
                    isDark ? "bg-[#2a1117]" : "bg-slate-300"
                }`} />
            </div>

            {/* List items */}
            <div className="flex flex-col gap-1.5">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center w-full py-0.5">
                        {/* Icon box */}
                        <div className={`flex-shrink-0 w-5 h-5 rounded border animate-pulse ${
                            isDark 
                                ? "bg-[#0c0305] border-[#1b0a0e]" 
                                : "bg-slate-100 border-slate-250"
                        }`} />

                        {/* Label */}
                        <div className={`flex-shrink-0 ml-2.5 h-2.5 w-20 rounded animate-pulse ${
                            isDark ? "bg-[#2a1117]" : "bg-slate-200"
                        }`} />

                        {/* Dotted line */}
                        <div className={`flex-grow border-b border-dotted mx-3 mt-[3px] opacity-60 ${
                            isDark ? "border-[#1b0a0e]" : "border-slate-300"
                        }`} />

                        {/* Value */}
                        <div className={`flex-shrink-0 h-4 w-24 rounded animate-pulse ${
                            isDark ? "bg-[#2a1117]" : "bg-slate-200"
                        }`} />
                    </div>
                ))}
            </div>
        </div>
    );
}