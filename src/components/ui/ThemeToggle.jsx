import { useTheme } from "../../../context/ThemeContext";
import { useState } from "react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
        setIsAnimating(true);
        toggleTheme();
        setTimeout(() => setIsAnimating(false), 600);
    };

    return (
        <button
            onClick={handleToggle}
            className={`relative w-11 h-11 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden group ${
                isDark
                    ? "bg-linear-to-br from-gray-200 to-gray-300 border border-gray-300 hover:border-gray-400 hover:bg-linear-to-br hover:from-gray-300 hover:to-gray-400 shadow-lg shadow-gray-400/30"
                    : "bg-linear-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-gray-500 hover:bg-linear-to-br hover:from-gray-600 hover:to-gray-700 shadow-lg shadow-gray-900/50"
            }`}
            aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
        >
            {/* Animated background circle with delay */}
            <div className={`absolute inset-0 rounded-lg transition-all duration-700 ease-out delay-100 ${
                isDark
                    ? isAnimating ? "scale-150 opacity-0" : "scale-100 opacity-0"
                    : isAnimating ? "scale-0 opacity-100" : "scale-100 opacity-100"
            } ${isDark ? "bg-yellow-300/40" : "bg-blue-400/40"}`} />

            {/* Icon container dengan animasi delay */}
            <div className="absolute inset-0 flex items-center justify-center">
                {isDark ? (
                    // Matahari (Light mode)
                    <svg 
                        className={`w-6 h-6 text-yellow-400 transition-all duration-500 ease-out delay-150 absolute ${
                            isAnimating 
                                ? "opacity-0 scale-0 rotate-90" 
                                : "opacity-100 scale-100 rotate-0"
                        }`}
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                ) : (
                    // Bulan (Dark mode)
                    <svg 
                        className={`w-6 h-6 text-slate-100 transition-all duration-500 ease-out delay-150 absolute ${
                            isAnimating 
                                ? "opacity-0 scale-0 rotate-90" 
                                : "opacity-100 scale-100 rotate-0"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                )}
            </div>

            {/* Halo glow effect pada hover dengan delay */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 pointer-events-none" style={{
                boxShadow: isDark 
                    ? "inset 0 0 15px rgba(250, 204, 21, 0.3), 0 0 15px rgba(250, 204, 21, 0.2)" 
                    : "inset 0 0 15px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)"
            }} />

            {/* Ripple effect pada click dengan delay */}
            <div className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-500 delay-100 ${
                isAnimating 
                    ? isDark
                        ? "animate-pulse bg-yellow-300/30"
                        : "animate-pulse bg-blue-400/30"
                    : ""
            }`} />
        </button>
    );
}
