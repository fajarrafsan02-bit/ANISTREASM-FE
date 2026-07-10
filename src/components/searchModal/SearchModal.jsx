import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useSearchHistory from "../../hooks/useSearchHistory";
import LoadingState from "./sections/LoadingState";
import ErrorState from "./sections/ErrorState";
import EmptyState from "./sections/EmptyState";
import HistorySection from "./sections/HistorySection";
import ResultsSection from "./sections/ResultsSection";

export default function SearchModal({
    isOpen,
    results,
    phase,
    query,
    onClose,
    isDark,
    anchorRef,
}) {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { history, historyLoading, saveHistory, deleteOne, deleteAll } =
        useSearchHistory();

    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e) => e.key === "Escape" && onClose();
        const handlePointerDown = (e) => {
            const insideModal = modalRef.current?.contains(e.target);
            const insideAnchor = anchorRef?.current?.contains(e.target);
            if (!insideModal && !insideAnchor) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);
        document.addEventListener("pointerdown", handlePointerDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.removeEventListener("pointerdown", handlePointerDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose, anchorRef]);

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
        navigate(`/anime/detail/${anime.animeId}`);
    };

    const handleSelectHistory = (item) => {
        navigate(`/anime/detail/${item.animeId}`);
    };

    return (
        <>
            <div
                className="fixed inset-0 z-40 md:hidden pointer-events-none"
                style={{
                    background: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
                    animation: "modalFadeIn 0.2s ease-out",
                }}
            />
            <div
                ref={modalRef}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
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
                <div
                    className={`absolute top-0 left-0 right-0 h-px ${isDark ? "bg-linear-to-r from-transparent via-[#ff1e56]/30 to-transparent" : "bg-linear-to-r from-transparent via-rose-300/50 to-transparent"}`}
                />
                <div
                    className={`absolute top-3 left-3 w-4 h-4 border-l border-t rounded-tl-md ${isDark ? "border-[#ff1e56]/15" : "border-rose-300/30"}`}
                />
                <div
                    className={`absolute top-3 right-3 w-4 h-4 border-r border-t rounded-tr-md ${isDark ? "border-[#ff1e56]/15" : "border-rose-300/30"}`}
                />

                {isLoading && <LoadingState isDark={isDark} />}

                {error && !isLoading && <ErrorState isDark={isDark} />}

                {isEmpty && <EmptyState isDark={isDark} />}

                {showHistory && (
                    <HistorySection
                        isDark={isDark}
                        isLoggedIn={isLoggedIn}
                        history={history}
                        historyLoading={historyLoading}
                        onSelectHistory={handleSelectHistory}
                        onDeleteOne={deleteOne}
                        onDeleteAll={deleteAll}
                    />
                )}

                {showResults && (
                    <ResultsSection
                        isDark={isDark}
                        results={results}
                        query={query}
                        onSelectAnime={handleSelectAnime}
                        onClose={onClose}
                    />
                )}
            </div>
        </>
    );
}