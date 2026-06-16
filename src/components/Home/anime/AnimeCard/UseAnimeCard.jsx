import { useState, useRef, useCallback, useEffect } from "react";

const PANEL_WIDTH = 200;
const EDGE = 16;
const TRANSITION_DURATION = 350;

export function useAnimeCard() {
    const [isHovered, setIsHovered] = useState(false);
    const [isElevated, setIsElevated] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);

    const wrapperRef = useRef(null);
    const timeoutRef = useRef(null);

    const clearPendingTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleMouseEnter = useCallback(() => {
        clearPendingTimeout();
        if (!wrapperRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();
        const spaceRight = window.innerWidth - rect.right;
        const spaceLeft = rect.left;

        let shouldOpenLeft = false;

        if (spaceRight < PANEL_WIDTH + EDGE) {
            shouldOpenLeft = true;
        }

        if (spaceRight < PANEL_WIDTH + EDGE && spaceLeft < PANEL_WIDTH + EDGE) {
            shouldOpenLeft = spaceLeft > spaceRight;
        }

        setOpenLeft(shouldOpenLeft);
        setIsElevated(true);
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        timeoutRef.current = setTimeout(() => {
            setIsElevated(false);
            setOpenLeft(false);
        }, TRANSITION_DURATION);
    }, []);

    useEffect(() => {
        return () => clearPendingTimeout();
    }, []);

    return {
        isHovered,
        isElevated,
        openLeft,
        wrapperRef,
        handleMouseEnter,
        handleMouseLeave,
        panelWidth: PANEL_WIDTH,
        transitionDuration: TRANSITION_DURATION,
    };
}