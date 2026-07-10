// PosterCard.jsx
import { useTheme } from "../../../context/ThemeContext"; // sesuaikan path

export default function PosterCard({ poster, rank = 12, title = "Anime" }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="relative group cursor-pointer w-full max-w-[150px] xs:max-w-[200px] sm:max-w-[260px] mx-auto select-none">
            {/* Layer 1: Ambient glow (Dapatkan margin ke -inset-1.5 di HP agar estetik) */}
            <div
                className={`absolute -inset-1.5 sm:-inset-3 rounded-[1.2rem] sm:rounded-[2rem] blur-md sm:blur-2xl opacity-30 sm:opacity-40 group-hover:opacity-60 sm:group-hover:opacity-70 transition-all duration-700 sm:duration-1000 ${isDark
                    ? "bg-linear-to-br from-[#ff1e56]/30 via-red-900/10 to-transparent"
                    : "bg-linear-to-br from-rose-400/20 via-rose-200/10 to-transparent"
                    }`}
            />

            {/* Layer 2: Animated border glow */}
            <div
                className={`absolute inset-[-1.5px] sm:inset-[-2px] rounded-[1.05rem] sm:rounded-[1.3rem] opacity-70 sm:opacity-80 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow ${isDark
                    ? "bg-linear-to-br from-[#ff1e56] via-red-600 to-[#8b0a1e]"
                    : "bg-linear-to-br from-rose-400 via-rose-300 to-rose-500"
                    }`}
            />

            {/* Layer 3: Inner border frame */}
            <div
                className={`absolute inset-[-0.8px] sm:inset-[-1px] rounded-[1rem] sm:rounded-[1.25rem] ${isDark
                    ? "bg-linear-to-br from-[#ff1e56]/40 via-transparent to-[#ff1e56]/20"
                    : "bg-linear-to-br from-rose-300/40 via-transparent to-rose-300/20"
                    }`}
            />

            {/* Main card */}
            <div
                className={`relative rounded-[0.95rem] sm:rounded-[1.2rem] overflow-hidden aspect-3/4 ${isDark ? "bg-[#0a0305]" : "bg-slate-100"
                    }`}
            >
                {/* Image */}
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                    loading="eager"
                />

                {/* Gradient overlays */}
                <div
                    className={`absolute inset-0 opacity-70 sm:opacity-60 group-hover:opacity-45 sm:group-hover:opacity-40 transition-opacity duration-500 ${isDark
                        ? "bg-linear-to-t from-black/80 via-transparent to-black/20"
                        : "bg-linear-to-t from-black/60 via-transparent to-black/10"
                        }`}
                />
                <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isDark
                        ? "bg-linear-to-br from-[#ff1e56]/5 via-transparent to-transparent"
                        : "bg-linear-to-br from-rose-400/5 via-transparent to-transparent"
                        }`}
                />

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </div>

                {/* Scanlines — dark only */}
                {isDark && (
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-size-[100%_4px]" />
                )}

                {/* Rank badge (Skala ukuran diturunkan menjadi text-[7.5px] px-1.5 di HP) */}
                <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 z-10">
                    <div className="relative">
                        <div
                            className={`absolute -inset-0.5 sm:-inset-1 rounded-lg blur-sm opacity-60 ${isDark ? "bg-[#ff1e56]" : "bg-rose-500"
                                }`}
                        />
                        <div className="relative flex items-center gap-1 bg-linear-to-r from-[#ff1e56] to-[#e11d48] text-[#ffffff] text-[7.5px] sm:text-[10px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg tracking-wider uppercase shadow-lg">
                            <i className="fa-solid fa-fire-flame-curved text-[6.5px] sm:text-[8px]" />
                            POPULAR #{rank}
                        </div>
                    </div>
                </div>

                {/* HD badge (Skala ukuran disesuaikan menjadi text-[7.5px]) */}
                <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:translate-y-2 sm:group-hover:translate-y-0">
                    <div
                        className={`backdrop-blur-md border text-white text-[7.5px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-md tracking-wider ${isDark
                            ? "bg-black/60 border-white/10"
                            : "bg-black/50 border-white/10"
                            }`}
                    >
                        HD
                    </div>
                </div>

                {/* Bottom title overlay (Padding disesuaikan ke p-2.5 di ponsel) */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 z-10">
                    <div className="transform translate-y-2 sm:translate-y-4 opacity-100 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 ease-out">
                        <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                            <div
                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center ${isDark
                                    ? "bg-[#ff1e56]/20 border-[#ff1e56]/30"
                                    : "bg-rose-500/20 border-rose-400/30"
                                    }`}
                            >
                                <i className="fa-solid fa-play text-[#ff1e56] text-[7px] sm:text-[8px]" />
                            </div>
                            <span className="text-[8px] sm:text-[10px] font-bold text-white/80 tracking-wider uppercase">
                                Tonton Sekarang
                            </span>
                        </div>
                    </div>

                    {/* Decorative line */}
                    <div
                        className={`h-px bg-linear-to-r mb-1.5 sm:mb-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700 delay-100 ${isDark
                            ? "from-[#ff1e56]/60 via-[#ff1e56]/20 to-transparent"
                            : "from-rose-400/60 via-rose-300/20 to-transparent"
                            }`}
                    />

                    {/* Font disetel tebal/black berukuran text-[11px] pada mobile */}
                    <h3 className="font-black text-[11px] sm:text-[15px] text-white drop-shadow-lg leading-tight group-hover:text-[#ff1e56] transition-colors duration-300 line-clamp-2">
                        {title}
                    </h3>
                </div>

                {/* Corner ornaments (Siku siku dikecilkan menjadi w-2 h-2 di HP agar muat presisi) */}
                {[
                    "top-1.5 left-1.5 border-l-2 border-t-2 rounded-tl-sm",
                    "top-1.5 right-1.5 border-r-2 border-t-2 rounded-tr-sm",
                    "bottom-1.5 left-1.5 border-l-2 border-b-2 rounded-bl-sm",
                    "bottom-1.5 right-1.5 border-r-2 border-b-2 rounded-br-sm"
                ].map((pos, i) => (
                    <div
                        key={i}
                        className={`absolute w-2 h-2 sm:w-4 sm:h-4 ${pos} ${isDark ? "border-[#ff1e56]/40" : "border-rose-400/40"
                            }`}
                    />
                ))}

                {/* Floating particles */}
                <div
                    className={`absolute top-1/4 right-3 sm:right-4 w-1 h-1 rounded-full animate-float opacity-0 sm:group-hover:opacity-100 transition-opacity ${isDark ? "bg-[#ff1e56]/60" : "bg-rose-400/60"
                        }`}
                />
                <div
                    className={`absolute bottom-1/3 left-3 sm:left-4 w-0.5 h-0.5 rounded-full animate-float-delayed opacity-0 sm:group-hover:opacity-100 transition-opacity ${isDark ? "bg-[#ff1e56]/40" : "bg-rose-400/40"
                        }`}
                />
            </div>

            {/* Bottom reflection */}
            <div
                className={`absolute -bottom-2 sm:-bottom-4 left-3 sm:left-4 right-3 sm:right-4 h-4 sm:h-8 blur-md sm:blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isDark
                    ? "bg-linear-to-t from-[#ff1e56]/10 to-transparent"
                    : "bg-linear-to-t from-rose-400/10 to-transparent"
                    }`}
            />
        </div>
    );
}