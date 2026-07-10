import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { formatRelativeTime } from "../../../utils/timeFormat";
import CommentForm, { CommentAvatar } from "./CommentForm";

// Ambil nama tampilan penulis komentar secara defensif (mengikuti pola ProfileHeader).
function getAuthorName(user) {
    return user?.username || user?.name || user?.email?.split("@")[0] || "Pengguna";
}

// Ambil URL avatar penulis dari berbagai kemungkinan bentuk data.
function getAuthorAvatar(user) {
    return (
        user?.profil?.avatar ||
        user?.profile?.avatar ||
        user?.avatar ||
        null
    );
}

export default function CommentItem({
    comment,
    isReply = false,
    parentId = null,
    currentUser,
    toggleLike,
    isLiked,
    editComment,
    deleteComment,
    addComment,
    fetchReplies,
    posting,
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingLoading, setIsEditingLoading] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false); // State untuk loading penghapusan

    // State lokal balasan (dimuat sesuai permintaan lewat fetchReplies).
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const [repliesLoaded, setRepliesLoaded] = useState(false);

    const author = comment.user || comment.author || {};
    const authorName = getAuthorName(author);
    const authorAvatar = getAuthorAvatar(author);

    const authorId = author.id ?? comment.userId;
    const isOwner =
        currentUser && authorId != null && String(currentUser.id) === String(authorId);

    const liked = isLiked?.(comment.id) ?? false;
    const likeCount = comment._count?.likes ?? 0;
    const replyCount = comment._count?.replies ?? 0;
    const isEdited =
        comment.updatedAt &&
        comment.createdAt &&
        new Date(comment.updatedAt).getTime() - new Date(comment.createdAt).getTime() > 1000;

    // ── Handler ──────────────────────────────────────────────
    const handleEditSubmit = async (content) => {
        setIsEditingLoading(true);
        try {
            const result = await editComment(comment.id, content);
            if (result) setIsEditing(false);
            return result;
        } finally {
            setIsEditingLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            // Panggil fungsi hapus dari parent
            await deleteComment(comment.id, { isReply, parentId });
            // Tutup modal setelah penghapusan berhasil
            setShowDeleteConfirm(false);
        } catch (error) {
            console.error("Gagal menghapus komentar:", error);
        } finally {
            // Matikan loading apapun yang terjadi (sukses/gagal)
            setIsDeleting(false);
        }
    };

    const handleReplySubmit = async (content) => {
        const created = await addComment({ content, parentId: comment.id });
        if (created) {
            setReplies((prev) => [...prev, created]);
            setShowReplies(true);
            setRepliesLoaded(true);
            setShowReplyForm(false);
        }
        return created;
    };

    const handleToggleReplies = async () => {
        // Jika sudah pernah dimuat, cukup buka/tutup.
        if (repliesLoaded) {
            setShowReplies((prev) => !prev);
            return;
        }
        setLoadingReplies(true);
        const fetched = await fetchReplies(comment.id);
        setReplies(fetched);
        setRepliesLoaded(true);
        setShowReplies(true);
        setLoadingReplies(false);
    };

    // Hapus balasan dari daftar lokal saat balasan dihapus dari dalam CommentItem anak.
    const handleReplyDeleted = (replyId) => {
        setReplies((prev) => prev.filter((r) => r.id !== replyId));
    };

    // Warna & kelas berulang
    const nameColor = isDark ? "text-slate-100" : "text-slate-800";
    const metaColor = isDark ? "text-slate-500" : "text-slate-400";
    const contentColor = isDark ? "text-slate-300" : "text-slate-600";
    const actionBase = `inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold transition-colors duration-200`;
    const actionIdle = isDark
        ? "text-slate-500 hover:text-slate-200"
        : "text-slate-400 hover:text-slate-700";

    // Custom Alert Component (Diperkecil & Ditambah Loading)
    const DeleteConfirmationModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
            <div className={`${isDark ? "bg-[#0c0406]" : "bg-white"} p-5 rounded-2xl shadow-2xl w-full max-w-[320px] border ${isDark ? "border-[#2a1117]" : "border-slate-100"} transform scale-95 animate-in fade-in duration-200`}>
                <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${isDark ? "bg-[#ff1e56]/10" : "bg-rose-50"}`}>
                        <svg className={`w-5 h-5 ${isDark ? "text-[#ff1e56]" : "text-rose-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                        </svg>
                    </div>
                    <h3 className={`text-base font-bold mb-1.5 ${nameColor}`}>Hapus Komentar?</h3>
                    <p className={`text-[13px] mb-5 leading-relaxed ${contentColor}`}>
                        Tindakan ini permanen dan tidak dapat dibatalkan.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => setShowDeleteConfirm(false)}
                        className={`py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                            isDark 
                                ? "bg-[#2a1117] text-slate-300 hover:bg-[#3d1921] disabled:opacity-50" 
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50"
                        }`}
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={handleDelete}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold bg-[#ff1e56] text-white hover:bg-[#ff1e56]/90 transition-all shadow-md shadow-red-600/20 active:scale-95 disabled:opacity-80 disabled:active:scale-100"
                    >
                        {isDeleting ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                                    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                                <span>Menghapus...</span>
                            </>
                        ) : (
                            "Hapus"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex gap-2.5 sm:gap-3">
            <div className="pt-0.5">
                <CommentAvatar src={authorAvatar} name={authorName} size={isReply ? "sm" : "md"} />
            </div>

            <div className="flex-1 min-w-0">
                {/* Header: nama + waktu */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-bold text-[12px] sm:text-[13px] truncate ${nameColor}`}>
                        {authorName}
                    </span>
                    {isOwner && (
                        <span
                            className={`text-[7px] sm:text-[8px] font-black tracking-wider uppercase px-1.5 py-px rounded ${
                                isDark ? "bg-[#ff1e56]/10 text-[#ff1e56]" : "bg-rose-50 text-[#ff1e56]"
                            }`}
                        >
                            Anda
                        </span>
                    )}
                    <span className={`text-[10px] sm:text-[11px] ${metaColor}`}>
                        {formatRelativeTime(comment.createdAt)}
                        {isEdited && <span className="italic"> · diedit</span>}
                    </span>
                </div>

                {/* Isi komentar atau form edit */}
                {isEditing ? (
                    <div className="mt-2">
                        <CommentForm
                            compact
                            autoFocus
                            initialValue={comment.content}
                            submitLabel="Simpan"
                            placeholder="Ubah komentar..."
                            posting={posting || isEditingLoading}
                            onSubmit={handleEditSubmit}
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                ) : (
                    <p
                        className={`mt-1 text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap wrap-break-word ${contentColor}`}
                    >
                        {comment.content}
                    </p>
                )}

                {/* Baris aksi */}
                {!isEditing && (
                    <div className="flex items-center gap-3 sm:gap-4 mt-1.5">
                        {/* Like */}
                        <button
                            type="button"
                            onClick={() => toggleLike(comment.id)}
                            className={`${actionBase} ${
                                liked
                                    ? "text-[#ff1e56]"
                                    : actionIdle
                            }`}
                            aria-pressed={liked}
                        >
                            <svg
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill={liked ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            {likeCount > 0 && <span>{likeCount}</span>}
                        </button>

                        {/* Balas (hanya komentar utama) */}
                        {!isReply && (
                            <button
                                type="button"
                                onClick={() => setShowReplyForm((prev) => !prev)}
                                className={`${actionBase} ${actionIdle}`}
                            >
                                <svg
                                    className="w-3.5 h-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M10 8L4 12l6 4V13h7c3.31 0 6 2.69 6 6v1" />
                                </svg>
                                <span>Balas</span>
                            </button>
                        )}

                        {/* Edit & Hapus (hanya pemilik) */}
                        {isOwner && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className={`${actionBase} ${actionIdle}`}
                                >
                                    <svg
                                        className="w-3.5 h-3.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
                                        <path d="M12 20h9" />
                                    </svg>
                                    <span className="hidden sm:inline">Edit</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(true)} // Tampilkan alert
                                    className={`${actionBase} ${
                                        isDark ? "text-slate-500 hover:text-red-400" : "text-slate-400 hover:text-red-500"
                                    }`}
                                >
                                    <svg
                                        className="w-3.5 h-3.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                    </svg>
                                    <span className="hidden sm:inline">Hapus</span>
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* Form balasan */}
                {showReplyForm && !isReply && (
                    <div className="mt-3">
                        <CommentForm
                            compact
                            autoFocus
                            submitLabel="Balas"
                            placeholder={`Balas ${authorName}...`}
                            posting={posting}
                            onSubmit={handleReplySubmit}
                            onCancel={() => setShowReplyForm(false)}
                        />
                    </div>
                )}

                {/* Tombol lihat / sembunyikan balasan */}
                {!isReply && (replyCount > 0 || replies.length > 0) && (
                    <button
                        type="button"
                        onClick={handleToggleReplies}
                        disabled={loadingReplies}
                        className={`mt-2 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold transition-colors duration-200 ${
                            isDark ? "text-[#ff1e56]/80 hover:text-[#ff1e56]" : "text-rose-500 hover:text-rose-600"
                        } disabled:opacity-50`}
                    >
                        {loadingReplies ? (
                            <svg
                                className="w-3 h-3 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden
                            >
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        ) : showReplies ? (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        <span>
                            {showReplies
                                ? "Sembunyikan balasan"
                                : `Lihat ${replyCount || replies.length} balasan`}
                        </span>
                    </button>
                )}

                {/* Daftar balasan */}
                {showReplies && replies.length > 0 && (
                    <div
                        className={`mt-3 space-y-4 pl-3 sm:pl-4 border-l-2 ${
                            isDark ? "border-[#2a1117]" : "border-slate-200"
                        }`}
                    >
                        {replies.map((reply) => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                isReply
                                parentId={comment.id}
                                currentUser={currentUser}
                                toggleLike={toggleLike}
                                isLiked={isLiked}
                                editComment={editComment}
                                deleteComment={async (id, opts) => {
                                    const ok = await deleteComment(id, opts);
                                    if (ok) handleReplyDeleted(id);
                                    return ok;
                                }}
                                addComment={addComment}
                                fetchReplies={fetchReplies}
                                posting={posting}
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* Render modal konfirmasi */}
            {showDeleteConfirm && <DeleteConfirmationModal />}
        </div>
    );
}