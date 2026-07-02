import { Search, X, Loader2 } from "lucide-react";
import { useRef, useEffect } from "react";
import SearchModal from "../../SearchModal";

export default function DesktopSearch({
    isDark,
    searchQuery,
    setSearchQuery,
    isFocused,
    setIsFocused,
    localLoading,
    onSubmit,
    onDesktopSearchClick,
    onKeyDown,
    isSearchOpen,
    searchResults,
    searchError,
    openSearch,
    closeSearch,
    searchPhase
}) {
    const desktopSearchRef = useRef(null);
    const desktopInputRef = useRef(null);

    useEffect(() => {
        if (!isSearchOpen) return;

        const handleMouseDown = (e) => {
            if (desktopSearchRef.current?.contains(e.target)) return;
            setIsFocused(false);
            closeSearch();
        };

        window.addEventListener("mousedown", handleMouseDown);
        return () => window.removeEventListener("mousedown", handleMouseDown);

    }, [isSearchOpen]); // ✅ closeSearch sekarang stabil, tidak perlu di deps

    return (
        <div
            className="relative hidden md:block"
            ref={desktopSearchRef}
        >
            <div className={`flex items-center gap-3 rounded-full px-4 py-2.5 border transition-all duration-500 relative overflow-hidden
                ${isFocused
                    ? isDark
                        ? "bg-zinc-800 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        : "bg-white border-red-500 shadow-[0_0_18px_rgba(239,68,68,0.22)]"
                    : isDark
                        ? "bg-zinc-900 border-zinc-700/80"
                        : "bg-white border-gray-200"
                }`}
            >
                <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent transition-opacity duration-500 ${
                    isFocused ? "opacity-100" : "opacity-0"
                }`} />

                <button
                    onMouseDown={(e) => { if (isFocused) e.preventDefault(); }}
                    onClick={(e) => onDesktopSearchClick(e, desktopInputRef)}
                    disabled={localLoading}
                    aria-label="Cari anime"
                    className="flex items-center shrink-0 group outline-none"
                >
                    {localLoading ? (
                        <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                    ) : (
                        <Search className={`w-4 h-4 transition-colors ${
                            isFocused
                                ? "text-red-500"
                                : isDark
                                    ? "text-gray-500 hover:text-gray-300"
                                    : "text-gray-400 hover:text-gray-600"
                        }`} />
                    )}
                </button>

                <input
                    ref={desktopInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => onKeyDown(e, false)}
                    onFocus={() => {
                        setIsFocused(true);
                        openSearch();
                    }}
                    placeholder="Cari Anime..."
                    className={`bg-transparent text-sm outline-none w-32 focus:w-56 transition-all duration-500 font-medium placeholder:text-gray-500 ${
                        isDark ? "text-white" : "text-zinc-900"
                    }`}
                />

                {searchQuery && !localLoading && (
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => { setSearchQuery(""); closeSearch(); }}
                        aria-label="Hapus pencarian"
                        className={`shrink-0 transition-colors ${
                            isDark ? "text-gray-600 hover:text-red-400" : "text-gray-300 hover:text-red-500"
                        }`}
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            <SearchModal
                isOpen={isSearchOpen}
                results={searchResults}
                error={searchError}
                query={searchQuery}
                phase={searchPhase} 
                onClose={closeSearch}
                anchorRef={desktopSearchRef}
                isDark={isDark}
            />
        </div>
    );
}