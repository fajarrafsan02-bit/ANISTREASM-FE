import { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import DaySelector from "../components/jadwal/DaySelektor";
import ScheduleCard from "../components/jadwal/Schedule";
import useSchedule from "../hooks/useSchedule";

const DAY_KEYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getTodayKey() {
    return DAY_KEYS[new Date().getDay()];
}

export default function WeeklySchedulePage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [activeDay, setActiveDay] = useState(getTodayKey()); // default hari ini

    // Data dari API
    const { schedule, loading, error } = useSchedule();
    const activeSchedule = useMemo(() => schedule[activeDay] ?? [], [schedule, activeDay]);

    return (
        <div className={`min-h-screen transition-colors duration-500 py-4 sm:py-8 relative overflow-hidden ${isDark ? 'bg-[#050203]' : 'bg-[#faf8f5]'}`}>

            {isDark && (
                <>
                    <div className="absolute top-[-100px] left-[-50px] w-[400px] h-[400px] rounded-full bg-[#ff1e56]/4 blur-[120px] pointer-events-none" />
                    <div className="absolute top-[30%] right-[-100px] w-[300px] h-[300px] rounded-full bg-[#ff1e56]/3 blur-[100px] pointer-events-none" />
                </>
            )}

            <main className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 md:px-8 flex flex-col gap-5 sm:gap-8 relative z-10">

                {/* Header */}
                <header className="relative">
                    <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent ${isDark ? 'via-[#ff1e56]/20' : 'via-slate-300'} to-transparent`} />
                    <div className="pt-5 pb-4 border-b border-dashed relative">
                        <div className={`absolute -bottom-px left-0 w-3 h-3 border-l-2 border-b-2 ${isDark ? 'border-[#ff1e56]/30' : 'border-slate-300'}`} />
                        <div className={`absolute -bottom-px right-0 w-3 h-3 border-r-2 border-b-2 ${isDark ? 'border-[#ff1e56]/30' : 'border-slate-300'}`} />
                        <div className="flex items-center gap-2.5 sm:gap-3 mb-1">
                            <div className={`w-1 h-7 sm:h-8 md:h-10 rounded-full bg-linear-to-b ${isDark ? 'from-[#ff1e56] to-rose-800' : 'from-rose-500 to-rose-700'}`} />
                            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Weekly <span className={isDark ? 'text-[#ff1e56]' : 'text-rose-500'}>Schedule</span>
                            </h1>
                        </div>
                        <p className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] ml-3 sm:ml-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            Jadwal rilis anime terkini
                        </p>
                    </div>
                </header>

                <DaySelector activeDay={activeDay} onDayChange={setActiveDay} />

                <div className={`flex items-center gap-2 pb-2 border-b ${isDark ? 'border-[#2a1117]/30' : 'border-slate-200/60'}`}>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        {loading ? '...' : `${activeSchedule.length} Anime`}
                    </span>
                    <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-[#2a1117]' : 'bg-slate-300'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-[#ff1e56]' : 'text-rose-500'}`}>
                        {activeDay}
                    </span>
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className={`rounded-xl aspect-video animate-pulse ${isDark ? 'bg-[#13080c]' : 'bg-slate-100'}`} />
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div className="text-center py-10 text-red-400 text-sm">{error}</div>
                )}

                {/* Grid */}
                {!loading && !error && activeSchedule.length > 0 && (
                    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4">
                        {activeSchedule.map((anime, i) => (
                            <ScheduleCard key={`${anime.animeId}-${i}`} anime={anime} />
                        ))}
                    </section>
                )}

                {/* Empty */}
                {!loading && !error && activeSchedule.length === 0 && (
                    <div className={`text-center py-16 rounded-2xl border border-dashed flex flex-col items-center gap-3 ${isDark ? 'border-[#2a1117]/50' : 'border-slate-200'}`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-1 ${isDark ? 'bg-[#13080c] border-[#2a1117]' : 'bg-slate-50 border-slate-200'}`}>
                            <i className={`fa-solid fa-calendar-xmark text-lg ${isDark ? 'text-[#ff1e56]/30' : 'text-rose-300'}`} />
                        </div>
                        <p className={`text-xs font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            Tidak ada jadwal untuk hari ini
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}