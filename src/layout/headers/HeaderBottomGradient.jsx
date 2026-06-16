export default function HeaderBottomGradient({ isDark, isScrolled }) {
    return (
        <div
            className={`absolute bottom-[-60px] left-0 right-0 h-16 pointer-events-none transition-opacity duration-500 ${isScrolled ? "opacity-0" : "opacity-100"
                }`}
            style={{
                background: isDark
                    ? "linear-gradient(to bottom, rgba(5,5,8,0.9) 0%, rgba(5,5,8,0.5) 50%, transparent 100%)"
                    : "linear-gradient(to bottom, rgba(248,249,250,0.98) 0%, rgba(248,249,250,0.8) 30%, rgba(248,249,250,0.4) 60%, transparent 100%)",
            }}
        />
    );
}