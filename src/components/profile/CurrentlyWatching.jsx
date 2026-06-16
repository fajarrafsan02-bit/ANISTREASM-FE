// CurrentlyWatching.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext'; // ✅ Mengimpor deteksi tema (sesuaikan path jika berbeda)

export default function CurrentlyWatching({ shows }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section>
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                    <div className="w-1 h-5 bg-[#ec001d] rounded-full shadow-[0_2px_10px_rgba(236,0,29,0.4)] dark:shadow-[0_0_12px_rgba(236,0,29,0.6)]" />
                    <h2 className={`font-sora text-xs md:text-sm font-extrabold tracking-tight uppercase transition-colors duration-300 ${
                        isDark ? "text-white" : "text-neutral-800"
                    }`}>
                        Currently Watching
                    </h2>
                </div>
            </div>

            {shows.length === 0 ? (
                /* --- EMPTY STATE ADAPTIF --- */
                <div className={`rounded-2xl border p-10 text-center text-xs transition-all duration-300 ${
                    isDark 
                        ? "border-white/[0.03] bg-white/[0.01] backdrop-blur-md text-neutral-500" 
                        : "border-neutral-200 bg-white/50 text-neutral-400 shadow-sm"
                }`}>
                    Tidak ada seri yang sedang ditonton.
                </div>
            ) : (
                /* --- GRID KARTU --- */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {shows.map((show) => (
                        <div
                            key={show.id}
                            className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                                isDark 
                                    ? "bg-[#0c0c0c] border-white/[0.03] hover:border-[#ec001d]/30 hover:shadow-[0_12px_24px_-10px_rgba(236,0,29,0.15)]" 
                                    : "bg-white border-neutral-200/80 hover:border-red-500/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
                            }`}
                        >
                            {/* Image Wrapper */}
                            <div className={`relative aspect-video overflow-hidden transition-colors duration-300 ${
                                isDark ? "bg-[#121212]" : "bg-neutral-100"
                            }`}>
                                <img
                                    alt={show.title}
                                    className="w-full h-full object-cover transition-all duration-750 ease-out group-hover:scale-105"
                                    src={show.image}
                                    loading="lazy"
                                />
                                {/* Play Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-[#ec001d] flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-[0_0_15px_rgba(236,0,29,0.4)]">
                                        <span className="material-symbols-outlined text-xl fill-current">play_arrow</span>
                                    </div>
                                </div>
                            </div>

                            {/* Info Detail di Bawah Foto */}
                            <div className={`p-4 space-y-3 transition-colors duration-300 ${
                                isDark ? "bg-gradient-to-b from-transparent to-black/40" : "bg-gradient-to-b from-transparent to-neutral-50/20"
                            }`}>
                                <div className="flex justify-between items-center">
                                    <span className={`text-[8px] tracking-widest font-extrabold uppercase font-mono transition-colors duration-300 ${
                                        isDark ? "text-neutral-500" : "text-neutral-400"
                                    }`}>
                                        CURRENTLY
                                    </span>
                                    <span className={`text-[9px] font-bold font-mono transition-colors duration-300 ${
                                        isDark ? "text-neutral-500" : "text-neutral-400"
                                    }`}>
                                        {show.duration}
                                    </span>
                                </div>

                                <div>
                                    <h4 className={`font-sora text-xs font-bold truncate transition-colors duration-200 ${
                                        isDark ? "text-neutral-200 group-hover:text-[#ec001d]" : "text-neutral-800 group-hover:text-red-600"
                                    }`}>
                                        {show.title}
                                    </h4>
                                    <p className="text-[9px] font-mono text-[#ec001d] font-bold mt-1 uppercase tracking-wider">
                                        {show.episode}
                                    </p>
                                </div>

                                {/* Progress Bar Track */}
                                <div className={`w-full rounded-full h-1 overflow-hidden transition-colors duration-300 ${
                                    isDark ? "bg-white/10" : "bg-neutral-100"
                                }`}>
                                    <div
                                        className="bg-[#ec001d] h-full rounded-full transition-all duration-500"
                                        style={{ width: `${show.progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}