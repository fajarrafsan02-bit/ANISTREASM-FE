// HeaderActions.jsx
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthModalActions } from "../../context/AuthModalContext";
import { useAuth } from "../../context/AuthContext";
import useToast from "../../hooks/useToast";
import useAnimeSearch from "../../hooks/useSearchAnime";
import useBreakpoint from "../../components/headerActions/hooks/useBreakpoint";
import { getImageUrl } from "../../components/headerActions/constants";
import DesktopSearch from "../../components/headerActions/components/DesktopSearch";
import MobileSearch from "../../components/headerActions/components/SearchMobile";
import ThemeToggle from "../../components/headerActions/components/ThemeToggle";
import AuthSection from "../../components/headerActions/components/AuthSection";
import Hamburger from "../../components/headerActions/components/Hamburger";

export default function HeaderActions({
    isDark,
    theme,
    toggleTheme,
    menuOpen,
    setMenuOpen,
    setActiveTab,
    scrollToTop,
    mobileSearchOpen,
    setMobileSearchOpen,
}) {
    const { openModal } = useAuthModalActions();
    const { user, isLoggedIn, logout } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const [isFocused, setIsFocused] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);

    const {
        query: searchQuery,
        setQuery: setSearchQuery,
        results: searchResults,
        isOpen: isSearchOpen,
        phase: searchPhase,        // ganti dari loading/hasSearched
        error: searchError,
        openSearch,
        searchAnime: triggerSearch,
        closeSearch,
    } = useAnimeSearch();

    const bp = useBreakpoint();
    const isOnProfile = location.pathname === "/profile";
    const userAvatar = user?.profil?.avatar || user?.profile?.avatar || user?.avatar || null;

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Berhasil logout! Sampai jumpa lagi!", 3000);
        } catch (error) {
            toast.error("Gagal logout. Silakan coba lagi.", 3000);
        }
    };

    const handleCloseMobileSearch = () => {
        setMobileSearchOpen(false);
        setSearchQuery("");
        closeSearch();
    };

    const handleLocalSubmit = () => {
        if (!searchQuery.trim() || localLoading) return;

        if (!isLoggedIn) {
            toast.warning("Silakan masuk terlebih dahulu untuk mencari anime.", 3000);
            openModal({ mode: "login" });
            return;
        }

        // Langsung trigger — loading & delay di-handle oleh searchAnime hook
        triggerSearch(searchQuery);
    };

    const handleDesktopSearchClick = (e, inputRef) => {
        if (!isFocused) {
            e.preventDefault();
            inputRef.current?.focus();
        } else {
            handleLocalSubmit();
        }
    };

    const handleLocalKeyDown = (e, isMobile = false) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (isMobile || isFocused) {
                handleLocalSubmit();
            }
        }
    };

    return (
        /* 
          ✅ PERBAIKAN RESPONSif: Kesenjangan antar ikon di HP terkecil dikompresi ke gap-1 (4px) 
          dan bertahap membesar ke min-[360px]:gap-1.5 agar barisan menu & logo terhindar dari kepenuhan elemen.
        */
        <div className={`flex items-center gap-1 min-[360px]:gap-1.5 sm:gap-2 md:gap-3 transition-all duration-500 ${mobileSearchOpen ? "flex-1 justify-end max-w-full" : "shrink-0"
            }`}>
            <DesktopSearch
                isDark={isDark}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                localLoading={localLoading}
                onSubmit={handleLocalSubmit}
                onDesktopSearchClick={handleDesktopSearchClick}
                onKeyDown={handleLocalKeyDown}
                isSearchOpen={isSearchOpen}
                searchResults={searchResults}
                searchError={searchError}
                searchPhase={searchPhase}
                openSearch={openSearch}
                closeSearch={closeSearch}
            />

            <MobileSearch
                isDark={isDark}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                localLoading={localLoading}
                onSubmit={handleLocalSubmit}
                onKeyDown={handleLocalKeyDown}
                onCloseMobileSearch={handleCloseMobileSearch}
                isSearchOpen={isSearchOpen}
                searchResults={searchResults}
                searchError={searchError}
                closeSearch={closeSearch}
                mobileSearchOpen={mobileSearchOpen}
                openSearch={openSearch}
                searchPhase={searchPhase}
                setMobileSearchOpen={setMobileSearchOpen}
            />

            {!mobileSearchOpen && (
                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            )}

            {!mobileSearchOpen && (
                <AuthSection
                    isDark={isDark}
                    isLoggedIn={isLoggedIn}
                    user={user}
                    userAvatar={userAvatar}
                    isOnProfile={isOnProfile}
                    openModal={openModal}
                    navigate={navigate}
                    getImageUrl={getImageUrl}
                    onLogout={logout}
                />
            )}

            {!mobileSearchOpen && (
                <Hamburger isDark={isDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            )}
        </div>
    );
}