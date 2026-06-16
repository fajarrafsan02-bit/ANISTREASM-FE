import { useTheme } from "../../../context/ThemeContext";

export default function LoadingState() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
                isDark ? "bg-[#070204]" : "bg-white"
            }`}
        >
            <div className="flex flex-col items-center gap-3">
                <div
                    className={`w-10 h-10 rounded-full border-2 animate-spin ${
                        isDark
                            ? "border-[#2a1117] border-t-[#ff1e56]"
                            : "border-slate-200 border-t-[#ff1e56]"
                    }`}
                />
                <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                    Memuat episode...
                </p>
            </div>
        </div>
    );
}