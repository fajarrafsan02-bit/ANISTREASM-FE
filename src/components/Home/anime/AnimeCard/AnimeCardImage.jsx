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
            navigate(`/anime/${animeId}`);
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
                className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isHovered ? "scale-105" : "scale-100"}`}
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-60"} ${dark ? "bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" : "bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent"}`} />

            {/* Shimmer */}
            <ShimmerOverlay isHovered={isHovered} dark={dark} isMobile={mobile} />

            {/* Play Button */}
            <PlayButton isHovered={isHovered} dark={dark} isMobile={mobile} onPlay={handlePlay} />

            {/* Badge Status */}
            <div className={`absolute z-10 ${mobile ? "top-1.5 left-1.5" : "top-2.5 left-2.5"}`}>
                <div className={`flex items-center transition-colors duration-300 rounded-md border font-black uppercase tracking-wider ${mobile ? "gap-1 px-1.5 py-0.5 text-[8px]" : "gap-1.5 px-2 py-1 text-[9px]"} ${isOngoing ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"}`}>
                    <span className={`rounded-full animate-pulse ${mobile ? "w-1 h-1" : "w-1.5 h-1.5"} ${isOngoing ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"}`} />
                    <span>{isOngoing ? "ONGOING" : "COMPLETE"}</span>
                </div>
            </div>

            {/* Rating */}
            <div className={`absolute backdrop-blur-md rounded-md border flex items-center gap-1 transition-all duration-300 ${mobile ? "top-1.5 right-1.5 px-1.5 py-0.5" : "top-2.5 right-2.5 px-2 py-1"} ${dark ? "bg-zinc-950/60 border-zinc-800/50 text-white" : "bg-white/80 border-zinc-200/50 text-zinc-900"}`}>
                <span className={`text-yellow-400 animate-pulse ${mobile ? "text-[8px]" : "text-[10px]"}`}>★</span>
                <span className={`font-extrabold ${mobile ? "text-[8px]" : "text-[10px]"}`}>{anime.rating}</span>
            </div>

            {/* Episode Badge */}
            {isOngoing && (
                <div className={`absolute backdrop-blur-md rounded-md border transition-all duration-300 ${mobile ? "bottom-1.5 right-1.5 px-1.5 py-0.5 text-[8px]" : "bottom-2.5 right-2.5 px-2 py-0.5 text-[9px]"} ${dark ? "bg-zinc-950/60 border-zinc-800/50 text-zinc-200" : "bg-white/80 border-zinc-200/50 text-zinc-800"}`}>
                    <span className="font-bold">{anime.episode}</span>
                </div>
            )}
        </div>
    );
}

function ShimmerOverlay({ isHovered, dark, isMobile }) {
    const shimmerGradient = dark
        ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.01) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.01) 70%, transparent 100%)"
        : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.02) 70%, transparent 100%)";

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
                    animation: `aci-hardware-shine ${isMobile ? "2.2s" : "2.6s"} cubic-bezier(0.25, 1, 0.5, 1) infinite`,
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
                    duration: isMobile ? 0.3 : 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                }}
                className="relative pointer-events-auto"
            >
                <div className={`absolute inset-0 rounded-full bg-red-500/25 blur-2xl scale-150 ${isMobile ? "scale-110" : ""}`} />
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    onClick={onPlay}
                    className={`relative rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-2xl transition-all cursor-pointer ${isMobile ? "w-9 h-9" : "w-12 h-12"} ${dark ? "shadow-red-500/40 ring-2 ring-white/10" : "shadow-red-500/30 ring-2 ring-white/30"}`}
                >
                    <span className={`ml-0.5 drop-shadow-sm text-white ${isMobile ? "text-xs" : "text-base"}`}>▶</span>
                </motion.div>
            </motion.div>
        </div>
    );
}