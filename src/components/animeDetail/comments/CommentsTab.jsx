import { useTheme } from "../../../context/ThemeContext";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";

const SORT_OPTIONS = [
    { id: "newest", label: "Terbaru" },
    { id: "oldest", label: "Terlama" },
    { id: "popular", label: "Populer" },
];

// Ambil nama & avatar user aktif (mengikuti pola ProfileHeader).
function getMyName(user) {
    return user?.username || user?.name || user?.email?.split("@")[0] || "Pengguna";
}
function getMyAvatar(user) {
    return user?.profil?.avatar || user?.profile?.avatar || user?.avatar || null;
}

export default function CommentsTab({ commentsApi }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const {
        comments,
        total,
        sort,
        loading,
        loadingMore,
        posting,
        hasMore,
        currentUser,
        isLoggedIn,
        changeSort,
        loadMore,
        addComment,
        editComment,
        deleteComment,
        toggleLike,
        fetchReplies,
        isLiked,
    } = commentsApi;

    const cardBaseClass = isDark
        ? "bg-[#0d0407]/90 border border-[#2a1117]/80 shadow-2xl backdrop-blur-xl"
        : "bg-white border border-slate-200 shadow-xl";
    const cornerBorderClass = isDark ? "border-red-900/15" : "border-slate-300/50";

    const handleAddMain = (content) => addComment({ content, parentId: null });

    // Props aksi yang diteruskan ke setiap CommentItem.
    const itemActions = {
        currentUser,
        toggleLike,
        isLiked,
        editComment,
        deleteComment,
        addComment,
        fetchReplies,
        posting,
    };

    return (
        <>
            <style>{`
                @keyframes da-fadeIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            
        <div className="relative group">
            {/* Ambient glow */}
            <div
                className={`absolute -inset-1 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-700 ${
                    isDark
                        ? "bg-linear-to-br from-red-900/20 via-transparent to-red-950/15"
                        : "bg-linear-to-br from-rose-200/40 via-transparent to-slate-100/30"
                }`}
            />

            <div
                className={`relative rounded-2xl p-3 max-[320px]:p-2.5 sm:p-5 overflow-hidden transition-colors duration-300 ${cardBaseClass}`}
            >
                {/* Top gradient line */}
                <div
                    className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent ${
                        isDark ? "via-red-900/40" : "via-slate-300"
                    } to-transparent`}
                />

                {/* Corner accents */}
                <div className={`absolute top-2 left-2 border-l border-t ${cornerBorderClass} w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-tl-sm`} />
                <div className={`absolute top-2 right-2 border-r border-t ${cornerBorderClass} w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-tr-sm`} />
                <div className={`absolute bottom-2 left-2 border-l border-b ${cornerBorderClass} w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-bl-sm`} />
                <div className={`absolute bottom-2 right-2 border-r border-b ${cornerBorderClass} w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-br-sm`} />

                {/* ── Header ── */}
                <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-5">
                    <div className="flex items-center gap-2 min-w-0">
                        <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                isDark
                                    ? "bg-linear-to-br from-[#1a0a0f] to-[#0f0508] border border-red-950/50 shadow-[0_0_12px_rgba(255,30,86,0.08)]"
                                    : "bg-white border border-slate-200 shadow-sm"
                            }`}
                        >
                            <i className="fa-solid fa-comments text-[10px] sm:text-xs text-[#ff1e56]" />
                        </div>
                        <div className="min-w-0">
                            <h4 className={`font-black text-[11px] sm:text-sm tracking-tight flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-800"}`}>
                                Komentar
                                <span
                                    className={`border text-[7px] sm:text-[8px] px-1 py-px sm:px-1.5 sm:py-0.5 rounded font-black ${
                                        isDark
                                            ? "bg-[#ff1e56]/10 text-[#ff1e56] border-[#ff1e56]/20"
                                            : "bg-rose-50 text-[#ff1e56] border-rose-300/50"
                                    }`}
                                >
                                    {total}
                                </span>
                            </h4>
                            <p className={`text-[9px] sm:text-[11px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                Bagikan pendapatmu tentang anime ini
                            </p>
                        </div>
                    </div>

                    {/* Sort selector */}
                    <div
                        className={`flex items-center gap-0.5 p-0.5 rounded-lg border shrink-0 ${
                            isDark ? "bg-[#070204] border-[#2a1117]" : "bg-slate-100 border-slate-200"
                        }`}
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => changeSort(opt.id)}
                                className={`px-2 py-1 rounded-md text-[9px] sm:text-[10px] font-bold transition-all duration-200 ${
                                    sort === opt.id
                                        ? "bg-linear-to-r from-red-500 to-rose-500 text-white shadow-[0_0_10px_rgba(255,30,86,0.2)]"
                                        : isDark
                                        ? "text-slate-500 hover:text-slate-300"
                                        : "text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Form komentar utama ── */}
                <div className={`pb-4 sm:pb-5 mb-4 sm:mb-5 border-b ${isDark ? "border-[#2a1117]/50" : "border-slate-200"}`}>
                    {isLoggedIn ? (
                        <CommentForm
                            avatarSrc={getMyAvatar(currentUser)}
                            displayName={getMyName(currentUser)}
                            placeholder="Tulis komentar..."
                            posting={posting}
                            onSubmit={handleAddMain}
                        />
                    ) : (
                        // Tetap tampilkan form; addComment akan memicu modal login bila belum masuk.
                        <CommentForm
                            placeholder="Login untuk menulis komentar..."
                            posting={posting}
                            onSubmit={handleAddMain}
                        />
                    )}
                </div>

                {/* ── Daftar komentar ── */}
                {loading ? (
                    <CommentSkeleton />
                ) : comments.length > 0 ? (
                    <div className="da-fadeIn">
                        <div className="space-y-5 sm:space-y-6">
                            {comments.map((comment) => (
                                <CommentItem key={comment.id} comment={comment} {...itemActions} />
                            ))}
                        </div>

                        {/* Load more */}
                        {hasMore && (
                            <div className="flex justify-center mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    onClick={loadMore}
                                    disabled={loadingMore}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] sm:text-xs font-bold border transition-all duration-200 active:scale-95 disabled:opacity-50 ${
                                        isDark
                                            ? "bg-[#13080c] hover:bg-[#1a0a10] border-[#2a1117] hover:border-red-900/40 text-slate-400 hover:text-white"
                                            : "bg-white hover:bg-slate-50 border-slate-300 hover:border-rose-300/50 text-slate-500 hover:text-slate-800"
                                    }`}
                                >
                                    {loadingMore ? (
                                        <>
                                            <i className="fa-solid fa-spinner fa-spin" /> Memuat...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-arrow-down" /> Muat lebih banyak
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-10 text-center da-fadeIn">
                        <div
                            className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2.5 ${
                                isDark ? "bg-[#1a0a0f] border border-[#2a1117]" : "bg-slate-100 border border-slate-200"
                            }`}
                        >
                            <i className={`fa-regular fa-comment-dots text-sm ${isDark ? "text-slate-700" : "text-slate-400"}`} />
                        </div>
                        <p className={`text-[11px] sm:text-xs font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                            Belum ada komentar. Jadilah yang pertama!
                        </p>
                    </div>
                )}

                {/* Bottom glow */}
                <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 blur-3xl rounded-full pointer-events-none ${
                        isDark ? "bg-red-900/5" : "bg-rose-100/20"
                    }`}
                />
            </div>
        </div>
        </>
    );
}
