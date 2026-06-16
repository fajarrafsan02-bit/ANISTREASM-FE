import { useRef, useEffect } from "react";
import { X, Loader2, SearchX, Tv2, Film, Clapperboard, History, Trash2, Sparkles, TrendingUp, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import useSearchHistory from "../hooks/useSearchHistory";

const TYPE_ICON = {
    TV: Tv2,
    Movie: Film,
    OVA: Clapperboard,
    ONA: Clapperboard,
    Special: Clapperboard,
};

const TYPE_GRADIENT = {
    TV: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/20",
    Movie: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/20",
    OVA: "from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/20",
    ONA: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/20",
    Special: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/20",
};

export default function SearchModal({ isOpen, results, phase, query, onClose, isDark }) {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { history, historyLoading, saveHistory, deleteOne, deleteAll } = useSearchHistory();

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const showHistory = phase === "idle";
    const showResults = phase === "results" && results.length > 0;
    const isEmpty = phase === "results" && results.length === 0;
    const isLoading = phase === "loading";
    const error = phase === "error";

    const handleSelectAnime = (anime) => {
        if (!anime?.animeId) return;
        if (isLoggedIn) {
            saveHistory({
                keyword: query || anime.title,
                animeId: anime.animeId,
                title: anime.title,
                poster: anime.poster ?? null,
                type: anime.type ?? null,
            });
        }
        navigate(`/anime/${anime.animeId}`);
        onClose();
    };

    const handleSelectHistory = (item) => {
        navigate(`/anime/${item.animeId}`);
        onClose();
    };

    return (
        <>
            {/* ── BACKDROP ── */}
            <div
                onClick={onClose}
                className="fixed inset-0 z-40"
                style={{
                    background: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
                    animation: "modalFadeIn 0.2s ease-out",
                }}
            />

            {/* ── MODAL ── */}
            {/* 
                POSISI BARU: 
                - Mobile: top-20 (80px) supaya search input tetap kelihatan
                - Desktop: absolute di bawah search bar (mt-2)
            */}
            <div
                ref={modalRef}
                tabIndex={-1}
                className={`
                    fixed z-50
                    left-3 right-3
                    top-20
                    max-h-[70vh]
                    md:absolute md:top-full md:mt-2 md:left-0 md:right-0
                    md:max-h-[480px] md:min-w-[380px] md:max-w-[440px]
                    rounded-2xl overflow-hidden
                    border
                    ${isDark
                        ? "bg-[#13080c] border-[#2a1117]/80"
                        : "bg-white border-slate-200"
                    }
                `}
                style={{
                    boxShadow: isDark
                        ? "0 25px 50px -12px rgba(0,0,0,0.9), 0 0 40px rgba(255,30,86,0.08)"
                        : "0 25px 50px -12px rgba(0,0,0,0.2), 0 0 40px rgba(255,30,86,0.04)",
                    animation: "modalSlideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {/* Top glow line */}
                <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? "bg-gradient-to-r from-transparent via-[#ff1e56]/30 to-transparent" : "bg-gradient-to-r from-transparent via-rose-300/50 to-transparent"}`} />

                {/* Corner accents */}
                <div className={`absolute top-3 left-3 w-4 h-4 border-l border-t rounded-tl-md ${isDark ? "border-[#ff1e56]/15" : "border-rose-300/30"}`} />
                <div className={`absolute top-3 right-3 w-4 h-4 border-r border-t rounded-tr-md ${isDark ? "border-[#ff1e56]/15" : "border-rose-300/30"}`} />

                {/* ── LOADING ── */}
                {isLoading && (
                    <div className="relative flex flex-col items-center justify-center gap-3 py-10 sm:py-14 shrink-0">
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-full blur-xl ${isDark ? "bg-[#ff1e56]/20" : "bg-rose-400/15"} animate-pulse`} />
                            <Loader2 className="relative w-6 h-6 text-[#ff1e56] animate-spin" />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className={`text-xs font-black uppercase tracking-[0.2em] ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                Mencari anime...
                            </span>
                            <span className={`text-[10px] font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                Mohon tunggu sebentar
                            </span>
                        </div>
                    </div>
                )}

                {/* ── ERROR ── */}
                {error && !isLoading && (
                    <div className="relative flex flex-col items-center justify-center gap-2 py-10 sm:py-14 px-6 text-center shrink-0">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${isDark ? "bg-red-500/10 border border-red-500/20" : "bg-red-50 border border-red-200"}`}>
                            <SearchX className={`w-5 h-5 ${isDark ? "text-red-400" : "text-red-500"}`} />
                        </div>
                        <p className={`text-sm font-black ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                            Gagal Memuat
                        </p>
                        <p className={`text-[11px] font-medium max-w-[200px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
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
                )}

                {/* ── EMPTY SEARCH ── */}
                {isEmpty && (
                    <div className="relative flex flex-col items-center justify-center gap-2 py-10 sm:py-14 px-6 text-center shrink-0">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${isDark ? "bg-white/5 border border-white/10" : "bg-slate-100 border border-slate-200"}`}>
                            <SearchX className={`w-5 h-5 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                        </div>
                        <p className={`text-sm font-black ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                            Anime Tidak Ditemukan
                        </p>
                        <p className={`text-[11px] font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            Coba gunakan kata kunci lain
                        </p>
                    </div>
                )}

                {/* ── HISTORY ── */}
                {showHistory && (
                    <div className="flex flex-col min-h-0 flex-1 relative">
                        {/* Header */}
                        <div className={`relative flex items-center justify-between px-4 sm:px-5 py-3 border-b shrink-0 ${isDark ? "border-[#2a1117]/60" : "border-slate-100"}`}>
                            <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "bg-[#ff1e56]/10 border border-[#ff1e56]/20" : "bg-rose-50 border border-rose-200"}`}>
                                    <History className={`w-3.5 h-3.5 ${isDark ? "text-[#ff1e56]" : "text-rose-500"}`} />
                                </div>
                                <div>
                                    <p className={`text-xs font-black uppercase tracking-wider ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                        Riwayat Pencarian
                                    </p>
                                    <p className={`text-[9px] font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                        {history.length} item tersimpan
                                    </p>
                                </div>
                            </div>
                            {isLoggedIn && history.length > 0 && (
                                <button
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={deleteAll}
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

                        {!isLoggedIn && !historyLoading && (
                            <div className="relative flex flex-col items-center justify-center gap-3 py-12 sm:py-16 px-6 text-center shrink-0">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-white/5 border border-white/10" : "bg-slate-100 border border-slate-200"}`}>
                                    <Sparkles className={`w-6 h-6 ${isDark ? "text-[#ff1e56]/60" : "text-rose-400"}`} />
                                </div>
                                <div>
                                    <p className={`text-sm font-black ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                        Login untuk Riwayat
                                    </p>
                                    <p className={`text-[11px] font-medium mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                        Simpan & kelola pencarian favoritmu
                                    </p>
                                </div>
                            </div>
                        )}

                        {historyLoading && (
                            <div className="relative flex items-center justify-center gap-2 py-12 sm:py-16 shrink-0">
                                <Loader2 className="w-4 h-4 text-[#ff1e56] animate-spin" />
                                <span className={`text-xs font-bold ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                    Memuat riwayat...
                                </span>
                            </div>
                        )}

                        {isLoggedIn && !historyLoading && history.length === 0 && (
                            <div className="relative flex flex-col items-center justify-center gap-3 py-12 sm:py-16 px-6 text-center shrink-0">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-white/5 border border-white/10" : "bg-slate-100 border border-slate-200"}`}>
                                    <Clock className={`w-6 h-6 ${isDark ? "text-slate-600" : "text-slate-400"}`} />
                                </div>
                                <div>
                                    <p className={`text-sm font-black ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                        Belum Ada Riwayat
                                    </p>
                                    <p className={`text-[11px] font-medium mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                        Cari anime favoritmu sekarang!
                                    </p>
                                </div>
                            </div>
                        )}

                        {isLoggedIn && !historyLoading && history.length > 0 && (
                            <ul className="overflow-y-auto flex-1 overscroll-contain py-1">
                                {history.map((item, i) => {
                                    const TypeIcon = TYPE_ICON[item.type] ?? Clapperboard;
                                    const typeStyle = TYPE_GRADIENT[item.type] ?? TYPE_GRADIENT.Special;
                                    return (
                                        <li key={item.id ?? item.animeId} className="px-2">
                                            <div className="relative flex items-center group rounded-xl transition-all duration-200 hover:scale-[1.01]">
                                                <button
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={() => handleSelectHistory(item)}
                                                    className={`
                                                        flex-1 flex items-center gap-3 px-3 py-2.5 sm:py-3 text-left rounded-xl
                                                        transition-all duration-200 min-w-0
                                                        ${isDark
                                                            ? "hover:bg-white/[0.03] active:bg-white/[0.06]"
                                                            : "hover:bg-slate-50 active:bg-slate-100"
                                                        }
                                                    `}
                                                >
                                                    <div className={`shrink-0 w-10 h-14 sm:w-11 sm:h-[58px] rounded-xl overflow-hidden border ${isDark ? "border-white/5" : "border-slate-200"} shadow-md`}>
                                                        {item.poster ? (
                                                            <img src={item.poster} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                                                        ) : (
                                                            <div className={`w-full h-full flex items-center justify-center ${isDark ? "bg-zinc-800" : "bg-slate-100"}`}>
                                                                <TypeIcon className={`w-4 h-4 ${isDark ? "text-slate-600" : "text-slate-400"}`} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0 overflow-hidden">
                                                        <p className={`text-[13px] font-black truncate leading-snug ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                                                            {item.title}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border bg-gradient-to-r ${typeStyle}`}>
                                                                <TypeIcon className="w-2.5 h-2.5" />
                                                                {item.type}
                                                            </span>
                                                            <span className={`flex items-center gap-1 text-[10px] font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                                                <History className="w-2.5 h-2.5" />
                                                                {item.keyword}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>

                                                <button
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={() => deleteOne(item.id)}
                                                    className={`
                                                        mr-1 p-2 rounded-xl shrink-0
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
                                                <div className={`mx-4 h-px ${isDark ? "bg-white/[0.03]" : "bg-slate-50"}`} />
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                )}

                {/* ── SEARCH RESULTS ── */}
                {showResults && (
                    <div className="flex flex-col min-h-0 flex-1 relative">
                        <div className={`relative flex items-center justify-between px-4 sm:px-5 py-3 border-b shrink-0 ${isDark ? "border-[#2a1117]/60" : "border-slate-100"}`}>
                            <div className="flex items-center gap-2 min-w-0">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "bg-[#ff1e56]/10 border border-[#ff1e56]/20" : "bg-rose-50 border border-rose-200"}`}>
                                    <TrendingUp className={`w-3.5 h-3.5 ${isDark ? "text-[#ff1e56]" : "text-rose-500"}`} />
                                </div>
                                <div className="min-w-0">
                                    <p className={`text-xs font-black uppercase tracking-wider truncate ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                        {results.length} Hasil Ditemukan
                                    </p>
                                    <p className={`text-[9px] font-medium truncate ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                        untuk &ldquo;{query}&rdquo;
                                    </p>
                                </div>
                            </div>
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={onClose}
                                className={`
                                    p-2 rounded-xl transition-all duration-200 active:scale-90 shrink-0 ml-2
                                    ${isDark
                                        ? "hover:bg-white/5 text-slate-500 hover:text-slate-300"
                                        : "hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                                    }
                                `}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <ul className="overflow-y-auto flex-1 overscroll-contain py-1">
                            {results.map((anime, i) => {
                                const TypeIcon = TYPE_ICON[anime.type] ?? Clapperboard;
                                const typeStyle = TYPE_GRADIENT[anime.type] ?? TYPE_GRADIENT.Special;
                                return (
                                    <li key={anime.animeId ?? i} className="px-2">
                                        <button
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => handleSelectAnime(anime)}
                                            className={`
                                                w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 text-left rounded-xl
                                                transition-all duration-200 hover:scale-[1.01]
                                                ${isDark
                                                    ? "hover:bg-white/[0.03] active:bg-white/[0.06]"
                                                    : "hover:bg-slate-50 active:bg-slate-100"
                                                }
                                            `}
                                        >
                                            <div className={`shrink-0 w-11 h-[58px] sm:w-12 sm:h-16 rounded-xl overflow-hidden border shadow-md ${isDark ? "border-white/5" : "border-slate-200"}`}>
                                                {anime.poster ? (
                                                    <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover" loading="lazy" />
                                                ) : (
                                                    <div className={`w-full h-full flex items-center justify-center ${isDark ? "bg-zinc-800" : "bg-slate-100"}`}>
                                                        <TypeIcon className={`w-4 h-4 ${isDark ? "text-slate-600" : "text-slate-400"}`} />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0 overflow-hidden">
                                                <p className={`text-[13px] font-black truncate leading-snug ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                                                    {anime.title}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border bg-gradient-to-r ${typeStyle}`}>
                                                        <TypeIcon className="w-2.5 h-2.5" />
                                                        {anime.type}
                                                    </span>
                                                    {anime.score && (
                                                        <span className={`flex items-center gap-0.5 text-[10px] font-bold ${isDark ? "text-amber-400" : "text-amber-600"}`}>
                                                            <span className="text-amber-400">★</span>
                                                            {anime.score}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-1.5">
                                                    {anime.genres?.slice(0, 3).map(genre => (
                                                        <span key={genre} className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold ${isDark ? "bg-white/[0.04] text-slate-500 border border-white/5" : "bg-slate-100 text-slate-500 border border-slate-200"}`}>
                                                            {genre}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </button>
                                        {i < results.length - 1 && (
                                            <div className={`mx-4 h-px ${isDark ? "bg-white/[0.03]" : "bg-slate-50"}`} />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>

            {/* ── GLOBAL KEYFRAMES ── */}
            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalSlideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}