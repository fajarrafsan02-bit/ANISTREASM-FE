import { useState, useRef, useCallback, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

export function WatchButton({ onClick, className = "", isDark, isMobile }) {
    const { theme } = useTheme();
    const dark = isDark !== undefined ? isDark : theme === "dark";

    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState([]);
    const buttonRef = useRef(null);
    const rippleIdRef = useRef(0);

    useEffect(() => {
        if (ripples.length === 0) return;
        const timers = ripples.map((r) =>
            setTimeout(() => {
                setRipples((prev) => prev.filter((rp) => rp.id !== r.id));
            }, 600)
        );
        return () => timers.forEach(clearTimeout);
    }, [ripples]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setIsPressed(false);
    }, []);
    const handleMouseDown = useCallback(() => setIsPressed(true), []);
    const handleMouseUp = useCallback(() => setIsPressed(false), []);

    const handleClick = useCallback(
        (e) => {
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 1.5;
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                const newRipple = {
                    id: rippleIdRef.current++,
                    x,
                    y,
                    size,
                };

                setRipples((prev) => [...prev, newRipple]);
            }

            onClick?.(e);
        },
        [onClick]
    );

    // Skalakan ukuran ikon berdasarkan breakpoint seluler
    const iconSize = isMobile ? "8" : "10";

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={`
                relative overflow-hidden w-full text-white font-bold rounded-md
                cursor-pointer select-none transition-colors duration-200
                ${isMobile ? "text-[9px] py-1" : "text-[10px] py-1.5"}
                ${className}
            `}
            style={{
                transform: isPressed
                    ? "scale(0.95)"
                    : isHovered
                        ? "scale(1.04)"
                        : "scale(1)",
                boxShadow: isPressed
                    ? `0 2px 8px rgba(220,38,38,${dark ? 0.3 : 0.4}), inset 0 2px 4px rgba(0,0,0,0.2)`
                    : isHovered
                        ? `0 8px 28px rgba(220,38,38,${dark ? 0.45 : 0.55}), 0 0 0 1px rgba(220,38,38,${dark ? 0.3 : 0.4}), 0 0 20px rgba(220,38,38,${dark ? 0.2 : 0.3})`
                        : `0 2px 6px rgba(220,38,38,${dark ? 0.2 : 0.3})`,
                transition:
                    "transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease, background-color 0.2s",
                background: isPressed
                    ? "linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)"
                    : isHovered
                        ? "linear-gradient(135deg, #dc2626 0%, #ef4444 60%, #f87171 100%)"
                        : "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
            }}
        >
            {/* Shimmer sweep */}
            <div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-md"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
            >
                <div
                    className="absolute inset-y-0 w-1/2 animate-shimmer-sweep"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.08) 60%, transparent 100%)",
                    }}
                />
            </div>

            {/* Inner glow ring */}
            <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                    boxShadow: isHovered
                        ? "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)"
                        : "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.15)",
                    transition: "box-shadow 0.25s ease",
                }}
            />

            {/* Ripple effects */}
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute rounded-full pointer-events-none bg-white/25"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                        animation: "ripple-expand 0.55s cubic-bezier(0.4,0,0.2,1) forwards",
                    }}
                />
            ))}

            {/* Konten */}
            <span className="relative z-10 flex items-center justify-center gap-1">
                <svg
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{
                        transform: isPressed
                            ? "scale(0.85)"
                            : isHovered
                                ? "scale(1.1)"
                                : "scale(1)",
                        transition: "transform 0.15s cubic-bezier(0.4,0,0.2,1)",
                        filter: isHovered
                            ? "drop-shadow(0 0 4px rgba(255,255,255,0.5))"
                            : "none",
                    }}
                >
                    <path d="M8 5v14l11-7z" />
                </svg>
                <span
                    style={{
                        textShadow: isHovered
                            ? "0 0 8px rgba(255,255,255,0.3)"
                            : "none",
                        transition: "text-shadow 0.25s ease",
                    }}
                >
                    Detail
                </span>
            </span>
        </button>
    );
}