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
                    ? "bg-[#121214] border-zinc-800/30"
                    : "bg-white border-gray-100"
                }
            `}
        >
            <h3
                className={`
                    font-bold
                    line-clamp-1 
                    leading-tight
                    tracking-tight
                    transition-all 
                    duration-300 
                    ${titleSize} 
                    ${isHovered
                        ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                        : dark ? "text-zinc-100" : "text-zinc-800"
                    }
                `}
            >
                {anime.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
                <span
                    className={`
                        block 
                        truncate 
                        font-medium
                        tracking-wide
                        transition-colors 
                        duration-300 
                        ${genreSize} 
                        ${dark ? "text-zinc-500" : "text-gray-400"}
                    `}
                >
                    {anime.genre}
                </span>
                <span className={`w-[2px] h-[2px] rounded-full shrink-0 ${dark ? "bg-zinc-600" : "bg-gray-300"}`} />
                <span className={`shrink-0 font-semibold ${genreSize} ${dark ? "text-zinc-500" : "text-gray-400"}`}>
                    {anime.year || ""}
                </span>
            </div>
        </div>
    );
}