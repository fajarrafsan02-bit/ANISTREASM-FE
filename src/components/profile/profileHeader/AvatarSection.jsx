// AvatarSection.jsx
import React from 'react';
import { useTheme } from '../../../context/ThemeContext'; // ✅ Mengimpor deteksi tema (sesuaikan path jika berbeda)

export default function AvatarSection({
    displayAvatar,
    isUploadingAvatar,
    avatarInputRef,
    onAvatarChange,
    displayName,
    getInitial
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="relative group flex-shrink-0 z-20">
            {/* Input Tersembunyi */}
            <input
                type="file"
                ref={avatarInputRef}
                onChange={onAvatarChange}
                accept="image/*"
                className="hidden"
            />

            {/* 1. Ambient Glow Eksterior */}
            <div className="absolute -inset-1 rounded-[1.8rem] bg-gradient-to-tr from-red-600 via-orange-500 to-red-700 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 pointer-events-none"></div>

            {/* 2. Container Squircle (Support DUAL-THEME Berbasis State) */}
            <div className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-[110px] md:h-[110px] rounded-[1.5rem] p-[3px] group hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer active:scale-95 border ${
                isDark 
                    ? "bg-[#121215] shadow-xl border-transparent" 
                    : "bg-white shadow-lg border-black/5"
            }`}>

                {/* LAYERING RIM/BINGKAI SUPER SMOOTH */}
                {/* STATE DIAM: Cincin Frosted Glass / Platinum untuk terang, Black Metalik untuk gelap */}
                <div className={`absolute inset-0 rounded-[1.5rem] bg-gradient-to-br opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-out pointer-events-none z-0 ${
                    isDark 
                        ? "from-white/10 via-white/5 to-transparent" 
                        : "from-black/5 via-transparent to-transparent"
                }`}></div>

                {/* STATE HOVER: Crimson/Orange Ring universal yang selalu menawan di terang maupun gelap */}
                <div className={`absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-red-500/90 via-orange-500/90 to-red-800/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none z-0 ${
                    isDark 
                        ? "shadow-[inset_0_0_15px_rgba(239,68,68,0.3)]" 
                        : "shadow-[inset_0_0_15px_rgba(239,68,68,0.2)]"
                }`}></div>

                {/* 3. Isi Avatar Frame Inti */}
                <div
                    onClick={() => !isUploadingAvatar && avatarInputRef.current.click()}
                    className={`relative w-full h-full rounded-[1.3rem] overflow-hidden z-10 isolate mask-image-squircle shadow-inner ${
                        isDark ? "bg-[#0c0c0e] ring-0" : "bg-neutral-100 ring-1 ring-black/5"
                    }`}
                >
                    {/* Render Image Avatar ATAU Initial/Inisial Mewah */}
                    {displayAvatar ? (
                        <img
                            alt={displayName}
                            className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] ${isUploadingAvatar ? 'blur-sm opacity-50 scale-105' : ''}`}
                            src={displayAvatar}
                        />
                    ) : (
                        // Latar placeholder jika tak ada gambar: TEMA TERANG: Vanilla RoseGold, TEMA GELAP: Void Crimson Red
                        <div className={`w-full h-full relative overflow-hidden bg-gradient-to-b ${
                            isDark ? "from-[#180505] to-black" : "from-rose-50/50 to-neutral-50"
                        }`}>
                            <div className="w-full h-full flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105">
                                {/* Text warna Abjad: Crimson Dark di Mode Terang, Putih di Mode Gelap */}
                                <span className={`font-sora font-black text-3xl sm:text-4xl uppercase tracking-tighter shadow-sm pb-0.5 ${
                                    isDark ? "text-white/95 drop-shadow-md" : "text-red-700/80 drop-shadow-sm"
                                }`}>
                                    {getInitial()}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* HUD Lensa Hitam Berlapis UI Mewah Ketika Di Hover (Upload) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out inset-y-ring-putih gap-1 md:gap-1.5 z-20 pointer-events-none rounded-[1.3rem]">

                        <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                            <span className="material-symbols-outlined text-white/95 text-sm md:text-base drop-shadow-md">
                                photo_camera
                            </span>
                        </div>

                        <span className="text-[9px] md:text-[10px] text-white/95 font-extrabold uppercase tracking-[0.1em] font-mono transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300 delay-75 shadow-sm">
                            GANTI FOTO
                        </span>

                    </div>

                    {/* Loading Upload  */}
                    {isUploadingAvatar && (
                        <div className={`absolute inset-0 flex items-center justify-center z-30 backdrop-blur-sm rounded-[1.3rem] ${
                            isDark ? "bg-black/80" : "bg-white/70"
                        }`}>
                            <div className="relative flex items-center justify-center">
                                {/* Spinner (Red di light dan white/darkRed di mode gelap) */}
                                <div className={`absolute w-8 h-8 md:w-10 md:h-10 border-2 rounded-full animate-spin ease-linear ${
                                    isDark ? "border-white/10 border-t-red-500" : "border-neutral-200 border-t-red-600"
                                }`}></div>
                                <div className="w-2 h-2 bg-red-600 dark:bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,1)] animate-pulse"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. Indikator Titik Aura Status Online */}
                <div
                    className="absolute bottom-0 right-0 sm:-right-0.5 md:-right-1 md:-bottom-0.5 flex items-center justify-center z-30 group-hover:scale-105 transition-transform duration-300"
                    title="User is Online"
                >
                    <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-emerald-500/40 rounded-full animate-ping opacity-70"></div>
                    {/* BORDER MENYESUAIKAN TEMA BACKGROUND KOTAK SQUIRCLE AGAR "MENYATU / MEMOTONG BENTUK DENGAN MURNI" */}
                    <div className={`relative w-[13px] h-[13px] md:w-4 md:h-4 rounded-full bg-[#10b981] border-[2px] md:border-[2.5px] transition-colors duration-300 ${
                        isDark 
                            ? "border-[#121215] group-hover:border-[#2b1010] shadow-none" 
                            : "border-white group-hover:border-red-50 shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
                    }`}>
                        {/* Highlight lensa kilauan */}
                        <div className="absolute top-[1px] right-[1px] w-[1.5px] h-[1.5px] md:top-[1.5px] md:right-[1.5px] md:w-[1.5px] md:h-[1.5px] bg-white/80 rounded-full"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}