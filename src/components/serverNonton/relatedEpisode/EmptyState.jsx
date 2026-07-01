import { useTheme } from "../../../context/ThemeContext";

export default function EmptyState() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={`py-12 sm:py-16 text-center w-full border border-dashed rounded-2xl bg-gradient-to-b ${
            isDark
                ? "border-[#2a1117]/40 from-[#0d0407]/30 to-transparent"
                : "border-slate-300 from-white to-slate-50"
        }`}>
            <div className="relative inline-flex mb-3 sm:mb-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center ${
                    isDark
                        ? "bg-gradient-to-br from-[#1a0a0f] to-[#0a0204] border-[#2a1117]/50"
                        : "bg-white border-slate-200 shadow-sm"
                }`}>
                    <i className={`fa-solid fa-film text-lg sm:text-xl ${isDark ? "text-slate-700" : "text-slate-400"}`} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ff1e56]/20 animate-ping" />
            </div>
            <p className={`text-xs font-semibold ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                Belum ada episode terkait
            </p>
            <p className={`text-[10px] mt-1 ${isDark ? "text-slate-700" : "text-slate-400"}`}>
                Episode baru akan muncul di sini
            </p>
        </div>
    );
}
