import { Loader2 } from "lucide-react";

export default function LoadingState({ isDark }) {
    return (
        <div className="relative flex flex-col items-center justify-center gap-3 py-10 sm:py-14 shrink-0">
            <div className="relative">
                <div
                    className={`absolute inset-0 rounded-full blur-xl ${isDark ? "bg-[#ff1e56]/20" : "bg-rose-400/15"} animate-pulse`}
                />
                <Loader2 className="relative w-6 h-6 text-[#ff1e56] animate-spin" />
            </div>
            <div className="flex flex-col items-center gap-1">
                <span
                    className={`text-xs font-black uppercase tracking-[0.2em] ${isDark ? "text-slate-300" : "text-slate-700"}`}
                >
                    Mencari anime...
                </span>
                <span
                    className={`text-[10px] font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}
                >
                    Mohon tunggu sebentar
                </span>
            </div>
        </div>
    );
}
