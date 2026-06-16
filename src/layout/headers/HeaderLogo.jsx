import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function HeaderLogo({ setActiveTab, scrollToTop, mobileSearchOpen = false }) {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleLogoClick = () => {
        if (setActiveTab) setActiveTab("beranda");
        navigate("/");
        if (scrollToTop) {
            scrollToTop();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.08,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, filter: "blur(4px)", y: 5 },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const badgeVariants = {
        hidden: { opacity: 0, letterSpacing: "0.1em" },
        visible: {
            opacity: 1,
            letterSpacing: "0.22em",
            transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer group shrink-0 select-none text-left"
        >
            {/* ── 1. Visual Icon (Pemutar Dashed Ring & Kilatan Logam Perak) ── */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                {/* Glow belakang gradasi warna merah-oranye */}
                <motion.div
                    animate={{
                        scale: [0.95, 1.1, 0.95],
                        opacity: isDark ? [0.3, 0.55, 0.3] : [0.12, 0.28, 0.12]
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-tr from-[#ff1e56] to-orange-500 rounded-2xl blur-xl pointer-events-none"
                />

                {/* ✅ PENINGKATAN: Bingkai putus-putus berputar lambat secara tak terbatas (futuristik) */}
                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    variants={{
                        hidden: { scale: 0.8 },
                        visible: { scale: 1 },
                        hover: { scale: 1.05 }
                    }}
                    className={`absolute inset-0 rounded-[1.1rem] border-2 border-dashed transition-colors duration-500 ${isDark ? "border-red-500/20" : "border-[#ff1e56]/35"}`}
                />

                {/* Boks utama huruf A */}
                <motion.div
                    variants={{
                        hidden: { scale: 0.8, rotate: -8 },
                        visible: { scale: 1, rotate: 0, y: 0 },
                        hover: { scale: 1.08, rotate: 8, y: -2 }
                    }}
                    whileTap={{ scale: 0.94, rotate: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="relative w-7.5 h-7.5 sm:w-9 sm:h-9 bg-gradient-to-tr from-[#ff1e56] via-red-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 overflow-hidden border border-white/10"
                >
                    {/* ✅ PENINGKATAN: Sapuan kilap gradasi perak (Metallic Shine) yang sangat halus */}
                    <motion.div
                        animate={{
                            x: ["-250%", "250%"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 2
                        }}
                        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                    />

                    <span className="text-white font-sora font-black text-lg sm:text-xl tracking-tighter drop-shadow-md select-none transform -translate-y-[0.5px]">
                        A
                    </span>
                </motion.div>
            </div>

            {/* ── 2. Teks Kolom & Tagline dengan Animasi Menciut (Collapse) ── */}
            <motion.div
                initial={false}
                animate={{
                    // Pengaturan margin kiri yang lebih sempit (8px) di HP ketika terbuka agar tidak meluber
                    width: mobileSearchOpen ? 0 : "auto",
                    opacity: mobileSearchOpen ? 0 : 1,
                    scale: mobileSearchOpen ? 0.85 : 1,
                    marginLeft: mobileSearchOpen ? "0px" : "8px",
                }}
                transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1]
                }}
                className="flex flex-col leading-none overflow-hidden origin-left shrink-0"
            >
                {/* ✅ PENINGKATAN: Teks diturunkan ke text-[17px] di HP, serta ditambahkan live neon-glow pulse pada STREAM */}
                <motion.span
                    variants={textVariants}
                    className={`text-[17px] xs:text-lg sm:text-2xl font-black tracking-tighter leading-none transition-colors duration-300 ${isDark ? "text-white" : "text-neutral-900"}`}
                >
                    ANI
                    <motion.span
                        animate={{
                            color: ["#ff1e56", "#ff4d79", "#ff1e56"],
                            textShadow: isDark
                                ? ["0 0 8px rgba(255,30,86,0.15)", "0 0 16px rgba(255,30,86,0.35)", "0 0 8px rgba(255,30,86,0.15)"]
                                : ["none", "none", "none"]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-block ml-0.5"
                    >
                        STREAM
                    </motion.span>
                </motion.span>

                <motion.span
                    variants={badgeVariants}
                    className="hidden min-[360px]:block text-[8px] sm:text-[10px] font-bold text-red-500/80 uppercase leading-none mt-1 transition-colors duration-300"
                >
                    PREMIUM HUB
                </motion.span>
            </motion.div>
        </motion.div>
    );
}