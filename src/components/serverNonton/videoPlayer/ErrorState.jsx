import { useTheme } from "../../../context/ThemeContext";

export default function ErrorState({ error, onBack }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
                isDark ? "bg-[#070204]" : "bg-white"
            }`}
        >
            <div
                className={`text-center space-y-3 rounded-2xl border p-6 sm:p-8 shadow-lg ${
                    isDark
                        ? "bg-[#0d0508] border-[#2a1117]/60"
                        : "bg-white border-slate-200"
                }`}
            >
                <i className="fa-solid fa-circle-exclamation text-[#ff1e56] text-3xl" />
                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {error}
                </p>
                <button
                    onClick={onBack}
                    className={`text-xs font-bold px-4 py-2 rounded-lg border transition-all duration-300 ${
                        isDark
                            ? "text-[#ff1e56] border-[#ff1e56]/30 hover:bg-[#ff1e56]/10"
                            : "text-[#ff1e56] border-rose-200 hover:bg-rose-50"
                    }`}
                >
                    Kembali
                </button>
            </div>
        </div>
    );
}