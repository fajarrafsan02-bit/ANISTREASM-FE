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
                <img
                    src={displayCover}
                    alt="Cover Banner"
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover/banner:scale-[1.02] ${isUploadingCover ? 'blur-sm brightness-50' : ''}`}
                />
            ) : (
                /* --- PLACEHOLDER PREMIUM SAAT BANNER KOSONG (DUAL THEME REAKTIF) --- */
                <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 transition-colors duration-500 ${
                        isDark 
                            ? "bg-gradient-to-br from-[#0d0d12] via-[#12121a] to-[#0a0a0f]" 
                            : "bg-gradient-to-br from-[#f4f5f8] via-[#e9ebf0] to-[#dfdfeb]"
                    }`} />
                    
                    {/* Kotak-kotak Grid Pola Latar Belakang */}
                    <div
                        className="absolute inset-0 opacity-100 transition-all duration-500"
                        style={{
                            backgroundImage: isDark
                                ? `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`
                                : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                            backgroundSize: "40px 40px"
                        }}
                    />

                    {/* Titik Cahaya Blur Dekoratif */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 rounded-full blur-3xl transition-colors duration-500 ${
                        isDark ? "bg-red-500/5" : "bg-red-500/10"
                    }`} />
                    <div className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl transition-colors duration-500 ${
                        isDark ? "bg-red-900/10" : "bg-red-400/10"
                    }`} />
                    <div className={`absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full blur-2xl transition-colors duration-500 ${
                        isDark ? "bg-red-800/10" : "bg-orange-400/10"
                    }`} />

                    {/* Konten Utama Placeholder */}
                    <div className="relative z-10 flex flex-col items-center gap-3 select-none">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-500 ${
                            isDark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-black/[0.01]"
                        }`}>
                            <span className={`material-symbols-outlined text-2xl transition-colors duration-500 ${
                                isDark ? "text-white/20" : "text-black/25"
                            }`}>
                                landscape
                            </span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-1">
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

                    {/* Scanlines Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none transition-all duration-500"
                        style={{
                            backgroundImage: isDark
                                ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 3px)"
                                : "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 3px)",
                            backgroundSize: "100% 3px"
                        }}
                    />
                </div>
            )}

            {/* 
               Efek Gradasi Bayangan Bagian Bawah:
               - Terang: Memudar mulus menjadi warna putih (from-white) untuk transisi sempurna ke header profil
               - Gelap: Memudar menjadi kehitaman [#07070a]
            */}
            <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${
                isDark 
                    ? "from-[#07070a] via-[#07070a]/50 to-black/30" 
                    : "from-white via-white/40 to-black/5"
            }`} />

            {/* Overlay Loading Upload */}
            {isUploadingCover && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-red-400 font-mono tracking-wider font-semibold">Mengunggah Sampul...</span>
                    </div>
                </div>
            )}

            {/* Tombol Kamera Tambah/Ubah Sampul */}
            <div className={`absolute top-4 right-4 z-20 transition-all duration-300 ${
                !displayCover || displayCover === "/images/clean_header_bg_perfect.png"
                    ? "opacity-100"
                    : "opacity-0 group-hover/banner:opacity-100"
            }`}>
                <button
                    onClick={() => !isUploadingCover && coverInputRef.current.click()}
                    disabled={isUploadingCover}
                    className="inline-flex items-center gap-1.5 bg-black/70 hover:bg-red-600 border border-white/10 hover:border-red-500 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 backdrop-blur-md cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                    {!displayCover || displayCover === "/images/clean_header_bg_perfect.png" ? "Tambah Sampul" : "Ubah Sampul"}
                </button>
            </div>
        </div>
    );
}