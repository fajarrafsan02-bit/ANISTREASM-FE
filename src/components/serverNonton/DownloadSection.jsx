import { useState } from "react";
import { useTheme } from "../../context/ThemeContext"; // sesuaikan path

// Helper untuk mewarnai & memberi ikon khas pada masing-masing File Host otomatis
const getHostDetails = (title = "", isDark = false) => {
    const lower = title.toLowerCase();

    if (lower.includes("drive") || lower.includes("google") || lower.includes("gdrive")) {
        return {
            color: isDark
                ? "hover:border-emerald-500/40 hover:bg-emerald-500/5 text-emerald-400"
                : "hover:border-emerald-300 hover:bg-emerald-50 text-emerald-600",
            icon: isDark ? "fa-brands fa-google-drive text-emerald-500" : "fa-brands fa-google-drive text-emerald-600",
        };
    }

    if (lower.includes("mega")) {
        return {
            color: isDark
                ? "hover:border-red-500/40 hover:bg-red-500/5 text-red-400"
                : "hover:border-red-300 hover:bg-red-50 text-red-600",
            icon: isDark ? "fa-solid fa-cloud text-red-500" : "fa-solid fa-cloud text-red-600",
        };
    }

    if (lower.includes("pixeldrain") || lower.includes("pixel")) {
        return {
            color: isDark
                ? "hover:border-cyan-500/40 hover:bg-cyan-500/5 text-cyan-400"
                : "hover:border-cyan-300 hover:bg-cyan-50 text-cyan-600",
            icon: isDark ? "fa-solid fa-server text-cyan-500" : "fa-solid fa-server text-cyan-600",
        };
    }

    if (lower.includes("mediafire")) {
        return {
            color: isDark
                ? "hover:border-blue-500/40 hover:bg-blue-500/5 text-blue-400"
                : "hover:border-blue-300 hover:bg-blue-50 text-blue-600",
            icon: isDark
                ? "fa-solid fa-fire-flame-simple text-blue-500"
                : "fa-solid fa-fire-flame-simple text-blue-600",
        };
    }

    if (lower.includes("gofile")) {
        return {
            color: isDark
                ? "hover:border-amber-500/40 hover:bg-amber-500/5 text-amber-400"
                : "hover:border-amber-300 hover:bg-amber-50 text-amber-600",
            icon: isDark
                ? "fa-solid fa-arrow-up-from-bracket text-amber-500"
                : "fa-solid fa-arrow-up-from-bracket text-amber-600",
        };
    }

    if (lower.includes("kraken") || lower.includes("krakenfiles")) {
        return {
            color: isDark
                ? "hover:border-purple-500/40 hover:bg-purple-500/5 text-purple-400"
                : "hover:border-purple-300 hover:bg-purple-50 text-purple-600",
            icon: isDark
                ? "fa-solid fa-ghost text-purple-500"
                : "fa-solid fa-ghost text-purple-600",
        };
    }

    return {
        color: isDark
            ? "hover:border-[#ff1e56]/40 hover:bg-[#ff1e56]/5 text-slate-300"
            : "hover:border-rose-300 hover:bg-rose-50 text-slate-600",
        icon: isDark
            ? "fa-solid fa-cloud-arrow-down text-[#ff1e56]"
            : "fa-solid fa-cloud-arrow-down text-rose-500",
    };
};

// Helper untuk memberikan badge warna resolusi berbeda
const getResolutionBadgeClass = (res = "", isDark = false) => {
    const lower = res.toLowerCase();

    if (
        lower.includes("1080") ||
        lower.includes("fullhd") ||
        lower.includes("fhd") ||
        lower.includes("full hd")
    ) {
        return isDark
            ? "bg-red-500/10 text-red-400 border border-red-500/20"
            : "bg-red-50 text-red-600 border border-red-200";
    }

    if (
        lower.includes("720") ||
        lower.includes("mp4hd") ||
        lower.includes("hd")
    ) {
        return isDark
            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
            : "bg-cyan-50 text-cyan-600 border border-cyan-200";
    }

    if (
        lower.includes("480") ||
        lower.includes("sd") ||
        lower.includes("standard")
    ) {
        return isDark
            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
            : "bg-amber-50 text-amber-600 border border-amber-200";
    }

    return isDark
        ? "bg-slate-500/10 text-slate-400 border border-slate-500/20"
        : "bg-slate-100 text-slate-600 border border-slate-200";
};

