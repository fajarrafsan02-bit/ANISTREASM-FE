import { useState, useRef } from "react";
import { useTheme } from "../../../context/ThemeContext";

export default function InfoGrid({ anime }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const trailer = anime?.trailer;
    const embedUrl =
        trailer?.embedUrl ??
        (trailer?.id ? `.id}` : null);

    const thumbnail = trailer?.thumbnail;
    const synopsis = anime?.description ?? anime?.synopsis ?? "-";
    const genres = anime?.genres ?? [];
    const [trailerLoaded, setTrailerLoaded] = useState(false);
    const [translatedText, setTranslatedText] = useState(null);
    const [translating, setTranslating] = useState(false);
    const [showTranslation, setShowTranslation] = useState(false);
    const translationCache = useRef({});

    const cleanSynopsis = String(synopsis)
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const handleTranslate = async () => {
        if (showTranslation) {
            setShowTranslation(false);
            return;
        }
        if (translationCache.current[cleanSynopsis]) {
            setTranslatedText(translationCache.current[cleanSynopsis]);
            setShowTranslation(true);
            return;
        }
        setTranslating(true);
        try {
            const res = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanSynopsis.slice(0, 500))}&langpair=en|id`
            );
            const data = await res.json();
            const result = data?.responseData?.translatedText ?? cleanSynopsis;
            translationCache.current[cleanSynopsis] = result;
            setTranslatedText(result);
            setShowTranslation(true);
        } catch {
            setTranslatedText(cleanSynopsis);
            setShowTranslation(true);
        } finally {
            setTranslating(false);
        }
    };

    // Dioptimalkan dari p-4 ke p-3 pada ponsel
    const cardClass = `relative rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl backdrop-blur-xl overflow-hidden h-full flex flex-col border transition-colors duration-300 ${isDark
            ? "bg-[#0d0407]/90 border-[#2a1117]/80"
            : "bg-slate-100 border-slate-300"
        }`;

    const topLine = `absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isDark ? "via-red-900/50" : "via-slate-400/40"
        } to-transparent`;

    // Ornamen dikecilkan dari w-5 ke w-3.5 di HP
    const cornerClass = `absolute w-3.5 h-3.5 sm:w-5 sm:h-5 ${isDark ? "border-red-900/25" : "border-slate-400/30"
        }`;

    // Boks ikon dikurangi dari w-8 ke w-7 pada ponsel
    const iconBoxClass = `w-7 h-7 sm:w-9 sm:h-9 rounded-lg border flex items-center justify-center ${isDark
            ? "bg-gradient-to-br from-[#1a0a0f] to-[#0f0508] border-red-950/50 shadow-[0_0_12px_rgba(255,30,86,0.1)]"
            : "bg-white border-slate-300 shadow-sm"
        }`;

    // Font heading dioptimalkan ke text-[13px] di HP
    const headingClass = `font-black text-[13px] sm:text-base tracking-tight ${isDark ? "text-white" : "text-slate-800"
        }`;

    const subClass = `text-[9px] sm:text-[11px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"
        }`;

    return (
        <div
            id="section-trailer"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 pt-2"
        >
            {/* ── TRAILER CARD ── */}
            <div className="relative group">
                <div
                    className={`absolute -inset-1 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-35 transition-opacity duration-700 ${isDark
                            ? "bg-linear-to-br from-red-900/30 via-transparent to-red-950/20"
                            : "bg-linear-to-br from-rose-200/30 via-transparent to-rose-100/20"
                        }`}
                />

                <div className={cardClass}>
                    <div className={topLine} />

                    {/* Corner accents (Didekatkan ke pojok top-2.5 left-2.5) */}
                    <div
                        className={`${cornerClass} top-2.5 left-2.5 border-l border-t rounded-tl-sm`}
                    />
                    <div
                        className={`${cornerClass} top-2.5 right-2.5 border-r border-t rounded-tr-sm`}
                    />
                    <div
                        className={`${cornerClass} bottom-2.5 left-2.5 border-l border-b rounded-bl-sm`}
                    />
                    <div
                        className={`${cornerClass} bottom-2.5 right-2.5 border-r border-b rounded-br-sm`}
                    />

                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                        <div className={iconBoxClass}>
                            <i className="fa-brands fa-youtube text-xs sm:text-base text-[#ff1e56]" />
                        </div>
                        <div>
                            <h3 className={headingClass}>Official Trailer</h3>
                            <p className={subClass}>Preview resmi dari studio</p>
                        </div>
                    </div>

                    {/* Video container (Optimasi min-h dari 190px ke 135px agar rasionya presisi 16:9 di layar 320px) */}
                    <div
                        className={`relative w-full aspect-video min-h-[135px] sm:min-h-[240px] rounded-xl overflow-hidden border ${isDark
                                ? "bg-[#0a0305] border-[#2a1117] shadow-[0_0_20px_rgba(255,30,86,0.06)]"
                                : "bg-slate-200 border-slate-300"
                            }`}
                    >
                        {embedUrl ? (
                            <>
                                {!trailerLoaded ? (
                                    <button
                                        onClick={() => setTrailerLoaded(true)}
                                        className="w-full h-full relative group/play"
                                        type="button"
                                        aria-label="Play trailer"
                                    >
                                        {thumbnail && (
                                            <img
                                                src={thumbnail}
                                                alt="Trailer thumbnail"
                                                className={`w-full h-full object-cover transition-all duration-500 group-hover/play:scale-105 ${isDark
                                                        ? "opacity-60 group-hover/play:opacity-80"
                                                        : "opacity-75 group-hover/play:opacity-90"
                                                    }`}
                                                loading="lazy"
                                            />
                                        )}

                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="relative">
                                                <div
                                                    className="absolute inset-0 rounded-full bg-[#ff1e56]/30 animate-ping"
                                                    style={{
                                                        animationDuration: "2s",
                                                    }}
                                                />
                                                <div
                                                    className="absolute -inset-2 rounded-full bg-[#ff1e56]/10 animate-ping"
                                                    style={{
                                                        animationDuration: "2s",
                                                        animationDelay: "0.5s",
                                                    }}
                                                />
                                                {/* Tombol play dikurangi sedikit dari w-12/h-12 di mobile */}
                                                <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#ff1e56] to-[#c41e3a] flex items-center justify-center shadow-[0_0_30px_rgba(255,30,86,0.4)] group-hover/play:shadow-[0_0_40px_rgba(255,30,86,0.6)] group-hover/play:scale-110 transition-all duration-300">
                                                    <i className="fa-solid fa-play text-white text-xs sm:text-lg ml-0.5" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-2.5 sm:bottom-4 left-0 right-0 flex justify-center px-3">
                                            <span className="bg-black/60 backdrop-blur-md border border-white/5 text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
                                                Tonton Trailer
                                            </span>
                                        </div>
                                    </button>
                                ) : (
                                    <iframe
                                        className="w-full h-full"
                                        src={`${embedUrl}?autoplay=1`}
                                        title={`${anime?.title?.main ??
                                            anime?.title?.romaji ??
                                            "Anime"
                                            } Trailer`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                )}
                            </>
                        ) : (
                            <div
                                className={`w-full h-full flex flex-col items-center justify-center gap-3 px-4 ${isDark ? "text-slate-700" : "text-slate-400"
                                    }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDark
                                            ? "bg-[#1a0a0f] border-[#2a1117]"
                                            : "bg-slate-200 border-slate-300"
                                        }`}
                                >
                                    <i className="fa-solid fa-film text-xs" />
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-center">
                                    Trailer tidak tersedia
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── SYNOPSIS & GENRES CARD ── */}
            <div className="relative group">
                <div
                    className={`absolute -inset-1 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-35 transition-opacity duration-700 ${isDark
                            ? "bg-linear-to-br from-red-900/30 via-transparent to-red-950/20"
                            : "bg-linear-to-br from-rose-200/30 via-transparent to-rose-100/20"
                        }`}
                />

                <div className={cardClass}>
                    <div className={topLine} />

                    {/* Corner accents */}
                    <div
                        className={`${cornerClass} top-2.5 left-2.5 border-l border-t rounded-tl-sm`}
                    />
                    <div
                        className={`${cornerClass} top-2.5 right-2.5 border-r border-t rounded-tr-sm`}
                    />
                    <div
                        className={`${cornerClass} bottom-2.5 left-2.5 border-l border-b rounded-bl-sm`}
                    />
                    <div
                        className={`${cornerClass} bottom-2.5 right-2.5 border-r border-b rounded-br-sm`}
                    />

                    {/* Jarak vertikal dikurangi dari space-y-5 ke space-y-4 pada mobile */}
                    <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 sm:space-y-5 custom-scrollbar min-h-0">
                        {/* Synopsis */}
                        <div>
                            <div className="flex items-center gap-2 mb-2.5">
                                <div className={iconBoxClass}>
                                    <i className="fa-solid fa-book-open text-xs sm:text-base text-[#ff1e56]" />
                                </div>
                                <div className="flex-1">
                                    <h3 className={headingClass}>Sinopsis</h3>
                                    <p className={subClass}>Ikhtisar cerita</p>
                                </div>
                                <button
                                    onClick={handleTranslate}
                                    disabled={translating}
                                    className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 active:scale-95 border
                                        ${translating ? "opacity-50 pointer-events-none" : ""}
                                        ${isDark
                                            ? "bg-white/[0.04] border-white/[0.08] text-slate-400 hover:bg-[#ff1e56]/10 hover:text-[#ff1e56] hover:border-[#ff1e56]/20"
                                            : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                                        }`}
                                >
                                    {translating ? (
                                        <i className="fa-solid fa-spinner text-[10px] animate-spin" />
                                    ) : (
                                        <i className="fa-solid fa-language text-[10px]" />
                                    )}
                                    <span className="hidden xs:inline">
                                        {showTranslation ? "Asli" : "Terjemah"}
                                    </span>
                                </button>
                            </div>

                            <div className="relative">
                                <div
                                    className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-linear-to-b ${isDark
                                            ? "from-[#ff1e56]/60 via-[#ff1e56]/20 to-transparent"
                                            : "from-rose-400/60 via-rose-300/20 to-transparent"
                                        }`}
                                />
                                <p
                                    className={`text-[10px] sm:text-xs leading-relaxed sm:leading-[1.8] pl-2.5 font-light transition-opacity duration-300 ${isDark ? "text-slate-400" : "text-slate-600"
                                        }`}
                                >
                                    {showTranslation && translatedText ? translatedText : cleanSynopsis}
                                    {translating && (
                                        <span className="inline-flex gap-1 ml-1">
                                            <span className="w-1 h-1 rounded-full bg-[#ff1e56]/60 animate-bounce" style={{ animationDelay: "0s" }} />
                                            <span className="w-1 h-1 rounded-full bg-[#ff1e56]/60 animate-bounce" style={{ animationDelay: "0.15s" }} />
                                            <span className="w-1 h-1 rounded-full bg-[#ff1e56]/60 animate-bounce" style={{ animationDelay: "0.3s" }} />
                                        </span>
                                    )}
                                </p>
                                {showTranslation && translatedText && translatedText !== cleanSynopsis && (
                                    <p className={`mt-2 text-[9px] font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                        <i className="fa-solid fa-check text-[8px] mr-1" />
                                        Diterjemahkan ke Bahasa Indonesia
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Divider */}
                        <div
                            className={`h-px bg-linear-to-r ${isDark
                                    ? "from-[#2a1117]/60 via-[#2a1117]/30"
                                    : "from-slate-300/80 via-slate-200/50"
                                } to-transparent`}
                        />

                        {/* Genres */}
                        <div>
                            <div className="flex items-center gap-2 mb-2.5">
                                <div className={iconBoxClass}>
                                    <i className="fa-solid fa-tags text-xs sm:text-base text-[#ff1e56]" />
                                </div>
                                <div>
                                    <h3 className={headingClass}>Genre</h3>
                                    <p className={subClass}>{genres.length} kategori</p>
                                </div>
                            </div>

                            {/* Tombol lencana genre diperkecil ke text-[9px] px-2 py-0.5 */}
                            <div className="flex flex-wrap gap-1.5">
                                {genres.length > 0 ? (
                                    genres.map((genre) => (
                                        <span
                                            key={genre}
                                            className={`group/tag inline-flex items-center gap-1 border text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md transition-all duration-300 ${isDark
                                                    ? "bg-[#13080c]/80 border-[#2a1117]/60 hover:border-red-900/40 text-slate-400 hover:text-white hover:bg-[#1a0a10]"
                                                    : "bg-white border-slate-300 hover:border-rose-400/50 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                                                }`}
                                        >
                                            <span className="w-1 h-1 rounded-full bg-[#ff1e56]/60 group-hover/tag:bg-[#ff1e56] group-hover/tag:shadow-[0_0_6px_#ff1e56] transition-all" />
                                            {genre}
                                        </span>
                                    ))
                                ) : (
                                    <div className="py-3 text-center w-full">
                                        <p
                                            className={`text-[10px] sm:text-xs font-medium ${isDark ? "text-slate-600" : "text-slate-400"
                                                }`}
                                        >
                                            Tidak ada data genre
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom fade */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 h-6 bg-linear-to-t pointer-events-none z-10 ${isDark ? "from-[#0d0407]" : "from-slate-100"
                            } to-transparent`}
                    />
                </div>
            </div>
        </div>
    );
}