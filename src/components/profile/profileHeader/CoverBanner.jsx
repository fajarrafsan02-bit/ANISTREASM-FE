// CoverBanner.jsx
import React from 'react';
import { useTheme } from '../../../context/ThemeContext'; // ✅ Mengimpor deteksi tema (sesuaikan path jika berbeda)

export default function CoverBanner({
    displayCover,
    isUploadingCover,
    coverInputRef,
    onCoverChange
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={`relative w-full h-48 sm:h-64 md:h-72 group/banner overflow-hidden border-b transition-all duration-500 ${
            isDark ? "bg-[#121214] border-white/5" : "bg-neutral-100 border-neutral-200/60"
        }`}>
            <input
                type="file"
                ref={coverInputRef}
                onChange={onCoverChange}
                accept="image/*"
                className="hidden"
            />

            {displayCover && displayCover !== "/images/clean_header_bg_perfect.png" ? (
                <>
                    <img
                        src={displayCover}
                        alt="Cover Banner"
                        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover/banner:scale-[1.02] ${isUploadingCover ? 'blur-sm brightness-50' : ''}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 group-hover/banner:opacity-100 transition-opacity duration-500" />
                </>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 transition-all duration-700 ${
                        isDark 
                            ? "bg-gradient-to-br from-[#0a0a10] via-[#12121a] to-[#050508] animate-gradientShift" 
                            : "bg-gradient-to-br from-[#f0f1f6] via-[#e4e6ee] to-[#d8dae6] animate-gradientShift"
                    }`}
                    style={{backgroundSize: '200% 200%'}} />
                    
                    <div
                        className="absolute inset-0 opacity-[0.12] transition-all duration-500"
                        style={{
                            backgroundImage: isDark
                                ? `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`
                                : `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
                            backgroundSize: "48px 48px"
                        }}
                    />

                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full blur-3xl transition-all duration-700 animate-pulse-slow ${
                        isDark ? "bg-red-500/8" : "bg-red-500/12"
                    }`} />
                    <div className={`absolute top-1/5 left-1/5 w-36 h-36 rounded-full blur-2xl transition-all duration-700 animate-float-slower ${
                        isDark ? "bg-red-900/12" : "bg-red-400/12"
                    }`} />
                    <div className={`absolute bottom-1/5 right-1/5 w-28 h-28 rounded-full blur-2xl transition-all duration-700 animate-float-slow ${
                        isDark ? "bg-red-800/12" : "bg-orange-400/12"
                    }`} />

                    <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-red-500/20 animate-float-delayed" />
                    <div className="absolute bottom-[25%] right-[15%] w-2 h-2 rounded-full bg-red-400/15 animate-float" />
                    <div className="absolute top-[40%] right-[30%] w-1 h-1 rounded-full bg-orange-400/20 animate-float-slow" />

                    <div className="relative z-10 flex flex-col items-center gap-4 select-none">
                        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 group-hover/banner:scale-110 group-hover/banner:-translate-y-1 ${
                            isDark ? "border-white/8 bg-white/[0.03] backdrop-blur-sm" : "border-black/8 bg-black/[0.02] backdrop-blur-sm"
                        }`}>
                            <span className={`material-symbols-outlined text-2xl transition-colors duration-500 ${
                                isDark ? "text-white/25" : "text-black/30"
                            }`}>
                                landscape
                            </span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-1.5">
                            <p className={`text-xs font-mono font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${
                                isDark ? "text-white/20" : "text-black/35"
                            }`}>
                                Belum Ada Sampul
                            </p>
                            <p className={`text-[10px] font-mono tracking-wider transition-colors duration-500 ${
                                isDark ? "text-white/10" : "text-black/20"
                            }`}>
                                Klik untuk menambahkan foto sampul
                            </p>
                        </div>
                    </div>

                    <div
                        className="absolute inset-0 pointer-events-none transition-all duration-500"
                        style={{
                            backgroundImage: isDark
                                ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 3px)"
                                : "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.008) 2px, rgba(0,0,0,0.008) 3px)",
                            backgroundSize: "100% 3px"
                        }}
                    />
                </div>
            )}

            <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
                isDark 
                    ? "from-[#07070a] via-[#07070a]/60 to-transparent" 
                    : "from-white via-white/50 to-transparent"
            }`} />
            
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-50`} />

            {/* Overlay Loading Upload */}
            {isUploadingCover && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-red-400 font-mono tracking-wider font-semibold">Mengunggah Sampul...</span>
                    </div>
                </div>
            )}

            <div className={`absolute top-4 right-4 z-20 transition-all duration-300 ${
                !displayCover || displayCover === "/images/clean_header_bg_perfect.png"
                    ? "opacity-100"
                    : "opacity-0 group-hover/banner:opacity-100"
            }`}>
                <button
                    onClick={() => !isUploadingCover && coverInputRef.current.click()}
                    disabled={isUploadingCover}
                    className="inline-flex items-center gap-2 bg-black/60 hover:bg-red-600/90 border border-white/10 hover:border-red-400/50 px-4 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 backdrop-blur-md cursor-pointer text-white/90 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                    <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                    {!displayCover || displayCover === "/images/clean_header_bg_perfect.png" ? "Tambah Sampul" : "Ubah Sampul"}
                </button>
            </div>
        </div>
    );
}