export default function DownloadSection({ formats }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [activeFormat, setActiveFormat] = useState(0);
    const [expandedQuality, setExpandedQuality] = useState(null);

    if (!formats || formats.length === 0) return null;

    const current = formats[activeFormat];

    const toggleQuality = (key) => {
        setExpandedQuality((prev) => (prev === key ? null : key));
    };

    const sectionClass = isDark
        ? "bg-[#110508]/85 backdrop-blur-md border border-[#2d1219]/80 shadow-2xl"
        : "bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl";

    const headerIconWrap = isDark
        ? "bg-gradient-to-br from-[#1a0a0f] to-[#0f0508] border border-red-950/50"
        : "bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm";

    const titleClass = isDark ? "text-white" : "text-slate-900";
    const subClass = isDark ? "text-slate-600" : "text-slate-500";

    return (
        <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2.5">
                    <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${headerIconWrap}`}
                    >
                        <i className="fa-solid fa-download text-xs sm:text-sm text-[#ff1e56] animate-bounce" />
                    </div>
                    <div>
                        <h3 className={`font-black text-xs sm:text-sm tracking-tight ${titleClass}`}>
                            Unduh Video
                        </h3>
                        <p className={`text-[9px] sm:text-[10px] ${subClass}`}>
                            {formats.length} format kontainer tersedia
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Container */}
            <div className={`rounded-2xl overflow-hidden ${sectionClass}`}>
                {/* Format Tabs (Dengan Spacer Webkit di Ujung Kanan) */}
                <div
                    className={`flex items-center gap-1.5 overflow-x-auto p-3 border-b scrollbar-hide after:content-[''] after:w-4 after:flex-none ${isDark
                        ? "bg-[#0a0204]/40 border-[#2d1219]/60"
                        : "bg-slate-50/80 border-slate-200"
                        }`}
                    style={{ scrollbarWidth: "none" }}
                >
                    {formats.map((fmt, i) => (
                        <button
                            key={fmt.title}
                            onClick={() => {
                                setActiveFormat(i);
                                setExpandedQuality(null);
                            }}
                            /* 
                              ✅ PERBAIKAN: Mengatur teks agar melipat ke bawah (whitespace-normal) 
                              dan membatasi lebarnya (max-w-[130px]) khusus pada ponsel, 
                              serta menjaga baris sejajar (sm:whitespace-nowrap) pada layar desktop.
                            */
                            className={`flex-none whitespace-normal sm:whitespace-nowrap text-center max-w-[130px] sm:max-w-none px-3.5 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-black tracking-wider uppercase transition-all duration-300 cursor-pointer border leading-tight ${activeFormat === i
                                ? "bg-[#ff1e56] text-white border-transparent shadow-[0_3px_8px_rgba(255,30,86,0.3)]"
                                : isDark
                                    ? "bg-[#13080c] text-slate-500 hover:text-slate-300 hover:bg-[#1a0a10] border-[#2a1117]/60"
                                    : "bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 border-slate-200"
                                }`}
                        >
                            {fmt.title}
                        </button>
                    ))}
                </div>

                {/* Quality List */}
                <div className={isDark ? "divide-y divide-[#2d1219]/40" : "divide-y divide-slate-200"}>
                    {current.qualities.map((q) => {
                        const key = `${activeFormat}-${q.title}`;
                        const isOpen = expandedQuality === key;
                        const resLabel = q.title.trim();

                        return (
                            <div key={key} className="transition-all duration-300">
                                <button
                                    onClick={() => toggleQuality(key)}
                                    className={`w-full flex items-center justify-between px-3.5 sm:px-5 py-3 transition-all duration-300 cursor-pointer text-left ${isOpen
                                        ? isDark
                                            ? "bg-[#18080c]/60"
                                            : "bg-slate-50"
                                        : isDark
                                            ? "hover:bg-[#13080c]/30"
                                            : "hover:bg-slate-50"
                                        }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <span
                                            className={`text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-md tracking-wider whitespace-nowrap ${getResolutionBadgeClass(
                                                resLabel,
                                                isDark
                                            )}`}
                                        >
                                            {resLabel}
                                        </span>
                                        <span
                                            className={`text-[9px] sm:text-[10px] font-semibold ${isDark ? "text-slate-500" : "text-slate-400"
                                                }`}
                                        >
                                            {q.urls.length} Server Penyimpanan
                                        </span>
                                    </div>

                                    <div
                                        className={`w-5 h-5 sm:w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isDark
                                            ? "bg-[#180a0e] border border-[#2d1219]"
                                            : "bg-slate-100 border border-slate-200"
                                            }`}
                                    >
                                        <i
                                            className={`fa-solid fa-chevron-down text-[8px] sm:text-[9px] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#ff1e56]" : isDark ? "text-slate-400" : "text-slate-500"
                                                }`}
                                        />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div
                                        className={`px-3.5 sm:px-5 pb-4 pt-1 ${isDark ? "bg-[#0d0407]/40" : "bg-white"
                                            }`}
                                    >
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 animate-fade-in">
                                            {q.urls.map((host) => {
                                                const hostStyle = getHostDetails(host.title, isDark);

                                                return (
                                                    <a
                                                        key={`${host.title}-${host.url}`}
                                                        href={host.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`flex items-center justify-between gap-1.5 px-2.5 py-2 rounded-xl transition-all duration-300 group border min-w-0 ${isDark
                                                            ? "bg-[#13080c] border-[#2a1117]"
                                                            : "bg-white border-slate-200 shadow-sm"
                                                            } ${hostStyle.color}`}
                                                    >
                                                        <div className="flex items-center gap-1.5 truncate min-w-0">
                                                            <i className={`${hostStyle.icon} text-[10px] sm:text-xs flex-shrink-0`} />
                                                            <span className="text-[10px] sm:text-[11px] font-bold truncate">
                                                                {host.title.trim()}
                                                            </span>
                                                        </div>
                                                        <i className="fa-solid fa-circle-arrow-down text-[10px] sm:text-[11px] opacity-40 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div
                    className={`border-t px-3.5 sm:px-5 py-2.5 flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between ${isDark
                        ? "bg-[#0c0306] border-[#2d1219]/60"
                        : "bg-slate-50 border-slate-200"
                        }`}
                >
                    <span
                        className={`text-[8px] sm:text-[9px] font-medium leading-normal ${isDark ? "text-slate-600" : "text-slate-500"
                            }`}
                    >
                        <i className="fa-solid fa-circle-info text-[#ff1e56]/60 mr-1" />
                        Tips: Gunakan ekstensi{" "}
                        <span className={isDark ? "text-slate-400 font-bold" : "text-slate-700 font-bold"}>
                            Adblocker
                        </span>{" "}
                        pada browser Anda untuk melewati sponsor luar dengan nyaman.
                    </span>
                    <span
                        className={`text-[8px] sm:text-[9px] font-mono shrink-0 ${isDark ? "text-slate-700" : "text-slate-400"
                            }`}
                    >
                        AniStream Downloader v2.1
                    </span>
                </div>
            </div>
        </div>
    );
}