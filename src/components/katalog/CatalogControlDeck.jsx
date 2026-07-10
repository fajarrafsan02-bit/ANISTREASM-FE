import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function CatalogControlDeck({
    selectedGenre, setSelectedGenre,
    activeStatus, setActiveStatus,
    handleResetFilters,
    genreOptions = [],
    statusOptions = [],
    onApply,
    order, setOrder,
    orderOptions = [],
    showOrder = false,
    setPage,
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isOpen, setIsOpen] = useState(false);

    const activeFilterCount = (selectedGenre ? 1 : 0) + (activeStatus ? 1 : 0);

    const filteredStatusOptions = statusOptions.filter(s => {
        const str = typeof s === 'string' ? s.trim().toLowerCase() : '';
        return str !== 'selesai' && str !== 'berjalan';
    });

    const handleApplyAndClose = () => {
        onApply();
        setIsOpen(false);
    };

    return (
        <div className="w-full flex flex-col gap-3 mb-8 relative">
            {/* Top decorative line */}
            <div
                className={`absolute -top-3 left-0 right-0 h-px bg-linear-to-r from-transparent ${isDark ? 'via-[#2a1117]' : 'via-slate-200'
                    } to-transparent`}
            />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 w-full">
                {/* Left: Filter Toggle & Reset */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`relative flex items-center justify-center gap-2.5 px-3.5 sm:px-5 py-2.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider border transition-all duration-300 select-none overflow-hidden group w-full sm:w-auto
                            ${isOpen
                                ? isDark
                                    ? 'bg-linear-to-r from-[#ff1e56] to-rose-600 border-transparent text-white shadow-[0_4px_20px_rgba(255,30,86,0.3)]'
                                    : 'bg-slate-900 border-transparent text-white shadow-lg'
                                : isDark
                                    ? 'border-[#2a1117]/80 bg-[#13080c]/60 text-slate-400 hover:border-[#ff1e56]/25 hover:text-slate-200'
                                    : 'border-slate-200/80 bg-white/80 text-slate-500 hover:bg-white hover:border-slate-300'
                            }`}
                    >
                        {isOpen && (
                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        )}
                        <i className={`fa-solid ${isOpen ? "fa-circle-chevron-up" : "fa-sliders"} text-[10px]`} />
                        <span className="relative z-10">Filter Lanjutan</span>
                        {activeFilterCount > 0 && (
                            <span
                                className={`relative z-10 text-[9px] font-black px-2 py-0.5 rounded-full ml-1
                                    ${isOpen
                                        ? "bg-white/20 text-white"
                                        : isDark
                                            ? "bg-[#ff1e56] text-white"
                                            : "bg-rose-500 text-white"
                                    }`}
                            >
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    {activeFilterCount > 0 && (
                        <button
                            onClick={handleResetFilters}
                            className={`flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl border text-[10px] sm:text-[11px] font-bold transition-all duration-300 w-full sm:w-auto
                                ${isDark
                                    ? 'border-[#2a1117] bg-[#13080c] text-slate-400 hover:border-red-900/40 hover:text-white'
                                    : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-300'
                                }`}
                        >
                            <i className="fa-solid fa-rotate-left text-[10px]" />
                            <span>Reset</span>
                        </button>
                    )}
                </div>

                {/* Right: Order Selector */}
                {showOrder && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <span
                            className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'
                                }`}
                        >
                            Urutkan
                        </span>
                        <div className="relative w-full sm:w-auto">
                            <select
                                value={order}
                                onChange={(e) => { setOrder(e.target.value); setPage(1); }}
                                className={`appearance-none w-full sm:w-auto border text-[10px] sm:text-[11px] font-bold rounded-xl py-2.5 pl-3.5 pr-10 focus:outline-none focus:ring-2 cursor-pointer transition-all duration-200
                                    ${isDark
                                        ? 'border-[#2a1117] bg-[#13080c] text-white focus:bg-[#1a0a10] focus:ring-[#ff1e56]/10'
                                        : 'border-slate-200 bg-white text-slate-800 focus:bg-slate-50 focus:ring-slate-900/5'
                                    }`}
                            >
                                {orderOptions.map(o => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                            <i
                                className={`fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[9px] pointer-events-none ${isDark ? 'text-slate-500' : 'text-slate-400'
                                    }`}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Filter Drawer */}
            <div
                className={`transition-all duration-500 ease-out overflow-hidden ${isOpen ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
            >
                <div
                    className={`relative rounded-2xl border-2 p-3 sm:p-6 flex flex-col gap-4 sm:gap-6 overflow-hidden
                        ${isDark
                            ? 'border-[#2a1117]/60 bg-linear-to-br from-[#13080c]/90 to-[#0a0305]/95 backdrop-blur-xl'
                            : 'border-slate-200/80 bg-white shadow-xl shadow-slate-200/30'
                        }`}
                >
                    {/* Ambient glow */}
                    {isDark && (
                        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#ff1e56]/5 blur-3xl pointer-events-none" />
                    )}

                    {/* Corner accents */}
                    <div className={`absolute top-2 left-2 w-3.5 h-3.5 border-l-2 border-t-2 rounded-tl-lg ${isDark ? 'border-[#ff1e56]/20' : 'border-slate-200'}`} />
                    <div className={`absolute top-2 right-2 w-3.5 h-3.5 border-r-2 border-t-2 rounded-tr-lg ${isDark ? 'border-[#ff1e56]/20' : 'border-slate-200'}`} />

                    {/* Status Filter - hanya tampil kalau ada data */}
                    {filteredStatusOptions.length > 0 && (
                        <div className="space-y-2.5 relative z-10">
                            <div className="flex items-center gap-2">
                                <div className={`w-4 h-px ${isDark ? 'bg-[#ff1e56]/40' : 'bg-rose-300'}`} />
                                <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Status Rilis
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {filteredStatusOptions.map(status => {
                                    const isActive = activeStatus === status;
                                    return (
                                        <button
                                            key={status}
                                            onClick={() => setActiveStatus(isActive ? "" : status)}
                                            className={`relative px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-black rounded-lg border transition-all duration-300 overflow-hidden
                                                ${isActive
                                                    ? isDark
                                                        ? 'bg-linear-to-r from-[#ff1e56] to-rose-600 border-transparent text-white shadow-[0_2px_10px_rgba(255,30,86,0.25)]'
                                                        : 'bg-slate-900 border-transparent text-white'
                                                    : isDark
                                                        ? 'border-[#2a1117] bg-[#10070a]/80 text-slate-400 hover:border-[#ff1e56]/20 hover:text-slate-200'
                                                        : 'border-slate-200 bg-slate-50/80 text-slate-500 hover:bg-white hover:border-slate-300'
                                                }`}
                                        >
                                            {isActive && (
                                                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                            )}
                                            <span className="relative z-10">{status}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Genre Filter */}
                    <div className="space-y-2.5 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className={`w-4 h-px ${isDark ? 'bg-[#ff1e56]/40' : 'bg-rose-300'}`} />
                            <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Daftar Genre
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                            {genreOptions.map(genre => {
                                const isSelected = selectedGenre === genre.genreId;
                                return (
                                    <button
                                        key={genre.genreId}
                                        onClick={() => setSelectedGenre(isSelected ? "" : genre.genreId)}
                                        className={`relative px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-lg border transition-all duration-300 flex items-center gap-2 overflow-hidden group/genre
                                            ${isSelected
                                                ? isDark
                                                    ? 'bg-linear-to-r from-[#ff1e56] to-rose-600 border-transparent text-white shadow-[0_2px_10px_rgba(255,30,86,0.2)]'
                                                    : 'bg-slate-900 border-transparent text-white'
                                                : isDark
                                                    ? 'border-[#2a1117] bg-[#10070a]/80 text-slate-400 hover:border-[#ff1e56]/20 hover:text-slate-200'
                                                    : 'border-slate-200 bg-slate-50/80 text-slate-500 hover:bg-white hover:border-slate-300'
                                            }`}
                                    >
                                        {isSelected && (
                                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                        )}
                                        <span className="relative z-10">{genre.title}</span>
                                        {isSelected && <i className="fa-solid fa-check text-[9px] relative z-10" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex justify-end pt-3 sm:pt-4 border-t border-inherit relative z-10">
                        <button
                            onClick={handleApplyAndClose}
                            className={`relative w-full sm:w-auto px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] border transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group
                                ${isDark
                                    ? 'bg-linear-to-r from-[#ff1e56] to-rose-600 border-transparent text-white hover:shadow-[0_4px_25px_rgba(255,30,86,0.35)]'
                                    : 'bg-slate-900 border-transparent text-white hover:bg-slate-800'
                                }`}
                        >
                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <i className="fa-solid fa-check text-[10px] relative z-10" />
                            <span className="relative z-10">Terapkan Filter</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}