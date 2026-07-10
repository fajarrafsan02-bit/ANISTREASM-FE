import { Menu, X } from "lucide-react";

export default function Hamburger({ isDark, menuOpen, setMenuOpen }) {
    return (
        <button
            aria-label="Toggle menu"
            type="button"
            className={`lg:hidden w-7.5 h-7.5 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg sm:rounded-xl border transition-all cursor-pointer select-none outline-none focus:outline-none ${isDark
                ? "bg-zinc-900 border-white/10 text-white"
                : "bg-gray-100 border-gray-200 text-slate-900 hover:shadow-sm"
                }`}
            onClick={() => setMenuOpen(!menuOpen)}
        >
            {menuOpen ? (
                <X className="w-[15px] h-[15px] sm:w-5 sm:h-5 transition-transform duration-300" />
            ) : (
                <Menu className="w-[15px] h-[15px] sm:w-5 sm:h-5 transition-transform duration-300" />
            )}
        </button>
    );
}