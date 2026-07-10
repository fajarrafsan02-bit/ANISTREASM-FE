import { SearchX } from "lucide-react";

export default function EmptyState({ isDark }) {
    return (
        <div className="relative flex flex-col items-center justify-center gap-2 py-10 sm:py-14 px-6 text-center shrink-0">
            <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${isDark ? "bg-white/5 border border-white/10" : "bg-slate-100 border border-slate-200"}`}
            >
                <SearchX
                    className={`w-5 h-5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                />
            </div>
            <p
                className={`text-sm font-black ${isDark ? "text-slate-200" : "text-slate-800"}`}
            >
                Anime Tidak Ditemukan
            </p>
            <p
                className={`text-[11px] font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
                Coba gunakan kata kunci lain
            </p>
        </div>
    );
}
