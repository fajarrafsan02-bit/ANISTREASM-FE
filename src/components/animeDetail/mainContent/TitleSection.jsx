import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router"; 
import { useTheme } from "../../../context/ThemeContext";
import { useWishlist } from "../../../context/WishlistContext";

export default function TitleSection({ anime }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const location = useLocation();

    const { toggleWishlist, isWishlisted, isLoading } = useWishlist();

    const titleMain = anime?.title?.main ?? anime?.title?.romaji ?? "-";
    const titleNative = anime?.title?.native ?? "";
    const titleRomaji = anime?.title?.romaji ?? "";
    const trailerId = anime?.trailer?.id;
    const season = anime?.season;
    const year = anime?.year;

    // Pastikan animeId valid
    const animeId = anime?.id || anime?.animeId || anime?._id || anime?.malId;

    const isFavorited = animeId ? isWishlisted(animeId) : false;
    const isFavoriteLoading = animeId ? isLoading(animeId) : false;

    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");

    // Sinkronisasi URL browser ke dalam state React secara aman
    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, [location]);

    const shareText = useMemo(
        () =>
            `Yuk tonton anime ${titleMain} Sub Indo secara gratis dengan kualitas terbaik di platform kami! 🎬`,
        [titleMain]
    );

    const handleShareClick = () => {
        setIsShareOpen((prev) => !prev);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error(err);
        }
    };

    // Handler favorit dengan guard
    const handleFavoriteClick = async () => {
        if (!animeId) {
            console.warn("[TitleSection] Tidak bisa favorit: animeId tidak tersedia");
            return;
        }
        if (isFavoriteLoading) {
            console.warn("[TitleSection] Sedang loading, tunggu...");
            return;
        }

        console.log("[TitleSection] Toggle wishlist untuk:", animeId);

        await toggleWishlist({
            animeId,
            title: titleMain,
            image: anime?.image || anime?.poster || anime?.coverImage?.large || ""
        });
    };

    // Tentukan apakah tombol disabled
    const isButtonDisabled = !animeId || isFavoriteLoading;

    return (
        <div className="relative max-w-4xl w-full px-3 sm:px-0">

            {/* Accent */}
            <div className="absolute -top-4 sm:-top-6 left-3 sm:left-0 w-16 h-px bg-linear-to-r from-[#ff1e56] to-transparent" />

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-linear-to-r from-[#ff1e56] to-[#c41e3a] text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded tracking-wider uppercase shadow-[0_0_15px_rgba(255,30,86,0.25)]">
                    <span className="w-1 h-1 rounded-full bg-white/80 animate-pulse" />
                    Sub Indo
                </span>

                <span
                    className={`inline-flex items-center gap-1.5 border text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded tracking-wider uppercase ${isDark
                        ? "bg-[#13080c]/80 border-[#2a1117]/60 text-slate-400"
                        : "bg-slate-100 border-slate-300 text-slate-600"
                        }`}
                >
                    <i className="fa-solid fa-display text-[8px]" />
                    Ultra HD
                </span>

                {season && year && (
                    <span
                        className={`text-[9px] sm:text-[10px] font-medium tracking-wider uppercase ${isDark
                            ? "text-slate-600"
                            : "text-slate-400"
                            }`}
                    >
                        {season} {year}
                    </span>
                )}
            </div>

            {/* Title */}
            <h1
                className={`
                    text-[1.4rem]
                    xs:text-[1.9rem]
                    sm:text-4xl
                    md:text-5xl
                    lg:text-[3.25rem]
                    font-black
                    leading-[1.1]
                    sm:leading-[1.05]
                    tracking-tight
                    wrap-break-word
                    ${isDark ? "text-white" : "text-slate-900"}
                `}
                style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
            >
                {titleMain}
            </h1>

            {/* Subtitle */}
            <div className="flex flex-wrap items-center gap-x-2 mt-1 sm:mt-1.5 text-xs font-medium">
                {titleNative && (
                    <span
                        className={`text-[10px] sm:text-xs wrap-break-word ${isDark ? "text-slate-300" : "text-slate-600"
                            }`}
                        style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                    >
                        {titleNative}
                    </span>
                )}

                {titleRomaji &&
                    titleRomaji !== titleMain && (
                        <>
                            {titleNative && (
                                <span
                                    className={
                                        isDark
                                            ? "text-[#2a1117]"
                                            : "text-slate-300"
                                    }
                                >
                                    |
                                </span>
                            )}

                            <span
                                className={`text-[10px] sm:text-xs italic wrap-break-word ${isDark ? "text-slate-500" : "text-slate-400"
                                    }`}
                                style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                            >
                                {titleRomaji}
                            </span>
                        </>
                    )}
            </div>

            {/* Divider */}
            <div
                className={`w-10 h-px mt-3.5 sm:mt-5 mb-4 sm:mb-5 bg-linear-to-r ${isDark
                    ? "from-[#ff1e56]/60"
                    : "from-rose-400/60"
                    } to-transparent`}
            />

            {/* Actions */}
            <div className="flex flex-row items-center justify-start gap-1.5 sm:gap-3 w-full sm:w-auto select-none">

                {/* Trailer */}
                {trailerId && (
                    <a
                        href="#section-trailer"
                        className="group relative inline-flex items-center justify-center gap-1.5 h-9 sm:h-10 px-3 sm:px-5 bg-linear-to-r from-[#ff1e56] to-[#c41e3a] hover:from-[#ff336a] hover:to-[#e11d48] text-white font-bold rounded-xl text-[10px] sm:text-[12px] tracking-wide transition-all duration-300 shadow-[0_4px_15px_rgba(255,30,86,0.25)] hover:shadow-[0_0_25px_rgba(255,30,86,0.55)] hover:scale-105 active:scale-95 overflow-hidden flex-1 sm:flex-initial"
                    >
                        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10 pointer-events-none" />

                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 z-20">
                            <i className="fa-solid fa-play text-[7px] sm:text-[8px] ml-0.5" />
                        </div>

                        <span className="z-20 whitespace-nowrap">
                            <span className="hidden sm:inline">Tonton Trailer</span>
                            <span className="sm:hidden">Trailer</span>
                        </span>
                    </a>
                )}

                {/* Bookmark / Favorit */}
                <button
                    onClick={handleFavoriteClick}
                    disabled={isButtonDisabled}
                    className={`group relative inline-flex items-center justify-center gap-1.5 h-9 sm:h-10 px-3 sm:px-5 border rounded-xl text-[10px] sm:text-[12px] font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex-1 sm:flex-initial ${isButtonDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                        } ${isFavorited
                            ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.25)]"
                            : isDark
                                ? "bg-white/[0.02] border-white/10 hover:border-[#ff1e56]/40 hover:bg-[#ff1e56]/5 text-slate-300 hover:text-white"
                                : "bg-white border-slate-300 hover:border-rose-400/50 text-slate-600 hover:text-slate-900 shadow-sm"
                        }`}
                >
                    <div className="relative flex items-center justify-center shrink-0">
                        {isFavoriteLoading ? (
                            <i className="fa-solid fa-spinner animate-spin text-[#ff1e56]" />
                        ) : (
                            <i className={`${isFavorited ? "fa-solid" : "fa-regular"} fa-bookmark ${isFavorited ? "text-yellow-400" : "text-[#ff1e56]"} text-[11px] sm:text-xs`} />
                        )}
                    </div>
                    <span className="whitespace-nowrap">
                        {isFavorited ? "Tersimpan" : "Favorit"}
                    </span>
                </button>

                {/* Share */}
                <div className="relative flex-1 sm:flex-initial">
                    <button
                        onClick={handleShareClick}
                        className={`w-full group inline-flex items-center justify-center gap-1.5 h-9 sm:h-10 px-3 sm:px-5 border rounded-xl text-[10px] sm:text-[12px] font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${isDark
                            ? "bg-white/[0.02] border-white/10 hover:border-[#ff1e56]/40 hover:bg-[#ff1e56]/5 text-slate-300 hover:text-white hover:shadow-[0_0_15px_rgba(255,30,86,0.15)]"
                            : "bg-white border-slate-300 hover:border-rose-400/50 text-slate-600 hover:text-slate-900 shadow-sm"
                            }`}
                    >
                        <i className="fa-solid fa-share-nodes text-[#ff1e56] text-[11px] sm:text-xs" />
                        <span className="whitespace-nowrap">Bagikan</span>
                    </button>

                    {isShareOpen && (
                        <>
                            {/* Backdrop Penutup Click-Outside Transparan */}
                            <div 
                                onClick={() => setIsShareOpen(false)}
                                className="fixed inset-0 z-40 bg-transparent cursor-default"
                            />

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute right-0 sm:left-0 sm:right-auto mt-1.5 sm:mt-2 z-50 p-3 sm:p-4 rounded-xl border backdrop-blur-xl w-[calc(100vw-1.5rem)] max-w-[240px] sm:max-w-[320px] sm:w-[320px] ${isDark
                                    ? "bg-[#11050a]/95 border-[#2d1219]"
                                    : "bg-white border-slate-200 shadow-lg"
                                    }`}
                            >
                                <p
                                    className={`text-[10px] font-black uppercase tracking-widest mb-2.5 sm:mb-3 ${isDark
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                        }`}
                                >
                                    Bagikan Anime Ini
                                </p>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 sm:mb-4">
                                    {[
                                        {
                                            href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
                                                shareText +
                                                " " +
                                                currentUrl
                                            )}`,
                                            icon: "fa-brands fa-whatsapp",
                                            label: "WhatsApp",
                                        },
                                        {
                                            href: `https://t.me/share/url?url=${encodeURIComponent(
                                                currentUrl
                                            )}&text=${encodeURIComponent(
                                                shareText
                                            )}`,
                                            icon: "fa-brands fa-telegram",
                                            label: "Telegram",
                                        },
                                        {
                                            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                                shareText
                                            )}&url=${encodeURIComponent(currentUrl)}`,
                                            icon: "fa-brands fa-twitter",
                                            label: "X (Twitter)",
                                        },
                                        {
                                            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                                currentUrl
                                            )}`,
                                            icon: "fa-brands fa-facebook",
                                            label: "Facebook",
                                        },
                                    ].map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex flex-col items-center justify-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 border rounded-lg transition ${isDark
                                                ? "bg-[#1c0c11] border-[#2a1117]/50 text-slate-400"
                                                : "bg-slate-50 border-slate-200 text-slate-600"
                                                }`}
                                        >
                                            <i
                                                className={`${social.icon} text-base sm:text-lg`}
                                            />
                                            <span className="text-[8px] font-semibold uppercase">
                                                {social.label}
                                            </span>
                                        </a>
                                    ))}
                                </div>

                                <div
                                    className={`flex items-center gap-1.5 border rounded-lg p-1.5 pl-2 sm:pl-3 min-w-0 ${isDark
                                        ? "bg-[#180a0f] border-[#2d1219]"
                                        : "bg-slate-50 border-slate-200"
                                        }`}
                                >
                                    <span
                                        className={`flex-1 min-w-0 truncate text-[9px] sm:text-[10px] ${isDark
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                            }`}
                                    >
                                        {currentUrl}
                                    </span>

                                    <button
                                        onClick={handleCopyLink}
                                        className={`text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1.5 rounded-md transition ${isCopied
                                            ? "bg-green-100 text-green-600"
                                            : "bg-[#ff1e56] hover:bg-[#ff3c6d] text-white"
                                            }`}
                                    >
                                        {isCopied
                                            ? "Tersalin"
                                            : "Salin Link"}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}