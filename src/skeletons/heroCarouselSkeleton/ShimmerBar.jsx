export default function ShimmerBar({ isDark, delay = "0ms" }) {
    return (
        <div
            className="w-full h-full"
            style={{
                background: isDark
                    ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)"
                    : "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.04) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: `shimmer 2.4s infinite`,
                animationDelay: delay,
            }}
        />
    );
}