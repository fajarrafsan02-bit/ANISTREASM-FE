import { useState, useEffect, useRef, useCallback } from "react";

export default function useHeroCarousel(total) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    const autoTimerRef = useRef(null);
    const progressRef = useRef(null);
    const touchStartX = useRef(null);

    const goTo = useCallback((index, dir = 1) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setDirection(dir);
        setCurrentSlide(((index % total) + total) % total);
        setAnimationKey((prev) => prev + 1);
        setTimeout(() => setIsAnimating(false), 900);
    }, [total, isAnimating]);

    const resetAuto = useCallback(() => {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prev) => (prev + 1) % total);
            setAnimationKey((prev) => prev + 1);
        }, 6000);
    }, [total]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 50);
        resetAuto();
        return () => {
            clearTimeout(timer);
            clearInterval(autoTimerRef.current);
        };
    }, [resetAuto]);

    useEffect(() => {
        setAnimationKey((prev) => prev + 1);
    }, [currentSlide]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft") {
                goTo(currentSlide - 1, -1);
                resetAuto();
            }
            if (e.key === "ArrowRight") {
                goTo(currentSlide + 1, 1);
                resetAuto();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [currentSlide, goTo, resetAuto]);

    const handlePrev = () => {
        goTo(currentSlide - 1, -1);
        resetAuto();
    };

    const handleNext = () => {
        goTo(currentSlide + 1, 1);
        resetAuto();
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) {
            dx < 0 ? handleNext() : handlePrev();
        }
        touchStartX.current = null;
    };

    return {
        currentSlide,
        direction,
        isLoaded,
        animationKey,
        progressRef,
        goTo,
        resetAuto,
        handlePrev,
        handleNext,
        handleTouchStart,
        handleTouchEnd,
    };
}