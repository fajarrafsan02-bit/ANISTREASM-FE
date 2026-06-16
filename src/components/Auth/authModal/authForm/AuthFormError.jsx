import { AlertCircle } from "lucide-react";

export default function AuthFormError({ error, isVisible, isDark, onClose }) {
    if (!error || !isVisible) return null;

    return (
        <div className="transition-all duration-300 ease-out">
            <div className={`px-3 py-2.5 rounded-xl border flex items-start gap-2.5 backdrop-blur-sm transition-all ${isDark
                ? "bg-red-950/10 border-red-500/20 shadow-lg shadow-red-950/10"
                : "bg-red-50/50 border-red-200/50 shadow-sm shadow-red-100/30"
                }`}>
                <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? "text-red-400" : "text-red-500"}`} />
                <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-semibold leading-none ${isDark ? "text-red-400" : "text-red-600"}`}>
                        Oops, Ada Kesalahan
                    </p>
                    <p className={`text-[10px] mt-1 leading-relaxed ${isDark ? "text-red-400/80" : "text-red-600/80"}`}>
                        {error}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className={`shrink-0 p-1 rounded-md transition-colors ${isDark
                        ? "hover:bg-red-500/10 text-red-400/50 hover:text-red-400"
                        : "hover:bg-red-100 text-red-500/50 hover:text-red-600"
                        }`}
                >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}