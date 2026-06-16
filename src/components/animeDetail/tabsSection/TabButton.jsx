// TabButton.jsx
import { useTheme } from "../../../context/ThemeContext";

export default function TabButton({ active, onClick, children }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={onClick}
            type="button"
            /* 
              ✅ PERBAIKAN: Menggunakan w-full di HP agar membagi kolom 50/50 secara simetris, 
              serta menambahkan outline-none & text-center agar rapi dan bebas dari garis fokus browser.
            */
            className={`w-full sm:w-auto shrink-0 whitespace-nowrap rounded-md border touch-manipulation transition-all duration-200 select-none outline-none focus:outline-none
                px-2 py-1.5 text-[9px] leading-none text-center
                max-[320px]:px-1 max-[320px]:py-1 max-[320px]:text-[8px]
                sm:px-3 sm:py-1.5 sm:text-xs sm:rounded-lg
                md:px-4 md:py-2 md:text-sm
                font-bold
                ${
                    active
                        ? "bg-gradient-to-r from-red-500 to-rose-500 text-white border-transparent shadow-[0_0_10px_rgba(255,30,86,0.2)]"
                        : isDark
                            ? "text-slate-400 bg-transparent border-transparent hover:bg-[#10070a] hover:text-white"
                            : "text-slate-600 bg-white border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
                }`}
        >
            {children}
        </button>
    );
}