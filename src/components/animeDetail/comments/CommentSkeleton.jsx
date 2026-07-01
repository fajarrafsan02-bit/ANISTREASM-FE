import { useTheme } from "../../../context/ThemeContext";

function Pulse({ className = "" }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <div
            className={`da-animate-pulse rounded ${isDark ? "bg-[#2a1117]/60" : "bg-slate-200"} ${className}`}
        />
    );
}

function CommentItemSkeleton() {
    return (
        <div className="flex gap-2.5 sm:gap-3">
            <Pulse className="w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2">
                    <Pulse className="h-3 w-20 sm:h-3.5 sm:w-24 rounded" />
                    <Pulse className="h-2.5 w-16 sm:h-3 sm:w-20 rounded" />
                </div>
                <Pulse className="h-3 w-full sm:h-3.5 rounded" />
                <Pulse className="h-3 w-3/4 sm:h-3.5 rounded" />
                <div className="flex items-center gap-4 pt-0.5">
                    <Pulse className="h-3 w-10 sm:h-3.5 sm:w-12 rounded" />
                    <Pulse className="h-3 w-10 sm:h-3.5 sm:w-12 rounded" />
                    <Pulse className="h-3 w-10 sm:h-3.5 sm:w-12 rounded" />
                </div>
            </div>
        </div>
    );
}

export default function CommentSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="space-y-5 sm:space-y-6 relative overflow-hidden">
            <CommentItemSkeleton />
            <CommentItemSkeleton />
            <CommentItemSkeleton />
            <CommentItemSkeleton />
            <div
                className="absolute inset-0 da-animate-shimmer pointer-events-none"
                style={{
                    background: isDark
                        ? "linear-gradient(90deg, transparent 0%, rgba(255,30,86,0.06) 50%, transparent 100%)"
                        : "linear-gradient(90deg, transparent 0%, rgba(244,63,94,0.10) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    animation: "da-shimmer 1.8s infinite",
                }}
            />
        </div>
    );
}
