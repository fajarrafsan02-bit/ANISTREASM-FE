import { useEffect, useRef } from "react";

export default function HeroParticles({ isDark, mousePos }) {
    const canvasRef = useRef(null);
    const mousePosRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        mousePosRef.current = mousePos;
    }, [mousePos]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId;
        let w, h;
        let lastFrame = 0;
        const FPS_INTERVAL = 1000 / 24;
        let time = 0;

        const resize = () => {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Floating ambient particles
        const floatCount = Math.min(30, Math.max(10, Math.floor((w * h) / 50000)));
        const floats = Array.from({ length: floatCount }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2.5 + 0.5,
            baseSpeedY: -(Math.random() * 0.25 + 0.03),
            speedX: (Math.random() - 0.5) * 0.08,
            opacity: Math.random() * 0.25 + 0.05,
            phase: Math.random() * Math.PI * 2,
            hue: Math.random() * 40 + (isDark ? 0 : 20),
            pulseSpeed: Math.random() * 0.02 + 0.01,
        }));

        // Brighter star particles
        const starCount = Math.min(8, Math.max(3, Math.floor((w * h) / 180000)));
        const stars = Array.from({ length: starCount }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 1.5 + 1,
            speedY: -(Math.random() * 0.15 + 0.02),
            speedX: (Math.random() - 0.5) * 0.05,
            opacity: Math.random() * 0.4 + 0.2,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.04 + 0.02,
            glow: Math.random() * 6 + 4,
        }));

        const animate = (now) => {
            if (now - lastFrame < FPS_INTERVAL) {
                animId = requestAnimationFrame(animate);
                return;
            }
            lastFrame = now;
            time += 0.016;

            ctx.clearRect(0, 0, w, h);
            const mp = mousePosRef.current;

            // Draw floating ambient particles
            for (const p of floats) {
                p.y += p.baseSpeedY + mp.y * 0.01;
                p.x += p.speedX + mp.x * 0.015;
                p.phase += p.pulseSpeed;
                if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;

                const pulse = 0.6 + 0.4 * Math.sin(p.phase);
                const alpha = p.opacity * pulse;
                ctx.fillStyle = isDark
                    ? `hsla(${p.hue + 30}, 80%, 60%, ${alpha * 0.4})`
                    : `hsla(${p.hue + 30}, 30%, 60%, ${alpha * 0.2})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Subtle glow
                if (p.size > 1.5) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = isDark
                        ? `hsla(${p.hue + 30}, 80%, 60%, ${alpha * 0.08})`
                        : `hsla(${p.hue + 30}, 30%, 60%, ${alpha * 0.04})`;
                    ctx.fill();
                }
            }

            // Draw star particles (brighter, with cross glow)
            for (const s of stars) {
                s.y += s.speedY + mp.y * 0.005;
                s.x += s.speedX + mp.x * 0.008;
                s.phase += s.twinkleSpeed;
                if (s.y < -10) { s.y = h + 10; s.x = Math.random() * w; }
                if (s.x < -10) s.x = w + 10;
                if (s.x > w + 10) s.x = -10;

                const twinkle = 0.5 + 0.5 * Math.sin(s.phase);
                const alpha = s.opacity * twinkle;
                const hue = isDark ? 40 : 30;

                // Outer glow
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.glow, 0, Math.PI * 2);
                ctx.fillStyle = isDark
                    ? `hsla(${hue}, 100%, 80%, ${alpha * 0.08})`
                    : `hsla(${hue}, 50%, 70%, ${alpha * 0.04})`;
                ctx.fill();

                // Inner glow
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.glow * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = isDark
                    ? `hsla(${hue}, 100%, 85%, ${alpha * 0.2})`
                    : `hsla(${hue}, 50%, 75%, ${alpha * 0.1})`;
                ctx.fill();

                // Core
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = isDark
                    ? `hsla(${hue}, 100%, 95%, ${alpha * 0.7})`
                    : `hsla(${hue}, 50%, 85%, ${alpha * 0.4})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(animate);
        };
        animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animId);
            canvas.width = 0;
            canvas.height = 0;
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-3 pointer-events-none hidden md:block"
            style={{ mixBlendMode: isDark ? "screen" : "multiply" }}
        />
    );
}
