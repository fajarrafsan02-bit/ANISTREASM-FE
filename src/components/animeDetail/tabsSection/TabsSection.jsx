// TabsSection.jsx
import { useTheme } from "../../../context/ThemeContext";
import TabButton from "./TabButton";
import CharactersTab from "./CharactersTab";
import RelationsTab from "./RelationsTab";

const tabs = [
    { id: "characters", label: "Characters & Voice Actors" },
    { id: "relations", label: "Relations & Sequel Network" },
];

export default function TabsSection({ anime, activeTab, onTabChange }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    console.log("RELASI : ", anime?.relations);

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
                {tabs.map((tab) => (
                    <TabButton
                        key={tab.id}
                        active={activeTab === tab.id}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </TabButton>
                ))}
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
        </div>
    );
}