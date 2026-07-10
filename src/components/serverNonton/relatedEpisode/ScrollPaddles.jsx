import { useTheme } from "../../../context/ThemeContext";

const PADDLE_BASE = `
    absolute top-4 bottom-16 z-30
    w-8 sm:w-14
    flex items-center justify-center
    opacity-100 lg:opacity-0 lg:group-hover/section:opacity-100
    transition-all duration-500 cursor-pointer group/paddle
`;

const ICON_BASE = `
    w-5 h-5 max-[320px]:w-4 max-[320px]:h-4 sm:w-7 sm:h-7
    rounded-full backdrop-blur-sm
    flex items-center justify-center
    transition-all duration-300 group-hover/paddle:scale-110
`;

export default function ScrollPaddles({ canScrollLeft, canScrollRight, onScroll }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const fadeGradient = isDark
        ? {
            left: "bg-gradient-to-r from-[#050203] via-[#050203]/70 via-[#050203]/20 to-transparent",
            right: "bg-gradient-to-l from-[#050203] via-[#050203]/70 via-[#050203]/20 to-transparent",
        }
        : {
            left: "bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/70 via-[#faf8f5]/20 to-transparent",
            right: "bg-gradient-to-l from-[#faf8f5] via-[#faf8f5]/70 via-[#faf8f5]/20 to-transparent",
        };

    const paddleBg = (side) => isDark
        ? `${side === "left" ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-black/60 to-transparent hover:from-black/90 text-white/50 hover:text-white`
        : `${side === "left" ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-white/70 to-transparent hover:from-white/90 text-slate-500 hover:text-slate-900`;

    const iconBg = isDark
        ? "bg-white/10 hover:bg-white/20"
        : "bg-slate-100/90 hover:bg-white border border-slate-200";

    const chevronDir = (side) => side === "left" ? "left" : "right";

    return (
        <>
            {canScrollLeft && (
                <>
                    <div className={`absolute left-0 top-0 bottom-0 w-6 sm:w-10 lg:w-20 z-20 pointer-events-none transition-opacity duration-500 ${fadeGradient.left}`} />
                    <button
                        onClick={() => onScroll(-1)}
                        className={`${PADDLE_BASE} left-0 ${paddleBg("left")}`}
                        aria-label="Scroll kiri"
                    >
                        <div className={`${ICON_BASE} ${iconBg}`}>
                            <i className={`fa-solid fa-chevron-${chevronDir("left")} text-[9px] max-[320px]:text-[8px] sm:text-xs font-black transition-transform duration-300 group-hover/paddle:-translate-x-0.5`} />
                        </div>
                    </button>
                </>
            )}

            {canScrollRight && (
                <>
                    <div className={`absolute right-0 top-0 bottom-0 w-6 sm:w-10 lg:w-20 z-20 pointer-events-none transition-opacity duration-500 ${fadeGradient.right}`} />
                    <button
                        onClick={() => onScroll(1)}
                        className={`${PADDLE_BASE} right-0 ${paddleBg("right")}`}
                        aria-label="Scroll kanan"
                    >
                        <div className={`${ICON_BASE} ${iconBg}`}>
                            <i className={`fa-solid fa-chevron-${chevronDir("right")} text-[9px] max-[320px]:text-[8px] sm:text-xs font-black transition-transform duration-300 group-hover/paddle:translate-x-0.5`} />
                        </div>
                    </button>
                </>
            )}
        </>
    );
}
