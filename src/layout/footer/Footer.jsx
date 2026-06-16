import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const { theme } = useTheme();
    const { isLoggedIn } = useAuth();
    const { openModal } = useAuthModal();
    const toast = useToast();
    const navigate = useNavigate();

    const isDark = theme === "dark";
    const currentYear = new Date().getFullYear();

    const handleNavigation = (e, href) => {
        e.preventDefault();

        // Cek status login
        if (!isLoggedIn) {
            toast.warning("Silakan login terlebih dahulu", 3000);
            openModal({ mode: "login" });
            return;
        }

        // Jika sudah login, arahkan ke halaman tujuan
        navigate(href);
    };

    return (
        <footer className={`relative w-full mt-auto overflow-hidden transition-colors duration-500
            ${isDark ? 'bg-[#030102] border-t border-[#2a1117]/30' : 'bg-[#f8f6f3] border-t border-slate-200/40'}`}
        >
            {/* Animated top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px">
                <div className={`h-full bg-gradient-to-r from-transparent via-[#ff1e56]/30 to-transparent animate-pulse`} />
            </div>

            {/* Subtle ambient glow */}
            {isDark && (
                <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-[#ff1e56]/3 blur-[100px] pointer-events-none" />
            )}

            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 sm:py-12 relative z-10">

                {/* Main content */}
                <div className="flex flex-col items-center gap-6 sm:gap-8">

                    {/* ═══ CENTER: Premium Logo ═══ */}
                    <div className="flex flex-col items-center gap-3">
                        {/* Logo mark with glow */}
                        <div className="relative group">
                            {/* Glow behind */}
                            <div className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 opacity-60 group-hover:opacity-100
                                ${isDark ? 'bg-[#ff1e56]/20' : 'bg-rose-400/15'}`}
                            />

                            {/* Logo container */}
                            <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 group-hover:scale-105
                                ${isDark
                                    ? 'bg-gradient-to-br from-[#1a0a10] to-[#0d0407] border-[#ff1e56]/30 shadow-[0_0_30px_rgba(255,30,86,0.1)]'
                                    : 'bg-gradient-to-br from-white to-rose-50 border-rose-200 shadow-lg shadow-rose-100/50'
                                }`}
                            >
                                <i className="fa-solid fa-play text-[#ff1e56] text-sm ml-0.5" />

                                {/* Corner accents */}
                                <div className={`absolute -top-px -left-px w-2 h-2 border-l-2 border-t-2 rounded-tl-lg ${isDark ? 'border-[#ff1e56]/40' : 'border-rose-300'}`} />
                                <div className={`absolute -top-px -right-px w-2 h-2 border-r-2 border-t-2 rounded-tr-lg ${isDark ? 'border-[#ff1e56]/40' : 'border-rose-300'}`} />
                                <div className={`absolute -bottom-px -left-px w-2 h-2 border-l-2 border-b-2 rounded-bl-lg ${isDark ? 'border-[#ff1e56]/40' : 'border-rose-300'}`} />
                                <div className={`absolute -bottom-px -right-px w-2 h-2 border-r-2 border-b-2 rounded-br-lg ${isDark ? 'border-[#ff1e56]/40' : 'border-rose-300'}`} />
                            </div>
                        </div>

                        {/* Brand name with gradient text */}
                        <div className="text-center">
                            <h2 className={`text-xl font-black tracking-[0.15em] uppercase bg-clip-text text-transparent bg-gradient-to-r
                                ${isDark
                                    ? 'from-white via-slate-200 to-slate-400'
                                    : 'from-slate-900 via-slate-700 to-slate-500'
                                }`}
                            >
                                ANISTREAM
                            </h2>
                            <p className={`text-[9px] font-bold uppercase tracking-[0.15em] min-[360px]:tracking-[0.2em] sm:tracking-[0.3em] mt-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                                Nonton Anime Gratis Tanpa Iklan
                            </p>
                        </div>
                    </div>

                    {/* ═══ NAVIGATION ═══ */}
                    <nav className="flex items-center gap-2">
                        {[
                            { label: 'Katalog', href: '/catalog', desc: 'Jelajahi' },
                            { label: 'Jadwal', href: '/schedule', desc: 'Rilis' },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleNavigation(e, link.href)}
                                className={`group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300
                                    ${isDark
                                        ? 'hover:bg-[#ff1e56]/5'
                                        : 'hover:bg-rose-50/50'
                                    }`}
                            >
                                {/* Animated underline */}
                                <span className={`absolute bottom-2 left-4 right-4 sm:left-6 sm:right-6 h-px transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100
                                    ${isDark ? 'bg-[#ff1e56]/50' : 'bg-rose-300'}`}
                                />

                                <span className={`block text-xs font-black uppercase tracking-[0.15em] transition-colors duration-300
                                    ${isDark
                                        ? 'text-slate-400 group-hover:text-white'
                                        : 'text-slate-500 group-hover:text-slate-900'
                                    }`}
                                >
                                    {link.label}
                                </span>
                                <span className={`block text-[9px] font-bold uppercase tracking-widest mt-0.5 transition-colors duration-300
                                    ${isDark
                                        ? 'text-slate-600 group-hover:text-[#ff1e56]/60'
                                        : 'text-slate-400 group-hover:text-rose-400'
                                    }`}
                                >
                                    {link.desc}
                                </span>
                            </a>
                        ))}
                    </nav>

                    {/* ═══ DIVIDER ═══ */}
                    <div className="w-full max-w-xs flex items-center gap-3">
                        <div className={`flex-1 h-px ${isDark ? 'bg-gradient-to-r from-transparent to-[#2a1117]' : 'bg-gradient-to-r from-transparent to-slate-200'}`} />
                        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#ff1e56]/30' : 'bg-rose-300'}`} />
                        <div className={`flex-1 h-px ${isDark ? 'bg-gradient-to-l from-transparent to-[#2a1117]' : 'bg-gradient-to-l from-transparent to-slate-200'}`} />
                    </div>

                    {/* ═══ BOTTOM ═══ */}
                    <div className="flex flex-col items-center gap-3">
                        {/* Tech stack / Made with */}
                        <div className={`flex items-center gap-2 text-[9px] min-[360px]:text-[10px] font-bold uppercase tracking-widest
                            ${isDark ? 'text-slate-700' : 'text-slate-300'}`}
                        >
                            <span>Dibuat dengan</span>
                            <i className="fa-solid fa-heart text-[#ff1e56]/60 text-[9px] animate-pulse" />
                            <span>untuk penggemar anime</span>
                        </div>

                        {/* Copyright */}
                        <p className={`text-[9px] min-[360px]:text-[10px] font-bold tracking-wider uppercase
                            ${isDark ? 'text-slate-700' : 'text-slate-300'}`}
                        >
                            © {currentYear} <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>AniStream</span> · All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}