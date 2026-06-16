// RelatedEpisodes.jsx
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import EpisodeCard from "./EpisodeCard";
import { normalizeId, getEpisodeNumber } from "../../../utils/relatedUtils";

const paddleClass = (side) => `
    absolute ${side === 'left' ? 'left-1' : 'right-1'} 
    top-4 bottom-16 z-30
    w-10 h-10
    max-[320px]:w-8 max-[320px]:h-8
    sm:w-12 sm:h-12
    rounded-full
    bg-black/75 backdrop-blur-md
    border border-white/10
    flex items-center justify-center
    text-white/70 hover:text-white
    shadow-[0_8px_24px_rgba(0,0,0,0.35)]
    transition-all duration-300
    group/paddle
`;

export default function RelatedEpisodes({ episodes = [], currentEpisodeId }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const pathSegment = location.pathname.split("/episode/")[1] || "";
    const effectiveEpisodeId = currentEpisodeId || pathSegment;

    const activeIndex = episodes.findIndex((ep) => {
        const normCurrentId = normalizeId(effectiveEpisodeId);
        if (!normCurrentId) return false;
        return normalizeId(ep.title || "") === normCurrentId;
    });

    const isDescending = (() => {
        if (episodes.length < 2) return false;
        const firstNum = getEpisodeNumber(episodes[0]?.title || episodes[0]?.episodeId || "");
        const lastNum = getEpisodeNumber(episodes[episodes.length - 1]?.title || episodes[episodes.length - 1]?.episodeId || "");
        if (firstNum !== null && lastNum !== null) return firstNum > lastNum;
        return false;
    })();

    const currentProgressIndex = hoveredIndex !== null ? hoveredIndex : activeIndex !== -1 ? activeIndex : 0;
    const displayProgressNumber = isDescending ? episodes.length - currentProgressIndex : currentProgressIndex + 1;

    const checkScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 4);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        checkScroll();
        const ro = new ResizeObserver(() => checkScroll());
        ro.observe(el);
        Array.from(el.children).forEach(c => ro.observe(c));
        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);
        const t = setTimeout(checkScroll, 300);
        return () => {
            ro.disconnect();
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
            clearTimeout(t);
        };
    }, [episodes, checkScroll]);

    useEffect(() => {
        if (!episodes.length || !effectiveEpisodeId || !scrollRef.current) return;
        const scrollToActive = () => {
            const container = scrollRef.current;
            if (!container) return;
            const activeCard = container.querySelector('[data-active="true"]');
            if (!activeCard) return;
            activeCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            setTimeout(checkScroll, 300);
        };
        const t1 = setTimeout(scrollToActive, 100);
        const t2 = setTimeout(scrollToActive, 450);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [episodes, effectiveEpisodeId, checkScroll]);

    const scrollBy = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        const firstCard = el.firstElementChild;
        if (!firstCard) return;

        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = parseFloat(window.getComputedStyle(el).columnGap)
            || parseFloat(window.getComputedStyle(el).gap)
            || 20;
        const itemStep = cardWidth + gap;

        const currentIndex = Math.round(el.scrollLeft / itemStep);
        const targetIndex = Math.max(0, Math.min(currentIndex + dir, el.children.length - 1));

        el.scrollTo({ left: targetIndex * itemStep, behavior: "smooth" });
    };

    const handleEpisodeClick = (episodeTitle) => {
        window.scrollTo({ top: 0, behavior: "auto" });
        navigate(`/episode/${normalizeId(episodeTitle)}`);
    };

    const hasEpisodes = episodes.length > 0;

    // Header dengan efek obsidian premium
    const headerIconClass = isDark
        ? "bg-gradient-to-br from-[#1a0a0f] via-[#0d0407] to-[#050203] border-[#ff1e56]/20 shadow-[0_0_20px_rgba(255,30,86,0.15)]"
        : "bg-white border-slate-200 shadow-md shadow-slate-100";

    const headerTextClass = isDark ? "text-white font-black" : "text-slate-900 font-black";
    const subTextClass = isDark ? "text-slate-500" : "text-slate-400";

    const emptyCardClass = isDark
        ? "py-12 sm:py-16 text-center w-full border border-dashed border-[#2a1117]/40 rounded-2xl bg-gradient-to-b from-[#0d0407]/30 to-transparent"
        : "py-12 sm:py-16 text-center w-full border border-dashed border-slate-300 rounded-2xl bg-gradient-to-b from-white to-slate-50";

    // Slider paddles premium bergaya melayang
    const paddleClass = (side) => `
        absolute ${side === 'left' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 z-30
        w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full
        opacity-100 lg:opacity-0 lg:group-hover/section:opacity-100
        transition-all duration-500 cursor-pointer group/paddle border
        ${isDark
            ? "bg-neutral-950/80 backdrop-blur-xl border-white/10 text-white/70 hover:text-white hover:border-[#ff1e56]/40 hover:bg-neutral-900/90 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
            : "bg-white/95 backdrop-blur-xl border-slate-200/80 text-slate-500 hover:text-slate-900 hover:border-rose-400/50 hover:bg-white shadow-[0_4px_20px_rgba(148,163,184,0.15)]"
        }
    `;

    return (
        <div className="relative group/section w-full">

            {/* ── Header Premium ── */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-6 md:px-8 select-none gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center overflow-hidden border transition-transform duration-500 hover:rotate-[6deg] ${headerIconClass}`}>
                        <div className={`absolute inset-0 ${isDark ? "bg-[#ff1e56]/10 animate-pulse" : "bg-rose-500/5"}`} />
                        <i className="fa-solid fa-list-ul text-[12px] sm:text-sm text-[#ff1e56] relative z-10" />
                    </div>
                    <div className="min-w-0">
                        <h3 className={`text-sm sm:text-base tracking-tight uppercase font-black leading-none ${headerTextClass}`}>
                            Episode Terkait
                        </h3>
                        <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mt-1.5 ${subTextClass}`}>
                            {episodes.length} episode tersedia
                        </p>
                    </div>
                </div>

                {hasEpisodes && (
                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                        {/* Progress Bar Indikator Halus */}
                        <div className={`w-20 h-1 rounded-full overflow-hidden ${isDark ? "bg-zinc-900" : "bg-slate-100"}`}>
                            <div
                                className="h-full bg-gradient-to-r from-[#ff1e56] to-[#ff5b7f] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{ width: `${Math.min((displayProgressNumber / episodes.length) * 100, 100)}%` }}
                            />
                        </div>
                        <span className={`text-[10px] font-mono font-black ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                            {String(displayProgressNumber).padStart(2, '0')} / {String(episodes.length).padStart(2, '0')}
                        </span>
                    </div>
                )}
            </div>

            {/* ── Track Container ── */}
            <div className="relative px-4 sm:px-6 md:px-8">

                {/* FADE KIRI ── 4-Stop obsidian blend */}
                {canScrollLeft && (
                    <div
                        className={`absolute left-0 top-0 bottom-0 w-10 sm:w-20 z-20 pointer-events-none transition-opacity duration-500 ${isDark
                            ? "bg-gradient-to-r from-[#050203] via-[#050203]/70 via-[#050203]/20 to-transparent"
                            : "bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/70 via-[#faf8f5]/20 to-transparent"
                            }`}
                    />
                )}

                {/* FADE KANAN ── 4-Stop obsidian blend */}
                {canScrollRight && (
                    <div
                        className={`absolute right-0 top-0 bottom-0 w-10 sm:w-20 z-20 pointer-events-none transition-opacity duration-500 ${isDark
                            ? "bg-gradient-to-l from-[#050203] via-[#050203]/70 via-[#050203]/20 to-transparent"
                            : "bg-gradient-to-l from-[#faf8f5] via-[#faf8f5]/70 via-[#faf8f5]/20 to-transparent"
                            }`}
                    />
                )}

                {/* FADE + TOMBOL KIRI */}
                {canScrollLeft && (
                    <>
                        <div className={`absolute left-0 top-0 bottom-0 w-6 sm:w-10 lg:w-20 z-20 pointer-events-none transition-opacity duration-500 ${isDark
                                ? "bg-gradient-to-r from-[#050203] via-[#050203]/70 via-[#050203]/20 to-transparent"
                                : "bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/70 via-[#faf8f5]/20 to-transparent"
                            }`} />

                        <button
                            onClick={() => scrollBy(-1)}
                            className={`absolute left-0 top-4 bottom-16 z-30 w-8 sm:w-14 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover/section:opacity-100 transition-all duration-500 cursor-pointer group/paddle ${isDark
                                    ? "bg-gradient-to-r from-black/60 to-transparent hover:from-black/90 text-white/50 hover:text-white"
                                    : "bg-gradient-to-r from-white/70 to-transparent hover:from-white/90 text-slate-500 hover:text-slate-900"
                                }`}
                            aria-label="Scroll kiri"
                        >
                            <div className={`w-5 h-5 max-[320px]:w-4 max-[320px]:h-4 sm:w-7 sm:h-7 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover/paddle:scale-110 ${isDark
                                    ? "bg-white/10 hover:bg-white/20"
                                    : "bg-slate-100/90 hover:bg-white border border-slate-200"
                                }`}>
                                <i className="fa-solid fa-chevron-left text-[9px] max-[320px]:text-[8px] sm:text-xs font-black transition-transform duration-300 group-hover/paddle:-translate-x-0.5" />
                            </div>
                        </button>
                    </>
                )}

                {/* FADE + TOMBOL KANAN */}
                {canScrollRight && (
                    <>
                        <div className={`absolute right-0 top-0 bottom-0 w-6 sm:w-10 lg:w-20 z-20 pointer-events-none transition-opacity duration-500 ${isDark
                                ? "bg-gradient-to-l from-[#050203] via-[#050203]/70 via-[#050203]/20 to-transparent"
                                : "bg-gradient-to-l from-[#faf8f5] via-[#faf8f5]/70 via-[#faf8f5]/20 to-transparent"
                            }`} />

                        <button
                            onClick={() => scrollBy(1)}
                            className={`absolute right-0 top-4 bottom-16 z-30 w-8 sm:w-14 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover/section:opacity-100 transition-all duration-500 cursor-pointer group/paddle ${isDark
                                    ? "bg-gradient-to-l from-black/60 to-transparent hover:from-black/90 text-white/50 hover:text-white"
                                    : "bg-gradient-to-l from-white/70 to-transparent hover:from-white/90 text-slate-500 hover:text-slate-900"
                                }`}
                            aria-label="Scroll kanan"
                        >
                            <div className={`w-5 h-5 max-[320px]:w-4 max-[320px]:h-4 sm:w-7 sm:h-7 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover/paddle:scale-110 ${isDark
                                    ? "bg-white/10 hover:bg-white/20"
                                    : "bg-slate-100/90 hover:bg-white border border-slate-200"
                                }`}>
                                <i className="fa-solid fa-chevron-right text-[9px] max-[320px]:text-[8px] sm:text-xs font-black transition-transform duration-300 group-hover/paddle:translate-x-0.5" />
                            </div>
                        </button>
                    </>
                )}
                {/* Scroll Container */}
                <div
                    ref={scrollRef}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide"
                    style={{
                        scrollbarWidth: "none",
                        scrollSnapType: "x mandatory",
                        scrollBehavior: "smooth",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: "16px",
                        paddingBottom: "24px",
                    }}
                >
                    {hasEpisodes ? (
                        episodes.map((ep, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={`${ep.episodeId || ep.slug || index}-${index}`}
                                    style={{ scrollSnapAlign: "start", flexShrink: 0 }}
                                >
                                    <EpisodeCard
                                        ep={ep}
                                        index={index}
                                        isActive={isActive}
                                        handleEpisodeClick={handleEpisodeClick}
                                        setHoveredIndex={setHoveredIndex}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className={emptyCardClass}>
                            <div className="relative inline-flex mb-3 sm:mb-4">
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center ${isDark
                                    ? "bg-gradient-to-br from-[#1a0a0f] to-[#0a0204] border-[#2a1117]/50"
                                    : "bg-white border-slate-200 shadow-sm"
                                    }`}>
                                    <i className={`fa-solid fa-film text-lg sm:text-xl ${isDark ? "text-slate-700" : "text-slate-400"}`} />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ff1e56]/20 animate-ping" />
                            </div>
                            <p className={`text-xs font-semibold ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                Belum ada episode terkait
                            </p>
                            <p className={`text-[10px] mt-1 ${isDark ? "text-slate-700" : "text-slate-400"}`}>
                                Episode baru akan muncul di sini
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}