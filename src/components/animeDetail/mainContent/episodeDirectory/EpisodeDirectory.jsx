import { useMemo, useState, useEffect, useRef } from "react"; // ✅ Menambahkan useRef
import { useTheme } from "../../../../context/ThemeContext"; // sesuaikan path
import RangeFilter from "./RangeFilter";
import EpisodeCard from "./EpisodeCard";

const EPISODES_PER_PAGE = 6;

// Fungsi pembantu untuk mengekstrak nomor episode secara akurat dari teks panjang
function extractEpisodeNumber(title) {
    if (!title) return 0;
    const match = title.match(/episode\s*(\d+)/i);
    if (match) {
        return parseInt(match[1], 10);
    }
    const fallbackMatch = title.match(/\d+/);
    if (fallbackMatch) {
        return parseInt(fallbackMatch[0], 10);
    }
    return 0;
}

// Logika sorting menggunakan ekstraktor angka yang baru
function sortEpisodes(episodes, order = "asc") {
    return [...episodes].sort((a, b) => {
        const numA = extractEpisodeNumber(a.title);
        const numB = extractEpisodeNumber(b.title);
        return order === "asc" ? numA - numB : numB - numA;
    });
}

// Membangun range dengan opsi pembalikan urutan jika sorting berstatus "desc"
function buildRanges(episodes, order = "desc") {
    if (!episodes.length) return [];
    const ranges = [];

    for (let i = 0; i < episodes.length; i += 50) {
        ranges.push(`${i + 1}-${Math.min(i + 50, episodes.length)}`);
    }

    if (order === "desc") {
        ranges.reverse(); // Range terbaru ditaruh paling atas (misal: "51-100" dulu baru "1-50")
    }

    return ranges;
}

// Slice dilakukan pada array bernomor urut asc agar hitungan indeks range tetap presisi
function getEpisodesForRange(episodesAsc, range) {
    const [start, end] = range.split("-").map(Number);
    return episodesAsc.slice(start - 1, end);
}

function getPaginationItems(page, totalPages) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return pages
        .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
        .reduce((acc, p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
            acc.push(p);
            return acc;
        }, []);
}

