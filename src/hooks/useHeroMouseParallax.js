import { useRef } from "react";

export default function useHeroMouseParallax() {
    const containerRef = useRef(null);
    return { containerRef, mousePos: { x: 0, y: 0 }, isHovering: false };
}
