import { useState, useEffect, useCallback } from "react";

export default function useHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 20);
        setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);

        const winScroll = document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);

        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMenuOpen(false);
    };

    return {
        menuOpen,
        setMenuOpen,
        isScrolled,
        isHidden,
        scrollProgress,
        scrollToTop,
    };
}