// MovieCatalogPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CatalogControlDeck from '../components/katalog/CatalogControlDeck';
import MovieCard from '../components/katalog/MovieCard';
import useAnimeCatalog from '../hooks/useAnimeKatalog';
import { api } from '../api/axios';

import { SkeletonCard, SkeletonIndexList } from '../skeletons/movieKatalog/CatalogSkeletons';

const TABS = [
    { key: 'popular', label: 'Populer', icon: 'fa-fire' },
    { key: 'complete', label: 'Selesai', icon: 'fa-circle-check' },
    { key: 'ongoing', label: 'Ongoing', icon: 'fa-circle-play' },
    { key: 'recent', label: 'Terbaru', icon: 'fa-clock' },
    { key: 'movies', label: 'Movies', icon: 'fa-film' },
    { key: 'all', label: 'Indeks A-Z', icon: 'fa-font' },
];

const ORDER_OPTIONS = {
    complete: [
        { value: 'latest', label: 'Terbaru' },
        { value: 'oldest', label: 'Terlama' },
        { value: 'title', label: 'A - Z' },
        { value: 'rating', label: 'Rating' },
    ],
    ongoing: [
        { value: 'popular', label: 'Terpopuler' },
        { value: 'latest', label: 'Terbaru' },
        { value: 'title', label: 'A - Z' },
    ],
};

