import { SearchX } from "lucide-react";

export default function ErrorState({ isDark }) {
    return (
        <div className="relative flex flex-col items-center justify-center gap-2 py-10 sm:py-14 px-6 text-center shrink-0">
            <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${isDark ? "bg-red-500/10 border border-red-500/20" : "bg-red-50 border border-red-200"}`}
            >
                <SearchX
                    className={`w-5 h-5 ${isDark ? "text-red-400" : "text-red-500"}`}
                />
            </div>
            <p
                className={`text-sm font-black ${isDark ? "text-slate-200" : "text-slate-800"}`}
            >
                Gagal Memuat
            </p>
            <p
                className={`text-[11px] font-medium max-w-[200px] ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
                Terjadi kesalahan. Silakan coba lagi.
            </p>
            <button
                onClick={() => window.location.reload()}
                className={`mt-2 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all active:scale-95
                    ${isDark
                        ? "bg-[#ff1e56]/10 text-[#ff1e56] border border-[#ff1e56]/20 hover:bg-[#ff1e56]/20"
                        : "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                    }`}
            >
                Coba Lagi
            </button>
        </div>
    );
}
