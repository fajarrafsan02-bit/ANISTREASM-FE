export const getSectionStyle = (isDark) => ({
    backgroundColor: isDark ? "#050508" : "#f8f9fa",
});

export const getImageFilter = (isDark) =>
    isDark
        ? "brightness(0.7) contrast(1.08) saturate(1.05)"
        : "brightness(0.85) contrast(1.03) saturate(1.02)";

export const getRightOverlayStyle = (isDark) => ({
    background: isDark
        ? "linear-gradient(to right, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.75) 25%, rgba(5,5,8,0.3) 50%, transparent 75%)"
        : "linear-gradient(to right, rgba(248,249,250,0.6) 0%, rgba(248,249,250,0.35) 20%, rgba(248,249,250,0.12) 40%, transparent 60%)",
});

export const getTopOverlayStyle = (isDark) => ({
    background: isDark
        ? "linear-gradient(to top, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.55) 30%, transparent 55%)"
        : "linear-gradient(to top, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.05) 20%, rgba(15,23,42,0.02) 35%, transparent 55%)",
});

export const getHeaderGradientStyle = (isDark) => ({
    background: isDark
        ? `linear-gradient(to bottom, rgba(5,5,8,1) 0%, rgba(5,5,8,0.98) 15%, rgba(5,5,8,0.85) 30%, rgba(5,5,8,0.5) 55%, transparent 100%)`
        : `linear-gradient(to bottom, rgba(248,249,250,0.98) 0%, rgba(241,245,249,0.95) 10%, rgba(241,245,249,0.8) 25%, rgba(241,245,249,0.5) 50%, transparent 100%)`,
    maskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
    WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
});

export const filmGrainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export const heroKeyframes = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shrink {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
  }
  @keyframes heroDrift {
    0% { transform: scale(1.04) translateX(-40px) translateY(-20px); }
    100% { transform: scale(1.2) translateX(40px) translateY(20px); }
  }
  @keyframes revealIn {
    from { clip-path: inset(0 100% 0 0); }
    to { clip-path: inset(0 0 0 0); }
  }
  @keyframes fadeScale {
    from { opacity: 0; transform: scale(1.12); filter: blur(8px); }
    to { opacity: 1; transform: scale(1); filter: blur(0); }
  }
  @keyframes heroProgress {
    from { width: 100%; }
    to { width: 0%; }
  }
  @keyframes kenBurns {
    0% { transform: scale(1) translate(0, 0); }
    100% { transform: scale(1.08) translate(-15px, -8px); }
  }
  @keyframes kenBurnsReverse {
    0% { transform: scale(1.08) translate(-15px, -8px); }
    100% { transform: scale(1) translate(0, 0); }
  }
  @keyframes wordReveal {
    from { opacity: 0; transform: translateY(24px) scale(0.96); filter: blur(6px); }
    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 18px rgba(239,68,68,0.3); }
    50% { box-shadow: 0 0 36px rgba(239,68,68,0.5), 0 0 60px rgba(239,68,68,0.15); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes infoCardIn {
    from { opacity: 0; transform: translateX(40px) scale(0.95); }
    to { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
