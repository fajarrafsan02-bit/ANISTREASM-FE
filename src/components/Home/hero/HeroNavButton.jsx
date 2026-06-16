// HeroNavButton.jsx
export default function HeroNavButton({ direction, onClick, isDark, isMobile = false }) {
    const isPrev = direction === "prev";

    if (isMobile) {
        return (
            <button
                onClick={onClick}
                className={`pointer-events-auto rounded-full backdrop-blur-sm border flex items-center justify-center active:scale-90 transition-transform
                    w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 sm:w-10 sm:h-10
                    ${isDark
                        ? "bg-black/40 border-white/10 text-white/70"
                        : "bg-white/60 border-gray-200 text-gray-500"
                    }`}
            >
                <svg
                    className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d={isPrev ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                </svg>
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`group absolute top-1/2 -translate-y-1/2 z-[5] rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl
                w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
                /* Jarak horizontal yang seimbang (64px di desktop) agar bebas dari teks judul */
                ${isPrev
                    ? "left-4 sm:left-6 md:left-10 lg:left-16"
                    : "right-4 sm:right-6 md:right-10 lg:right-16"
                }
                ${isDark
                    ? "bg-black/20 border-white/10 text-white/70 hover:text-white hover:bg-red-600/90 hover:border-red-500/50 hover:shadow-red-600/20"
                    : "bg-white/50 border-gray-200 text-gray-500 hover:text-white hover:bg-red-600 hover:border-red-500 hover:shadow-red-600/20"
                }`}
        >
            <svg
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isPrev ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d={isPrev ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
        </button>
    );
}