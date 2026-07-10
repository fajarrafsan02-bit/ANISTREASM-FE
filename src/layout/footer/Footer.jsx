import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import useToast from "../../hooks/useToast";
import { useNavigate, useLocation } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const animeQuotes = [
  { text: "Mati tanpa kebencian adalah jalan seorang ninja", from: "Jiraiya — Naruto" },
  { text: "Seorang raja harus memiliki semangat lebih besar dari siapa pun", from: "Luffy — One Piece" },
  { text: "Kenyataan tidak selalu indah, tapi itu yang membuatnya nyata", from: "Yato — Noragami" },
  { text: "Jika kau punya waktu untuk memikirkan akhir yang indah...", from: "Levi — Attack on Titan" },
  { text: "Seorang pahlawan bukanlah yang tak pernah kalah, tapi yang terus bangkit", from: "All Might — MHA" },
  { text: "Jangan meremehkan orang lain, kau tak akan pernah tahu kekuatan mereka", from: "Goku — Dragon Ball" },
  { text: "Perubahan bisa terjadi dalam sekejap, tapi hasilnya butuh selamanya", from: "Shoyo — Haikyuu" },
  { text: "Kesendirian bukanlah hal yang buruk, itu adalah waktu untuk tumbuh", from: "Hitori Bocchi — Bocchi the Rock" },
  { text: "API UNLIMITED BLADE WORKS", from: "Archer — Fate" },
  { text: "Menjadi kuat bukan berarti tak pernah terluka", from: "Tanjiro — Demon Slayer" },
];

const genres = [
  "Action", "Romance", "Isekai", "Fantasy", "Comedy", "Horror",
  "Slice of Life", "Mecha", "Adventure", "Thriller", "Drama", "Sci-Fi",
];

const stats = [
  { icon: "fa-compact-disc", label: "Koleksi Anime", count: "800+" },
  { icon: "fa-film", label: "Total Episode", count: "12K+" },
  { icon: "fa-users", label: "Pengguna Aktif", count: "50K+" },
  { icon: "fa-face-smile", label: "Komunitas", count: "10K+" },
];

const socials = [
  { icon: "fa-discord", label: "Discord", color: "hover:text-indigo-400" },
  { icon: "fa-twitter", label: "Twitter", color: "hover:text-sky-400" },
  { icon: "fa-youtube", label: "YouTube", color: "hover:text-red-500" },
  { icon: "fa-instagram", label: "Instagram", color: "hover:text-pink-500" },
  { icon: "fa-github", label: "GitHub", color: "hover:text-gray-400" },
];

const petalStyles = [
  { size: "w-3 h-3", left: "10%", duration: "6s", delay: "0s", opacity: "0.3" },
  { size: "w-2 h-2.5", left: "25%", duration: "8s", delay: "1.5s", opacity: "0.25" },
  { size: "w-2.5 h-2", left: "45%", duration: "7s", delay: "0.8s", opacity: "0.35" },
  { size: "w-2 h-2", left: "60%", duration: "9s", delay: "2s", opacity: "0.2" },
  { size: "w-3 h-2.5", left: "75%", duration: "6.5s", delay: "0.3s", opacity: "0.3" },
  { size: "w-2 h-2", left: "85%", duration: "8.5s", delay: "1.2s", opacity: "0.25" },
  { size: "w-2.5 h-3", left: "35%", duration: "7.5s", delay: "2.5s", opacity: "0.2" },
  { size: "w-2 h-2.5", left: "55%", duration: "9.5s", delay: "0.5s", opacity: "0.3" },
];

