// RecentActivity.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext'; // ✅ Mengimpor deteksi tema

export default function RecentActivity() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="flex flex-col h-full transition-colors duration-500">
            {/* Header di luar kartu - Berganti warna teks secara dinamis */}
            <div className="flex items-center gap-2.5 mb-5 flex-shrink-0">
                <div className="w-1 h-5 bg-[#ec001d] rounded-full shadow-[0_2px_10px_rgba(236,0,29,0.4)]" />
                <h2 className={`font-sora text-xs md:text-sm font-extrabold tracking-tight uppercase transition-colors duration-300 ${
                    isDark ? "text-white" : "text-neutral-800"
                }`}>
                    Recent Activity
                </h2>
            </div>
            
            {/* 
               Kartu Aktivitas:
               - Menggunakan logika isDark untuk mengubah warna latar belakang secara mutlak
            */}
            <div className={`flex-1 border rounded-3xl p-6 backdrop-blur-md flex flex-col justify-center transition-all duration-300 ${
                isDark 
                    ? "bg-white/[0.02] border-white/5 shadow-none" 
                    : "bg-gradient-to-b from-white to-neutral-50/80 border-neutral-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
            }`}>
                <div className="space-y-1">
                    
                    {/* Aktivitas 1 */}
                    <div className={`flex items-center gap-3.5 group cursor-pointer -mx-3 px-3 py-2.5 rounded-2xl transition-all duration-300 ${
                        isDark ? "hover:bg-white/[0.02]" : "hover:bg-neutral-100/50"
                    }`}>
                        {/* Bingkai foto dengan penyesuaian border tema terang & gelap */}
                        <div className={`w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border transition-all duration-300 ${
                            isDark 
                                ? "border-white/10 shadow-none group-hover:border-[#ec001d]/40" 
                                : "border-neutral-200/80 shadow-sm group-hover:border-red-500/40"
                        }`}>
                            <img
                                alt="Jujutsu Kaisen"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9-RyhkyibazP843BJbgX8Eu5dxe268gGdU1j43ykaQ-gJSKNz9Uo73YYR4b_ESzGhE2es9rSzLWBAEAe6xdzws-MREN0VijjLiNtEnrw6eyFvg_smRWhApckqWfXtVr_TcInZs6p9XUvuwIiIAeYPa56aIYsV2dVeuGUuZPtObB4HmrlfSeoVdrSPBnhRsgUJyCtYewA7dkbLCkJaJP1mjInYIJFQPAwb9H2LC4fHb2Rs95k-cfIpAaMJpiCS8umyw3jTNLNumKS2"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            {/* Teks utama disesuaikan berdasarkan variabel isDark */}
                            <p className={`text-xs font-bold transition-colors duration-200 truncate ${
                                isDark ? "text-neutral-200 group-hover:text-[#ec001d]" : "text-neutral-700 group-hover:text-[#ec001d]"
                            }`}>
                                Watched Ep. 24 of Jujutsu Kaisen
                            </p>
                            <p className={`text-[10px] font-medium font-mono tracking-wider mt-0.5 transition-colors duration-300 ${
                                isDark ? "text-neutral-500" : "text-neutral-400"
                            }`}>
                                2 hours ago
                            </p>
                        </div>
                    </div>

                    {/* Aktivitas 2 */}
                    <div className={`flex items-center gap-3.5 group cursor-pointer -mx-3 px-3 py-2.5 rounded-2xl transition-all duration-300 ${
                        isDark ? "hover:bg-white/[0.02]" : "hover:bg-neutral-100/50"
                    }`}>
                        <div className={`w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border transition-all duration-300 ${
                            isDark 
                                ? "border-white/10 shadow-none group-hover:border-[#ec001d]/40" 
                                : "border-neutral-200/80 shadow-sm group-hover:border-red-500/40"
                        }`}>
                            <img
                                alt="Naruto"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACpBEb2n7goXhY2Eb3AZEf01sl5QlFgEL_V3HOPBAo5b_6gpjYAW_Tcem52m9U7jZAi548b81mr62GNVhCE_6YFINmJvH22H2j0OzHxdi4S5Zn_cfyPPAMRAYjwK_18ATilyG5cPn6fbCBMeiTDJzvYX-x0gIqoAX5UwLz5aKU-6FNIoY84-NBAPP5CBz2jsgy86nVDcbiZHJyJlPatVlgTvI1ZOdSK66fqsPcNZ4yJIRekDVBpUk3rwJIclGNUy6dPFuqtPEvzDH-"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className={`text-xs font-bold transition-colors duration-200 truncate ${
                                isDark ? "text-neutral-200 group-hover:text-[#ec001d]" : "text-neutral-700 group-hover:text-[#ec001d]"
                            }`}>
                                Added Naruto to Favorites
                            </p>
                            <p className={`text-[10px] font-medium font-mono tracking-wider mt-0.5 transition-colors duration-300 ${
                                isDark ? "text-neutral-500" : "text-neutral-400"
                            }`}>
                                Yesterday
                            </p>
                        </div>
                    </div>

                    {/* Aktivitas 3 */}
                    <div className={`flex items-center gap-3.5 group cursor-pointer -mx-3 px-3 py-2.5 rounded-2xl transition-all duration-300 ${
                        isDark ? "hover:bg-white/[0.02]" : "hover:bg-neutral-100/50"
                    }`}>
                        <div className={`w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border transition-all duration-300 ${
                            isDark 
                                ? "border-white/10 shadow-none group-hover:border-[#ec001d]/40" 
                                : "border-neutral-200/80 shadow-sm group-hover:border-red-500/40"
                        }`}>
                            <img
                                alt="Cyberpunk"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtETzdVxgDy-r-GfUJ0Zh2NVGToYHg6YvQilrN0Juq5_DDr_GxxN6wzLDq5s4kD44rake8-LC5-kjwkS1oKqtPzCPmmbuUgTXHFh570SrtFPvSeUPDhEAjRqD2TWsYsfccSdtWp7cKbYUDrPfAHPh-p-yawViMKDmLMNRFeeoX5JEdi3BxL8qQudt9e3Jw8pmQSso-1aLEo8uis0nZB4dA8ZMx95s4DUlfFqPKLhuqDz-bkEktP6uxu1OYs-yFEQzWBzmfKufs1lh3"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className={`text-xs font-bold transition-colors duration-200 truncate ${
                                isDark ? "text-neutral-200 group-hover:text-[#ec001d]" : "text-neutral-700 group-hover:text-[#ec001d]"
                            }`}>
                                Completed Cyberpunk Edgerunners
                            </p>
                            <p className={`text-[10px] font-medium font-mono tracking-wider mt-0.5 transition-colors duration-300 ${
                                isDark ? "text-neutral-500" : "text-neutral-400"
                            }`}>
                                3 days ago
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}