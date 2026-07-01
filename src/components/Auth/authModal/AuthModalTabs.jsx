import { useTheme } from "../../../context/ThemeContext";

export default function AuthModalTabs({ activeTab, onChange }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`aml-layer-1 flex mb-6 rounded-2xl p-1.5 border transition-all duration-300 relative ${
                isDark
                    ? "bg-zinc-900/40 border-zinc-800/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
                    : "bg-zinc-100/80 border-zinc-200/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
            }`}
        >
            {/* Sliding background indicator */}
            <div
                className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border ${
                    isDark
                        ? "bg-zinc-800/90 border-zinc-700/50 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                        : "bg-white border-zinc-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                }`}
                style={{
                    transform: activeTab === "login" ? "translateX(0)" : "translateX(100%)",
                }}
            />

            {[
                { id: "login", label: "Masuk" },
                { id: "register", label: "Daftar" },
            ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onChange(tab.id)}
                        className={`flex-1 py-2.5 text-xs font-semibold tracking-wide rounded-xl transition-all duration-300 relative z-10 focus:outline-none flex items-center justify-center gap-1.5 active:scale-[0.97] ${
                            isActive
                                ? isDark
                                    ? "text-zinc-100"
                                    : "text-zinc-900"
                                : isDark
                                    ? "text-zinc-550 hover:text-zinc-300 hover:bg-zinc-800/20"
                                    : "text-zinc-500 hover:text-zinc-850 hover:bg-zinc-200/30"
                        }`}
                    >
                        {/* Dot Indicator Merah Minimalis untuk Tab Aktif */}
                        <span
                            className={`w-1.5 h-1.5 rounded-full bg-red-500 transition-all duration-500 ${
                                isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 w-0 h-0"
                            }`}
                        />
                        <span className="transition-all duration-300">
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}