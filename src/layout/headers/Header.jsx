// Header.jsx
import { useTheme } from "../../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import useHeader from "./useHeader";

import HeaderLogo from "./HeaderLogo";
import HeaderDesktopNav from "./HeaderDesktopNav";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderBottomGradient from "./HeaderBottomGradient";
import HeaderProgressBar from "./HeaderProgressBar";
import HeaderActions from "./HeaderActions";
import useBreakpoint from "../../components/headerActions/hooks/useBreakpoint";

export default function Header({ activeTab, setActiveTab }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    const {
        menuOpen,
        setMenuOpen,
        isScrolled,
        isHidden,
        scrollProgress,
        scrollToTop,
        searchQuery,     // ✅ PERBAIKAN 1: Ambil search query dari useHeader
        setSearchQuery,  // ✅ PERBAIKAN 2: Ambil setter search query dari useHeader
    } = useHeader();

    const { isDesktop } = useBreakpoint();
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (isDesktop) setMobileSearchOpen(false);
    }, [isDesktop]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-in-out ${isHidden ? "-translate-y-full" : "translate-y-0"
                }`}
            style={{
                opacity: mounted ? 1 : 0,
                transform: isHidden
                    ? "translateY(-100%)"
                    : mounted ? "translateY(0px)" : "translateY(-16px)",
                transition: mounted
                    ? "opacity 500ms ease, transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
            }}
        >
            <div
                className={`absolute inset-0 transition-all duration-500 ${isScrolled
                        ? isDark
                            ? "bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
                            : "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
                        : "bg-transparent border-b border-transparent"
                    }`}
            />

            <div className="relative max-w-7xl mx-auto px-3 min-[360px]:px-4 sm:px-6 md:px-10">
                {/* ✅ PERBAIKAN 3: Ketinggian header mobile dirampingkan dari h-[72px] menjadi h-[60px] agar ringkas & proporsional */}
                <div className="flex items-center justify-between h-[60px] sm:h-20 md:h-[88px]">

                    {/* Logo */}
                    <div style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "none" : "translateX(-16px)",
                        transition: "opacity 500ms ease 150ms, transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 150ms",
                    }}>
                        <HeaderLogo
                            isDark={isDark}
                            setActiveTab={setActiveTab}
                            scrollToTop={scrollToTop}
                            mobileSearchOpen={mobileSearchOpen}
                        />
                    </div>

                    {/* Nav */}
                    <div style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "none" : "translateY(-8px)",
                        transition: "opacity 500ms ease 250ms, transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 250ms",
                    }}>
                        <HeaderDesktopNav
                            isDark={isDark}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            scrollToTop={scrollToTop}
                        />
                    </div>

                    {/* Actions */}
                    <div
                        className={`relative z-20 transition-all duration-500 ${mobileSearchOpen ? "flex-1 flex justify-end" : ""
                            }`}
                        style={{
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? "none" : "translateX(16px)",
                            transition: "opacity 500ms ease 350ms, transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 350ms",
                        }}
                    >
                        <HeaderActions
                            isDark={isDark}
                            theme={theme}
                            toggleTheme={toggleTheme}
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                            setActiveTab={setActiveTab}
                            scrollToTop={scrollToTop}
                            mobileSearchOpen={mobileSearchOpen}
                            setMobileSearchOpen={setMobileSearchOpen}
                        />
                    </div>
                </div>
            </div>

            {/* ✅ PERBAIKAN 4: Menghubungkan state pencarian (searchQuery & setSearchQuery) agar input pencarian di HP berfungsi aktif */}
            <HeaderMobileMenu
                menuOpen={menuOpen}
                isDark={isDark}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                scrollToTop={scrollToTop}
            />

            <HeaderBottomGradient isDark={isDark} isScrolled={isScrolled} />
            <HeaderProgressBar scrollProgress={scrollProgress} />
        </header>
    );
}