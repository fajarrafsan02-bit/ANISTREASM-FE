// SearchMobile.jsx
import { Search, X, Loader2 } from "lucide-react";
import { useRef, useEffect } from "react";
import SearchModal from "../../SearchModal";

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

    const smoothTransition = {
        transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)"
    };

    return (
        <div
            className="relative md:hidden flex items-center justify-end outline-none"
            ref={mobileSearchRef}
            tabIndex={-1}
            style={smoothTransition}
        >
            <div
                onClick={() => {
                    if (!mobileSearchOpen) setMobileSearchOpen(true);
                }}
                /* 
                  ✅ PERBAIKAN 1: Saat ditutup, ukuran menyusut rapi ke w-7.5 h-7.5 di HP. 
                  Saat dibuka, tingginya disesuaikan ke h-8 sm:h-9 dengan padding rapat agar tipis.
                */
                className={`flex items-center rounded-full border relative overflow-hidden cursor-pointer
                    ${mobileSearchOpen
                        ? "w-full h-8 sm:h-9 px-2 sm:px-2.5 py-0.5 sm:py-1"
                        : "w-7.5 h-7.5 sm:w-9 sm:h-9 justify-center p-0"
                    }
                    ${isDark
                        ? mobileSearchOpen
                            ? "bg-zinc-950 border-zinc-800/80 focus-within:border-red-500 focus-within:shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                            : "bg-zinc-950 border-white/10 text-gray-400 hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/5 shadow-[0_0_10px_rgba(255,30,86,0.1)]"
                        : mobileSearchOpen
                            ? "bg-white border-zinc-200/80 focus-within:border-red-500 focus-within:shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                            : "bg-white border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-500/30 hover:shadow-md"
                    }`}
                style={smoothTransition}
            >
                {/* Garis Aksen */}
                <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent transition-opacity duration-300 ${mobileSearchOpen ? "opacity-100" : "opacity-0"
                    }`} />

                {/* Tombol Cari / Loader (✅ PERBAIKAN 2: Ukuran boks dikompresi menjadi w-6 h-6, ikon w-3 di HP) */}
                <button
                    onClick={(e) => {
                        if (mobileSearchOpen) {
                            e.stopPropagation();
                            onSubmit();
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

                {/* Input (✅ PERBAIKAN 3: Ukuran teks disetel ke text-[11px] pada HP agar seimbang) */}
                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => onKeyDown(e, true)}
                    placeholder="Cari..."
                    className={`bg-transparent text-[11px] sm:text-xs md:text-sm outline-none min-w-0 font-medium placeholder:text-gray-500 ${isDark ? "text-white" : "text-zinc-900"
                        }`}
                    style={{
                        ...smoothTransition,
                        width: mobileSearchOpen ? "100%" : "0px",
                        opacity: mobileSearchOpen ? 1 : 0,
                        marginLeft: mobileSearchOpen ? "6px" : "0px",
                        pointerEvents: mobileSearchOpen ? "auto" : "none",
                    }}
                />

                {/* Tombol Tutup (✅ PERBAIKAN 4: Lebar dikurangi menjadi 20px, ikon X w-3 di HP) */}
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                        e.stopPropagation();
                        onCloseMobileSearch();
                    }}
                    aria-label="Tutup pencarian"
                    className={`shrink-0 flex items-center justify-center transition-all duration-300 ${isDark ? "text-gray-600 hover:text-red-500" : "text-gray-400 hover:text-red-500"
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
                onClose={closeSearch}
                anchorRef={mobileSearchRef}
                isDark={isDark}
            />
        </div>
    );
}