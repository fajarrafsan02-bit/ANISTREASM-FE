// RelatedMovies.jsx
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import MovieCard from "./MovieCard"; // Mengimpor MovieCard dari file terpisah

export default function RelatedMovies({ movies = [] }) {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Langsung kembalikan null jika array kosong
    if (!movies || movies.length === 0) return null;

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

        const onResize = () => checkScroll();
        const onScroll = () => checkScroll();

        el.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onResize);

        const observer = new ResizeObserver(() => checkScroll());
        observer.observe(el);

        const timer = setTimeout(checkScroll, 150);

        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [movies, checkScroll]);

    const scrollBy = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.82;
        el.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

    const handleNavigate = (movie) => {
        navigate(`/anime/detail/${movie.animeId}`);
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    const headerIconWrap = isDark
        ? "bg-gradient-to-br from-[#1a0a0f] via-[#0d0407] to-[#050203] border-[#ff1e56]/20 shadow-[0_0_20px_rgba(255,30,86,0.15)]"
        : "bg-white border-slate-200 shadow-md shadow-slate-100";

    const headerTitleClass = isDark ? "text-white font-black" : "text-slate-900 font-black";
    const headerSubClass = isDark ? "text-slate-500" : "text-slate-400";

    // 4-Stop premium gradient fades
    const leftFadeClass = isDark
        ? "from-[#050203] via-[#050203]/70 via-[#050203]/20 to-transparent"
        : "from-[#faf8f5] via-[#faf8f5]/70 via-[#faf8f5]/20 to-transparent";

    const rightFadeClass = isDark
        ? "from-[#050203] via-[#050203]/70 via-[#050203]/20 to-transparent"
        : "from-[#faf8f5] via-[#faf8f5]/70 via-[#faf8f5]/20 to-transparent";

    const paddleClass = (side) => `
        absolute ${side === 'left' ? 'left-2' : 'right-2'} top-[40%] -translate-y-1/2 z-30
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
            {/* Header */}
            <div className="flex items-center justify-between mb-2 sm:mb-3 px-4 sm:px-6 md:px-8 select-none gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div
                        className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center overflow-hidden border transition-transform duration-500 hover:rotate-[6deg] ${headerIconWrap}`}
                    >
                        <div className={`absolute inset-0 ${isDark ? "bg-[#ff1e56]/10 animate-pulse" : "bg-rose-500/5"}`} />
                        <i className="fa-solid fa-clapperboard text-xs sm:text-sm text-[#ff1e56] relative z-10" />
                    </div>

                    <div className="min-w-0">
                        <h3 className={`text-sm sm:text-base tracking-tight uppercase font-black leading-none ${headerTitleClass}`}>
                            Anime Movie
                        </h3>
                        <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mt-1.5 ${headerSubClass}`}>
                            {movies.length} film tersedia
                        </p>
                    </div>
                </div>

                <div className="hidden sm:flex items-center gap-3 shrink-0">
                    <div className={`w-20 h-1 rounded-full overflow-hidden ${isDark ? "bg-zinc-900" : "bg-slate-100"}`}>
                        <div
                            className="h-full bg-gradient-to-r from-[#ff1e56] to-[#ff5b7f] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{
                                width: `${Math.min(
                                    ((hoveredIndex !== null ? hoveredIndex + 1 : 1) / movies.length) * 100,
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                    <span className={`text-[10px] font-mono font-black ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        {String(hoveredIndex !== null ? hoveredIndex + 1 : 1).padStart(2, "0")} / {String(movies.length).padStart(2, "0")}
                    </span>
                </div>
            </div>

            {/* Track Wrapper */}
            <div className="relative px-4 sm:px-6 md:px-8">
                {/* Left Paddle */}
{canScrollLeft && (
    <>
        <div className={`absolute left-0 top-0 bottom-0 w-6 sm:w-10 lg:w-20 z-20 pointer-events-none bg-gradient-to-r ${leftFadeClass}`} />
        <button
            onClick={() => scrollBy(-1)}
            className={paddleClass('left')}
            aria-label="Scroll kiri"
        >
            <i className="fa-solid fa-chevron-left text-xs sm:text-sm" />
        </button>
    </>
)}

{/* Right Paddle */}
{canScrollRight && (
    <>
        <div className={`absolute right-0 top-0 bottom-0 w-6 sm:w-10 lg:w-20 z-20 pointer-events-none bg-gradient-to-l ${rightFadeClass}`} />
        <button
            onClick={() => scrollBy(1)}
            className={paddleClass('right')}
            aria-label="Scroll kanan"
        >
            <i className="fa-solid fa-chevron-right text-xs sm:text-sm" />
        </button>
    </>
)}
                {/* Scroll Track */}
                <div
                    ref={scrollRef}
                    className="flex gap-3 sm:gap-5 overflow-x-auto scroll-smooth scrollbar-hide"
                    style={{
                        scrollbarWidth: "none",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: "16px",
                        paddingBottom: "24px"
                    }}
                >
                    {movies.map((movie, index) => (
                        <MovieCard
                            key={`${movie.animeId}-${index}`}
                            movie={movie}
                            index={index}
                            isDark={isDark}
                            isHovered={hoveredIndex === index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => handleNavigate(movie)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}