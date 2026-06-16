import { useState, useEffect } from "react";
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

    const handleClose = () => {
        setIsClosing(true);
        closeModal();
        onClose?.();
    };

    const handleMouseMove = (e) => {
        if (!isVisible) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const sensitivity = 15;
        setTilt({ x: -y / sensitivity, y: x / sensitivity });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
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
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 perspective"
            style={{
                visibility: isHidden ? "hidden" : "visible",
                pointerEvents: isHidden ? "none" : "auto",
            }}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 ${isVisible ? "opacity-100 backdrop-blur-md" : "opacity-0 backdrop-blur-0"}`}
                style={{
                    transitionProperty: "opacity, backdrop-filter, background-color",
                    transitionDuration: "500ms",
                    transitionTimingFunction: isVisible
                        ? "cubic-bezier(0.4, 0, 0.2, 1)"
                        : "cubic-bezier(0.4, 0, 1, 1)",
                    backgroundColor: isVisible ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0)",
                }}
                onClick={handleClose}
            />

            {/* Modal Container */}
            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative w-full max-w-[320px] max-h-[85vh] rounded-2xl border shadow-2xl overflow-hidden flex flex-col ${isDark
                        ? "bg-[#09090b] border-zinc-800/80"
                        : "bg-linear-to-b from-gray-50 to-white border-gray-200/60"
                    } ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{
                    transform: isVisible
                        ? `scale(1) translateY(0) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                        : "scale(0.75) translateY(50px) rotateX(-15deg)",
                    transformStyle: "preserve-3d",
                    transitionProperty: "opacity, transform, box-shadow",
                    transitionDuration: isVisible ? "500ms" : "400ms",
                    transitionTimingFunction: isVisible
                        ? "cubic-bezier(0.25, 1, 0.5, 1)"
                        : "cubic-bezier(0.4, 0, 1, 1)",
                    willChange: "transform, opacity",
                    boxShadow: isVisible
                        ? (isDark
                            ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px -5px rgba(239, 68, 68, 0.08)"
                            : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 50px -5px rgba(239, 68, 68, 0.05)")
                        : (isDark
                            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                            : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"),
                }}
            >
                {/* Dynamic 3D Aura Shadow */}
                {isVisible && (
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none filter blur-2xl"
                        style={{
                            background: isDark
                                ? "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(244, 63, 94, 0.02) 50%, rgba(9, 9, 11, 0.8) 100%)"
                                : "linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(244, 63, 94, 0.01) 50%, rgba(255, 255, 255, 0.8) 100%)",
                            transform: "translateZ(-15px) scale(1.05)",
                            opacity: 0.8,
                            zIndex: -1,
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
                                ? "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(239,68,68,0.1) 30%, rgba(255,255,255,0.02) 70%, rgba(239,68,68,0.08) 100%)"
                                : "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(239,68,68,0.05) 30%, rgba(0,0,0,0.02) 70%, rgba(239,68,68,0.03) 100%)",
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
                    className={`absolute top-3 right-3 p-2 rounded-full z-10 ${isDark
                            ? "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60"
                            : "text-gray-400 hover:text-red-600 hover:bg-red-50/60 hover:shadow-md hover:shadow-red-200/20"
                        }`}
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible
                            ? "rotate(0deg) scale(1)"
                            : "rotate(180deg) scale(0.5)",
                        backdropFilter: "blur(4px)",
                        transitionProperty: "opacity, transform, background-color, box-shadow",
                        transitionDuration: "300ms",
                        transitionDelay: isVisible ? "200ms" : "0ms",
                        transitionTimingFunction: isVisible
                            ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
                            : "cubic-bezier(0.4, 0, 1, 1)",
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

                {/* Content */}
                <div className="p-5 pt-8 overflow-y-auto flex-1 aml-scrollbar-hide relative z-[5] overscroll-contain">
                    <div
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(20px)",
                            transitionProperty: "opacity, transform",
                            transitionDuration: "500ms",
                            transitionDelay: isVisible ? "150ms" : "50ms",
                            transitionTimingFunction: isVisible
                                ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
                                : "cubic-bezier(0.4, 0, 1, 1)",
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
    );
}