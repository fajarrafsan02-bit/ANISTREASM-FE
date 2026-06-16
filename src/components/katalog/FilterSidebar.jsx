import { useTheme } from "../../context/ThemeContext";

export default function FilterSidebar({
    searchQuery, setSearchQuery,
    selectedGenre, setSelectedGenre,
    activeStatus, setActiveStatus,
    handleResetFilters,
    genreOptions = [],
    statusOptions = [],
    onApply,
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const activeFilterCount = (selectedGenre ? 1 : 0) + (activeStatus ? 1 : 0);

    const filteredStatusOptions = statusOptions.filter(s => {
        const str = typeof s === 'string' ? s.trim().toLowerCase() : '';
        return str !== 'selesai' && str !== 'berjalan';
    });

    return (
        <aside className="w-full xl:w-80 shrink-0 flex flex-col gap-4 sm:gap-6 xl:sticky xl:top-6 relative min-w-0">

            {/* Search Input */}
            <div className="relative w-full group">
                <div
                    className={`absolute -inset-0.5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm ${isDark ? 'bg-[#ff1e56]/20' : 'bg-rose-300/30'
                        }`}
                />
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full border-2 rounded-xl font-bold transition-all duration-300 focus:outline-none
                            text-[13px] sm:text-sm
                            px-3.5 py-3 sm:p-4
                            pl-10 sm:pl-12
                            ${isDark
                                ? "bg-[#0d0407]/90 border-[#2a1117] text-white placeholder-slate-600 focus:border-[#ff1e56]/50 focus:bg-[#13080c]"
                                : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-rose-300 focus:bg-white"
                            }`}
                        placeholder="Cari judul anime..."
                    />
                    <div
                        className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isDark
                                ? "text-slate-600 group-focus-within:text-[#ff1e56]"
                                : "text-slate-400 group-focus-within:text-rose-500"
                            }`}
                    >
                        <i className="fa-solid fa-magnifying-glass text-[13px] sm:text-sm" />
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            <div
                className={`relative rounded-2xl border-2 p-3 sm:p-6 flex flex-col gap-4 sm:gap-6 overflow-hidden min-w-0
                    ${isDark
                        ? "border-[#2a1117]/60 bg-gradient-to-br from-[#13080c]/80 to-[#0a0305]/90 backdrop-blur-xl"
                        : "border-slate-200/80 bg-white shadow-xl shadow-slate-200/20"
                    }`}
            >
                {/* Ambient glow */}
                {isDark && (
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#ff1e56]/5 blur-3xl pointer-events-none" />
                )}

                {/* Corner accents */}
                <div
                    className={`absolute top-3 sm:top-4 left-3 sm:left-4 w-4 sm:w-5 h-4 sm:h-5 border-l-2 border-t-2 rounded-tl-lg ${isDark ? 'border-[#ff1e56]/20' : 'border-slate-200'
                        }`}
                />
                <div
                    className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-4 sm:w-5 h-4 sm:h-5 border-r-2 border-t-2 rounded-tr-lg ${isDark ? 'border-[#ff1e56]/20' : 'border-slate-200'
                        }`}
                />

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-dashed pb-3 sm:pb-4 relative z-10 min-w-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border shrink-0
                                ${isDark ? 'bg-[#ff1e56]/10 border-[#ff1e56]/20' : 'bg-rose-50 border-rose-200'}`}
                        >
                            <i className="fa-solid fa-sliders text-[#ff1e56] text-[11px] sm:text-xs" />
                        </div>
                        <h3 className={`font-black text-sm uppercase tracking-wider truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            Filter Anime
                        </h3>
                    </div>

                    {activeFilterCount > 0 && (
                        <span
                            className={`self-start sm:self-auto text-[10px] font-black px-2.5 py-1 rounded-full border shrink-0
                                ${isDark ? "bg-[#ff1e56]/10 text-[#ff1e56] border-[#ff1e56]/20" : "bg-rose-50 text-rose-500 border-rose-200"}`}
                        >
                            {activeFilterCount} Aktif
                        </span>
                    )}
                </div>

                {/* Genre Filter */}
                <div className="space-y-2.5 sm:space-y-3 relative z-10 min-w-0">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 sm:w-4 h-px ${isDark ? 'bg-[#ff1e56]/40' : 'bg-rose-300'}`} />
                        <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            Daftar Genre
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 max-h-52 sm:max-h-64 overflow-y-auto pr-1 custom-scrollbar min-w-0">
                        {genreOptions.map(genre => {
                            const isSelected = selectedGenre === genre.genreId;
                            return (
                                <button
                                    key={genre.genreId}
                                    onClick={() => setSelectedGenre(isSelected ? "" : genre.genreId)}
                                    className={`relative px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-bold rounded-lg border transition-all duration-300 flex items-center gap-1.5 overflow-hidden min-w-0
                                        ${isSelected
                                            ? isDark
                                                ? 'bg-gradient-to-r from-[#ff1e56] to-rose-600 border-transparent text-white shadow-[0_2px_10px_rgba(255,30,86,0.2)]'
                                                : 'bg-slate-900 border-transparent text-white'
                                            : isDark
                                                ? 'border-[#2a1117] bg-[#10070a]/80 text-slate-400 hover:border-[#ff1e56]/20 hover:text-slate-200'
                                                : 'border-slate-200 bg-slate-50/80 text-slate-500 hover:bg-white hover:border-slate-300'
                                        }`}
                                >
                                    {isSelected && (
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                    )}
                                    <span className="relative z-10 truncate max-w-[120px] sm:max-w-none">
                                        {genre.title}
                                    </span>
                                    {isSelected && <i className="fa-solid fa-check text-[9px] relative z-10 shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Status Filter */}
                {filteredStatusOptions.length > 0 && (
                    <div className="space-y-2.5 sm:space-y-3 relative z-10 min-w-0">
                        <div className="flex items-center gap-2">
                            <div className={`w-3 sm:w-4 h-px ${isDark ? 'bg-[#ff1e56]/40' : 'bg-rose-300'}`} />
                            <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                Status Rilis
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {filteredStatusOptions.map(status => {
                                const isActive = activeStatus === status;
                                return (
                                    <button
                                        key={status}
                                        onClick={() => setActiveStatus(isActive ? "" : status)}
                                        className={`relative py-2 sm:py-2.5 px-2 text-[10px] sm:text-xs font-black rounded-lg border transition-all duration-300 overflow-hidden min-w-0
                                            ${isActive
                                                ? isDark
                                                    ? 'bg-gradient-to-r from-[#ff1e56] to-rose-600 border-transparent text-white shadow-[0_2px_10px_rgba(255,30,86,0.2)]'
                                                    : 'bg-slate-900 border-transparent text-white'
                                                : isDark
                                                    ? 'border-[#2a1117] bg-[#10070a]/80 text-slate-400 hover:border-[#ff1e56]/20 hover:text-slate-200'
                                                    : 'border-slate-200 bg-slate-50/80 text-slate-500 hover:bg-white hover:border-slate-300'
                                            }`}
                                    >
                                        {isActive && (
                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                        )}
                                        <span className="relative z-10 truncate block">
                                            {status}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 pt-3 sm:pt-4 border-t border-inherit relative z-10 min-w-0">
                    <button
                        onClick={onApply}
                        className={`relative flex-1 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] border transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group min-w-0
                            ${isDark
                                ? 'bg-gradient-to-r from-[#ff1e56] to-rose-600 border-transparent text-white hover:shadow-[0_4px_25px_rgba(255,30,86,0.35)]'
                                : 'bg-slate-900 border-transparent text-white hover:bg-slate-800'
                            }`}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <i className="fa-solid fa-check text-[10px] relative z-10" />
                        <span className="relative z-10 truncate">Terapkan</span>
                    </button>

                    <button
                        onClick={handleResetFilters}
                        disabled={activeFilterCount === 0 && searchQuery === ""}
                        className={`px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs font-black uppercase tracking-wider border transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed shrink-0
                            ${isDark
                                ? 'border-[#2a1117] bg-[#13080c] text-slate-400 hover:border-red-900/40 hover:text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-300'
                            }`}
                        title="Bersihkan Filter"
                    >
                        <i className="fa-solid fa-rotate-left" />
                    </button>
                </div>
            </div>
        </aside>
    );
}