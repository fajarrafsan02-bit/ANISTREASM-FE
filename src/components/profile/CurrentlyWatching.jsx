// CurrentlyWatching.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext'; // Pastikan path sesuai
import CurrentlyWatchingSkeleton from '../../skeletons/profil/CurrentlyWatchingSkeleton'; // ✅ Impor Skeleton

export default function CurrentlyWatching({ shows, loading = true }) { 
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    return (
        <section className="relative w-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#ec001d] to-[#ff4d63] shadow-[0_0_12px_rgba(236,0,29,0.5)] dark:shadow-[0_0_16px_rgba(236,0,29,0.8)]" />
                    <h2 className={`font-sora text-sm md:text-base font-extrabold tracking-wide uppercase transition-colors duration-300 ${
                        isDark ? "text-white" : "text-neutral-900"
                    }`}>
                        Currently Watching
                    </h2>
                </div>
            </div>

            {loading ? (
                <CurrentlyWatchingSkeleton />
            ) : shows?.length === 0 ? (
                <div className={`flex flex-col items-center justify-center rounded-3xl border border-dashed p-10 sm:p-14 text-center transition-all duration-300 ${
                    isDark
                        ? "border-white/10 bg-white/[0.02] backdrop-blur-xl text-neutral-400"
                        : "border-neutral-300 bg-neutral-50/50 text-neutral-500 shadow-inner"
                }`}>
                    <span className="material-symbols-outlined text-4xl mb-3 opacity-50">
                        live_tv
                    </span>
                    <p className="text-sm font-medium tracking-wide">
                        Belum ada seri yang ditonton.
                    </p>
                    <p className="text-xs mt-1 opacity-70">
                        Mulai tonton episode favoritmu sekarang!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {shows.map((show) => (
                        <div
                            key={show.id}
                            onClick={() => show.episodeId && navigate(`/episode/${show.episodeId}`)}
                            className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 cursor-pointer ${
                                isDark
                                    ? "bg-[#0f0f0f] border border-white/5 hover:border-white/10 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)]"
                                    : "bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)]"
                            }`}
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                <img
                                    alt={show.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    src={show.image}
                                    loading="lazy"
                                />

                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-all duration-500 ease-out shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ec001d] flex items-center justify-center shadow-[0_0_20px_rgba(236,0,29,0.6)]">
                                            <span className="material-symbols-outlined text-2xl fill-current ml-1">
                                                play_arrow
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-3 left-3 z-20">
                                    <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wider shadow-lg backdrop-blur-md ${
                                        isDark
                                            ? "bg-black/50 text-white/90 border border-white/10"
                                            : "bg-white/80 text-neutral-800 border border-black/5"
                                    }`}>
                                        {show.duration}
                                    </div>
                                </div>
                            </div>

                            <div className={`p-4 sm:p-5 flex flex-col gap-3 relative z-10 transition-colors duration-300`}>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
                                            isDark ? "text-neutral-500" : "text-neutral-400"
                                        }`}>
                                            Currently At
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-[#ec001d]" />
                                        <span className="text-[10px] font-mono font-bold text-[#ec001d]">
                                            {show.episode}
                                        </span>
                                    </div>

                                    <h4 className={`font-sora text-sm sm:text-base font-bold truncate transition-colors duration-300 ${
                                        isDark ? "text-neutral-100 group-hover:text-white" : "text-neutral-800 group-hover:text-black"
                                    }`}>
                                        {show.title}
                                    </h4>
                                </div>

                                <div className="mt-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-[10px] font-medium ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                                            Progress
                                        </span>
                                        <span className={`text-[10px] font-mono font-bold ${isDark ? "text-white" : "text-neutral-700"}`}>
                                            {show.progress}%
                                        </span>
                                    </div>
                                    <div className={`w-full rounded-full h-1.5 overflow-hidden shadow-inner ${
                                        isDark ? "bg-white/10" : "bg-neutral-200"
                                    }`}>
                                        <div
                                            className="bg-gradient-to-r from-[#ec001d] to-[#ff4d63] h-full rounded-full transition-all duration-700 ease-out relative"
                                            style={{ width: `${show.progress}%` }}
                                        >
                                            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/30 blur-[2px] rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}