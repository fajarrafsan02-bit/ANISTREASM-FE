// StatsCard.jsx
import { useTheme } from "../../../context/ThemeContext"; // sesuaikan path

export default function StatsCard({ anime }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const allTime = anime?.rankings?.find(r => r.type === 'RATED' && r.allTime);

    const stats = [
        {
            icon: 'fa-star',
            label: 'Score Rata-rata',
            value: anime?.averageScore ? `${anime.averageScore}%` : '-',
            sub: anime?.averageScore ? `${(anime.averageScore / 10).toFixed(1)}/10` : null,
            accent: 'from-red-600 to-rose-500',
            glow: 'rgba(255,30,86,0.25)',
        },
        {
            icon: 'fa-ranking-star',
            label: 'Global Ranking',
            value: allTime ? `#${allTime.rank}` : '-',
            sub: allTime ? 'All Time' : null,
            accent: 'from-amber-500 to-orange-600',
            glow: 'rgba(245,158,11,0.2)',
        },
        {
            icon: 'fa-user-group',
            label: 'Anggota Terdaftar',
            value: anime?.popularity ? `${anime.popularity.toLocaleString('id-ID')}` : '-',
            sub: anime?.popularity ? 'Pengguna' : null,
            accent: 'from-red-500 to-pink-600',
            glow: 'rgba(236,72,153,0.2)',
        },
    ];

    return (
        <div className="relative group w-full select-none">
            {/* Ambient glow */}
            <div
                className="absolute -inset-0.5 rounded-2xl blur-md sm:blur-lg opacity-25 sm:opacity-30 group-hover:opacity-45 sm:group-hover:opacity-50 transition-opacity duration-700"
                style={{
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(255,30,86,0.25), transparent, rgba(180,20,50,0.15))'
                        : 'linear-gradient(135deg, rgba(244,63,94,0.12), transparent, rgba(180,20,50,0.08))',
                }}
            />

            {/* ✅ PERBAIKAN 1: Padding rapat ke p-2.5 di HP untuk memaksimalkan ruang lebar rendering */}
            <div
                className={`relative rounded-xl p-2.5 sm:p-4 shadow-lg sm:shadow-xl overflow-hidden border transition-colors duration-300 ${isDark
                        ? "bg-[#0d0407]/90 border-[#2a1117]/80 backdrop-blur-xl"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}
            >
                {/* Top gradient line */}
                <div
                    className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isDark ? "via-red-900/50" : "via-slate-300"
                        } to-transparent`}
                />

                {/* Corner accents (✅ PERBAIKAN 2: Siku siku dikecilkan menjadi w-3 h-3 di HP agar presisi) */}
                {[
                    "top-2 left-2 border-l border-t rounded-tl-md",
                    "top-2 right-2 border-r border-t rounded-tr-md",
                    "bottom-2 left-2 border-l border-b rounded-bl-md",
                    "bottom-2 right-2 border-r border-b rounded-br-md",
                ].map((pos, i) => (
                    <div
                        key={i}
                        className={`absolute w-3 h-3 ${pos} ${isDark ? "border-red-900/30" : "border-slate-300/60"
                            }`}
                    />
                ))}

                <div className="space-y-0">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            /* 
                              ✅ PERBAIKAN 3: Padding atas-bawah baris statistik dikompresi dari py-2.5 ke py-1.5, 
                              gap kolom disesuaikan menjadi gap-2 di HP agar ringkas dan tidak memakan tempat vertikal.
                            */
                            className={`
                                group/stat relative flex items-center gap-2 sm:gap-3.5
                                ${index > 0
                                    ? isDark
                                        ? "border-t border-[#2a1117]/50"
                                        : "border-t border-slate-200"
                                    : ""
                                }
                                py-1.5 sm:py-2.5 px-1 rounded-lg transition-all duration-300
                                ${isDark ? "hover:bg-[#1a0a0f]/60" : "hover:bg-slate-50"}
                                hover:px-2
                            `}
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 rounded-lg opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 blur-sm -z-10"
                                style={{ background: stat.glow }}
                            />

                            {/* Icon container (✅ PERBAIKAN 4: Ukuran boks dikurangi dari w-8 ke w-7.5 di ponsel) */}
                            <div className="relative flex-shrink-0">
                                <div
                                    className={`w-7.5 h-7.5 sm:w-9 sm:h-9 rounded-lg border flex items-center justify-center shadow-md transition-transform duration-300 group-hover/stat:scale-105 ${isDark
                                            ? "bg-gradient-to-br from-[#1a0a0f] to-[#0f0508] border-red-950/50"
                                            : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
                                        }`}
                                    style={{ boxShadow: `0 0 12px ${stat.glow}` }}
                                >
                                    <i className={`fa-solid ${stat.icon} text-[10px] sm:text-sm bg-gradient-to-br ${stat.accent} bg-clip-text text-transparent`} />
                                </div>
                                <div
                                    className={`absolute -inset-0.5 rounded-lg bg-gradient-to-br ${stat.accent} opacity-20 blur-sm`}
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                {/* Teks label disesuaikan menjadi text-[8px] */}
                                <div
                                    className={`text-[8px] sm:text-[10px] font-bold tracking-wider uppercase mb-0 ${isDark ? "text-red-400/70" : "text-slate-400"
                                        }`}
                                >
                                    {stat.label}
                                </div>
                                {/* Nilai statistik disetel ke text-[13px] dan lencana keterangan ke text-[8px] di mobile */}
                                <div className="flex items-baseline gap-1.5 flex-wrap leading-tight mt-0.5">
                                    <span
                                        className={`font-black text-[13px] sm:text-base tracking-tight ${isDark
                                                ? "text-white drop-shadow-[0_2px_8px_rgba(255,30,86,0.12)]"
                                                : "text-slate-800"
                                            }`}
                                    >
                                        {stat.value}
                                    </span>
                                    {stat.sub && (
                                        <span
                                            className={`text-[8px] sm:text-[10px] font-semibold px-1 py-0.5 rounded border whitespace-nowrap ${isDark
                                                    ? "text-slate-500 bg-[#1a0a0f]/80 border-red-950/30"
                                                    : "text-slate-500 bg-white border-slate-200"
                                                }`}
                                        >
                                            {stat.sub}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Arrow on hover (Tetap berfungsi secara responsif saat disentuh/di-hover) */}
                            <div className="opacity-0 group-hover/stat:opacity-100 transition-all duration-300 transform translate-x-1 group-hover/stat:translate-x-0 shrink-0">
                                <i
                                    className={`fa-solid fa-chevron-right text-[8px] sm:text-[10px] ${isDark ? "text-red-500/40" : "text-slate-400/60"
                                        }`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom glow */}
                <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-14 sm:h-16 blur-xl sm:blur-2xl rounded-full pointer-events-none ${isDark ? "bg-red-900/5" : "bg-rose-200/20"
                        }`}
                />
            </div>
        </div>
    );
}