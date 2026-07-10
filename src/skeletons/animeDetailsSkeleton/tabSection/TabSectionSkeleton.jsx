import { useTheme } from "../../../context/ThemeContext"; // sesuaikan path

export default function TabsSectionSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="space-y-6">
            {/* Tabs bar */}
            <div className={`flex gap-2 border-b pb-1 ${
                isDark ? "border-[#1a0a0f]" : "border-slate-300"
            }`}>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-10 rounded-t-lg da-animate-pulse ${
                            i === 0
                                ? isDark
                                    ? "w-28 bg-[#ff1e56]/8"
                                    : "w-28 bg-rose-100"
                                : isDark
                                    ? "w-24 bg-[#2a1117]"
                                    : "w-24 bg-slate-200"
                        }`}
                    />
                ))}
            </div>

            {/* Tab content grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className={`p-4 rounded-xl border space-y-3 ${
                            isDark
                                ? "bg-[#0d0407] border-[#1a0a0f]"
                                : "bg-slate-100 border-slate-300"
                        }`}
                    >
                        <div className="flex gap-3">
                            <div className={`w-16 h-16 rounded-lg da-animate-pulse shrink-0 ${
                                isDark ? "bg-[#2a1117]" : "bg-slate-300"
                            }`} />
                            <div className="flex-1 space-y-2">
                                <div className={`h-4 w-full rounded da-animate-pulse ${
                                    isDark ? "bg-[#2a1117]" : "bg-slate-300"
                                }`} />
                                <div className={`h-3 w-3/4 rounded da-animate-pulse ${
                                    isDark ? "bg-[#2a1117]" : "bg-slate-200"
                                }`} />
                            </div>
                        </div>
                        <div className={`h-3 w-full rounded da-animate-pulse ${
                            isDark ? "bg-[#2a1117]" : "bg-slate-200"
                        }`} />
                    </div>
                ))}
            </div>
        </div>
    );
}