export default function EpisodeDirectory({
    episodes = [],
    poster,
    duration,
    activeRange,
    onRangeChange,
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // State sortir default diatur ke "desc" (Terbaru ke Terlama)
    const [sortOrder, setSortOrder] = useState("desc");
    const [page, setPage] = useState(1);

    // ✅ Menggunakan useRef untuk melacak render pertama dan perubahan urutan sortir
    const isFirstRender = useRef(true);
    const prevSortOrderRef = useRef(sortOrder);

    // Kumpulan seluruh episode yang selalu berurutan naik (Ascending) sebagai database dasar range
    const sortedEpisodesAsc = useMemo(() => {
        const unique = [...new Map(episodes.map((ep) => [ep.slug, ep])).values()];
        return sortEpisodes(unique, "asc");
    }, [episodes]);

    // Opsi range mengikuti urutan sortOrder aktif (Jika desc, range paling atas adalah episode tertinggi)
    const rangeOptions = useMemo(() => buildRanges(sortedEpisodesAsc, sortOrder), [sortedEpisodesAsc, sortOrder]);

    // ✅ Memaksa pemilihan range terbaru pada awal render ATAU saat tombol sortir di-klik
    useEffect(() => {
        if (rangeOptions.length > 0) {
            const hasSortOrderChanged = prevSortOrderRef.current !== sortOrder;

            // Jika ini render pertama, atau arah sortir berubah, atau range tidak valid, paksa pilih opsi pertama (terbaru)
            if (isFirstRender.current || hasSortOrderChanged || !activeRange || !rangeOptions.includes(activeRange)) {
                isFirstRender.current = false;
                prevSortOrderRef.current = sortOrder;
                onRangeChange(rangeOptions[0]); // Memilih range teratas (misalnya: "51-100" saat desc)
            }
        }
    }, [rangeOptions, activeRange, sortOrder, onRangeChange]);

    // Reset halaman ke 1 saat mengganti range atau arah pengurutan
    useEffect(() => {
        setPage(1);
    }, [activeRange, sortOrder]);

    // Filter episode berdasarkan range aktif, lalu diurutkan sesuai sortOrder
    const rangeEpisodes = useMemo(() => {
        if (!activeRange) return [];
        const sliced = getEpisodesForRange(sortedEpisodesAsc, activeRange);
        return sortEpisodes(sliced, sortOrder);
    }, [sortedEpisodesAsc, activeRange, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(rangeEpisodes.length / EPISODES_PER_PAGE));

    const currentEpisodes = useMemo(() => {
        const start = (page - 1) * EPISODES_PER_PAGE;
        return rangeEpisodes.slice(start, start + EPISODES_PER_PAGE);
    }, [rangeEpisodes, page]);

    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    // ── Shared classes ────────────────────────────────────────────────
    const borderClass = isDark ? "border-[#2a1117]" : "border-slate-300";

    const navBtnBase =
        "w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center text-[10px] sm:text-xs font-bold transition disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation";

    const navBtnIdle = isDark
        ? "border-[#2a1117] text-slate-400 hover:text-white hover:border-[#ff1e56]/50"
        : "border-slate-300 text-slate-400 hover:text-slate-700 hover:border-rose-400/50";

    const cardClass = `border p-3 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl shadow-xl space-y-4 sm:space-y-6 backdrop-blur-md transition-colors duration-300 ${isDark
        ? "bg-[#10070a]/95 border-[#2a1117]"
        : "bg-slate-100 border-slate-300 shadow-slate-200/60"
        }`;

    return (
        <div className={cardClass}>
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

            {/* Header */}
            <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b pb-3 sm:pb-4 ${borderClass}`}
            >
                <div className="space-y-0.5 sm:space-y-1">
                    <h3
                        className={`font-black text-[11px] sm:text-base uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 ${isDark ? "text-slate-100" : "text-slate-800"
                            }`}
                    >
                        <i className="fa-solid fa-folder-open text-[#ff1e56] text-[10px] sm:text-sm" />
                        Direktori Nonton Episode
                    </h3>
                    <p className={`text-[9px] sm:text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        Klik episode untuk dialihkan ke halaman pemutar video
                    </p>
                </div>

                {/* Filter & Sort Controls Container */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {/* Tombol Sortir Terbaru/Terlama */}
                    <button
                        onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                        className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg border text-[10px] sm:text-[11px] font-bold transition-all duration-300 select-none touch-manipulation ${isDark
                            ? "bg-[#13080c] border-[#2a1117]/60 text-slate-300 hover:border-[#ff1e56]/40 hover:text-white"
                            : "bg-white border-slate-300 text-slate-600 hover:border-rose-300/60 hover:text-slate-900"
                            }`}
                        title={sortOrder === "desc" ? "Urutkan Terlama (Ascending)" : "Urutkan Terbaru (Descending)"}
                    >
                        <i className={`fa-solid ${sortOrder === "desc" ? "fa-sort-amount-down" : "fa-sort-amount-up"} text-[#ff1e56] text-[10px] sm:text-xs`} />
                        <span>{sortOrder === "desc" ? "Terbaru" : "Terlama"}</span>
                    </button>

                    {rangeOptions.length > 1 && (
                        <RangeFilter
                            rangeOptions={rangeOptions}
                            activeRange={activeRange}
                            onRangeChange={onRangeChange}
                        />
                    )}
                </div>
            </div>

            {/* Episode Grid */}
            {currentEpisodes.length > 0 ? (
                <div
                    key={`${page}-${sortOrder}`}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 animate-slide-fade"
                >
                    {currentEpisodes.map((episode) => (
                        <EpisodeCard
                            key={episode.slug}
                            episode={episode}
                            poster={poster}
                            duration={duration}
                        />
                    ))}
                </div>
            ) : (
                <p
                    className={`text-center text-[11px] sm:text-sm py-8 sm:py-10 ${isDark ? "text-slate-600" : "text-slate-400"
                        }`}
                >
                    Belum ada episode tersedia
                </p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div
                    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 sm:pt-4 border-t ${borderClass}`}
                >
                    <span className={`text-[10px] sm:text-xs text-center sm:text-left ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        Hal.{" "}
                        <span className={`font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                            {page}
                        </span>
                        {" / "}
                        {totalPages}
                        <span className={`ml-1.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                            ({rangeEpisodes.length} episode)
                        </span>
                    </span>

                    <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                        {/* Prev */}
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className={`${navBtnBase} ${navBtnIdle}`}
                            aria-label="Previous page"
                        >
                            <i className="fa-solid fa-chevron-left text-[9px] sm:text-xs" />
                        </button>

                        {/* Page numbers */}
                        {getPaginationItems(page, totalPages).map((p, idx) =>
                            p === "..." ? (
                                <span
                                    key={`dot-${idx}`}
                                    className={`text-[10px] sm:text-xs px-1 select-none ${isDark ? "text-slate-600" : "text-slate-400"
                                        }`}
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`${navBtnBase} ${page === p
                                        ? "bg-[#ff1e56] border-[#ff1e56] text-white"
                                        : navBtnIdle
                                        }`}
                                    aria-label={`Page ${p}`}
                                >
                                    {p}
                                </button>
                            )
                        )}

                        {/* Next */}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className={`${navBtnBase} ${navBtnIdle}`}
                            aria-label="Next page"
                        >
                            <i className="fa-solid fa-chevron-right text-[9px] sm:text-xs" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}