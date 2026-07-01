import { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { useAuthModal } from "../../../context/AuthModalContext";

export default function AuthModalLayout({ isOpen, onClose, children }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { closeModal } = useAuthModal();

    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);
    const isTilting = useRef(false);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current || !isTilting.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        setTilt({ x: dy * -8, y: dx * 8 });
    }, []);

    const handleMouseEnter = useCallback(() => { isTilting.current = true; }, []);
    const handleMouseLeave = useCallback(() => {
        isTilting.current = false;
        setTilt({ x: 0, y: 0 });
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        closeModal();
        onClose?.();
    };

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") handleClose(); };
        if (isOpen) window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false);
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen && isVisible === false) {
            const timer = setTimeout(() => setIsClosing(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isVisible]);

    const isHidden = !isOpen && !isClosing;

    return (
        <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3"
            style={{
                visibility: isHidden ? "hidden" : "visible",
                pointerEvents: isHidden ? "none" : "auto",
            }}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 transition-all duration-500 ease-out ${isVisible ? "opacity-100 backdrop-blur-xl" : "opacity-0 backdrop-blur-0"}`}
                style={{
                    backgroundColor: isVisible
                        ? (isDark ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0.65)")
                        : "rgba(0,0,0,0)",
                }}
                onClick={handleClose}
            />

            {/* 3D Perspective Wrapper */}
            <div className="aml-perspective w-full max-w-[320px] flex items-center justify-center">
            {/* Modal Container */}
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`aml-3d-card relative w-full max-w-[320px] max-h-[85vh] rounded-2xl border overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isDark
                        ? "bg-[#09090b] border-zinc-800/80 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]"
                        : "bg-white border-gray-200/60 shadow-[0_0_0_1px_rgba(0,0,0,0.02)_inset]"
                } ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.92] translate-y-8"}`}
                style={{
                    transform: isVisible
                        ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                        : "rotateX(0) rotateY(0)",
                    boxShadow: isVisible
                        ? (isDark
                            ? `0 0 0 1px rgba(255,255,255,0.03), 0 30px 60px -15px rgba(0,0,0,0.9), 0 0 60px -10px rgba(239,68,68,0.06), ${tilt.y * -2}px ${tilt.x * 2}px 40px -10px rgba(239,68,68,0.08)`
                            : `0 0 0 1px rgba(0,0,0,0.03), 0 30px 60px -15px rgba(0,0,0,0.12), 0 0 40px -10px rgba(239,68,68,0.04), ${tilt.y * -2}px ${tilt.x * 2}px 30px -10px rgba(239,68,68,0.05)`)
                        : (isDark
                            ? "0 4px 6px -1px rgba(0,0,0,0.1)"
                            : "0 4px 6px -1px rgba(0,0,0,0.05)"),
                    transition: isTilting.current
                        ? "box-shadow 0.3s ease"
                        : "all 0.5s cubic-bezier(0.25,1,0.5,1)",
                }}
            >
                {/* Inner Glow */}
                {isVisible && (
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.15]"
                        style={{
                            background: isDark
                                ? "radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.3) 0%, transparent 60%)"
                                : "radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.06) 0%, transparent 60%)",
                            zIndex: 0,
                        }}
                    />
                )}

                {/* Gradient Border */}
                {isVisible && (
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            padding: "1px",
                            background: isDark
                                ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(239,68,68,0.08) 30%, rgba(255,255,255,0.02) 70%, rgba(239,68,68,0.06) 100%)"
                                : "linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(239,68,68,0.04) 30%, rgba(0,0,0,0.02) 70%, rgba(239,68,68,0.03) 100%)",
                            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            maskComposite: "exclude",
                            WebkitMaskComposite: "xor",
                            animation: isDark
                                ? "aml-borderPulse 3s ease-in-out infinite"
                                : "aml-borderPulseLight 3s ease-in-out infinite",
                            zIndex: 10,
                        }}
                    />
                )}

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-all duration-300 ${
                        isDark
                            ? "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-black/20"
                            : "text-gray-400 hover:text-red-600 hover:bg-red-50/60 hover:shadow-md hover:shadow-red-200/20"
                    } ${isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-180"}`}
                    style={{
                        transitionTimingFunction: isVisible
                            ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
                            : "cubic-bezier(0.4, 0, 1, 1)",
                        transitionDelay: isVisible ? "200ms" : "0ms",
                    }}
                    aria-label="Close modal"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Top Shine */}
                {isVisible && (
                    <div
                        className="absolute top-0 left-0 right-0 pointer-events-none"
                        style={{
                            height: "2px",
                            background: isDark
                                ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)"
                                : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                            animation: isDark
                                ? "aml-topShineDark 3s ease-in-out infinite"
                                : "aml-topShineLight 3s ease-in-out infinite",
                            boxShadow: isDark
                                ? "0 0 15px rgba(255,255,255,0.05)"
                                : "0 0 20px rgba(255,255,255,0.4)",
                            zIndex: 20,
                        }}
                    />
                )}

                {/* 3D Floating Orb Behind Content */}
                {isVisible && (
                    <div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none z-[1]"
                        style={{
                            background: isDark
                                ? "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)"
                                : "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)",
                            animation: "aml-glowPulse 4s ease-in-out infinite",
                            transform: `translateZ(-20px)`,
                        }}
                    />
                )}

                {/* Content */}
                <div className="p-5 pt-8 overflow-y-auto flex-1 aml-scrollbar-hide relative z-[5] overscroll-contain aml-layer-2">
                    <div
                        className={`transition-all duration-500 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                        }`}
                        style={{
                            transitionTimingFunction: isVisible
                                ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
                                : "cubic-bezier(0.4, 0, 1, 1)",
                            transitionDelay: isVisible ? "150ms" : "50ms",
                        }}
                    >
                        {children}
                    </div>
                </div>

                {/* Bottom Shine */}
                {isVisible && (
                    <div
                        className="absolute bottom-0 left-0 right-0 pointer-events-none"
                        style={{
                            height: "2px",
                            background: isDark
                                ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)"
                                : "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
                            animation: isDark
                                ? "aml-bottomShineDark 3s ease-in-out infinite"
                                : "aml-bottomShineLight 3s ease-in-out infinite",
                            zIndex: 20,
                        }}
                    />
                )}

                {/* Sweep Shine */}
                {isVisible && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
                        <div
                            style={{
                                position: "absolute",
                                top: "-50%",
                                left: "-50%",
                                width: "200%",
                                height: "200%",
                                background: isDark
                                    ? "linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.03) 50%, transparent 55%)"
                                    : "linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.2) 50%, transparent 55%)",
                                animation: "aml-sweepShine 5s cubic-bezier(0.25, 1, 0.5, 1) infinite",
                            }}
                        />
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}