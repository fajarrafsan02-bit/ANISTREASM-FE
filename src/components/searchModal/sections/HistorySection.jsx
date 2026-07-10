import { History, Trash2, Sparkles, Clock, Loader2, X } from "lucide-react";
import { TYPE_ICON, TYPE_GRADIENT } from "../constants";

export default function HistorySection({
    isDark,
    isLoggedIn,
    history,
    historyLoading,
    onSelectHistory,
    onDeleteOne,
    onDeleteAll,
}) {
    return (
        <div className="flex flex-col min-h-0 flex-1 relative">
            {/* Header */}
            <div
                className={`relative flex items-center justify-between px-4 sm:px-5 py-3 border-b shrink-0 ${isDark ? "border-[#2a1117]/60" : "border-slate-100"}`}
            >
                <div className="flex items-center gap-2">
                    <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "bg-[#ff1e56]/10 border border-[#ff1e56]/20" : "bg-rose-50 border border-rose-200"}`}
                    >
                        <History
                            className={`w-3.5 h-3.5 ${isDark ? "text-[#ff1e56]" : "text-rose-500"}`}
                        />
                    </div>
                    <div>
                        <p
                            className={`text-xs font-black uppercase tracking-wider ${isDark ? "text-slate-200" : "text-slate-800"}`}
                        >
                            Riwayat Pencarian
                        </p>
                        <p
                            className={`text-[9px] font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}
                        >
                            {history.length} item tersimpan
                        </p>
                    </div>
                </div>
                {isLoggedIn && history.length > 0 && (
                    <button
                        type="button"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteAll();
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 active:scale-95
                            ${isDark
                                ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                                : "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100"
                            }`}
                    >
                        <Trash2 className="w-3 h-3" />
                        <span className="hidden sm:inline">Hapus</span>
                    </button>
                )}
            </div>

            {/* Not logged in */}
            {!isLoggedIn && !historyLoading && (
                <div className="relative flex flex-col items-center justify-center gap-3 py-12 sm:py-16 px-6 text-center shrink-0">
                    <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-white/5 border border-white/10" : "bg-slate-100 border border-slate-200"}`}
                    >
                        <Sparkles
                            className={`w-6 h-6 ${isDark ? "text-[#ff1e56]/60" : "text-rose-400"}`}
                        />
                    </div>
                    <div>
                        <p
                            className={`text-sm font-black ${isDark ? "text-slate-200" : "text-slate-800"}`}
                        >
                            Login untuk Riwayat
                        </p>
                        <p
                            className={`text-[11px] font-medium mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                        >
                            Simpan & kelola pencarian favoritmu
                        </p>
                    </div>
                </div>
            )}

            {/* Loading */}
            {historyLoading && (
                <div className="relative flex items-center justify-center gap-2 py-12 sm:py-16 shrink-0">
                    <Loader2 className="w-4 h-4 text-[#ff1e56] animate-spin" />
                    <span
                        className={`text-xs font-bold ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                        Memuat riwayat...
                    </span>
                </div>
            )}

            {/* Empty history */}
            {isLoggedIn && !historyLoading && history.length === 0 && (
                <div className="relative flex flex-col items-center justify-center gap-3 py-12 sm:py-16 px-6 text-center shrink-0">
                    <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-white/5 border border-white/10" : "bg-slate-100 border border-slate-200"}`}
                    >
                        <Clock
                            className={`w-6 h-6 ${isDark ? "text-slate-600" : "text-slate-400"}`}
                        />
                    </div>
                    <div>
                        <p
                            className={`text-sm font-black ${isDark ? "text-slate-200" : "text-slate-800"}`}
                        >
                            Belum Ada Riwayat
                        </p>
                        <p
                            className={`text-[11px] font-medium mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                        >
                            Cari anime favoritmu sekarang!
                        </p>
                    </div>
                </div>
            )}

            {/* History list */}
            {isLoggedIn && !historyLoading && history.length > 0 && (
                <ul className="overflow-y-auto flex-1 overscroll-contain py-1">
                    {history.map((item, i) => {
                        const TypeIcon = TYPE_ICON[item.type] ?? TYPE_ICON.Special;
                        const typeStyle =
                            TYPE_GRADIENT[item.type] ?? TYPE_GRADIENT.Special;
                        return (
                            <li key={item.id ?? item.animeId} className="px-2">
                                <div className="relative flex items-center group rounded-xl transition-all duration-200 hover:scale-[1.01]">
                                    <button
                                        type="button"
                                        onPointerDown={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectHistory(item);
                                        }}
                                        className={`
                                            flex-1 flex items-center gap-3 px-3 py-2.5 sm:py-3 text-left rounded-xl
                                            transition-all duration-200 min-w-0 touch-manipulation
                                            ${isDark
                                                ? "hover:bg-white/[0.03] active:bg-white/[0.06]"
                                                : "hover:bg-slate-50 active:bg-slate-100"
                                            }
                                        `}
                                    >
                                        <div
                                            className={`shrink-0 w-10 h-14 sm:w-11 sm:h-[58px] rounded-xl overflow-hidden border ${isDark ? "border-white/5" : "border-slate-200"} shadow-md`}
                                        >
                                            {item.poster ? (
                                                <img
                                                    src={item.poster}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div
                                                    className={`w-full h-full flex items-center justify-center ${isDark ? "bg-zinc-800" : "bg-slate-100"}`}
                                                >
                                                    <TypeIcon
                                                        className={`w-4 h-4 ${isDark ? "text-slate-600" : "text-slate-400"}`}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 overflow-hidden">
                                            <p
                                                className={`text-[13px] font-black truncate leading-snug ${isDark ? "text-slate-100" : "text-slate-800"}`}
                                            >
                                                {item.title}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border bg-linear-to-r ${typeStyle}`}
                                                >
                                                    <TypeIcon className="w-2.5 h-2.5" />
                                                    {item.type}
                                                </span>
                                                <span
                                                    className={`flex items-center gap-1 text-[10px] font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}
                                                >
                                                    <History className="w-2.5 h-2.5" />
                                                    {item.keyword}
                                                </span>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onPointerDown={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteOne(item.id);
                                        }}
                                        className={`
                                            mr-1 p-2 rounded-xl shrink-0 touch-manipulation
                                            sm:opacity-0 sm:group-hover:opacity-100
                                            transition-all duration-200 active:scale-90
                                            ${isDark
                                                ? "hover:bg-red-500/10 text-slate-600 hover:text-red-400 sm:text-slate-700"
                                                : "hover:bg-red-50 text-slate-400 hover:text-red-500 sm:text-slate-300"
                                            }
                                        `}
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                {i < history.length - 1 && (
                                    <div
                                        className={`mx-4 h-px ${isDark ? "bg-white/[0.03]" : "bg-slate-50"}`}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