export default function Footer() {
  const { theme } = useTheme();
  const { isLoggedIn } = useAuth();
  const { openModal } = useAuthModal();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1, once: true });

  const isDark = theme === "dark";
  const currentYear = new Date().getFullYear();

  const [quoteIdx, setQuoteIdx] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIdx((prev) => (prev + 1) % animeQuotes.length);
        setQuoteFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (e, href) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.warning("Silakan login terlebih dahulu", 3000);
      openModal({ mode: "login" });
      return;
    }
    navigate(href);
  };

  const q = animeQuotes[quoteIdx];

  return (
    <footer className={`relative w-full mt-auto overflow-hidden transition-colors duration-500
      ${isDark ? 'bg-[#030102] border-t border-[#2a1117]/30' : 'bg-[#f8f6f3] border-t border-slate-200/40'}`}
    >
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-linear-to-r from-transparent via-[#ff1e56]/30 to-transparent animate-pulse" />
      </div>

      {isDark && (
        <>
          <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-[#ff1e56]/3 blur-[100px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/6 w-40 h-40 bg-purple-600/2 blur-[80px] pointer-events-none" />
        </>
      )}

      {petalStyles.map((p, i) => (
        <div
          key={i}
          className={`absolute top-0 ${p.size} rounded-full pointer-events-none z-0
            ${isDark ? 'bg-rose-400/10' : 'bg-rose-300/20'}
          `}
          style={{
            left: p.left,
            opacity: p.opacity,
            animation: `footerPetalFall ${p.duration} ${p.delay} infinite ease-in-out`,
          }}
        />
      ))}

      <div className="w-full max-w-[1440px] mx-auto px-3 max-[374px]:px-2 md:px-8 py-6 sm:py-12 relative z-10">
        <div
          ref={ref}
          className={`flex flex-col items-center gap-4 max-[374px]:gap-3 sm:gap-8 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >

          {/* ═══ STATS ROW ═══ */}
          <div className="flex flex-wrap justify-center gap-1.5 max-[374px]:gap-1 sm:gap-3 w-full max-w-xl">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center gap-1.5 max-[374px]:gap-1 px-2.5 max-[374px]:px-2 py-1.5 max-[374px]:py-1 rounded-lg border transition-all duration-300
                  ${isDark
                    ? 'bg-white/[0.02] border-white/5 hover:border-[#ff1e56]/20 hover:bg-white/[0.04]'
                    : 'bg-white/40 border-slate-200/60 hover:border-rose-200 hover:bg-white/60'
                  }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <i className={`fa-solid ${s.icon} text-[9px] max-[374px]:text-[8px] ${isDark ? 'text-[#ff1e56]/60' : 'text-rose-400'}`} />
                <div className="flex items-baseline gap-0.5">
                  <span className={`font-black text-[11px] max-[374px]:text-[10px] ${isDark ? 'text-white' : 'text-slate-800'}`}>{s.count}</span>
                  <span className={`text-[7px] max-[374px]:text-[6px] uppercase tracking-wider font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ═══ CENTER: Premium Logo ═══ */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <div className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 opacity-60 group-hover:opacity-100
                ${isDark ? 'bg-[#ff1e56]/20' : 'bg-rose-400/15'}`}
              />
              <div className={`relative w-11 max-[374px]:w-10 h-11 max-[374px]:h-10 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 group-hover:scale-105
                ${isDark
                  ? 'bg-linear-to-br from-[#1a0a10] to-[#0d0407] border-[#ff1e56]/30 shadow-[0_0_30px_rgba(255,30,86,0.1)]'
                  : 'bg-linear-to-br from-white to-rose-50 border-rose-200 shadow-lg shadow-rose-100/50'
                }`}
              >
                <i className="fa-solid fa-play text-[#ff1e56] text-xs max-[374px]:text-[10px] ml-0.5" />
                <div className={`absolute -top-px -left-px w-2 h-2 border-l-2 border-t-2 rounded-tl-lg ${isDark ? 'border-[#ff1e56]/40' : 'border-rose-300'}`} />
                <div className={`absolute -top-px -right-px w-2 h-2 border-r-2 border-t-2 rounded-tr-lg ${isDark ? 'border-[#ff1e56]/40' : 'border-rose-300'}`} />
                <div className={`absolute -bottom-px -left-px w-2 h-2 border-l-2 border-b-2 rounded-bl-lg ${isDark ? 'border-[#ff1e56]/40' : 'border-rose-300'}`} />
                <div className={`absolute -bottom-px -right-px w-2 h-2 border-r-2 border-b-2 rounded-br-lg ${isDark ? 'border-[#ff1e56]/40' : 'border-rose-300'}`} />
              </div>
            </div>
            <div className="text-center">
              <h2 className={`text-lg max-[374px]:text-base sm:text-xl font-black tracking-[0.15em] uppercase bg-clip-text text-transparent bg-linear-to-r
                ${isDark ? 'from-white via-slate-200 to-slate-400' : 'from-slate-900 via-slate-700 to-slate-500'}`}
              >
                ANISTREAM
              </h2>
              <p className={`text-[8px] max-[374px]:text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.1em] max-[374px]:tracking-[0.08em] min-[360px]:tracking-[0.2em] sm:tracking-[0.3em] mt-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                Nonton Anime Gratis Tanpa Iklan
              </p>
            </div>
          </div>

          {/* ═══ NAVIGATION ═══ */}
          <nav className="flex items-center gap-2">
            {[
              { label: 'Katalog', href: '/catalog', desc: 'Jelajahi' },
              { label: 'Jadwal', href: '/schedule', desc: 'Rilis' },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={`group relative px-3 max-[374px]:px-2.5 sm:px-6 py-2 max-[374px]:py-1.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300
                  ${isDark
                    ? isActive ? 'bg-[#ff1e56]/8' : 'hover:bg-[#ff1e56]/5'
                    : isActive ? 'bg-rose-100/60' : 'hover:bg-rose-50/50'}`}
              >
                <span className={`absolute bottom-2 left-4 right-4 sm:left-6 sm:right-6 h-px transition-all duration-500 origin-left
                  ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  ${isDark ? 'bg-[#ff1e56]/50' : 'bg-rose-300'}`}
                />
                <span className={`block text-[10px] max-[374px]:text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] transition-colors duration-300
                  ${isDark
                    ? isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    : isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}
                >
                  {link.label}
                </span>
                <span className={`block text-[8px] max-[374px]:text-[7px] sm:text-[9px] font-bold uppercase tracking-widest mt-0.5 transition-colors duration-300
                  ${isDark
                    ? isActive ? 'text-[#ff1e56]/80' : 'text-slate-600 group-hover:text-[#ff1e56]/60'
                    : isActive ? 'text-rose-500' : 'text-slate-400 group-hover:text-rose-400'}`}
                >
                  {link.desc}
                </span>
              </a>
              );
            })}
          </nav>

          {/* ═══ GENRE TAG CLOUD ═══ */}
          <div className="flex flex-wrap justify-center gap-1 max-[374px]:gap-0.5 sm:gap-2 max-w-lg">
            {genres.map((g, i) => (
              <span
                key={g}
                className={`inline-block px-2 max-[374px]:px-1.5 py-0.5 max-[374px]:py-px rounded-full text-[8px] max-[374px]:text-[7px] sm:text-[9px] font-bold uppercase tracking-wider cursor-default transition-all duration-300 hover:scale-105
                  ${isDark
                    ? 'bg-white/[0.03] text-slate-500 border border-white/5 hover:border-[#ff1e56]/30 hover:text-[#ff1e56]/70'
                    : 'bg-rose-50/50 text-slate-400 border border-rose-100 hover:border-rose-300 hover:text-rose-600'
                  }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {g}
              </span>
            ))}
          </div>

          {/* ═══ QUOTE ROTATOR ═══ */}
          <div className={`relative w-full max-w-md px-3 max-[374px]:px-2.5 py-2.5 max-[374px]:py-2 rounded-xl border text-center transition-colors duration-300
            ${isDark
              ? 'bg-white/[0.02] border-white/5'
              : 'bg-black/[0.02] border-slate-200/60'}`}
          >
            <div className="absolute -top-px left-8 right-8 h-px bg-linear-to-r from-transparent via-[#ff1e56]/20 to-transparent" />
            <div className={`transition-opacity duration-400 ${quoteFade ? 'opacity-100' : 'opacity-0'}`}>
              <p className={`text-[10px] max-[374px]:text-[9px] sm:text-xs font-medium leading-relaxed italic transition-colors duration-300
                ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
              >
                "{q.text}"
              </p>
              <p className={`text-[7px] max-[374px]:text-[6px] sm:text-[8px] font-bold uppercase tracking-widest mt-1 transition-colors duration-300
                ${isDark ? 'text-slate-600' : 'text-slate-400'}`}
              >
                — {q.from}
              </p>
            </div>
          </div>

          {/* ═══ SOCIAL LINKS ═══ */}
          <div className="flex items-center gap-1.5 max-[374px]:gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`w-7 max-[374px]:w-6 h-7 max-[374px]:h-6 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg sm:rounded-xl border transition-all duration-300 cursor-pointer
                  ${isDark
                    ? 'border-white/5 text-slate-500 hover:border-white/20 hover:text-white bg-white/[0.02]'
                    : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-700 bg-white/40'
                  } ${s.color}`}
                title={s.label}
              >
                <i className={`fa-brands ${s.icon} text-[10px] max-[374px]:text-[9px] sm:text-sm`} />
              </a>
            ))}
          </div>

          {/* ═══ DIVIDER ═══ */}
          <div className="w-full max-w-[200px] max-[374px]:max-w-[160px] flex items-center gap-2">
            <div className={`flex-1 h-px ${isDark ? 'bg-linear-to-r from-transparent to-[#2a1117]' : 'bg-linear-to-r from-transparent to-slate-200'}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#ff1e56]/30' : 'bg-rose-300'}`} />
            <div className={`flex-1 h-px ${isDark ? 'bg-linear-to-l from-transparent to-[#2a1117]' : 'bg-linear-to-l from-transparent to-slate-200'}`} />
          </div>

          {/* ═══ BOTTOM ═══ */}
          <div className="flex flex-col items-center gap-2 max-[374px]:gap-1.5">
            <div className={`flex items-center gap-1.5 max-[374px]:gap-1 text-[8px] max-[374px]:text-[7px] min-[360px]:text-[10px] font-bold uppercase tracking-widest
              ${isDark ? 'text-slate-700' : 'text-slate-300'}`}
            >
              <span>Dibuat dengan</span>
              <i className="fa-solid fa-heart text-[#ff1e56]/60 text-[8px] max-[374px]:text-[7px] animate-pulse" />
              <span>untuk penggemar anime</span>
            </div>
            <p className={`text-[8px] max-[374px]:text-[7px] min-[360px]:text-[10px] font-bold tracking-wider uppercase
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