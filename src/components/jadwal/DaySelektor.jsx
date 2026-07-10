import { useTheme } from "../../context/ThemeContext";

const DAYS = [
    { key: "SUN", label: "MIN" },
    { key: "MON", label: "SEN" },
    { key: "TUE", label: "SEL" },
    { key: "WED", label: "RAB" },
    { key: "THU", label: "KAM" },
    { key: "FRI", label: "JUM" },
    { key: "SAT", label: "SAB" },
];

export default function DaySelector({ activeDay, onDayChange }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section className="w-full relative select-none">
            {/* Mengubah sistem flex-scroll menjadi grid 7 kolom di mobile agar pas dalam satu layar */}
            <div className="grid grid-cols-7 sm:flex sm:flex-wrap gap-1 sm:gap-2 pb-1">
                {DAYS.map((day) => {
                    const isActive = activeDay === day.key;
                    return (
                        <button
                            key={day.key}
                            onClick={() => onDayChange(day.key)}
                            className={`relative rounded-lg font-black uppercase transition-all duration-300 select-none overflow-hidden text-center flex items-center justify-center
                                px-1 sm:px-4 py-2 sm:py-2.5 text-[8px] min-[360px]:text-[9px] min-[390px]:text-[10px] sm:text-xs tracking-wider min-w-0 sm:min-w-[60px]
                                ${isActive
                                    ? isDark
                                        ? "bg-[#ff1e56] border-[#ff1e56] text-white shadow-[0_2px_12px_rgba(255,30,86,0.3)]"
                                        : "bg-slate-900 border-slate-900 text-white shadow-md"
                                    : isDark
                                        ? "bg-[#13080c]/60 border border-[#2a1117]/50 text-slate-500 hover:border-[#ff1e56]/25 hover:text-slate-300"
                                        : "bg-white/60 border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                                }`}
                        >
                            {isActive && (
                                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                            )}
                            <span className="relative z-10">{day.label}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}