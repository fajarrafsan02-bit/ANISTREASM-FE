// SimmerSkeleton.jsx
export default function ShimmerSkeleton({ isDark = true }) {
    return (
        <div
            className="w-full h-full da-animate-shimmer"
            style={{
                background: isDark
                    ? "linear-gradient(90deg, transparent 0%, rgba(255,30,86,0.06) 50%, transparent 100%)"
                    : "linear-gradient(90deg, transparent 0%, rgba(244,63,94,0.12) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "da-shimmer 1.8s infinite",
            }}
        />
    );
}