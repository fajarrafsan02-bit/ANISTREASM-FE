export const slideUp = (delay, duration = 700) => ({
    animation: `slideUp ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms forwards`,
    opacity: 0,
});

export const getSectionStyle = (isDark) => ({
    backgroundColor: isDark ? "#050508" : "#f8f9fa",
});

export const getImageFilter = (isDark) =>
    isDark
        ? "brightness(0.75) contrast(1.05) saturate(1.02)"
        // Kurangi brightness sedikit agar tidak terlalu silau saat overlay tipis
        : "brightness(0.88) contrast(1.02) saturate(1.02)";

export const getImageTransition = () =>
    "transform 1.2s cubic-bezier(0.65,0,0.35,1), opacity 1s ease, filter 0.5s ease";

// ==================== OVERLAYS LIGHT MODE DIBUAT LEBIH SOFT ====================

export const getRightOverlayStyle = (isDark) => ({
    backdropFilter: isDark ? "blur(1px)" : "blur(0.5px)", // Blur sangat lembut atau bahkan 0
    WebkitBackdropFilter: isDark ? "blur(1px)" : "blur(0.5px)",
    
    background: isDark
        ? "linear-gradient(to right, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.7) 35%, rgba(5,5,8,0.3) 55%, transparent 75%)"
        // Light Mode: Opacity sangat rendah, dan menyatu dengan gambar lebih cepat
        : "linear-gradient(to right, rgba(248,249,250, 0.55) 0%, rgba(248,249,250, 0.35) 15%, rgba(248,249,250, 0.15) 30%, rgba(248,249,250, 0.05) 45%, transparent 60%)",
});

export const getTopOverlayStyle = (isDark) => ({
    background: isDark
        ? "linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.5) 35%, transparent 60%)"
        // Light Mode: Ubah menjadi abu-abu tua dengan opacity SANGAT rendah (hanya untuk vignette lembut, bukan putih solid)
        // Ini agar tidak bertumpuk dengan overlay samping dan membuat sudut kiri bawah jadi super putih
        : "linear-gradient(to top, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.05) 20%, rgba(15,23,42,0.02) 40%, transparent 65%)",
});


export const getRadialOverlayStyle = (isDark) => ({
    background: isDark
        ? "radial-gradient(ellipse at top right, rgba(220,38,38,0.08), transparent 50%)"
        : "radial-gradient(ellipse at top right, rgba(234,88,12,0.035), rgba(249,115,22,0.02), transparent 60%)",
});

export const getHeaderGradientStyle = (isDark) => ({
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
    background: isDark
        ? `linear-gradient(to bottom, 
            rgba(5,5,8,1) 0%, 
            rgba(5,5,8,0.98) 15%, 
            rgba(5,5,8,0.88) 30%, 
            rgba(5,5,8,0.6) 55%, 
            rgba(5,5,8,0.25) 80%, 
            transparent 100%)`
        : `linear-gradient(to bottom, 
            rgba(248,249,250,0.98) 0%, 
            rgba(241,245,249,0.95) 10%, 
            rgba(241,245,249,0.85) 25%, 
            rgba(241,245,249,0.65) 45%, 
            rgba(241,245,249,0.35) 70%, 
            rgba(241,245,249,0.08) 88%, 
            transparent 100%)`,
    maskImage: "linear-gradient(to bottom, black 55%, transparent 98%)",
    WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 98%)",
    transform: "translateZ(0)",
});

// Light mode subtle warm vignette
export const getLightVignetteStyle = () => ({
    // Hapus atau opacity sangat rendah, karena sudah ada overlay lain
    background: "radial-gradient(ellipse at center, transparent 60%, rgba(15,23,42,0.02) 90%, rgba(15,23,42,0.04) 100%)",
});

export const filmGrainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export const keyframesCss = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shrink {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
  }
`;

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
    0% { transform: scale(1.06) translateX(-60px) translateY(-30px); }
    100% { transform: scale(1.24) translateX(60px) translateY(30px); }
  }
`;