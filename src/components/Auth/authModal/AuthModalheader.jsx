import { Play } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

export default function AuthModalHeader() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="relative flex flex-col items-center pt-2 mb-6 select-none overflow-visible">
            <div className={`absolute top-0 -translate-y-12 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-40 transition-all duration-500 ${isDark ? "bg-red-500/20" : "bg-red-400/10"
                }`} />

            <div className="flex flex-col items-center gap-3 relative z-10">
                <div className={`aml-layer-3 w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                    isDark
                        ? "bg-zinc-950/80 border-zinc-800 shadow-[0_8px_20px_rgba(0,0,0,0.6)] shadow-red-950/20"
                        : "bg-white border-zinc-200/80 shadow-[0_8px_20px_rgba(0,0,0,0.06)] shadow-red-100/30"
                }`}>
                    <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-red-500 to-rose-600 flex items-center justify-center shadow-inner shadow-white/10">
                        <Play className="w-3.5 h-3.5 text-white fill-white translate-x-0.5" />
                    </div>
                </div>

                <div className="text-center space-y-1 aml-layer-1">
                    <h1 className={`text-2xl font-black tracking-[-0.03em] ${
                        isDark
                            ? "bg-clip-text text-transparent bg-linear-to-b from-zinc-50 via-zinc-100 to-zinc-400"
                            : "bg-clip-text text-transparent bg-linear-to-b from-zinc-950 to-zinc-800"
                    }`}>
                        ANI<span className="text-red-500">STREAM</span>
                    </h1>

                    <p className={`text-[9px] font-semibold tracking-[0.25em] uppercase text-center transition-colors duration-300 ${
                        isDark ? "text-zinc-500" : "text-zinc-400"
                    }`}>
                        Premium Hub
                    </p>
                </div>
            </div>
        </div>
    );
}