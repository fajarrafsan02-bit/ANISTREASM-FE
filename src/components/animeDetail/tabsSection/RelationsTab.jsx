// RelationsTab.jsx
import { useTheme } from "../../../context/ThemeContext";

// Skema warna dinamis untuk label relasi agar harmonis di mode terang & gelap
const RELATION_TYPE_LABEL = {
    ADAPTATION: { label: "Adaptasi", color: "blue" },
    PREQUEL: { label: "Prequel", color: "amber" },
    SEQUEL: { label: "Sequel", color: "emerald" },
    SIDE_STORY: { label: "Side Story", color: "fuchsia" },
    SPIN_OFF: { label: "Spin-off", color: "orange" },
    ALTERNATIVE: { label: "Alternatif", color: "pink" },
    SUMMARY: { label: "Summary", color: "slate" },
    CHARACTER: { label: "Character", color: "rose" },
};

const getColorClasses = (color, isDark) => {
    const colorMap = {
        blue: isDark ? "bg-blue-950/25 border-blue-900/40 text-blue-400" : "bg-blue-50 border-blue-200 text-blue-600",
        amber: isDark ? "bg-amber-950/25 border-amber-900/40 text-amber-400" : "bg-amber-50 border-amber-200 text-amber-600",
        emerald: isDark ? "bg-emerald-950/25 border-emerald-900/40 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-600",
        fuchsia: isDark ? "bg-fuchsia-950/25 border-fuchsia-900/40 text-fuchsia-400" : "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-600",
        orange: isDark ? "bg-orange-950/25 border-orange-900/40 text-orange-400" : "bg-orange-50 border-orange-200 text-orange-600",
        pink: isDark ? "bg-pink-950/25 border-pink-900/40 text-pink-400" : "bg-pink-50 border-pink-200 text-pink-600",
        slate: isDark ? "bg-slate-950/25 border-slate-900/40 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600",
        rose: isDark ? "bg-rose-950/25 border-rose-900/40 text-rose-400" : "bg-rose-50 border-rose-200 text-rose-600",
    };
    return colorMap[color] || (isDark ? "bg-slate-950/25 border-slate-900/40 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600");
};

