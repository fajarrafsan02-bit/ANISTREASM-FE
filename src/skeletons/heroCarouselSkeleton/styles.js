export const heroSkeletonKeyframes = `
    @keyframes heroBgDrift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    @keyframes heroFlarePulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }
    @keyframes heroDrift {
        0% { transform: scale(1.04) translateX(-40px) translateY(-20px); }
        100% { transform: scale(1.2) translateX(40px) translateY(20px); }
    }
    @keyframes shrink {
        from { transform: scaleX(1); }
        to { transform: scaleX(0); }
    }
    @keyframes heroProgress {
        0% { width: 15%; opacity: 0.4; }
        50% { width: 45%; opacity: 1; }
        100% { width: 35%; opacity: 0.6; }
    }
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;