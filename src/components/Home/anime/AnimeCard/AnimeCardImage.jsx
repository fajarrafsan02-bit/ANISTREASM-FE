import { useTheme } from "../../../../context/ThemeContext";
import { useAuth } from "../../../../context/AuthContext";
import { useAuthModal } from "../../../../context/AuthModalContext";
import useToast from "../../../../hooks/useToast";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function AnimeCardImage({ anime, isHovered, isOngoing, isDark, isMobile }) {
    const { theme } = useTheme();
    const { isLoggedIn } = useAuth();
    const { openModal } = useAuthModal();
    const toast = useToast();
    const dark = isDark !== undefined ? isDark : theme === "dark";
    const navigate = useNavigate();

    const mobile = isMobile !== undefined ? isMobile : typeof window !== "undefined" && window.innerWidth < 640;

    const handlePlay = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Cek apakah user sudah login
        if (!isLoggedIn) {
            toast.warning("Silakan login terlebih dahulu", 3000);
            openModal({ mode: "login" });
            return;
        }

        const animeId = anime.animeId;

        if (!animeId) return;

        // Kalau COMPLETE, masuk ke detail page
        if (anime.status === "COMPLETE") {
            navigate(`/anime/detail/${animeId}`);
            return;
        }

        // Kalau ongoing, masuk ke episode page seperti biasa
        const episodeNum = (anime.episode ?? "").replace(/\D/g, "") || "1";
        navigate(`/episode/${animeId}-episode-${episodeNum}`);
    };

    return (
        <div className="relative flex-1 overflow-hidden aspect-3/4 rounded-xl group/card">

            {/* Gambar */}
            <img
                src={anime.image}
                alt={anime.title}
                className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isHovered ? "scale-110" : "scale-100"}`}
                style={{
                    filter: isHovered ? "brightness(1.1) contrast(1.05)" : "brightness(1) contrast(1)",
                    transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1), filter 0.5s ease",
                }}
            />

            {/* Gradient Overlay — lighter to keep image clearer */}
            <div className={`absolute inset-0 transition-opacity duration-400 ${isHovered ? "opacity-100" : "opacity-50"} bg-linear-to-t from-black/80 via-black/20 to-black/10`} />

            {/* Shimmer */}
            <ShimmerOverlay isHovered={isHovered} dark={dark} isMobile={mobile} />

            {/* Play Button */}
            <PlayButton isHovered={isHovered} dark={dark} isMobile={mobile} onPlay={handlePlay} />

            {/* Badge Status — premium glass */}
            <div className={`absolute z-10 ${mobile ? "top-1.5 left-1.5" : "top-2.5 left-2.5"}`}>
                <div className={`flex items-center backdrop-blur-md rounded-md border font-black uppercase tracking-wider transition-all duration-300 ${mobile ? "gap-1 px-1.5 py-0.5 text-[8px]" : "gap-1.5 px-2.5 py-1 text-[9px]"} ${isOngoing ? "bg-red-500/15 text-red-400 border-red-500/20 shadow-sm shadow-red-500/10" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/20 shadow-sm shadow-emerald-500/10"}`}>
                    <span className={`rounded-full animate-pulse ${mobile ? "w-1 h-1" : "w-1.5 h-1.5"} ${isOngoing ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"}`} />
                    <span>{isOngoing ? "ONGOING" : "COMPLETE"}</span>
                </div>
            </div>

            {/* Rating — premium glass */}
            <div className={`absolute backdrop-blur-md rounded-md border flex items-center gap-1 transition-all duration-300 ${mobile ? "top-1.5 right-1.5 px-1.5 py-0.5" : "top-2.5 right-2.5 px-2 py-1"} ${dark ? "bg-zinc-950/70 border-zinc-800/40 text-white shadow-sm shadow-black/20" : "bg-white/80 border-zinc-200/50 text-zinc-900 shadow-sm"}`}>
                <span className={`text-yellow-400 ${mobile ? "text-[8px]" : "text-[10px]"}`}>★</span>
                <span className={`font-extrabold ${mobile ? "text-[8px]" : "text-[10px]"}`}>{anime.rating}</span>
            </div>

            {/* Episode Badge — premium glass */}
            {isOngoing && (
                <div className={`absolute backdrop-blur-md rounded-md border transition-all duration-300 ${mobile ? "bottom-1.5 right-1.5 px-1.5 py-0.5 text-[8px]" : "bottom-2.5 right-2.5 px-2.5 py-1 text-[9px]"} ${dark ? "bg-zinc-950/70 border-zinc-800/40 text-zinc-200 shadow-sm shadow-black/20" : "bg-white/80 border-zinc-200/50 text-zinc-800 shadow-sm"}`}>
                    <span className="font-bold">{anime.episode}</span>
                </div>
            )}
        </div>
    );
}

function ShimmerOverlay({ isHovered, dark, isMobile }) {
    const shimmerGradient = dark
        ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 20%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.02) 70%, transparent 100%)"
        : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.03) 80%, transparent 100%)";

    return (
        <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
                opacity: isHovered ? 1 : 0,
                transition: `opacity ${isMobile ? "0.3s" : "0.5s"} ease-out`,
                willChange: "opacity",
            }}
        >
            <div
                className="absolute inset-y-0 w-full"
                style={{
                    background: shimmerGradient,
                    backgroundSize: "200% 100%",
                    animation: `aci-hardware-shine ${isMobile ? "1.8s" : "2.2s"} cubic-bezier(0.25, 1, 0.5, 1) infinite`,
                }}
            />
        </div>
    );
}

function PlayButton({ isHovered, dark, isMobile, onPlay }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 8 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.5,
                        y: isHovered ? 0 : 8,
                    }}
                    transition={{
                        duration: isMobile ? 0.3 : 0.45,
                        ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="relative pointer-events-auto"
                >
                    {/* Outer glow rings */}
                    <div className={`absolute inset-0 rounded-full bg-red-500/20 blur-xl scale-[2] ${isMobile ? "scale-150" : ""}`} />
                    <div className={`absolute inset-0 rounded-full bg-red-500/10 blur-3xl scale-[2.5] ${isMobile ? "scale-180" : ""}`} />
                    <motion.div
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={onPlay}
                        className={`relative rounded-full bg-linear-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center shadow-2xl cursor-pointer ${isMobile ? "w-9 h-9" : "w-12 h-12"} ${dark ? "shadow-red-500/50 ring-2 ring-white/20" : "shadow-red-500/40 ring-2 ring-white/40"}`}
                    >
                        <span className={`ml-0.5 drop-shadow-lg text-white ${isMobile ? "text-xs" : "text-base"}`}>▶</span>
                    </motion.div>
                </motion.div>
        </div>
    );
}