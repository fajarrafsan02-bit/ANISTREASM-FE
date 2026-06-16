// HeroBackground.jsx
import { motion } from "motion/react";
import { getImageFilter } from "../hero/HeroStyle";

// Varian Animasi untuk Transisi Latar Belakang (Cinematic Zoom & Slide)
const backgroundVariants = {
    active: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px) brightness(1)",
        zIndex: 1,
        transition: {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1], // EaseOutExpo: Transisi ultra smooth & modern
        }
    },
    inactive: {
        opacity: 0,
        x: 40, // Geseran sedikit lebih jauh agar pergerakan terlihat jelas
        scale: 1.08, // Efek zoom-in halus ketika tidak aktif
        filter: "blur(10px) brightness(0.6)", // Efek focus-pull (blur memudar saat aktif)
        zIndex: 0,
        transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export default function HeroBackground({
    anime,
    index,
    currentSlide,
    isLoaded,
    isDark,
}) {
    const isActive = index === currentSlide;
    const animateState = isActive && isLoaded ? "active" : "inactive";

    return (
        <motion.div
            variants={backgroundVariants}
            initial="inactive"
            animate={animateState}
            className="absolute inset-0 overflow-hidden"
        >
            {/* Kontainer untuk Drift Parallax */}
            <div className="absolute inset-0">
                {/* 
                    Kontainer DRIFT tetap dipertahankan menggunakan CSS animasi 
                    agar gerakan panning berjalan secara asinkronus dan hemat daya CPU
                */}
                <div
                    className="absolute inset-[-8%] sm:inset-[-12%] overflow-hidden"
                    style={{
                        animation: "heroDrift 18s ease-in-out infinite alternate",
                        animationDelay: `${index * -4}s`,
                    }}
                >
                    <img
                        src={anime.banner}
                        alt={anime.title}
                        fetchPriority={isActive ? "high" : "auto"}
                        loading={isActive ? "eager" : "lazy"}
                        className="w-full h-full object-cover scale-110"
                        style={{
                            objectPosition: 'center center',
                            filter: getImageFilter(isDark),
                            transition: 'object-position 0.8s ease, transform 0.8s ease',
                        }}
                    />
                </div>
            </div>
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 z-10 ${isDark
                    ? "bg-gradient-to-t from-[#070204] via-[#070204]/80 sm:via-[#070204]/40 to-transparent"
                    : "bg-gradient-to-t from-white via-white/85 sm:via-white/40 to-transparent"
                    }`}
            />
        </motion.div>
    );
}