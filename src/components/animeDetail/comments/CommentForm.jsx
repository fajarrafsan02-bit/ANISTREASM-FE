import { useRef, useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";

// Avatar bulat: gambar jika ada, kalau tidak inisial nama. Dipakai di form & item.
export function CommentAvatar({ src, name, size = "md" }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const dimension = size === "sm" ? "w-7 h-7 text-[11px]" : "w-9 h-9 text-sm";
    const initial = (name?.trim()?.[0] || "?").toUpperCase();

    return (
        <div className={`${dimension} shrink-0 rounded-full overflow-hidden flex items-center justify-center font-black uppercase select-none ${
            isDark ? "bg-[#2a1117] text-red-300" : "bg-rose-100 text-red-600"
        }`}>
            {src ? (
                <img src={src} alt={name} className="w-full h-full object-cover" loading="lazy" />
            ) : (
                <span>{initial}</span>
            )}
        </div>
    );
}

export default function CommentForm({
    onSubmit,
    avatarSrc,
    displayName,
    placeholder = "Tulis komentar...",
    submitLabel = "Kirim",
    posting = false,
    compact = false,
    autoFocus = false,
    initialValue = "",
    onCancel,
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [value, setValue] = useState(initialValue);
    const textareaRef = useRef(null);

    // Auto-resize textarea mengikuti isi
    const autoResize = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    };

    useEffect(() => {
        autoResize();
        if (autoFocus && textareaRef.current) {
            textareaRef.current.focus();
            // Letakkan kursor di akhir teks
            const len = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(len, len);
        }
    }, [autoFocus]);

    const canSubmit = value.trim().length > 0 && !posting;

    const handleSubmit = async () => {
        if (!canSubmit) return;
        const result = await onSubmit(value.trim());
        // Jika berhasil (bukan null/false), kosongkan input
        if (result !== null && result !== false) {
            setValue("");
            if (textareaRef.current) textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e) => {
        // Ctrl/Cmd + Enter untuk kirim cepat
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className={compact ? "w-full" : "grid grid-cols-[auto_1fr] gap-2.5 sm:gap-3 w-full"}>
            {!compact && (
                <div className="pt-1">
                    <CommentAvatar src={avatarSrc} name={displayName} />
                </div>
            )}

            <div className="min-w-0">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => { setValue(e.target.value); autoResize(); }}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder={placeholder}
                    className={`w-full min-w-[150px] resize-none rounded-xl border px-3 py-2.5 text-[13px] sm:text-sm leading-relaxed outline-none transition-colors duration-200 placeholder:opacity-60 ${
                        isDark
                            ? "bg-[#0c0406] border-[#2a1117] text-slate-100 focus:border-[#ff1e56]/50"
                            : "bg-white border-slate-200 text-slate-800 focus:border-[#ff1e56]/50"
                    }`}
                />

                <div className="flex items-center justify-end gap-2 mt-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-colors duration-200 ${
                                isDark ? "text-slate-400 hover:bg-white/5" : "text-slate-500 hover:bg-slate-100"
                            }`}
                        >
                            Batal
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        // Tambahkan 'flex items-center justify-center' di bawah ini
                        className={`px-4 py-1.5 flex items-center justify-center rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                            compact ? "" : ""
                        } bg-linear-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white shadow-md shadow-red-600/20 hover:shadow-red-600/30 active:scale-95`}
                    >
                        {posting ? (
                            <>
                                {/* Animasi Spinner SVG */}
                                <svg className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Mengirim...
                            </>
                        ) : (
                            submitLabel
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}