import { useTheme } from "../../../context/ThemeContext";
import ShimmerSkeleton from "../SimmerSkeleton";

export default function PosterCardSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="relative group">
            {/* Ambient glow - Desktop only */}
            <div className="hidden sm:block absolute -inset-3 rounded-[2rem] blur-2xl opacity-20 bg-gradient-to-br from-[#ff1e56]/20 via-red-900/5 to-transparent" />

            {/* Border glow */}
            <div className={`absolute -inset-[1px] sm:-inset-[2px] rounded-[1.2rem] sm:rounded-[1.3rem] bg-gradient-to-br opacity-50 sm:opacity-60 ${
                isDark
                    ? "from-[#ff1e56]/30 via-red-600/10 to-[#8b0a1e]/20"
                    : "from-slate-400/20 via-slate-300/10 to-slate-200/20"
            }`} />

            {/* Inner border */}
            <div className={`absolute -inset-[0.5px] sm:-inset-[1px] rounded-[1.15rem] sm:rounded-[1.25rem] bg-gradient-to-br ${
                isDark
                    ? "from-[#ff1e56]/15 via-transparent to-[#ff1e56]/5"
                    : "from-slate-300/15 via-transparent to-slate-200/5"
            }`} />

            {/* Main card */}
            <div className={`relative rounded-[1.1rem] sm:rounded-[1.2rem] overflow-hidden aspect-[3/4] transform-gpu ${
                isDark ? "bg-[#0a0305]" : "bg-gray-100"
            }`}>
                {/* Poster placeholder */}
                <div className={`absolute inset-0 animate-pulse relative overflow-hidden transform-gpu ${
                    isDark ? "bg-[#1a0a0f]" : "bg-slate-200"
                }`}>
                    <ShimmerSkeleton />
                    <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03]" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "#ff1e56" : "#94a3b8"} 1px, transparent 0)`,
                        backgroundSize: '16px 16px'
                    }} />
                </div>

                {/* Scanlines - Desktop only */}
                <div className="hidden sm:block absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px]" />

                {/* Rank badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-[#ff1e56]/10 rounded-lg blur-sm hidden sm:block" />
                        <div className={`relative w-16 sm:w-24 h-5 sm:h-6 rounded-lg animate-pulse overflow-hidden transform-gpu ${
                            isDark ? "bg-[#1a0a0f]" : "bg-slate-300"
                        }`}>
                            <ShimmerSkeleton />
                        </div>
                    </div>
                </div>

                {/* Quality badge */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                    <div className={`w-8 sm:w-10 h-4 sm:h-5 rounded-md animate-pulse overflow-hidden transform-gpu ${
                        isDark ? "bg-[#1a0a0f]" : "bg-slate-300"
                    }`}>
                        <ShimmerSkeleton />
                    </div>
                </div>

                {/* Bottom title */}
                <div className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 space-y-1.5 sm:space-y-2 bg-gradient-to-t ${
                    isDark
                        ? "from-black via-black/80 to-transparent"
                        : "from-white via-white/80 to-transparent"
                }`}>
                    <div className={`h-px bg-gradient-to-r mb-1.5 ${
                        isDark
                            ? "from-[#ff1e56]/20 via-[#ff1e56]/5 to-transparent"
                            : "from-slate-300/40 via-slate-200/20 to-transparent"
                    }`} />
                    <div className={`h-3.5 sm:h-4 w-5/6 rounded animate-pulse overflow-hidden transform-gpu ${
                        isDark ? "bg-[#1a0a0f]" : "bg-slate-300"
                    }`}>
                        <ShimmerSkeleton />
                    </div>
                    <div className={`h-2.5 sm:h-3 w-1/2 rounded animate-pulse overflow-hidden transform-gpu ${
                        isDark ? "bg-[#1a0a0f]" : "bg-slate-300"
                    }`}>
                        <ShimmerSkeleton />
                    </div>
                </div>

                {/* Corner ornaments */}
                <div className={`absolute top-2 left-2 w-3 h-3 border-l border-t rounded-tl-sm ${
                    isDark ? "border-[#ff1e56]/15" : "border-slate-300/30"
                }`} />
                <div className={`absolute top-2 right-2 w-3 h-3 border-r border-t rounded-tr-sm ${
                    isDark ? "border-[#ff1e56]/15" : "border-slate-300/30"
                }`} />
                <div className={`absolute bottom-2 left-2 w-3 h-3 border-l border-b rounded-bl-sm ${
                    isDark ? "border-[#ff1e56]/15" : "border-slate-300/30"
                }`} />
                <div className={`absolute bottom-2 right-2 w-3 h-3 border-r border-b rounded-br-sm ${
                    isDark ? "border-[#ff1e56]/15" : "border-slate-300/30"
                }`} />

                {/* Floating particles - Desktop only */}
                <div className={`hidden sm:block absolute top-1/4 right-4 w-1 h-1 rounded-full animate-pulse transform-gpu ${
                    isDark ? "bg-[#ff1e56]/30" : "bg-slate-400/30"
                }`} />
                <div className={`hidden sm:block absolute bottom-1/3 left-4 w-0.5 h-0.5 rounded-full animate-pulse transform-gpu ${
                    isDark ? "bg-[#ff1e56]/20" : "bg-slate-400/20"
                }`} style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Bottom reflection - Desktop only */}
            <div className={`hidden sm:block absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-t blur-xl opacity-20 ${
                isDark ? "from-[#ff1e56]/10" : "from-slate-400/10"
            }`} />
        </div>
    );
}