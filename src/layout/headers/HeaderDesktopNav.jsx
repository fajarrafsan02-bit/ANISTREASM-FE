import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import useToast from "../../hooks/useToast";
import { NAV_LINKS } from "./headerConstants";

export default function HeaderDesktopNav({
    isDark,
    activeTab,
    setActiveTab,
    scrollToTop,
}) {
    const { isLoggedIn } = useAuth();
    const { openModal } = useAuthModal();
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();

    const [isNavigating, setIsNavigating] = useState(false);
    const [pressedTab, setPressedTab] = useState(null);
    const navRef = useRef(null);
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

    // Hanya reset status navigasi lokal ketika rute berubah
    useEffect(() => {
        setPressedTab(null);
        setIsNavigating(false);
    }, [location.pathname]);

    // Memperbarui posisi indikator (pill) aktif menggunakan properti offset layout
    useEffect(() => {
        const updatePill = () => {
            const activeButton = document.getElementById(`nav-${activeTab}`);
            if (activeButton) {
                // offsetLeft relatif terhadap parent (motion.nav), aman dari efek translasi/transformasi
                setPillStyle({
                    left: activeButton.offsetLeft,
                    width: activeButton.offsetWidth,
                });
            }
        };

        // Jalankan langsung
        updatePill();

        // Jalankan kembali setelah delay kecil untuk memastikan element selesai dirender sepenuhnya
        const timeoutId = setTimeout(updatePill, 50);

        // Tambahkan event listener agar posisi pill tetap presisi saat ukuran layar berubah
        window.addEventListener("resize", updatePill);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", updatePill);
        };
    }, [activeTab]);

    const handleNavClick = useCallback((linkId) => {
        if (isNavigating || activeTab === linkId) return;

        if (linkId !== "beranda" && !isLoggedIn) {
            toast.warning("Silakan masuk terlebih dahulu untuk pindah halaman.", 3000);
            openModal({ mode: "login" });
            return;
        }

        setPressedTab(linkId);
        setIsNavigating(true);
        setActiveTab(linkId);
        scrollToTop();

        setTimeout(() => {
            navigate(linkId === "beranda" ? "/" : `/${linkId}`);
        }, 250);
    }, [isNavigating, activeTab, isLoggedIn, navigate, scrollToTop, openModal, toast, setActiveTab]);

    return (
        <motion.nav
            ref={navRef}
            className={`hidden lg:flex items-center relative rounded-full border backdrop-blur-xl select-none
                ${isDark
                    ? 'bg-white/[0.03] border-white/[0.06]'
                    : 'bg-slate-50/50 border-slate-200/60'
                }`}
            style={{ padding: '6px' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Animated sliding pill */}
            <motion.div
                className="absolute rounded-full bg-linear-to-r from-red-500 to-rose-500 pointer-events-none"
                initial={false}
                animate={{
                    left: pillStyle.left,
                    width: pillStyle.width,
                    opacity: activeTab ? 1 : 0,
                    scale: pressedTab ? 0.92 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8,
                    opacity: { duration: 0.2 },
                }}
                style={{
                    top: '6px',
                    bottom: '6px',
                    height: 'auto',
                    boxShadow: '0 4px 20px rgba(239, 68, 68, 0.35)',
                }}
            />

            {NAV_LINKS.map((link) => {
                const isActive = activeTab === link.id;
                const isPressed = pressedTab === link.id;

                return (
                    <motion.button
                        id={`nav-${link.id}`}
                        key={link.id}
                        onClick={() => handleNavClick(link.id)}
                        disabled={isNavigating && !isPressed}
                        className={`relative px-5 py-2 text-[13px] font-bold rounded-full cursor-pointer select-none z-10
                            ${isActive
                                ? "text-white"
                                : isDark
                                    ? "text-slate-400"
                                    : "text-slate-600"
                            }
                            ${isNavigating && !isPressed ? "pointer-events-none" : ""}
                        `}
                        whileHover={!isActive ? {
                            scale: 1.05,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                        } : {}}
                        whileTap={{
                            scale: 0.9,
                            transition: { type: "spring", stiffness: 500, damping: 30 }
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                        }}
                    >
                        {/* Hover background */}
                        <AnimatePresence>
                            {!isActive && (
                                <motion.span
                                    className={`absolute inset-0 rounded-full
                                        ${isDark ? 'bg-white/5' : 'bg-slate-200/50'}`}
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Press ripple */}
                        <AnimatePresence>
                            {isPressed && (
                                <motion.span
                                    className="absolute inset-0 rounded-full bg-white/20"
                                    initial={{ scale: 0.3, opacity: 0.8 }}
                                    animate={{ scale: 1.8, opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            )}
                        </AnimatePresence>
                        <span className="relative z-10">{link.name}</span>
                    </motion.button>
                );
            })}
        </motion.nav>
    );
}