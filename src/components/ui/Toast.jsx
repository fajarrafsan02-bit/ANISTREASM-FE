import { Info, AlertCircle, X, CheckCircle, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const icons = {
    success: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 drop-shadow-md" />,
    error: <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 drop-shadow-md" />,
    info: <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 drop-shadow-md" />,
    warning: <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 drop-shadow-md" />,
};

// Latar belakang lembut untuk ikon agar terlihat lebih premium
const iconBgDark = {
    success: "bg-emerald-500/10 border-emerald-500/20",
    error: "bg-red-500/10 border-red-500/20",
    info: "bg-blue-500/10 border-blue-500/20",
    warning: "bg-amber-500/10 border-amber-500/20",
};

const iconBgLight = {
    success: "bg-emerald-500/10 border-emerald-500/20",
    error: "bg-red-500/10 border-red-500/20",
    info: "bg-blue-500/10 border-blue-500/20",
    warning: "bg-amber-500/10 border-amber-500/20",
};

const gradientsDark = {
    success: "from-emerald-500/10 to-transparent",
    error: "from-red-500/10 to-transparent",
    info: "from-blue-500/10 to-transparent",
    warning: "from-amber-500/10 to-transparent",
};

const gradientsLight = {
    success: "from-emerald-500/5 to-transparent",
    error: "from-red-500/5 to-transparent",
    info: "from-blue-500/5 to-transparent",
    warning: "from-amber-500/5 to-transparent",
};

const bordersDark = {
    success: "border-emerald-500/30 ring-emerald-500/10",
    error: "border-red-500/30 ring-red-500/10",
    info: "border-blue-500/30 ring-blue-500/10",
    warning: "border-amber-500/30 ring-amber-500/10",
};

const bordersLight = {
    success: "border-emerald-500/20 ring-emerald-500/5",
    error: "border-red-500/20 ring-red-500/5",
    info: "border-blue-500/20 ring-blue-500/5",
    warning: "border-amber-500/20 ring-amber-500/5",
};

const shadowsDark = {
    success: "0 12px 32px -10px rgba(16,185,129,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
    error: "0 12px 32px -10px rgba(239,68,68,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
    info: "0 12px 32px -10px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
    warning: "0 12px 32px -10px rgba(245,158,11,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
};

const shadowsLight = {
    success: "0 12px 32px -10px rgba(16,185,129,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
    error: "0 12px 32px -10px rgba(239,68,68,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
    info: "0 12px 32px -10px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
    warning: "0 12px 32px -10px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
};

const progressColors = {
    success: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    error: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    info: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
    warning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
};

const defaultSubMessages = {
    success: "Tindakan berhasil diselesaikan.",
    error: "Sesuatu berjalan tidak semestinya.",
    info: "Ada pembaruan informasi baru.",
    warning: "Harap periksa kembali langkah Anda.",
};

export default function Toast({ toast, onRemove }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [exiting, setExiting] = useState(false);

    // Auto-dismiss
    useEffect(() => {
        const timer = setTimeout(() => {
            setExiting(true);
            setTimeout(() => onRemove(toast.id), 500); // Sinkron dengan durasi animasi
        }, toast.duration);
        return () => clearTimeout(timer);
    }, [toast, onRemove]);

    const handleClose = () => {
        setExiting(true);
        setTimeout(() => onRemove(toast.id), 500);
    };

    const gradients = isDark ? gradientsDark : gradientsLight;
    const borders = isDark ? bordersDark : bordersLight;
    const shadows = isDark ? shadowsDark : shadowsLight;
    const iconBgs = isDark ? iconBgDark : iconBgLight;

    return (
        <div
            className={`
                group relative flex items-start gap-3 sm:gap-4
                p-3 sm:p-4
                rounded-2xl border ring-1 ring-inset
                w-full sm:min-w-[320px] sm:max-w-[420px]
                overflow-hidden backdrop-blur-xl
                transition-all duration-500 origin-bottom
                ${isDark
                    ? "bg-[#0f0f13]/80"
                    : "bg-white/90"
                }
                ${borders[toast.type]}
                ${exiting
                    ? "opacity-0 translate-y-6 sm:translate-y-0 sm:translate-x-12 scale-95 duration-400 ease-in"
                    : "opacity-100 translate-y-0 translate-x-0 scale-100 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                }
            `}
            style={{ boxShadow: shadows[toast.type] }}
        >
            {/* Soft Background Gradient Glow */}
            <div
                className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${gradients[toast.type]} pointer-events-none opacity-60`}
            />

            {/* Premium Icon Wrapper */}
            <div className={`relative z-10 shrink-0 mt-0.5 p-1.5 sm:p-2 rounded-xl border ${iconBgs[toast.type]} shadow-inner`}>
                {icons[toast.type]}
            </div>

            {/* Content Container (Lebar fluid untuk 320px) */}
            <div className="relative z-10 flex-1 min-w-0 pt-0.5">
                <p className={`text-[13px] sm:text-[14.5px] font-bold tracking-wide leading-tight ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                    {toast.message}
                </p>
                <p className={`text-[11px] sm:text-xs mt-1 leading-snug line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {toast.subMessage || defaultSubMessages[toast.type]}
                </p>
            </div>

            {/* Close Button (Hover halus) */}
            <button
                onClick={handleClose}
                className={`relative z-10 p-1.5 rounded-xl transition-all duration-300 shrink-0 mt-[-2px] mr-[-2px]
                    ${isDark
                        ? "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                        : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    }`}
            >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Premium Glowing Progress Bar */}
            <div className={`absolute bottom-0 left-0 right-0 h-[3px] sm:h-[4px] overflow-hidden ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                <div
                    className={`h-full w-full origin-left ${progressColors[toast.type]}`}
                    style={{
                        animation: `toast-progress ${toast.duration}ms linear forwards`,
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px',
                        willChange: 'transform',
                    }}
                />
            </div>
        </div>
    );
}