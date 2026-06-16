import { useTheme } from "../../../../context/ThemeContext";

export default function AnimeCardInfo({ anime, isHovered, isDark, isMobile }) {
    const { theme } = useTheme();
    const dark = isDark !== undefined ? isDark : theme === "dark";

    // Gunakan kelas CSS responsif secara default, atau gunakan prop isMobile jika didefinisikan secara eksplisit.
    const containerPadding = isMobile
        ? "p-2"
        : isMobile === false
            ? "p-3"
            : "p-2 sm:p-3";

    const titleSize = isMobile
        ? "text-[11px]"
        : isMobile === false
            ? "text-xs"
            : "text-[11px] sm:text-xs md:text-sm";

    const genreSize = isMobile
        ? "text-[9px]"
        : isMobile === false
            ? "text-[10px]"
            : "text-[9px] sm:text-[10px] md:text-xs";

    return (
        <div
            className={`
                min-w-0 
                transition-all 
                duration-300 
                ease-in-out
                border-t
                ${containerPadding}
                ${dark
                    ? "bg-[#121214] border-zinc-800/40"
                    : "bg-white border-gray-100"
                }
            `}
        >
            <h3
                className={`
                    font-semibold 
                    line-clamp-1 
                    leading-tight
                    tracking-wide
                    transition-colors 
                    duration-300 
                    ${titleSize} 
                    ${isHovered
                        ? "text-rose-500"
                        : dark ? "text-zinc-100" : "text-zinc-800"
                    }
                `}
            >
                {anime.title}
            </h3>
            <span
                className={`
                    block 
                    truncate 
                    mt-1 
                    font-medium
                    tracking-wider
                    transition-colors 
                    duration-300 
                    ${genreSize} 
                    ${dark ? "text-zinc-500" : "text-gray-400"}
                `}
            >
                {anime.genre}
            </span>
        </div>
    );
}