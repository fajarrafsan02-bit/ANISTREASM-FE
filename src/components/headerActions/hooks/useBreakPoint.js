import { useState, useEffect } from "react";

export default function useBreakpoint() {
    const [width, setWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 375
    );
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return {
        isXs: width < 360,
        isSm: width >= 360 && width < 480,
        isMd: width >= 480 && width < 768,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
    };
}