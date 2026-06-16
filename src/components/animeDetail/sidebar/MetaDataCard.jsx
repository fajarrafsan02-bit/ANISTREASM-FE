// MetadataCard.jsx
import { useTheme } from "../../../context/ThemeContext"; // sesuaikan path

export default function MetadataCard({ anime }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const metadata = [
        {
            label: 'FORMAT TIPE',
            value: anime?.format ?? 'TBA',
            icon: 'fa-solid fa-desktop',
        },
        {
            label: 'DURASI TAYANG',
            value: anime?.duration ? `${anime.duration} Menit` : 'TBA',
            icon: 'fa-solid fa-stopwatch',
        },
        {
            label: 'MUSIM RILIS',
            value: (anime?.season && anime?.seasonYear)
                ? `${anime.season} ${anime.seasonYear}`
                : 'TBA',
            icon: 'fa-regular fa-calendar-check',
        },
        {
            label: 'STUDIO ANIMASI',
            value: anime?.studios?.[0]?.name ?? 'TBA',
            icon: 'fa-solid fa-clapperboard',
        },
        {
            label: 'SUMBER CERITA',
            value: anime?.source ?? 'TBA',
            icon: 'fa-solid fa-layer-group',
        },
    ];

    return (
        /* 
          Wadah luar kompak dengan padding p-2.5 di HP untuk memaksimalkan area render lencana
        */
        <div
            className={`relative w-full max-w-full rounded-[1rem] p-2.5 max-[320px]:p-2 sm:p-4 shadow-lg overflow-hidden group/card border transition-colors duration-300 ${isDark
                    ? "bg-[#080204] border-[#1b0a0e]"
                    : "bg-white border-slate-200"
                }`}
        >
            {/* Ambient aura */}
            <div
                className={`absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 blur-[30px] sm:blur-[40px] rounded-full pointer-events-none transition-colors duration-1000 ${isDark
                        ? "bg-[#ff1e56]/[0.02] group-hover/card:bg-[#ff1e56]/5"
                        : "bg-rose-300/[0.04] group-hover/card:bg-rose-300/8"
                    }`}
            />

            {/* Header */}
            <div className="flex items-center gap-2 mb-3.5 select-none">
                <div className="flex gap-[2px] mt-[1px] shrink-0">
                    <span className="w-0.5 h-3 bg-[#ff1e56] rounded-[1px] shadow-[0_0_8px_#ff1e56]" />
                    <span
                        className={`w-0.5 h-2 rounded-[1px] mt-[4px] ${isDark ? "bg-[#ff1e56]/30" : "bg-rose-400/30"
                            }`}
                    />
                    <span
                        className={`w-0.5 h-1 rounded-[1px] mt-[8px] ${isDark ? "bg-[#1b0a0e]" : "bg-slate-300"
                            }`}
                    />
                </div>
                <h3
                    className={`font-bold text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.2em] mt-0.5 uppercase ${isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                >
                    Spesifikasi Serial
                </h3>
            </div>

            {/* 
              Kumpulan baris data spesifikasi (Membentuk tumpukan kapsul vertikal yang seimbang)
            */}
            <div className="flex flex-col gap-2 relative z-10">
                {metadata.map((item) => (
                    <div
                        key={item.label}
                        /* 
                          ✅ PERBAIKAN UTAMA: Mengatur kontainer kapsul agar merapat ujung-ke-ujung (justify-between w-full),
                          dengan padding dalam yang tipis dan nyaman (px-3 py-1.5).
                        */
                        className={`group flex flex-row items-center justify-between gap-3 w-full px-3 py-1.5 sm:py-2 rounded-full border transition-all duration-300 select-none ${isDark
                                ? "bg-[#13080c]/80 border-[#1b0a0e] hover:border-[#ff1e56]/30 hover:bg-[#1a0a10]"
                                : "bg-slate-50 border-slate-200 hover:border-rose-300 hover:bg-slate-100 shadow-sm"
                            }`}
                    >
                        {/* ── UJUNG KIRI: Ikon + Label Kategori ── */}
                        <div className="flex items-center gap-2 min-w-0">
                            {/* Icon (Boks ikon mungil 10px di ponsel) */}
                            <div className="flex-shrink-0 text-[#ff1e56] text-[10px] sm:text-xs">
                                <i className={item.icon} />
                            </div>

                            {/* Label teks kategori diperkecil menjadi text-[8px] dengan pembatasan lebar aman */}
                            <span
                                className={`text-[8px] sm:text-[9px] font-black tracking-wider uppercase truncate ${isDark
                                        ? "text-slate-500 group-hover:text-slate-400"
                                        : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </div>

                        {/* ── UJUNG KANAN: Titik Pemisah + Nilai Spesifikasi ── */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            {/* Pembatas Titik Tengah Aksen (Mid-dot) */}
                            <span className={`text-[8px] sm:text-[9px] font-black select-none ${isDark ? "text-[#ff1e56]/50" : "text-rose-400/60"
                                }`}>
                                •
                            </span>

                            {/* Nilai spesifikasi diletakkan merapat kanan dengan ketebalan penuh */}
                            <span
                                className={`font-black text-[8px] sm:text-[9.5px] tracking-wide uppercase transition-colors duration-300 ${isDark
                                        ? "text-slate-200 group-hover:text-white"
                                        : "text-slate-700 group-hover:text-slate-900"
                                    }`}
                            >
                                {item.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Corner frames */}
            <div
                className={`absolute top-0 left-0 w-4 h-4 border-t-[1px] border-l-[1px] rounded-tl-[1rem] pointer-events-none ${isDark ? "border-white/[0.04]" : "border-slate-300/25"
                    }`}
            />
            <div
                className={`absolute bottom-0 right-0 w-4 h-4 border-b-[1px] border-r-[1px] rounded-br-[1rem] pointer-events-none opacity-40 ${isDark ? "border-[#ff1e56]/20" : "border-rose-400/30"
                    }`}
            />
        </div>
    );
}