export default function RelationsTab({ relations = [], tags = [] }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const cornerBorderClass = isDark ? "border-red-900/15" : "border-slate-300/50";
    const cardBaseClass = isDark
        ? "bg-[#0d0407]/90 border border-[#2a1117]/80 shadow-2xl backdrop-blur-xl"
        : "bg-white border border-slate-200 shadow-xl";

    return (
        <div className="relative group">
            {/* Ambient glow */}
            <div
                className={`absolute -inset-1 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-700 ${isDark
                    ? "bg-gradient-to-br from-red-900/20 via-transparent to-red-950/15"
                    : "bg-gradient-to-br from-rose-200/40 via-transparent to-slate-100/30"
                    }`}
            />

            {/* Kontainer Utama (Padding dikurangi menjadi p-2.5 di HP) */}
            <div
                className={`relative rounded-2xl p-3 max-[320px]:p-2.5 sm:p-5 overflow-hidden transition-colors duration-300 ${cardBaseClass}`}
            >
                {/* Top gradient line */}
                <div
                    className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isDark ? "via-red-900/40" : "via-slate-300"
                        } to-transparent`}
                />

                {/* Corner accents - dikecilin hingga w-2.5 di HP */}
                <div className={`absolute top-2 left-2 border-l border-t ${cornerBorderClass} w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-tl-sm`} />
                <div className={`absolute top-2 right-2 border-r border-t ${cornerBorderClass} w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-tr-sm`} />
                <div className={`absolute bottom-2 left-2 border-l border-b ${cornerBorderClass} w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-bl-sm`} />
                <div className={`absolute bottom-2 right-2 border-r border-b ${cornerBorderClass} w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-br-sm`} />

                {/* ===== RELATIONS ===== */}
                <div className="mb-4 max-[320px]:mb-3 sm:mb-6">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3.5">
                        <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark
                                ? "bg-gradient-to-br from-[#1a0a0f] to-[#0f0508] border border-red-950/50 shadow-[0_0_12px_rgba(255,30,86,0.08)]"
                                : "bg-white border border-slate-200 shadow-sm"
                                }`}
                        >
                            <i className="fa-solid fa-diagram-project text-[10px] sm:text-xs text-[#ff1e56]" />
                        </div>
                        <div className="min-w-0">
                            <h4 className={`font-black text-[11px] sm:text-sm tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                                Karya Terkait
                            </h4>
                            <p className={`text-[9px] sm:text-[11px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                {relations.length} relasi ditemukan
                            </p>
                        </div>
                    </div>

                    {relations.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3">
                            {relations.map((relation) => {
                                const matchedLabel = RELATION_TYPE_LABEL[relation.relationType];
                                const typeClasses = matchedLabel
                                    ? getColorClasses(matchedLabel.color, isDark)
                                    : "bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-950/25 dark:border-slate-900/40 dark:text-slate-400";

                                const labelText = matchedLabel ? matchedLabel.label : relation.relationType;

                                const title =
                                    relation.title?.english ??
                                    relation.title?.romaji ??
                                    "-";

                                return (
                                    <div
                                        key={relation.id}
                                        className={`group/card relative rounded-xl p-1.5 sm:p-3 flex items-center gap-2 sm:gap-3 transition-all duration-300 border ${isDark
                                            ? "bg-[#13080c]/50 border-[#2a1117]/40 hover:border-red-900/30 hover:bg-[#1a0a10]/70"
                                            : "bg-white border border-slate-200 hover:border-rose-300/60 hover:bg-slate-50"
                                            }`}
                                    >
                                        {/* Cover - Dioptimalkan dimensinya ke w-8 h-11 di HP */}
                                        <div
                                            className={`relative w-8 h-11 sm:w-12 sm:h-16 rounded-md overflow-hidden flex-shrink-0 transition-colors ${isDark
                                                ? "bg-[#1a0a0f] border border-[#2a1117] group-hover/card:border-red-900/30"
                                                : "bg-slate-100 border-slate-200 group-hover/card:border-rose-300/60"
                                                }`}
                                        >
                                            {relation.cover ? (
                                                <img
                                                    src={relation.cover}
                                                    alt={title}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <i
                                                        className={`fa-solid fa-film text-xs ${isDark ? "text-slate-700" : "text-slate-400"
                                                            }`}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="min-w-0 flex-1 space-y-0.5">
                                            {/* Judul utama */}
                                            <div
                                                className={`font-extrabold sm:font-bold text-[10px] sm:text-[12px] leading-snug line-clamp-2 transition-colors ${isDark
                                                    ? "text-slate-200 group-hover/card:text-white"
                                                    : "text-slate-700 group-hover/card:text-slate-900"
                                                    }`}
                                            >
                                                {title}
                                            </div>

                                            {/* Baris Lencana (Saling melipat rapi jika baris sempit pada HP) */}
                                            <div className="flex flex-wrap items-center gap-1 mt-1">
                                                {/* Lencana Tipe Relasi (Adaptasi, Sequel, dll.) */}
                                                <span
                                                    className={`inline-flex items-center text-[8px] sm:text-[10px] font-black tracking-wider uppercase px-1.5 py-[1px] rounded border ${typeClasses}`}
                                                >
                                                    {labelText}
                                                </span>

                                                {/* ✅ PERBAIKAN: Menambahkan Lencana Format Karya (MANGA, TV, OVA, dll.) secara harmonis & premium */}
                                                {relation.format && (
                                                    <span
                                                        className={`inline-flex items-center text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-1.5 py-[1px] rounded border ${isDark
                                                            ? "bg-[#1c0c11] border-[#2a1117]/60 text-slate-400"
                                                            : "bg-slate-100 border-slate-200 text-slate-500"
                                                            }`}
                                                    >
                                                        {relation.format}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-8 text-center">
                            <div
                                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${isDark
                                    ? "bg-[#1a0a0f] border border-[#2a1117]"
                                    : "bg-slate-100 border border-slate-200"
                                    }`}
                            >
                                <i
                                    className={`fa-solid fa-link-slash text-xs ${isDark ? "text-slate-700" : "text-slate-400"
                                        }`}
                                />
                            </div>
                            <p className={`text-[10px] sm:text-xs font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                Tidak ada data relasi
                            </p>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div
                    className={`h-px bg-gradient-to-r from-transparent ${isDark ? "via-[#2a1117]/50" : "via-slate-200"
                        } to-transparent mb-4 sm:mb-6`}
                />

                {/* ===== TAGS ===== */}
                <div>
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3.5">
                        <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark
                                ? "bg-gradient-to-br from-[#1a0a0f] to-[#0f0508] border border-red-950/50 shadow-[0_0_12px_rgba(255,30,86,0.08)]"
                                : "bg-white border-slate-200 shadow-sm"
                                }`}
                        >
                            <i className="fa-solid fa-tags text-[10px] sm:text-xs text-[#ff1e56]" />
                        </div>
                        <div className="min-w-0">
                            <h4 className={`font-black text-[11px] sm:text-sm tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                                Genre & Tags
                            </h4>
                            <p className={`text-[9px] sm:text-[11px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                {tags.length} tag tersedia
                            </p>
                        </div>
                    </div>

                    {/* Tag spans dikompresi ke px-2 py-0.5 text-[9px] di mobile agar rapi */}
                    {tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag.name}
                                    className={`inline-flex items-center gap-1.5 text-[9px] sm:text-[12px] px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-md transition-all duration-300 border ${isDark
                                        ? "bg-[#13080c]/60 border-[#2a1117]/50 hover:border-red-900/40 text-slate-400 hover:text-white hover:bg-[#1a0a10]/80"
                                        : "bg-white border-slate-200 hover:border-rose-300/60 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                        }`}
                                >
                                    <span className="font-semibold tracking-wide">
                                        {tag.name}
                                    </span>
                                    <span className={`font-black text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded ${isDark ? "bg-[#ff1e56]/10 text-[#ff1e56]" : "bg-rose-50 text-[#ff1e56]"
                                        }`}>
                                        {tag.rank}%
                                    </span>
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center">
                            <div
                                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${isDark
                                    ? "bg-[#1a0a0f] border-[#2a1117]"
                                    : "bg-slate-100 border-slate-200"
                                    }`}
                            >
                                <i
                                    className={`fa-solid fa-tag text-xs ${isDark ? "text-slate-700" : "text-slate-400"
                                        }`}
                                />
                            </div>
                            <p className={`text-[10px] sm:text-xs font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                Tidak ada data tag
                            </p>
                        </div>
                    )}
                </div>

                {/* Bottom glow */}
                <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 blur-3xl rounded-full pointer-events-none ${isDark ? "bg-red-900/5" : "bg-rose-100/20"
                        }`}
                />
            </div>
        </div>
    );
}