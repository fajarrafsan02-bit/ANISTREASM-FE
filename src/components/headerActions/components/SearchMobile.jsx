import { Search, X, Loader2 } from "lucide-react";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchModal from "../../searchModal";

export default function MobileSearch({
    isDark,
    searchQuery,
    setSearchQuery,
    localLoading,
    onSubmit,
    onKeyDown,
    onCloseMobileSearch,
    isSearchOpen,
    searchResults,
    searchError,
    closeSearch,
    openSearch,
    mobileSearchOpen,
    setMobileSearchOpen,
    searchPhase
}) {
    const mobileSearchRef = useRef(null);
    const inputRef = useRef(null);
    const location = useLocation();

    const handleSubmit = () => {
        inputRef.current?.blur();
        onSubmit();
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            inputRef.current?.blur();
        }
        onKeyDown(e, true);
    };

    // Tutup search-bar mobile & modal sekaligus (dipakai untuk ESC / klik luar / tombol X)
    const handleCloseModal = () => {
        closeSearch();
        setMobileSearchOpen(false);
    };

    // Auto-focus + buka modal saat expand
    useEffect(() => {
        if (mobileSearchOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
                openSearch(); // Buka modal — history akan muncul
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [mobileSearchOpen, openSearch]);
    useEffect(() => {
        setMobileSearchOpen(false);
    }, [location.pathname]);

    const smoothTransition = {
        transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)"
    };

    return (
        <div
            // PERBAIKAN 1: Tambahkan z-50 di sini saat terbuka agar seluruh area search berada di ATAS lapisan gelap
            className={`relative md:hidden flex items-center justify-end outline-none ${mobileSearchOpen ? "z-50" : "z-auto"
                }`}
            ref={mobileSearchRef}
            tabIndex={-1}
            style={smoothTransition}
        >
            <div
                onClick={() => {
                    if (!mobileSearchOpen) setMobileSearchOpen(true);
                }}
                className={`flex items-center rounded-full border relative overflow-hidden cursor-pointer z-100
                    ${mobileSearchOpen
                        ? "w-full h-8 sm:h-9 px-2 sm:px-2.5 py-0.5 sm:py-1"
                        : "w-7.5 h-7.5 sm:w-9 sm:h-9 justify-center p-0"
                    }   
                    ${isDark
                        ? mobileSearchOpen
                            ? "bg-zinc-900 border-zinc-700 focus-within:border-red-500 focus-within:shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                            : "bg-zinc-950 border-white/10 text-gray-400 hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/5 shadow-[0_0_10px_rgba(255,30,86,0.1)]"
                        : mobileSearchOpen
                            ? "bg-white border-zinc-300 focus-within:border-red-500 focus-within:shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                            : "bg-white border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-500/30 hover:shadow-md"
                    }`}
                style={smoothTransition}
            >
                {/* Garis Aksen */}
                <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-red-500 to-transparent transition-opacity duration-300 ${mobileSearchOpen ? "opacity-100" : "opacity-0"
                    }`} />

                {/* Tombol Cari / Loader */}
                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        if (mobileSearchOpen) {
                            e.stopPropagation();
                            handleSubmit();
                        }
                    }}
                    disabled={localLoading}
                    aria-label="Cari anime"
                    className="shrink-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-colors duration-200"
                >
                    {localLoading ? (
                        <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 animate-spin" />
                    ) : (
                        <Search className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    )}
                </button>

                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Cari..."
                    className={`bg-transparent text-[11px] sm:text-xs md:text-sm outline-none min-w-0 font-medium placeholder:text-gray-400 ${isDark ? "text-white" : "text-zinc-900"
                        }`}
                    style={{
                        ...smoothTransition,
                        width: mobileSearchOpen ? "100%" : "0px",
                        opacity: mobileSearchOpen ? 1 : 0,
                        marginLeft: mobileSearchOpen ? "6px" : "0px",
                        pointerEvents: mobileSearchOpen ? "auto" : "none",
                    }}
                />

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        onCloseMobileSearch();
                    }}
                    aria-label="Tutup pencarian"
                    className={`shrink-0 flex items-center justify-center transition-all duration-300 ${isDark ? "text-gray-400 hover:text-red-500" : "text-gray-400 hover:text-red-500"
                        }`}
                    style={{
                        ...smoothTransition,
                        width: mobileSearchOpen ? "20px" : "0px",
                        height: mobileSearchOpen ? "20px" : "0px",
                        opacity: mobileSearchOpen ? 1 : 0,
                        transform: mobileSearchOpen ? "scale(1)" : "scale(0.5)",
                        pointerEvents: mobileSearchOpen ? "auto" : "none",
                    }}
                >
                    <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
            </div>

            <SearchModal
                isOpen={isSearchOpen}
                results={searchResults}
                error={searchError}
                phase={searchPhase}
                query={searchQuery}
                onClose={handleCloseModal}
                anchorRef={mobileSearchRef}
                isDark={isDark}
            />
        </div>
    );
}