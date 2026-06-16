import { slideUp } from "../hero/HeroStyle";

export default function HeroInfoCard({ current, isDark, animationKey }) {
    return (
        <>
            {/* Desktop Version */}
            <div
                className={`absolute top-20 md:top-28 right-6 md:right-16 lg:right-24 z-[5] hidden md:block backdrop-blur-xl border rounded-2xl p-5 w-56 shadow-2xl transition-colors duration-700 ${isDark
                    ? "bg-black/40 border-white/10"
                    : "bg-white/60 border-gray-200/50"
                    }`}
                style={{
                    animation: `slideUp 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms forwards`,
                    opacity: 0,
                }}
                key={`card-desktop-${animationKey}`}
            >
                <p className={`text-[11px] uppercase tracking-widest mb-1 transition-colors duration-700 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    {current?.season}
                </p>
                <p className={`font-bold text-lg mb-3 transition-colors duration-700 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {current?.episode}
                </p>
                <div className={`h-1 w-full rounded-full overflow-hidden transition-colors duration-700 ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                    <div className="h-full bg-red-600 rounded-full w-[70%]" />
                </div>
                <p className={`text-[10px] mt-1.5 text-right transition-colors duration-700 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    {current?.duration}
                </p>
            </div>

            {/* Mobile Version - Dioptimalkan untuk layar ultra-kecil (320px) hingga mobile standar */}
            <div
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-[5] md:hidden backdrop-blur-xl border rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-xl transition-colors duration-700 ${isDark
                    ? "bg-black/40 border-white/10"
                    : "bg-white/60 border-gray-200/50"
                    }`}
                style={{
                    animation: `slideUp 500ms cubic-bezier(0.34, 1.56, 0.64, 1) 300ms forwards`,
                    opacity: 0,
                }}
                key={`card-mobile-${animationKey}`}
            >
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div>
                        <p className={`text-[8px] sm:text-[9px] uppercase tracking-wider transition-colors duration-700 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                            {current?.season}
                        </p>
                        <p className={`font-bold text-[10px] sm:text-xs transition-colors duration-700 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {current?.episode}
                        </p>
                    </div>
                    <div className="w-px h-5 sm:h-6 bg-current opacity-20" />
                    <div className="text-right">
                        <p className={`font-semibold text-[10px] sm:text-xs transition-colors duration-700 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {current?.duration}
                        </p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                            <div className={`h-[3px] sm:h-1 w-6 sm:w-8 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                                <div className="h-full bg-red-600 rounded-full w-[70%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}