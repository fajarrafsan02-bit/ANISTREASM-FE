import { AlertCircle } from "lucide-react";

export default function AuthFormField({
    label,
    icon,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
    right,
    extraLabel,
    isDark,
}) {
    const inputBase = `flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all ${isDark
            ? "bg-zinc-900/40 border-zinc-800/80 text-zinc-100 focus-within:border-red-500/40 focus-within:ring-2 focus-within:ring-red-500/10"
            : "bg-white border-zinc-200 text-zinc-900 shadow-sm shadow-zinc-100/50 hover:border-zinc-300 focus-within:border-red-300 focus-within:ring-2 focus-within:ring-red-500/5"
        }`;

    const iconClass = isDark ? "text-zinc-500" : "text-zinc-400";

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className={`text-[11px] font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                    {label}
                </label>
                {extraLabel}
            </div>
            <div className={inputBase}>
                <span className={`shrink-0 ${iconClass}`}>{icon}</span>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`bg-transparent outline-none w-full text-sm ${isDark
                            ? "placeholder:text-zinc-600 text-zinc-100"
                            : "placeholder:text-zinc-400 text-zinc-900"
                        }`}
                />
                {right}
            </div>
            {error && (
                <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-300 px-0.5">
                    <AlertCircle className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-red-400" : "text-red-500"}`} />
                    <p className={`text-[10px] ${isDark ? "text-red-400" : "text-red-500"}`}>{error}</p>
                </div>
            )}
        </div>
    );
}