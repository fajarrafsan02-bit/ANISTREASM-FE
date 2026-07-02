// TabsSection.jsx
import { useTheme } from "../../../context/ThemeContext";
import TabButton from "./TabButton";
import CharactersTab from "./CharactersTab";
import RelationsTab from "./RelationsTab";
import CommentsTab from "../comments/CommentsTab";

const tabs = [
    { id: "characters", label: "Characters & Voice Actors" },
    { id: "relations", label: "Relations & Sequel Network" },
    { id: "comments", label: "Komentar" },
];

export default function TabsSection({ anime, activeTab, onTabChange, commentsApi }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";


    return (
        <div className="space-y-4 pt-4">
            {/*
              ✅ PERBAIKAN: Mengubah container menjadi Grid 2-kolom di HP ('grid grid-cols-2')
              dan otomatis kembali menjadi flex sejajar saat layar di atas ukuran 'sm' (desktop).
            */}
            <div
                className={`rounded-2xl grid grid-cols-2 sm:flex sm:items-center sm:justify-start gap-1 sm:gap-1.5 p-1 sm:p-1.5 w-full sm:w-fit border select-none ${isDark
                        ? "bg-[#070204] border-[#2a1117]"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}
            >
                {tabs.map((tab) => {
                    const active = activeTab === tab.id;
                    const label =
                        tab.id === "comments" ? (
                            <span className="inline-flex items-center gap-1">
                                Komentar
                                <span
                                    className={`inline-flex items-center justify-center rounded-full min-w-[14px] sm:min-w-[16px] px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[10px] leading-none font-semibold ${active
                                            ? "bg-white/20 text-white"
                                            : isDark
                                                ? "bg-white/[0.06] text-slate-400"
                                                : "bg-slate-100 text-slate-500"
                                        }`}
                                >
                                    {commentsApi.loading ? (
                                        <span className="inline-block w-2 h-2 rounded-full bg-current animate-pulse" />
                                    ) : (
                                        commentsApi.total
                                    )}
                                </span>
                            </span>
                        ) : (
                            tab.label
                        );

                    return (
                        <TabButton
                            key={tab.id}
                            active={active}
                            onClick={() => onTabChange(tab.id)}
                        >
                            {label}
                        </TabButton>
                    );
                })}
            </div>

            {activeTab === "characters" && (
                <CharactersTab characters={anime?.characters ?? []} />
            )}

            {activeTab === "relations" && (
                <RelationsTab
                    relations={anime?.relations ?? []}
                    tags={anime?.tags ?? []}
                />
            )}

            {activeTab === "comments" && (
                <CommentsTab commentsApi={commentsApi} />
            )}
        </div>
    );
}