// ThemeToggle.jsx
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ isDark, toggleTheme }) {
    return (
        <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            /* 
              ✅ PERBAIKAN UTAMA 1: Mengubah tombol dari padding dinamis ke ukuran lingkaran tetap w-7.5 h-7.5 
              pada HP agar diameternya (30px) sejajar simetris secara sempurna dengan tombol navigasi lainnya.
            */
            className={`w-7.5 h-7.5 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none ${isDark
                ? "bg-zinc-950/40 border-white/10 text-yellow-400 hover:text-yellow-300 hover:bg-zinc-900"
                : "bg-white border-gray-200 text-slate-700 hover:shadow-md hover:border-slate-300"
                }`}
        >
            {isDark ? (
                /* ✅ PERBAIKAN 2: Ikon disetel ke w-[15px] di HP dengan tambahan mikro-interaksi rotasi anggun */
                <Sun className="w-[15px] h-[15px] sm:w-5 sm:h-5 transition-transform duration-300 hover:rotate-45" />
            ) : (
                <Moon className="w-[15px] h-[15px] sm:w-5 sm:h-5 transition-transform duration-300 hover:-rotate-12" />
            )}
        </button>
    );
}