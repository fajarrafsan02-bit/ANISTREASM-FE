// HeroCarouselSkeleton.jsx
import { useTheme } from "../../../context/ThemeContext";

export default function HeroCarouselSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section className={`relative h-[75vh] sm:h-[85vh] min-h-[480px] sm:min-h-[600px] overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0a0a0f]" : "bg-[#f8f9fa]"
            }`}>
            {/* Background Skeleton */}
            <div className="absolute inset-0 animate-pulse">
                <div className={`w-full h-full bg-linear-to-br ${isDark
                        ? "from-zinc-900 via-zinc-800 to-zinc-900"
                        : "from-gray-200 via-gray-300 to-gray-200"
                    }`} />
            </div>

            {/* Overlay */}
            <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? "bg-black/50" : "bg-white/40"
                }`} />

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-end sm:items-center pb-20 sm:pb-0">
                <div className="max-w-2xl w-full">
                    {/* Status */}
                    <div className={`h-6 sm:h-7 w-24 sm:w-28 rounded-full animate-pulse mb-4 sm:mb-6 ${isDark ? "bg-zinc-800" : "bg-gray-300"
                        }`} />

                    {/* Title */}
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                        <div className={`h-10 sm:h-14 w-[90%] sm:w-[80%] rounded-lg sm:rounded-xl animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />
                        <div className={`h-10 sm:h-14 w-[70%] sm:w-[60%] rounded-lg sm:rounded-xl animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />
                    </div>

                    {/* Genre */}
                    <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-5">
                        <div className={`h-4 sm:h-5 w-20 sm:w-24 rounded-full animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />
                        <div className={`h-4 sm:h-5 w-16 sm:w-20 rounded-full animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />
                        <div className={`h-4 sm:h-5 w-14 sm:w-16 rounded-full animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />
                    </div>

                    {/* Description */}
                    <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                        <div className={`h-3 sm:h-4 w-full rounded animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />
                        <div className={`h-3 sm:h-4 w-[95%] rounded animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />
                        <div className={`h-3 sm:h-4 w-[75%] rounded animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />
                    </div>

                    {/* Buttons - Stack vertikal di mobile */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <div className={`h-12 w-full sm:w-40 rounded-xl animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />
                        <div className={`h-12 w-full sm:w-36 rounded-xl animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />
                    </div>
                </div>
            </div>

            {/* Right Card Skeleton - Desktop Only */}
            <div className="hidden lg:block absolute right-10 bottom-24 w-80">
                <div className={`rounded-3xl overflow-hidden backdrop-blur-xl transition-colors duration-500 ${isDark
                        ? "border border-white/10 bg-zinc-900/70"
                        : "border border-gray-200/50 bg-white/70"
                    }`}>
                    <div className={`aspect-video animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                        }`} />

                    <div className="p-5">
                        <div className={`h-5 w-40 rounded animate-pulse mb-3 ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`} />

                        <div className="space-y-2">
                            <div className={`h-3 w-full rounded animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                                }`} />
                            <div className={`h-3 w-[85%] rounded animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                                }`} />
                            <div className={`h-3 w-[65%] rounded animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                                }`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Indicator */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className={`w-10 sm:w-16 h-1 rounded-full animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>

            {/* Gradient Fade */}
            <div className={`absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-linear-to-t transition-colors duration-500 ${isDark ? "from-[#0a0a0f] to-transparent" : "from-[#f8f9fa] to-transparent"
                }`} />
        </section>
    );
}