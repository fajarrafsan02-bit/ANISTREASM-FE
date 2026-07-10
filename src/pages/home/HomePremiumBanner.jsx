import { Heart } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function HomeSupportBanner() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { ref: bannerRef, isVisible: bannerVisible } = useScrollReveal({ threshold: 0.2 });
    const { ref: textRef, isVisible: textVisible } = useScrollReveal({ threshold: 0.2 });
    const { ref: btnRef, isVisible: btnVisible } = useScrollReveal({ threshold: 0.2 });

    return (
        <section className="py-8 md:py-12 bg-bg-primary transition-colors duration-300 relative z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div
                    ref={bannerRef}
                    style={{
                        opacity: bannerVisible ? 1 : 0,
                        transform: bannerVisible ? "translateY(0px) scale(1)" : "translateY(32px) scale(0.98)",
                        transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    className={`relative overflow-hidden rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 group transition-all duration-300 ${
                        isDark
                            ? "bg-linear-to-r from-red-950/20 via-zinc-900/40 to-zinc-950/30 border-red-500/10"
                            : "bg-linear-to-r from-red-50/60 via-zinc-50/30 to-bg-primary border-red-200/50"
                    }`}
                >
                    {/* Atmospheric Glow Background */}
                    <div
                        className={`absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
                            isDark
                                ? "bg-linear-to-br from-red-500/10 to-orange-500/5 group-hover:from-red-500/15"
                                : "bg-linear-to-br from-red-400/5 to-orange-400/5 group-hover:from-red-400/10"
                        }`}
                    />

                    {/* Teks */}
                    <div
                        ref={textRef}
                        className="relative z-10"
                        style={{
                            opacity: textVisible ? 1 : 0,
                            transform: textVisible ? "translateX(0px)" : "translateX(-24px)",
                            transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                            transitionDelay: textVisible ? "150ms" : "0ms",
                        }}
                    >
                        <h3 className="font-display text-2xl md:text-3xl tracking-wider font-extrabold text-text-primary mb-2">
                            DUKUNG <span className="text-red-500">KREATOR</span>
                        </h3>
                        <p className={`text-sm max-w-md leading-relaxed ${
                            isDark ? "text-zinc-400" : "text-zinc-600"
                        }`}>
                            Suka dengan konten kami? Dukung kami agar dapat terus menyajikan hiburan streaming anime terbaik secara gratis dan lancar.
                        </p>
                    </div>

                    {/* ✅ TOMBOL SAWERIA — KEREN & INTERAKTIF */}
                    <div
                        ref={btnRef}
                        className="relative z-10 shrink-0"
                        style={{
                            opacity: btnVisible ? 1 : 0,
                            transform: btnVisible ? "translateX(0px)" : "translateX(24px)",
                            transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                            transitionDelay: btnVisible ? "300ms" : "0ms",
                        }}
                    >
                        <a
                            href="https://saweria.co/fajarrafsan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn relative inline-flex items-center gap-2.5 
                                bg-linear-to-r from-[#ff1e56] to-[#e11d48] 
                                hover:from-[#ff336a] hover:to-[#f43f5e] 
                                text-white font-bold px-7 py-3.5 rounded-xl text-sm 
                                transition-all duration-300 
                                hover:scale-[1.04] active:scale-[0.96] 
                                shadow-[0_4px_20px_rgba(255,30,86,0.25)] 
                                hover:shadow-[0_8px_30px_rgba(255,30,86,0.4)] 
                                overflow-hidden"
                        >
                            {/* Shimmer effect on hover */}
                            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                            
                            {/* Heart icon with beat animation */}
                            <Heart 
                                className="relative w-4 h-4 fill-current text-white/90 
                                    transition-all duration-300 
                                    group-hover/btn:scale-125 group-hover/btn:text-white 
                                    animate-[pulse_1.5s_ease-in-out_infinite]" 
                            />
                            
                            <span className="relative font-black tracking-wide">
                                Dukung di Saweria
                            </span>
                            
                            {/* Arrow with slide effect */}
                            <span className="relative transition-transform duration-300 transform group-hover/btn:translate-x-1">
                                →
                            </span>

                            {/* Glow dot indicator */}
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-75" />
                        </a>

                        {/* Micro text under button */}
                        <p className={`text-[10px] text-center mt-2 tracking-wider uppercase font-medium ${
                            isDark ? "text-zinc-600" : "text-zinc-400"
                        }`}>
                            saweria.co/fajarrafsan
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}