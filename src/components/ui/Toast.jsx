// Toast.tsx
import { Info, AlertCircle, X, CheckCircle, AlertTriangle } from "lucide-react"; // Tambahkan AlertTriangle
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const icons = {
    success: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />,
    error: <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />,
    info: <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />,
    warning: <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />, // Tambahkan ini
};

const gradientsDark = {
    success: "from-emerald-500/20 to-emerald-600/5",
    error: "from-red-500/20 to-red-600/5",
    info: "from-blue-500/20 to-blue-600/5",
    warning: "from-amber-500/20 to-amber-600/5", // Tambahkan ini
};

const gradientsLight = {
    success: "from-emerald-500/15 to-emerald-600/5",
    error: "from-red-500/15 to-red-600/5",
    info: "from-blue-500/15 to-blue-600/5",
    warning: "from-amber-500/15 to-amber-600/5", // Tambahkan ini
};

const bordersDark = {
    success: "border-emerald-500/30",
    error: "border-red-500/30",
    info: "border-blue-500/30",
    warning: "border-amber-500/30", // Tambahkan ini
};

const bordersLight = {
    success: "border-emerald-500/20",
    error: "border-red-500/20",
    info: "border-blue-500/20",
    warning: "border-amber-500/20", // Tambahkan ini
};

const shadowsDark = {
    success: "0 8px 32px -8px rgba(16,185,129,0.25), 0 0 0 1px rgba(16,185,129,0.1)",
    error: "0 8px 32px -8px rgba(239,68,68,0.25),  0 0 0 1px rgba(239,68,68,0.1)",
    info: "0 8px 32px -8px rgba(59,130,246,0.25),  0 0 0 1px rgba(59,130,246,0.1)",
    warning: "0 8px 32px -8px rgba(245,158,11,0.25),  0 0 0 1px rgba(245,158,11,0.1)", // Tambahkan ini (menggunakan warna amber)
};

const shadowsLight = {
    success: "0 8px 32px -8px rgba(16,185,129,0.15), 0 0 0 1px rgba(16,185,129,0.08)",
    error: "0 8px 32px -8px rgba(239,68,68,0.15),  0 0 0 1px rgba(239,68,68,0.08)",
    info: "0 8px 32px -8px rgba(59,130,246,0.15),  0 0 0 1px rgba(59,130,246,0.08)",
    warning: "0 8px 32px -8px rgba(245,158,11,0.15),  0 0 0 1px rgba(245,158,11,0.08)", // Tambahkan ini (menggunakan warna amber)
};

const progressColors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-amber-500", // Tambahkan ini
};

// ✨ BARU: Pesan Bawah Otomatis berdasarkan Tipe ✨
const defaultSubMessages = {
    success: "Data berhasil dimuat",
    error: "Terjadi kesalahan, silakan coba lagi",
    info: "Ada informasi baru untuk Anda",
    warning: "Perhatian, mohon periksa kembali tindakan Anda", // Tambahkan ini
};


export default function Toast({ toast, onRemove }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [exiting, setExiting] = useState(false);
    const [progress, setProgress] = useState(100);

    // Progress bar countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) { clearInterval(interval); return 0; }
                return prev - (100 / (toast.duration / 16));
            });
        }, 16);
        return () => clearInterval(interval);
    }, [toast.duration]);

    // Auto-dismiss
    useEffect(() => {
        const timer = setTimeout(() => {
            setExiting(true);
            setTimeout(() => onRemove(toast.id), 400);
        }, toast.duration);
        return () => clearTimeout(timer);
    }, [toast, onRemove]);

    const handleClose = () => {
        setExiting(true);
        setTimeout(() => onRemove(toast.id), 400);
    };

    const gradients = isDark ? gradientsDark : gradientsLight;
    const borders = isDark ? bordersDark : bordersLight;
    const shadows = isDark ? shadowsDark : shadowsLight;

    return (
        <div
            className={`
                relative flex items-start gap-2.5 sm:gap-3
                px-3 py-3 sm:px-4 sm:py-3.5
                rounded-xl border shadow-2xl backdrop-blur-xl
                w-full sm:min-w-[300px] sm:max-w-[400px]
                overflow-hidden
                transition-all duration-400
                ${isDark
                    ? "dark:bg-[#0a0a0f]/90"
                    : "bg-white/95 border-opacity-80"
                }
                ${borders[toast.type]}
                ${exiting
                    ? "opacity-0 translate-y-4 scale-95"
                    : "opacity-100 translate-y-0 scale-100"
                }
            `}
            style={{ boxShadow: shadows[toast.type] }}
        >
            {/* Background glow */}
            <div
                className={`absolute inset-0 bg-linear-to-br ${gradients[toast.type]} pointer-events-none`}
            />

            {/* Icon */}
            <div className="relative z-10 shrink-0 mt-0.5">
                {icons[toast.type]}
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 min-w-0">
                <p className={`text-xs sm:text-sm font-semibold leading-snug ${isDark ? "text-white" : "text-gray-900"}`}>
                    {toast.message}
                </p>

                {/* ✨ PERUBAHAN: Pesan bawah dinamis ✨ */}
                <p className={`text-[10px] sm:text-[11px] mt-0.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {/* Jika ada subMessage kustom, gunakan itu. Jika tidak, gunakan default berdasarkan type */}
                    {toast.subMessage || defaultSubMessages[toast.type]}
                </p>
            </div>

            {/* Close button */}
            <button
                onClick={handleClose}
                className={`relative z-10 p-1 rounded-lg transition-colors shrink-0 ${isDark
                    ? "text-gray-400 hover:bg-white/10 hover:text-gray-300"
                    : "text-gray-500 hover:bg-black/5 hover:text-gray-700"
                    }`}
            >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Progress bar */}
            <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${isDark ? "bg-white/5" : "bg-black/8"
                }`}>
                <div
                    className={`h-full rounded-full transition-all duration-100 ease-linear ${progressColors[toast.type]}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}