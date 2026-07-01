export default function HeroNavButton({ direction, onClick, isDark, isMobile = false }) {
    const isPrev = direction === "prev";

    const sizeClasses = isMobile
        ? "w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-11 sm:h-11"
        : "w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13";

    const colorClasses = isDark
        ? "bg-black/25 border-white/[0.08] text-white/60 hover:text-white hover:bg-red-600 hover:border-red-500/60 hover:shadow-xl hover:shadow-red-600/20"
        : "bg-white/60 border-gray-200/60 text-gray-500 hover:text-white hover:bg-red-600 hover:border-red-500 hover:shadow-xl hover:shadow-red-600/20";

    return (
        <button
            onClick={onClick}
            className={`
                ${isMobile ? "" : "group absolute top-1/2 -translate-y-1/2 z-[5]"}
                ${sizeClasses}
                ${colorClasses}
                rounded-full backdrop-blur-md border flex items-center justify-center
                transition-all duration-300 ease-out
                ${isMobile ? "" : "hover:scale-110"}
                ${isMobile ? "active:scale-90" : ""}
                ${!isMobile && (isPrev
                    ? "left-3 sm:left-5 md:left-8 lg:left-12"
                    : "right-3 sm:right-5 md:right-8 lg:right-12"
                )}
            `}
        >
            {/* Ring glow on hover (desktop) */}
            {!isMobile && (
                <span className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-300 scale-0 group-hover:scale-100" />
            )}

            <svg
                className={`
                    ${isMobile ? "w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4" : "w-[18px] h-[18px] sm:w-5 sm:h-5"}
                    transition-transform duration-300
                    ${!isMobile && (isPrev ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")}
                `}
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