export default function MovieCatalogPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        activeTab,
        changeTab,
        page,
        setPage,
        order,
        setOrder,
        genreId,
        changeGenre,
        data,
        pagination,
        loading,
        error,
        isRecent,
        isAll,
    } = useAnimeCatalog();

    const [genreOptions, setGenreOptions] = useState([]);

    // ── SINKRONISASI FILTER TAB DARI HOMEPAGE ──
    const tabParam = searchParams.get('tab');

    useEffect(() => {
        if (tabParam) {
            const isValidTab = TABS.some(t => t.key === tabParam);
            if (isValidTab) {
                changeTab(tabParam);
                setSearchParams({}, { replace: true });
            }
        }
    }, [tabParam, changeTab, setSearchParams]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await api.get('/anime/genres');
                setGenreOptions(res.data.data ?? []);
            } catch (err) {
                console.error('Gagal mengambil opsi genre:', err);
            }
        };
        fetchGenres();
    }, []);

    const [selectedGenre, setSelectedGenre] = useState('');
    const [activeStatus, setActiveStatus] = useState('');
    const [appliedStatus, setAppliedStatus] = useState('');

    const handleApplyFilters = () => {
        setAppliedStatus(activeStatus);
        changeGenre(selectedGenre);
    };

    const handleResetFilters = () => {
        setSelectedGenre('');
        setActiveStatus('');
        setAppliedStatus('');
        changeGenre('');
        setPage(1);
    };

    useEffect(() => {
        handleResetFilters();
    }, [activeTab]);

    const filteredData = useMemo(() => {
        let result = [...data];

        if (!isRecent && appliedStatus) {
            result = result.filter((a) => {
                const s = a.status?.toLowerCase();
                if (appliedStatus === 'Selesai') return s === 'completed' || s === 'selesai';
                if (appliedStatus === 'Berjalan') return s === 'ongoing' || s === 'berjalan';
                return true;
            });
        }

        return result;
    }, [data, appliedStatus, isRecent]);

    const handlePageChange = (p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ── LOGIKA LOADING AWAL RENDER (Mencegah Kedipan Layar Kosong) ──
    // Tetap tampilkan skeleton jika sedang loading ATAU jika data masih kosong/belum di-fetch dan belum ada error
    const showSkeleton = loading || (data.length === 0 && !error);

    const contentGridClass = isRecent
        ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
        : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';

    return (
        <div
            className={`min-h-screen transition-colors duration-500 relative overflow-hidden py-4 sm:py-6 md:py-8 ${isDark ? 'bg-[#050203]' : 'bg-[#faf8f5]'
                }`}
        >
            {/* Ambient background glows */}
            {isDark && (
                <>
                    <div className="hidden sm:block absolute top-[-150px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[#ff1e56]/4 blur-[150px] pointer-events-none" />
                    <div className="hidden sm:block absolute top-[20%] right-[-200px] w-[500px] h-[500px] rounded-full bg-[#ff1e56]/3 blur-[180px] pointer-events-none" />
                </>
            )}

            <main className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 md:px-8 flex flex-col relative z-10 min-w-0">
                {/* Header */}
                <header className="relative mb-5 sm:mb-8 md:mb-10 min-w-0">
                    <div
                        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isDark ? 'via-[#ff1e56]/30' : 'via-slate-300'
                            } to-transparent`}
                    />

                    <div className="pt-4 sm:pt-6 pb-4 sm:pb-5 border-b border-dashed relative min-w-0">
                        <div
                            className={`absolute bottom-[-1px] left-0 w-4 h-4 border-l-2 border-b-2 ${isDark ? 'border-[#ff1e56]/30' : 'border-slate-300'
                                }`}
                        />
                        <div
                            className={`absolute bottom-[-1px] right-0 w-4 h-4 border-r-2 border-b-2 ${isDark ? 'border-[#ff1e56]/30' : 'border-slate-300'
                                }`}
                        />

                        <div className="flex items-center gap-3 sm:gap-4 mb-2 min-w-0">
                            <div
                                className={`w-1 h-8 sm:w-1.5 sm:h-10 rounded-full bg-gradient-to-b shrink-0 ${isDark ? 'from-[#ff1e56] to-rose-800' : 'from-rose-50 to-rose-700'
                                    }`}
                            />
                            <div className="min-w-0">
                                <h1
                                    className={`font-black uppercase tracking-tight leading-none text-2xl sm:text-3xl md:text-5xl break-words ${isDark ? 'text-white' : 'text-slate-900'
                                        }`}
                                >
                                    ANIME CATALOG
                                </h1>
                            </div>
                        </div>

                        <p
                            className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.25em] ml-4 sm:ml-6 ${isDark ? 'text-slate-500' : 'text-slate-400'
                                }`}
                        >
                            Telusuri pustaka anime terlengkap
                        </p>
                    </div>
                </header>

                {/* Tabs */}
                <div className="mb-5 sm:mb-6 min-w-0">
                    <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2 pb-0">
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.key && !genreId;

                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => changeTab(tab.key)}
                                    className={`relative flex items-center justify-center gap-1 sm:gap-2 px-1 min-[360px]:px-1.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[8px] min-[360px]:text-[9px] min-[390px]:text-[10px] sm:text-[11px] font-black uppercase tracking-wider border transition-all duration-300 select-none overflow-hidden group/tab whitespace-nowrap text-center
                                        ${isActive
                                            ? isDark
                                                ? 'bg-gradient-to-r from-[#ff1e56] to-rose-600 border-transparent text-white shadow-[0_4px_20px_rgba(255,30,86,0.35)]'
                                                : 'bg-gradient-to-r from-slate-900 to-slate-800 border-transparent text-white shadow-lg shadow-slate-900/20'
                                            : isDark
                                                ? 'border-[#2a1117]/80 bg-[#13080c]/60 text-slate-400 hover:border-[#ff1e56]/25 hover:text-slate-200 hover:bg-[#1a0a10]'
                                                : 'border-slate-200/80 bg-white/80 text-slate-500 hover:bg-white hover:border-slate-300 hover:text-slate-700'
                                        }`}
                                >
                                    {isActive && (
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                    )}
                                    <i
                                        className={`fa-solid ${tab.icon} text-[8px] min-[360px]:text-[9px] sm:text-[10px] ${isActive ? 'text-white' : ''
                                            }`}
                                    />
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Filter deck */}
                {!isRecent && !isAll && (
                    <div className="mb-5 sm:mb-6 min-w-0 overflow-x-auto pb-1">
                        <CatalogControlDeck
                            selectedGenre={selectedGenre}
                            setSelectedGenre={setSelectedGenre}
                            activeStatus={activeStatus}
                            setActiveStatus={setActiveStatus}
                            handleResetFilters={handleResetFilters}
                            genreOptions={genreOptions}
                            statusOptions={['Selesai', 'Berjalan']}
                            onApply={handleApplyFilters}
                            order={order}
                            setOrder={setOrder}
                            orderOptions={ORDER_OPTIONS[activeTab] ?? []}
                            showOrder={(activeTab === 'complete' || activeTab === 'ongoing') && !genreId}
                            setPage={setPage}
                        />
                    </div>
                )}

                {/* Content */}
                <div className="w-full min-w-0">
                    {/* Status bar */}
                    <div
                        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6 pb-4 border-b relative ${isDark ? 'border-[#2a1117]/40' : 'border-slate-200/60'
                            }`}
                    >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <span
                                className={`font-black text-[11px] sm:text-sm uppercase tracking-wider truncate ${isDark ? 'text-white' : 'text-slate-800'
                                    }`}
                            >
                                {showSkeleton
                                    ? 'Memuat...'
                                    : `${isAll ? 'Daftar Indeks' : `${filteredData.length} Hasil`}`}
                            </span>

                            {pagination && !showSkeleton && (
                                <span
                                    className={`text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-lg border backdrop-blur-sm shrink-0 ${isDark
                                        ? 'bg-[#ff1e56]/10 text-[#ff1e56] border-[#ff1e56]/20'
                                        : 'bg-rose-50 text-rose-600 border-rose-200'
                                        }`}
                                >
                                    Hal. {pagination.currentPage} / {pagination.totalPages}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1.5 self-start sm:self-auto">
                            <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-[#2a1117]' : 'bg-slate-200'}`} />
                            <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-[#2a1117]' : 'bg-slate-200'}`} />
                            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#ff1e56]/40' : 'bg-rose-300'}`} />
                        </div>
                    </div>

                    {/* Grid Content */}
                    {!error && (
                        <>
                            {/* Hubungkan Logika Deteksi Loading Awal Render */}
                            {showSkeleton ? (
                                isAll ? (
                                    <SkeletonIndexList isDark={isDark} />
                                ) : (
                                    <div className={`grid gap-3 sm:gap-5 ${contentGridClass}`}>
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <SkeletonCard key={i} isDark={isDark} />
                                        ))}
                                    </div>
                                )
                            ) : filteredData.length > 0 ? (
                                isAll ? (
                                    <div className="space-y-5 sm:space-y-8">
                                        {filteredData.map((group, idx) => (
                                            <div
                                                key={idx}
                                                className={`relative rounded-2xl border p-3 sm:p-6 transition-all duration-300 group/section ${isDark
                                                    ? 'border-[#2a1117]/50 bg-gradient-to-br from-[#13080c]/60 to-[#0a0305]/80 hover:border-[#2a1117]'
                                                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 border-b border-dashed border-inherit min-w-0">
                                                    <span
                                                        className={`text-xl sm:text-2xl font-black shrink-0 ${isDark ? 'text-[#ff1e56]' : 'text-rose-500'
                                                            }`}
                                                    >
                                                        {group.startWith}
                                                    </span>
                                                    <div
                                                        className={`flex-1 h-px ${isDark ? 'bg-[#2a1117]' : 'bg-slate-200'
                                                            }`}
                                                    />
                                                    <span
                                                        className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0 ${isDark ? 'text-slate-600' : 'text-slate-400'
                                                            }`}
                                                    >
                                                        {group.animeList?.length} judul
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                                                    {group.animeList?.map((anime) => (
                                                        <div
                                                            key={anime.animeId}
                                                            onClick={() => navigate(`/anime/${anime.animeId}`)}
                                                            className={`group/item relative p-3 rounded-xl border text-[12px] font-bold transition-all duration-300 cursor-pointer flex items-center justify-between overflow-hidden min-w-0 ${isDark
                                                                ? 'border-[#2a1117]/60 bg-[#13080c]/40 text-slate-300 hover:border-[#ff1e56]/30 hover:text-white hover:bg-[#1a0a10]'
                                                                : 'border-slate-100 bg-slate-50/50 text-slate-600 hover:border-rose-200 hover:bg-white hover:text-slate-900'
                                                                }`}
                                                        >
                                                            <div
                                                                className={`absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 ${isDark
                                                                    ? 'bg-gradient-to-r from-[#ff1e56]/5 to-transparent'
                                                                    : 'bg-gradient-to-r from-rose-50 to-transparent'
                                                                    }`}
                                                            />

                                                            <span className="relative z-10 truncate pr-2 group-hover/item:translate-x-1 transition-transform duration-300 min-w-0">
                                                                {anime.title}
                                                            </span>
                                                            <i
                                                                className={`fa-solid fa-arrow-up-right-from-square text-[9px] opacity-0 group-hover/item:opacity-100 transition-all duration-300 relative z-10 shrink-0 ${isDark ? 'text-[#ff1e56]' : 'text-rose-500'
                                                                    }`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={`grid gap-3 sm:gap-5 ${contentGridClass}`}>
                                        {filteredData.map((anime, i) => (
                                            <MovieCard
                                                key={`${anime.animeId ?? 'card'}-${i}`}
                                                anime={anime}
                                                variant={isRecent ? 'recent' : 'default'}
                                                onClick={() => navigate(`/anime/${anime.animeId}`)}
                                            />
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div
                                    className={`relative text-center py-16 sm:py-24 px-4 rounded-2xl border border-dashed flex flex-col items-center gap-4 overflow-hidden ${isDark ? 'border-[#2a1117]/60' : 'border-slate-200'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl ${isDark ? 'bg-[#ff1e56]/5' : 'bg-rose-200/20'
                                            }`}
                                    />

                                    <div
                                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border-2 mb-2 ${isDark ? 'bg-[#13080c] border-[#2a1117]' : 'bg-slate-50 border-slate-200'
                                            }`}
                                    >
                                        <i
                                            className={`fa-solid fa-folder-open text-xl sm:text-2xl ${isDark ? 'text-[#ff1e56]/30' : 'text-rose-300'
                                                }`}
                                        />
                                    </div>
                                    <p className={`text-sm font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                        Tidak ada anime yang cocok
                                    </p>
                                    <button
                                        onClick={handleResetFilters}
                                        className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider border transition-all duration-300 ${isDark
                                            ? 'bg-[#13080c] border-[#2a1117] text-slate-300 hover:border-[#ff1e56]/30 hover:text-white'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                            }`}
                                    >
                                        Reset Filter
                                    </button>
                                </div>
                            )}

                            {/* Pagination */}
                            {pagination && pagination.totalPages > 1 && !showSkeleton && (
                                <div className="mt-8 sm:mt-12 flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
                                    <button
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={!pagination.hasPrevPage}
                                        className={`group flex items-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${isDark
                                            ? 'border-[#2a1117] bg-[#13080c] text-slate-400 hover:border-[#ff1e56]/30 hover:text-white'
                                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <i className="fa-solid fa-chevron-left text-[8px] sm:text-[9px] group-hover:-translate-x-0.5 transition-transform" />
                                        Prev
                                    </button>

                                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                                        .filter(
                                            (p) => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1
                                        )
                                        .reduce((acc, p, idx, arr) => {
                                            if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                                            acc.push(p);
                                            return acc;
                                        }, [])
                                        .map((p, idx) =>
                                            p === '...' ? (
                                                <span
                                                    key={`dot-${idx}`}
                                                    className={`px-1.5 py-1.5 text-xs font-bold ${isDark ? 'text-slate-600' : 'text-slate-400'
                                                        }`}
                                                >
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    key={p}
                                                    onClick={() => handlePageChange(p)}
                                                    className={`relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[9px] sm:text-xs font-black transition-all duration-300 border overflow-hidden min-w-8 sm:min-w-9 ${page === p
                                                        ? isDark
                                                            ? 'bg-gradient-to-r from-[#ff1e56] to-rose-600 border-transparent text-white shadow-[0_4px_15px_rgba(255,30,86,0.3)]'
                                                            : 'bg-slate-900 border-transparent text-white shadow-lg'
                                                        : isDark
                                                            ? 'border-[#2a1117] bg-[#13080c] text-slate-400 hover:border-[#ff1e56]/25 hover:text-white'
                                                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {page === p && (
                                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                                    )}
                                                    {p}
                                                </button>
                                            )
                                        )}

                                    <button
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={!pagination.hasNextPage}
                                        className={`group flex items-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${isDark
                                            ? 'border-[#2a1117] bg-[#13080c] text-slate-400 hover:border-[#ff1e56]/30 hover:text-white'
                                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        Next
                                        <i className="fa-solid fa-chevron-right text-[8px] sm:text-[9px] group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}