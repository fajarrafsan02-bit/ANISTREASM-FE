// StatusCard.jsx
import { useTheme } from "../../../context/ThemeContext"; // sesuaikan path

const STATUS_MAP = {
    FINISHED: { color: 'green', label: 'SELESAI' },
    RELEASING: { color: 'blue', label: 'TAYANG' },
    NOT_YET_RELEASED: { color: 'yellow', label: 'BELUM TAYANG' },
    CANCELLED: { color: 'red', label: 'DIBATALKAN' },
    HIATUS: { color: 'orange', label: 'HIATUS' },
};

const COLOR_CLASS = {
    green: {
        dot: 'bg-green-500',
        badge: {
            dark: 'bg-green-950/60 border-green-500/30 text-green-400',
            light: 'bg-green-50 border-green-400/40 text-green-600',
        },
        glow: 'rgba(34,197,94,0.15)',
    },
    blue: {
        dot: 'bg-blue-500',
        badge: {
            dark: 'bg-blue-950/60 border-blue-500/30 text-blue-400',
            light: 'bg-blue-50 border-blue-400/40 text-blue-600',
        },
        glow: 'rgba(59,130,246,0.15)',
    },
    yellow: {
        dot: 'bg-yellow-500',
        badge: {
            dark: 'bg-yellow-950/60 border-yellow-500/30 text-yellow-400',
            light: 'bg-yellow-50 border-yellow-400/40 text-yellow-600',
        },
        glow: 'rgba(234,179,8,0.15)',
    },
    red: {
        dot: 'bg-red-500',
        badge: {
            dark: 'bg-red-950/60 border-red-500/30 text-red-400',
            light: 'bg-red-50 border-red-400/40 text-red-600',
        },
        glow: 'rgba(239,68,68,0.15)',
    },
    orange: {
        dot: 'bg-orange-500',
        badge: {
            dark: 'bg-orange-950/60 border-orange-500/30 text-orange-400',
            light: 'bg-orange-50 border-orange-400/40 text-orange-600',
        },
        glow: 'rgba(249,115,22,0.15)',
    },
};

export default function StatusCard({ anime }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const statusKey = anime?.status ?? 'FINISHED';
    const { color, label } = STATUS_MAP[statusKey] ?? STATUS_MAP.FINISHED;
    const cls = COLOR_CLASS[color];
    const totalEps = anime?.totalEpisodes;

    const badgeClass = isDark ? cls.badge.dark : cls.badge.light;

    return (
        <div className="relative group w-full select-none">
            {/* Ambient glow */}
            <div
                className="absolute -inset-0.5 rounded-xl blur-md sm:blur-lg opacity-25 sm:opacity-30 group-hover:opacity-45 sm:group-hover:opacity-50 transition-opacity duration-700"
                style={{
                    background: `linear-gradient(135deg, ${cls.glow}, transparent, ${isDark ? "rgba(255,30,86,0.05)" : "rgba(244,63,94,0.04)"
                        })`,
                }}
            />

            <div
                className={`relative rounded-xl p-2.5 sm:p-4 shadow-lg sm:shadow-xl overflow-hidden border transition-colors duration-300 ${isDark
                    ? "bg-[#0d0407]/90 border-[#2a1117]/80 backdrop-blur-xl"
                    : "bg-white border-slate-200 shadow-sm"
                    }`}
            >
                {/* Top gradient line */}
                <div
                    className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent ${isDark ? "via-red-900/40" : "via-slate-300"
                        } to-transparent`}
                />

                {/* Corner accents */}
                {[
                    "top-2 left-2 border-l border-t rounded-tl-sm",
                    "top-2 right-2 border-r border-t rounded-tr-sm",
                    "bottom-2 left-2 border-l border-b rounded-bl-sm",
                    "bottom-2 right-2 border-r border-b rounded-br-sm",
                ].map((pos, i) => (
                    <div
                        key={i}
                        className={`absolute w-3 h-3 sm:w-4 ${pos} ${isDark ? "border-red-900/25" : "border-slate-300/60"
                            }`}
                    />
                ))}

                <div className="flex flex-row items-center justify-between gap-3 w-full">
                    {/* Left: Status indicator (Teks & Titik Detak Tayang) */}
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                                style={{ backgroundColor: cls.glow.replace('0.15', '0.5') }}
                            />
                            <span
                                className={`relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 ${cls.dot} shadow-[0_0_8px_currentColor]`}
                            />
                        </span>
                        <span
                            className={`text-[8px] sm:text-[10px] font-bold tracking-widest uppercase truncate ${isDark ? "text-red-400/60" : "text-slate-400"
                                }`}
                        >
                            Status Penayangan
                        </span>
                    </div>

                    {/* Right: Status badge (Lencana "TAYANG" / "SELESAI") */}
                    <span
                        className={`inline-flex items-center gap-1.5 border text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md transition-all duration-300 w-fit shrink-0 ${badgeClass
                            }`}
                    >
                        <span className="whitespace-nowrap">{label}</span>
                        {totalEps && (
                            <span className="text-[8px] sm:text-[10px] font-medium opacity-70 border-l border-current/20 pl-1.5 ml-0.5 whitespace-nowrap">
                                {totalEps} EPS
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}