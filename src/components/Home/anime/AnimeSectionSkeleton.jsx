export default function AnimeSectionSkeleton({ title = "LAGI TAYANG" }) {
    return (
        <section className="relative py-12 md:py-16 bg-bg-primary transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header Skeleton */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div className="flex items-center gap-3">
                        {/* Accent bar */}
                        <div className="w-1.5 h-8 rounded-full bg-red-600/30 animate-pulse" />

                        {/* Title — terlihat di light & dark */}
                        <h2 className="text-xl md:text-2xl font-black tracking-tight text-gray-400 dark:text-gray-600 animate-pulse">
                            {title}
                        </h2>
                    </div>

                    {/* View All button skeleton */}
                    <div className="hidden sm:block h-5 w-32 rounded-md bg-gray-300 dark:bg-zinc-700 animate-pulse" />
                </div>

                {/* Anime Cards Grid Skeleton — maksimal 5 kolom */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <AnimeCardSkeleton key={i} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AnimeCardSkeleton({ index }) {
    const delay = `${index * 80}ms`;

    return (
        <div
            className="group relative rounded-xl overflow-hidden bg-gray-100 dark:bg-[#1a1a24] transition-colors duration-300"
            style={{ animationDelay: delay }}
        >
            {/* Poster Skeleton */}
            <div className="relative aspect-2/3 overflow-hidden bg-gray-200 dark:bg-zinc-800">
                {/* Shimmer — kontras di light & dark */}
                <div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 dark:via-white/15 to-transparent da-animate-shimmer"
                    style={{
                        animationDelay: delay,
                        backgroundSize: "200% 100%",
                    }}
                />

                {/* Rating badge skeleton */}
                <div className="absolute top-2 right-2 w-10 h-5 rounded-md bg-gray-300/60 dark:bg-white/10 backdrop-blur-sm" />

                {/* Episode badge skeleton */}
                <div className="absolute top-2 left-2 w-14 h-5 rounded-md bg-gray-300/60 dark:bg-white/10 backdrop-blur-sm" />
            </div>

            {/* Info Skeleton */}
            <div className="p-3 space-y-2.5 bg-white dark:bg-[#12121a] transition-colors duration-300">
                {/* Title lines */}
                <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                <div className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-zinc-800 animate-pulse" />

                {/* Meta row */}
                <div className="flex items-center gap-2 pt-1">
                    <div className="h-3 w-12 rounded-md bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                    <div className="h-3 w-1 rounded-full bg-gray-300 dark:bg-zinc-700" />
                    <div className="h-3 w-10 rounded-md bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                </div>
            </div>
        </div>
    );
}