// Wishlist.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Tambahkan import useNavigate
import { useTheme } from '../../context/ThemeContext'; // Sesuaikan path jika berbeda

export default function Wishlist({ wishlist = [], loading, onRemove, isExpanded, setIsExpanded }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate(); // 2. Inisialisasi hook useNavigate

    const [currentPage, setCurrentPage] = useState(1);
    const [brokenImages, setBrokenImages] = useState({});

    const collapsedLimit = 6;
    const itemsPerPage = 12;

    useEffect(() => {
        if (!isExpanded) {
            setCurrentPage(1);
        }
    }, [isExpanded]);

    const totalPages = Math.ceil(wishlist.length / itemsPerPage);

    const displayedWishlist = isExpanded
        ? wishlist.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : wishlist.slice(0, collapsedLimit);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleImageError = (id) => {
        setBrokenImages(prev => ({ ...prev, [id]: true }));
    };

    // Fungsi untuk navigasi ke halaman rincian anime berdasarkan animeId
    const handleItemClick = (animeId) => {
        if (animeId) {
            navigate(`/anime/${animeId}`);
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll halus ke atas pada halaman rincian baru
        }
    };

    // Skeleton loading state
    if (loading) {
        return (
            <section className="relative">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5 animate-pulse">
                        <div className="w-1.5 h-5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                        <div className="h-4 w-24 bg-neutral-300 dark:bg-neutral-700 rounded" />
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="relative aspect-[3/4] rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
                            <div className="mt-3 space-y-2">
                                <div className="h-3 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="relative">
            {/* Header Wishlist */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-5 bg-[#ec001d] rounded-full shadow-[0_2px_10px_rgba(236,0,29,0.4)] dark:shadow-[0_0_12px_rgba(236,0,29,0.6)]" />
                    <h2 className={`font-sora text-xs md:text-sm font-extrabold tracking-tight uppercase transition-colors duration-300 ${isDark ? "text-white" : "text-neutral-800"
                        }`}>
                        My Wishlist
                    </h2>
                </div>
                <span className="text-[10px] font-mono bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-all duration-300">
                    {wishlist.length} ITEMS
                </span>
            </div>

            {wishlist.length === 0 ? (
                /* Empty State */
                <div className={`rounded-2xl border-2 border-dashed p-12 text-center text-xs transition-all duration-300 ${isDark
                        ? "border-white/5 bg-white/[0.01] text-neutral-500"
                        : "border-neutral-200 bg-neutral-50/50 text-neutral-400"
                    }`}>
                    <span className="material-symbols-outlined text-3xl mb-2 opacity-60">bookmark_add</span>
                    <p className="font-medium">Belum ada anime di daftar wishlist Anda.</p>
                </div>
            ) : (
                <div className="relative">
                    {/* Grid Poster Anime */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
                        {displayedWishlist.map((item) => {
                            const itemId = item.animeId || item.id;
                            const imageSrc = item.poster || item.image || "";

                            return (
                                <div
                                    key={itemId}
                                    // 3. Pasang event onClick untuk masuk ke halaman detail
                                    onClick={() => handleItemClick(itemId)}
                                    className="group cursor-pointer relative"
                                >
                                    <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden border transition-all duration-500 ease-out shadow-md group-hover:-translate-y-1.5 ${isDark
                                            ? "bg-[#101012] border-white/[0.03] group-hover:border-red-500/30 group-hover:shadow-[0_12px_30px_rgba(236,0,29,0.2)]"
                                            : "bg-neutral-50 border-neutral-200/80 group-hover:border-red-500/30 group-hover:shadow-[0_12px_30px_rgba(236,0,29,0.12)]"
                                        }`}>

                                        {/* Tombol Hapus Cepat (Trash Can - stopPropagation mencegah bentrok klik detail) */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Mencegah terpicunya navigasi ke halaman rincian saat hapus
                                                onRemove(itemId);
                                            }}
                                            className="absolute top-3 left-3 bg-black/60 hover:bg-red-600 backdrop-blur-md text-white rounded-lg p-1.5 flex items-center justify-center border border-white/10 shadow-sm z-30 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                            title="Hapus dari Wishlist"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">delete</span>
                                        </button>

                                        {brokenImages[itemId] ? (
                                            <div className={`absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b ${isDark ? "from-[#141416] to-[#0c0c0d]" : "from-neutral-100 to-neutral-50"
                                                }`}>
                                                <span className="material-symbols-outlined text-neutral-500 text-2xl mb-1">broken_image</span>
                                                <span className="text-[10px] text-neutral-400 font-bold truncate w-full">{item.title}</span>
                                            </div>
                                        ) : (
                                            <img
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[1px] brightness-95 group-hover:brightness-90"
                                                src={imageSrc}
                                                loading="lazy"
                                                onError={() => handleImageError(itemId)}
                                            />
                                        )}

                                        {/* Overlay Tombol Putar */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                                            <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_rgba(236,0,29,0.5)]">
                                                <span className="material-symbols-outlined text-xl fill-current">play_arrow</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Judul Anime */}
                                    <div className="mt-3 px-1">
                                        <h3 className={`font-sora text-xs font-bold truncate transition-colors duration-200 ${isDark ? "text-neutral-300 group-hover:text-[#ec001d]" : "text-neutral-800 group-hover:text-red-600"
                                            }`}>
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Gradient Fade-Out saat di-Collapse */}
                    {!isExpanded && wishlist.length > collapsedLimit && (
                        <div className={`absolute bottom-0 left-0 w-full h-16 pointer-events-none transition-all duration-500 bg-gradient-to-t ${isDark ? "from-[#070707] to-transparent" : "from-[#fafafa] to-transparent"
                            }`} />
                    )}
                </div>
            )}

            {/* Pagination Controls */}
            {wishlist.length > collapsedLimit && (
                <div className="mt-6">
                    {!isExpanded ? (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className={`w-full py-2.5 border rounded-2xl text-[10px] font-mono font-bold tracking-wider transition-all duration-300 uppercase flex items-center justify-center gap-1 cursor-pointer ${isDark
                                    ? "border-white/5 hover:border-[#ec001d]/30 bg-white/[0.01] hover:bg-[#ec001d]/5 text-neutral-400 hover:text-white"
                                    : "border-neutral-200/80 hover:border-red-500/30 bg-white hover:bg-red-50 text-neutral-600 hover:text-red-600 shadow-sm"
                                }`}
                        >
                            <span className="material-symbols-outlined text-base">expand_more</span>
                            VIEW ALL ({wishlist.length - collapsedLimit} MORE)
                        </button>
                    ) : (
                        <div className={`flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t transition-colors duration-300 ${isDark ? "border-white/[0.04]" : "border-neutral-200/80"
                            }`}>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className={`py-2 px-4 border rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all duration-300 uppercase flex items-center gap-1 cursor-pointer ${isDark
                                        ? "border-white/5 hover:border-neutral-500/20 bg-white/[0.01] hover:bg-white/[0.04] text-neutral-400 hover:text-white"
                                        : "border-neutral-200/80 hover:border-neutral-400/20 bg-white hover:bg-neutral-100 text-neutral-600 hover:text-neutral-800"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xs">expand_less</span>
                                SHOW LESS
                            </button>

                            {totalPages > 1 && (
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`w-8 h-8 flex items-center justify-center rounded-xl border disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${isDark
                                                ? "border-white/5 bg-white/[0.01] hover:bg-white/[0.04] text-neutral-400 hover:text-white"
                                                : "border-neutral-200/80 bg-white hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700"
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-base">chevron_left</span>
                                    </button>

                                    {Array.from({ length: totalPages }, (_, index) => {
                                        const pageNum = index + 1;
                                        const isActive = pageNum === currentPage;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`w-8 h-8 text-[10px] font-mono font-black rounded-xl border transition-all ${isActive
                                                        ? 'bg-[#ec001d] border-[#ec001d] text-white shadow-[0_4px_12px_rgba(236,0,29,0.3)]'
                                                        : isDark
                                                            ? 'border-white/5 bg-white/[0.01] text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                                                            : 'border-neutral-200/80 bg-white text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`w-8 h-8 flex items-center justify-center rounded-xl border disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${isDark
                                                ? "border-white/5 bg-white/[0.01] hover:bg-white/[0.04] text-neutral-400 hover:text-white"
                                                : "border-neutral-200/80 bg-white hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700"
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-base">chevron_right</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}