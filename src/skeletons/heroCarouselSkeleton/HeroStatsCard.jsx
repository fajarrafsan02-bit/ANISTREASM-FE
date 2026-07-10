import ShimmerBar from "./ShimmerBar";

export function DesktopStatsCard({ isDark }) {
    return (
        <div
            className={`absolute top-24 right-6 md:right-16 lg:right-24 z-5 hidden md:block rounded-2xl p-4 w-52 backdrop-blur-xl border shadow-2xl ${isDark
                ? "bg-black/30 border-white/[0.06] shadow-black/20"
                : "bg-white/50 border-gray-200/40 shadow-black/5"
                }`}
        >
            {/* Accent top border */}
            <div className="absolute top-0 left-4 right-4 h-[2px] bg-linear-to-r from-red-500/0 via-red-500/60 to-red-500/0 rounded-full" />

            {/* Score row */}
            <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10">
                    <svg className="w-4 h-4 fill-yellow-500/40" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <div className={`h-2 w-12 rounded mb-1 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />
                    <div className={`h-4 w-16 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}>
                        <ShimmerBar isDark={isDark} delay="0ms" />
                    </div>
                </div>
                <div className={`text-lg font-black font-mono ${isDark ? "text-yellow-500/40" : "text-yellow-600/40"}`}>
                    8.5
                </div>
            </div>

            {/* Divider */}
            <div className={`h-px mb-3 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />

            {/* Rank row */}
            <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m0 0a6.023 6.023 0 01-2.77-.896" />
                    </svg>
                </div>
                <div className="flex-1">
                    <div className={`h-2 w-10 rounded mb-1 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />
                    <div className={`h-4 w-14 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}>
                        <ShimmerBar isDark={isDark} delay="100ms" />
                    </div>
                </div>
                <div className={`text-sm font-bold font-mono ${isDark ? "text-red-400/40" : "text-red-600/40"}`}>
                    #123
                </div>
            </div>

            {/* Divider */}
            <div className={`h-px mb-3 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />

            {/* Episodes row */}
            <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0 .621.504 1.125 1.125 1.125h7.5" />
                    </svg>
                </div>
                <div className="flex-1">
                    <div className={`h-2 w-14 rounded mb-1 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />
                    <div className={`h-4 w-12 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}>
                        <ShimmerBar isDark={isDark} delay="200ms" />
                    </div>
                </div>
                <div className={`text-sm font-bold font-mono ${isDark ? "text-blue-400/40" : "text-blue-600/40"}`}>
                    24 Ep
                </div>
            </div>

            {/* Divider */}
            <div className={`h-px mb-3 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />

            {/* Popularity row */}
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <div className={`h-2 w-16 rounded mb-1 ${isDark ? "bg-white/[0.04]" : "bg-black/[0.04]"}`} />
                    <div className={`h-4 w-16 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}>
                        <ShimmerBar isDark={isDark} delay="300ms" />
                    </div>
                </div>
                <div className={`text-sm font-bold font-mono ${isDark ? "text-purple-400/40" : "text-purple-600/40"}`}>
                    12.4K
                </div>
            </div>
        </div>
    );
}

export function MobileStatsCard({ isDark }) {
    return (
        <div
            className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-5 md:hidden rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 backdrop-blur-xl border shadow-xl ${isDark
                ? "bg-black/30 border-white/[0.06] shadow-black/20"
                : "bg-white/50 border-gray-200/40 shadow-black/5"
                }`}
        >
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Score */}
                <div className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 fill-yellow-500/40" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <div className={`h-3 w-6 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
                </div>
                <div className="w-px h-5 bg-current opacity-15" />
                {/* Rank */}
                <div className="flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m0 0a6.023 6.023 0 01-2.77-.896" />
                    </svg>
                    <div className={`h-3 w-5 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
                </div>
                <div className="w-px h-5 bg-current opacity-15" />
                {/* Episodes */}
                <div className="flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0 .621.504 1.125 1.125 1.125h7.5" />
                    </svg>
                    <div className={`h-3 w-5 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
                </div>
                <div className="w-px h-5 bg-current opacity-15" />
                {/* Popularity */}
                <div className="flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    <div className={`h-3 w-6 rounded ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
                </div>
            </div>
        </div>
    );
}