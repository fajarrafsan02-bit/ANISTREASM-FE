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

/**
 * Satu item komentar (komentar utama maupun balasan).
 * Props utama diteruskan langsung dari useComments lewat CommentsTab.
 *  - comment       : objek komentar { id, content, createdAt, updatedAt, user, _count }
 *  - isReply       : true bila item ini adalah balasan (tanpa tombol balas & tanpa daftar balasan)
 *  - parentId      : id komentar induk (untuk penghapusan balasan)
 *  - currentUser   : user yang sedang login (untuk cek kepemilikan)
 *  - actions dari hook: toggleLike, isLiked, editComment, deleteComment, addComment, fetchReplies, posting
 */
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
    const [showReplyForm, setShowReplyForm] = useState(false);

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
        const result = await editComment(comment.id, content);
        if (result) setIsEditing(false);
        return result;
    };

    const handleDelete = async () => {
        if (!window.confirm("Hapus komentar ini?")) return;
        await deleteComment(comment.id, { isReply, parentId });
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
                            className={`text-[7px] sm:text-[8px] font-black tracking-wider uppercase px-1.5 py-[1px] rounded ${
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
                            posting={posting}
                            onSubmit={handleEditSubmit}
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                ) : (
                    <p
                        className={`mt-1 text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${contentColor}`}
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
                            <i className={`${liked ? "fa-solid" : "fa-regular"} fa-heart`} />
                            {likeCount > 0 && <span>{likeCount}</span>}
                        </button>

                        {/* Balas (hanya komentar utama) */}
                        {!isReply && (
                            <button
                                type="button"
                                onClick={() => setShowReplyForm((prev) => !prev)}
                                className={`${actionBase} ${actionIdle}`}
                            >
                                <i className="fa-solid fa-reply" />
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
                                    <i className="fa-solid fa-pen" />
                                    <span className="hidden sm:inline">Edit</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className={`${actionBase} ${
                                        isDark ? "text-slate-500 hover:text-red-400" : "text-slate-400 hover:text-red-500"
                                    }`}
                                >
                                    <i className="fa-solid fa-trash" />
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
                        <i
                            className={`fa-solid ${
                                loadingReplies
                                    ? "fa-spinner fa-spin"
                                    : showReplies
                                    ? "fa-chevron-up"
                                    : "fa-chevron-down"
                            }`}
                        />
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
        </div>
    );
}
