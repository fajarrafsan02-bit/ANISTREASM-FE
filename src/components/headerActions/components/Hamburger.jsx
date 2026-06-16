// Hamburger.jsx
import { Menu, X } from "lucide-react";

export default function Hamburger({ isDark, menuOpen, setMenuOpen }) {
    return (
        <button
            aria-label="Toggle menu"
            type="button"
            /* 
              ✅ PERBAIKAN UTAMA 1: Mengubah tombol dari padding dinamis ke ukuran boks tetap w-7.5 h-7.5 
              pada HP agar diameternya (30px) sejajar simetris secara sempurna dengan tombol Tema di sebelah kanannya.
            */
            className={`lg:hidden w-7.5 h-7.5 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg sm:rounded-xl border transition-all cursor-pointer select-none outline-none focus:outline-none ${isDark
                ? "bg-zinc-900 border-white/10 text-white"
                : "bg-gray-100 border-gray-200 text-slate-900 hover:shadow-sm"
                }`}
            onClick={() => setMenuOpen(!menuOpen)}
        >
            {menuOpen ? (
                /* ✅ PERBAIKAN 2: Ikon disetel ke w-[15px] di HP agar tampilannya sangat pas dan manis */
                <X className="w-[15px] h-[15px] sm:w-5 sm:h-5 transition-transform duration-300" />
            ) : (
                <Menu className="w-[15px] h-[15px] sm:w-5 sm:h-5 transition-transform duration-300" />
            )}
        </button>
    );
}