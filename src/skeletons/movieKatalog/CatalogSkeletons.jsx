// CatalogSkeletons.jsx

// ── 1. SKELETON POSTER CARD (Untuk Tab Biasa & Hasil Filter) ──
export function SkeletonCard({ isDark }) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl border group ${isDark ? 'border-[#2a1117]/60 bg-[#0d0407]' : 'border-slate-200/80 bg-white'
                }`}
        >
            <div className={`aspect-2/3 animate-pulse ${isDark ? 'bg-[#1a0a0f]' : 'bg-slate-100'}`} />
            <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                <div className={`h-2 w-1/3 rounded animate-pulse ${isDark ? 'bg-[#1a0a0f]' : 'bg-slate-100'}`} />
                <div className={`h-4 w-full rounded animate-pulse ${isDark ? 'bg-[#1a0a0f]' : 'bg-slate-100'}`} />
                <div className={`h-4 w-2/3 rounded animate-pulse ${isDark ? 'bg-[#1a0a0f]' : 'bg-slate-100'}`} />
                <div className={`h-10 w-full rounded-xl mt-2 animate-pulse ${isDark ? 'bg-[#1a0a0f]' : 'bg-slate-100'}`} />
            </div>
        </div>
    );
}

// ── 2. SKELETON INDEKS A-Z (Mencegah Layout Shifting Pada Tab Abjad) ──
export function SkeletonIndexList({ isDark }) {
    return (
        <div className="space-y-5 sm:space-y-8 animate-pulse">
            {Array.from({ length: 3 }).map((_, idx) => (
                <div
                    key={idx}
                    className={`relative rounded-2xl border p-3 sm:p-6 ${
                        isDark 
                            ? 'border-[#2a1117]/50 bg-linear-to-br from-[#13080c]/40 to-[#0a0305]/60' 
                            : 'border-slate-200/80 bg-white'
                    }`}
                >
                    {/* Header Huruf Indeks */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 border-b border-dashed border-inherit min-w-0">
                        <div className={`h-6 w-8 rounded ${isDark ? 'bg-[#1a0a0f]' : 'bg-slate-100'}`} />
                        <div className={`flex-1 h-px ${isDark ? 'bg-[#1a0a0f]' : 'bg-slate-100'}`} />
                        <div className={`h-4 w-16 rounded ${isDark ? 'bg-[#1a0a0f]' : 'bg-slate-100'}`} />
                    </div>

                    {/* Baris Judul Teks List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                        {Array.from({ length: 6 }).map((_, j) => (
                            <div
                                key={j}
                                className={`h-11 rounded-xl border ${
                                    isDark 
                                        ? 'border-[#2a1117]/40 bg-[#13080c]/30' 
                                        : 'border-slate-100 bg-slate-50/50'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}