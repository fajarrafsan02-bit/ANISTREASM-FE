import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export function useScrollReveal({ threshold = 0.12, once = true } = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(null);

    useEffect(() => {
        const el = ref.current;

        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        return (() => observer.disconnect());
    }, [])

    return { ref, isVisible };
}