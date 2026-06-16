import { useTheme } from "../../../context/ThemeContext";
import { useState, useEffect } from "react";
import AnimeGrid from "./AnimeGrid";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { useAuth } from "../../../context/AuthContext";           // ✅ tambah
import { useAuthModal } from "../../../context/AuthModalContext"; // ✅ tambah
import useToast from "../../../hooks/useToast";                  // ✅ tambah

export default function AnimeSection({
    title,
    accent,
    animeList,
    viewAllLabel = "Lihat Semua",
    onViewAll,
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isMobile, setIsMobile] = useState(false);

    // ✅ Auth hooks
    const { isLoggedIn } = useAuth();
    const { openModal } = useAuthModal();
    const toast = useToast();

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });

    // ✅ Handler dengan pengecekan login
    const handleViewAll = (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            toast.warning("Silakan login terlebih dahulu untuk melihat semua anime.", 3000);
            openModal({
                mode: "login",
                redirectAction: () => {
                    if (onViewAll) onViewAll();
                },
            });
            return;
        }

        if (onViewAll) onViewAll();
    };

    return (
        <section className="max-w-7xl mx-auto overflow-visible transition-colors duration-300 px-3 py-5 sm:px-6 sm:py-8 md:px-8 md:py-10">

            <div
                ref={headerRef}
                className="flex items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4"
                style={{
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? "translateY(0px)" : "translateY(16px)",
                    transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
                    <div
                        className={`w-1 sm:w-1.5 rounded-full ${accent} h-4.5 sm:h-6 md:h-7.5 shadow-[0_0_15px_rgba(239,68,68,0.5)]`}
                        style={{
                            transform: headerVisible ? "scaleY(1)" : "scaleY(0)",
                            transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
                            transformOrigin: "top",
                        }}
                    />
                    <h2 className={`font-display font-extrabold tracking-wider transition-colors duration-300 truncate text-lg sm:text-2xl md:text-3xl ${isDark ? "text-white" : "text-zinc-900"}`}>
                        {title}
                    </h2>
                </div>

                {/* ✅ Ganti onViewAll langsung ke handleViewAll */}
                <a
                    href="#"
                    onClick={handleViewAll}
                    className={`group/btn shrink-0 flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-wider uppercase rounded-full border transition-all duration-300 focus:outline-none ${isDark
                            ? "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-red-500/30 hover:bg-linear-to-r hover:from-red-500/10 hover:to-rose-500/10 hover:shadow-lg hover:shadow-red-500/5"
                            : "bg-white border-zinc-200 text-zinc-600 hover:text-red-600 hover:border-red-300 hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 hover:shadow-lg hover:shadow-red-100/30"
                        }`}
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transition: "opacity 500ms ease 200ms",
                    }}
                >
                    <span>{viewAllLabel}</span>
                    <span className="transition-transform duration-300 transform group-hover/btn:translate-x-1 font-normal">
                        &rarr;
                    </span>
                </a>
            </div>

            <div className="overflow-visible">
                <AnimeGrid animes={animeList} isMobile={isMobile} />
            </div>
        </section>
    );
}