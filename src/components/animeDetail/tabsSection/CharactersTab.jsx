// CharactersTab.jsx
import { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";

export default function CharactersTab({ characters }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [currentPage, setCurrentPage] = useState(1);

    const validChars =
        characters?.filter((c) => c.character?.name && c.seiyuu) ?? [];

    const sortedChars = [...validChars].sort((a, b) => {
        if (a.role === "MAIN" && b.role !== "MAIN") return -1;
        if (a.role !== "MAIN" && b.role === "MAIN") return 1;
        return 0;
    });

    const INITIAL_LIMIT = 6;
    const totalPages = Math.ceil(sortedChars.length / INITIAL_LIMIT);

    useEffect(() => {
        setCurrentPage(1);
    }, [characters]);

    const startIndex = (currentPage - 1) * INITIAL_LIMIT;
    const displayChars = sortedChars.slice(startIndex, startIndex + INITIAL_LIMIT);

    const mainCount = sortedChars.filter((c) => c.role === "MAIN").length;

    const getCharImage = (item) =>
        item.character?.image?.large ||
        item.character?.image?.medium ||
        item.character?.image ||
        item.character?.images?.jpg?.image_url ||
        null;

    const getSeiyuuImage = (item) =>
        item.seiyuu?.image?.large ||
        item.seiyuu?.image?.medium ||
        item.seiyuu?.image ||
        item.seiyuu?.images?.jpg?.image_url ||
        null;

    const cornerClass = `absolute w-3 h-3 sm:w-6 sm:h-6 ${isDark ? "border-red-900/25" : "border-slate-400/30"}`;

    const avatarClass = `border ${isDark ? "bg-[#1a0a0f] border-[#2a1117]" : "bg-slate-200 border-slate-300"}`;

    const fallbackClass = `absolute inset-0 flex items-center justify-center ${isDark ? "bg-[#1a0a0f]" : "bg-slate-200"}`;

    const iconColor = isDark ? "text-slate-700" : "text-slate-400";

    const labelClass = isDark
        ? "bg-[#ff1e56]/10 text-[#ff1e56] border-[#ff1e56]/20"
        : "bg-rose-50 text-rose-500 border-rose-300/50";

    // Divider pemisah tipis antara Karakter dan Seiyuu khusus mode HP
    const mobileDividerColor = isDark
        ? "from-transparent via-[#2a1117]/40 to-transparent"
        : "from-transparent via-slate-200 to-transparent";

    function PersonPanel({
        title,
        name,
        subName,
        image,
        fallbackIcon,
        align = "left",
        isMain = false,
    }) {
        return (
            <div
                className="w-full transition-all duration-300 rounded-none sm:rounded-xl p-0 sm:p-2.5 sm:border bg-transparent sm:bg-inherit border-none"
            >
                <div
                    className={`flex items-center gap-2 max-[320px]:gap-1.5 sm:gap-3 min-w-0 ${align === "right" ? "sm:flex-row-reverse sm:text-right" : ""}`}
                >
                    {/* Avatar dikecilkan dari w-10 ke w-8 di ponsel */}
                    <div
                        className={`relative w-8 h-8 sm:w-11 sm:h-11 rounded-lg overflow-hidden flex-shrink-0 transition-colors ${avatarClass}`}
                    >
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        ) : null}
                        <div
                            className={fallbackClass}
                            style={{ display: image ? "none" : "flex" }}
                        >
                            <i className={`fa-solid ${fallbackIcon} text-[10px] sm:text-xs ${iconColor}`} />
                        </div>
                    </div>

                    {/* Konten detail teks responsif rapat */}
                    <div className="min-w-0 flex-1">
                        {/* ✅ PERBAIKAN UTAMA: Mengubah baris lencana dari flex-wrap menjadi flex-row sejajar ujung-ke-ujung (justify-between w-full) */}
                        <div className="flex items-center justify-between w-full mb-0.5 sm:mb-1">
                            {/* Lencana jenis ("CHARACTER" / "SEIYUU") merapat di sebelah kiri */}
                            <span
                                className={`inline-flex items-center border text-[7px] sm:text-[9px] font-black tracking-wider uppercase px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded-md ${labelClass}`}
                            >
                                {title}
                            </span>

                            {/* Lencana status peran ("UTAMA" / "PENDUKUNG") didorong merapat di sudut sebelah kanan */}
                            <span
                                className={`text-[7px] sm:text-[9px] font-black tracking-wider uppercase ${isMain
                                    ? "text-[#ff1e56]"
                                    : isDark
                                        ? "text-slate-500"
                                        : "text-slate-400"
                                    }`}
                            >
                                {isMain ? "UTAMA" : "PENDUKUNG"}
                            </span>
                        </div>
                        <div
                            className={`font-bold text-[10px] sm:text-[13px] leading-tight truncate ${isDark ? "text-slate-200" : "text-slate-700"}`}
                        >
                            {name}
                        </div>
                        <div
                            className={`text-[8px] sm:text-[10px] mt-0.5 truncate ${isDark ? "text-slate-500" : "text-slate-400"}`}
                        >
                            {subName}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group">
            {/* Animasi akselerasi perangkat keras kustom Bezier */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideFadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(12px) scale(0.995);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-slide-fade {
                    animation: slideFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    will-change: transform, opacity;
                }
            `}} />

            {/* Ambient glow */}
            <div
                className={`absolute -inset-1 rounded-2xl blur-xl opacity-20 group-hover:opacity-35 transition-opacity duration-700 ${isDark
                    ? "bg-gradient-to-br from-red-900/30 via-transparent to-red-950/20"
                    : "bg-gradient-to-br from-rose-200/30 via-transparent to-rose-100/20"
                    }`}
            />

            {/* Kontainer Utama p-2.5 di HP */}
            <div
                className={`relative rounded-2xl p-2.5 sm:p-5 shadow-2xl backdrop-blur-xl overflow-hidden border transition-colors duration-300 ${isDark
                    ? "bg-[#0d0407]/90 border-[#2a1117]/80"
                    : "bg-slate-100 border-slate-300"
                    }`}
            >
                {/* Top gradient line */}
                <div
                    className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isDark ? "via-red-900/50" : "via-slate-400/40"
                        } to-transparent`}
                />

                {/* Corner accents */}
                <div className={`${cornerClass} top-2.5 left-2.5 sm:top-3 sm:left-3 border-l border-t rounded-tl-md`} />
                <div className={`${cornerClass} top-2.5 right-2.5 sm:top-3 sm:right-3 border-r border-t rounded-tr-md`} />
                <div className={`${cornerClass} bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 border-l border-b rounded-bl-md`} />
                <div className={`${cornerClass} bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 border-r border-b rounded-br-md`} />

                {/* Header */}
                <div className="flex items-start sm:items-center justify-between gap-1.5 sm:gap-3 mb-2.5 sm:mb-5">
                    <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                        <div
                            className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${isDark
                                ? "bg-gradient-to-br from-[#1a0a0f] to-[#0f0508] border-red-950/50 shadow-[0_0_15px_rgba(255,30,86,0.1)]"
                                : "bg-white border-slate-300 shadow-sm"
                                }`}
                        >
                            <i className="fa-solid fa-users text-[10px] sm:text-base text-[#ff1e56]" />
                        </div>
                        <div className="min-w-0">
                            <h4
                                className={`font-black text-[11px] sm:text-base tracking-tight flex items-center gap-1 sm:gap-2 ${isDark ? "text-white" : "text-slate-800"
                                    }`}
                            >
                                Karakter & Seiyuu
                                <span
                                    className={`border text-[7px] sm:text-[8px] px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded font-black ${isDark
                                        ? "bg-[#ff1e56]/10 text-[#ff1e56] border-[#ff1e56]/20"
                                        : "bg-rose-50 text-rose-500 border-rose-300/50"
                                        }`}
                                >
                                    {validChars.length}
                                </span>
                            </h4>
                            <p
                                className={`text-[8px] sm:text-[11px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"
                                    }`}
                            >
                                {mainCount} utama · {validChars.length - mainCount} pendukung
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cards Container with page transition key */}
                <div
                    key={currentPage}
                    className="grid grid-cols-1 gap-1.5 sm:gap-3.5 h-auto animate-slide-fade"
                >
                    {displayChars.map((item, index) => {
                        const charImage = getCharImage(item);
                        const seiyuuImage = getSeiyuuImage(item);
                        const isMain = item.role === "MAIN";

                        return (
                            <div
                                key={`${item.character?.id ?? item.character?.name ?? "char"}-${item.seiyuu?.id ?? item.seiyuu?.name ?? "seiyuu"}-${index}`}
                                className={`group/card relative rounded-xl p-2 sm:p-3.5 transition-all duration-300 border ${isDark
                                    ? "bg-[#13080c]/60 border-[#2a1117]/50 hover:border-red-900/40 hover:bg-[#1a0a10]/80"
                                    : "bg-white border-slate-200 hover:border-rose-300/50 hover:bg-slate-50"
                                    }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div
                                    className={`absolute inset-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r ${isDark
                                        ? "from-red-900/5 to-transparent"
                                        : "from-rose-100/30 to-transparent"
                                        }`}
                                />
                                <div className="relative flex flex-col sm:flex-row sm:items-stretch gap-1.5 sm:gap-4">
                                    <PersonPanel
                                        title="Character"
                                        name={item.character.name}
                                        subName={isMain ? "Karakter utama" : "Karakter pendukung"}
                                        image={charImage}
                                        fallbackIcon="fa-user"
                                        isMain={isMain}
                                        align="left"
                                    />

                                    {/* Line pembatas tipis elegan pada mobile (HP) */}
                                    <div className={`block sm:hidden h-px w-full bg-gradient-to-r ${mobileDividerColor} my-1`} />

                                    {/* Line pembatas putus-putus pada layar desktop */}
                                    <div className="hidden sm:flex items-center justify-center w-6 opacity-30">
                                        <div
                                            className={`w-10 border-t border-dashed ${isDark ? "border-slate-500" : "border-slate-300"
                                                }`}
                                        />
                                        <i
                                            className={`fa-solid fa-microphone text-[9px] mx-1 ${isDark ? "text-slate-500" : "text-slate-400"
                                                }`}
                                        />
                                        <div
                                            className={`w-10 border-t border-dashed ${isDark ? "border-slate-500" : "border-slate-300"
                                                }`}
                                        />
                                    </div>

                                    <PersonPanel
                                        title="Seiyuu"
                                        name={item.seiyuu.name}
                                        subName={item.seiyuu.nativeName || "Voice Actor"}
                                        image={seiyuuImage}
                                        fallbackIcon="fa-microphone"
                                        isMain={isMain}
                                        align="right"
                                    />
                                </div>
                            </div>
                        );
                    })}

                    {validChars.length === 0 && (
                        <div className="py-8 text-center">
                            <div
                                className={`w-10 h-10 mx-auto rounded-full border flex items-center justify-center mb-2 ${isDark
                                    ? "bg-[#1a0a0f] border-[#2a1117]"
                                    : "bg-slate-200 border-slate-300"
                                    }`}
                            >
                                <i className={`fa-solid fa-users-slash text-sm ${iconColor}`} />
                            </div>
                            <p className={`text-[11px] font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                Tidak ada data karakter
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination (Responsive Tanpa Teks pada Layar Mobile) */}
                {totalPages > 1 && (
                    <div
                        className={`relative z-10 flex items-center justify-between mt-3 sm:mt-6 pt-2 sm:pt-4 border-t ${isDark ? "border-[#2a1117]/50" : "border-slate-300/60"
                            }`}
                    >
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            aria-label="Halaman sebelumnya"
                            className={`group/btn inline-flex items-center justify-center gap-1.5 border font-bold rounded-lg transition-all duration-200 select-none touch-manipulation
                                min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px]
                                px-2 py-1.5 sm:px-4 sm:py-2.5
                                text-[10px] sm:text-sm
                                active:scale-95 disabled:opacity-30 disabled:pointer-events-none
                                ${isDark
                                    ? "bg-[#13080c] hover:bg-[#1a0a10] border-[#2a1117] hover:border-red-900/40 text-slate-400 hover:text-white"
                                    : "bg-white hover:bg-slate-50 border-slate-300 hover:border-rose-300/50 text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            <i className="fa-solid fa-chevron-left text-[10px] sm:text-sm" />
                            <span className="hidden sm:inline">Sebelumnya</span>
                        </button>

                        <span
                            className={`text-[10px] sm:text-sm font-mono tracking-wider select-none ${isDark ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            <span className={`font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}>{currentPage}</span>
                            <span className="mx-1">/</span>
                            <span>{totalPages}</span>
                        </span>

                        <button
                            type="button"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            aria-label="Halaman berikutnya"
                            className={`group/btn inline-flex items-center justify-center gap-1.5 border font-bold rounded-lg transition-all duration-200 select-none touch-manipulation
                                min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px]
                                px-2 py-1.5 sm:px-4 sm:py-2.5
                                text-[10px] sm:text-sm
                                active:scale-95 disabled:opacity-30 disabled:pointer-events-none
                                ${isDark
                                    ? "bg-[#13080c] hover:bg-[#1a0a10] border-[#2a1117] hover:border-red-900/40 text-slate-400 hover:text-white"
                                    : "bg-white hover:bg-slate-50 border-slate-300 hover:border-rose-300/50 text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            <span className="hidden sm:inline">Berikutnya</span>
                            <i className="fa-solid fa-chevron-right text-[10px] sm:text-sm" />
                        </button>
                    </div>
                )}

                {/* Bottom glow */}
                <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 blur-3xl rounded-full pointer-events-none ${isDark ? "bg-red-900/5" : "bg-rose-200/15"
                        }`}
                />
            </div>
        </div>
    );
}