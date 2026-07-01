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
            <input
                type="file"
                ref={avatarInputRef}
                onChange={onAvatarChange}
                accept="image/*"
                className="hidden"
            />

            <div className={`absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-red-600 via-orange-500 to-red-700 opacity-0 group-hover:opacity-25 blur-2xl transition-all duration-700 pointer-events-none scale-90 group-hover:scale-100`}></div>

            <div className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-[110px] md:h-[110px] rounded-[1.5rem] p-[3px] group hover:-translate-y-1.5 hover:scale-[1.03] transition-all duration-400 ease-out cursor-pointer active:scale-95 ${
                isDark 
                    ? "bg-[#121215] shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
                    : "bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            }`}>

                <div className={`absolute inset-0 rounded-[1.5rem] bg-gradient-to-br opacity-100 group-hover:opacity-0 transition-all duration-400 ease-out pointer-events-none z-0 ${
                    isDark 
                        ? "from-white/12 via-white/5 to-transparent" 
                        : "from-black/6 via-transparent to-transparent"
                }`}></div>

                <div className={`absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-red-500 via-orange-500 to-red-800 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none z-0 ${
                    isDark 
                        ? "shadow-[inset_0_0_20px_rgba(239,68,68,0.4)]" 
                        : "shadow-[inset_0_0_20px_rgba(239,68,68,0.25)]"
                }`}></div>

                <div
                    onClick={() => !isUploadingAvatar && avatarInputRef.current.click()}
                    className={`relative w-full h-full rounded-[1.3rem] overflow-hidden z-10 isolate shadow-inner ${
                        isDark ? "bg-[#0c0c0e]" : "bg-neutral-100 ring-1 ring-black/5"
                    }`}
                >
                    {displayAvatar ? (
                        <img
                            alt={displayName}
                            className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${isUploadingAvatar ? 'blur-sm opacity-50 scale-105' : ''}`}
                            src={displayAvatar}
                        />
                    ) : (
                        <div className={`w-full h-full relative overflow-hidden bg-gradient-to-b ${
                            isDark ? "from-[#1a0606] to-black" : "from-rose-50 to-neutral-50"
                        }`}>
                            <div className="w-full h-full flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105">
                                <span className={`font-sora font-black text-3xl sm:text-4xl uppercase tracking-tighter pb-0.5 ${
                                    isDark ? "text-white drop-shadow-lg" : "text-red-700/80 drop-shadow-sm"
                                }`}>
                                    {getInitial()}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out gap-1 md:gap-1.5 z-20 pointer-events-none rounded-[1.3rem]">
                        <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 bg-white/15 backdrop-blur-md rounded-full border border-white/20 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-lg">
                            <span className="material-symbols-outlined text-white text-sm md:text-base drop-shadow-md">
                                photo_camera
                            </span>
                        </div>
                        <span className="text-[9px] md:text-[10px] text-white/90 font-extrabold uppercase tracking-[0.15em] font-mono transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                            GANTI FOTO
                        </span>
                    </div>

                    {isUploadingAvatar && (
                        <div className={`absolute inset-0 flex items-center justify-center z-30 backdrop-blur-sm rounded-[1.3rem] ${
                            isDark ? "bg-black/80" : "bg-white/70"
                        }`}>
                            <div className="relative flex items-center justify-center">
                                <div className={`absolute w-8 h-8 md:w-10 md:h-10 border-2 rounded-full animate-spin ease-linear ${
                                    isDark ? "border-white/10 border-t-red-500" : "border-neutral-200 border-t-red-600"
                                }`}></div>
                                <div className="w-2 h-2 bg-red-600 dark:bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,1)] animate-pulse"></div>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 flex items-center justify-center z-30 group-hover:scale-110 transition-transform duration-300"
                    title="Online"
                >
                    <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-emerald-500/30 rounded-full animate-ping opacity-60"></div>
                    <div className={`relative w-[13px] h-[13px] md:w-[15px] md:h-[15px] rounded-full bg-emerald-500 border-[2px] md:border-[2.5px] transition-colors duration-300 ${
                        isDark 
                            ? "border-[#121215] group-hover:border-[#1a0808]" 
                            : "border-white group-hover:border-red-50 shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                    }`}>
                        <div className="absolute top-[1px] right-[1px] w-[1.5px] h-[1.5px] md:top-[1.5px] md:right-[1.5px] md:w-[2px] md:h-[2px] bg-white/80 rounded-full"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}