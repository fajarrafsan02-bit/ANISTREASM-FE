import { useTheme } from "../../context/ThemeContext";
import HeroBannerSkeleton from "./HerobannerSkeleton";
import LoadingSpinner from "./LoadingSpinner";
import MainContentSkeleton from "./mainContent/MainContentSkeleton";
import SidebarSkeleton from "./sidebar/SidebarSkeleton";
import TabsSectionSkeleton from "./tabSection/TabSectionSkeleton";

export default function AnimeDetailSkeleton({ fullPage = false }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    if (fullPage) return <LoadingSpinner />;

    return (
        <div className={`font-sans antialiased relative overflow-x-hidden min-h-screen transition-colors duration-300 ${
            isDark ? "bg-[#070204] text-slate-100" : "bg-white text-slate-900"
        }`}>

            {/* ── Ambient Glows ── */}
            <div className={`absolute top-[250px] left-[-150px] w-[600px] h-[600px] blur-[160px] rounded-full pointer-events-none z-0 ${
                isDark ? "bg-red-600/5" : "bg-red-400/8"
            }`} />
            <div className={`absolute top-[1000px] right-[-150px] w-[700px] h-[700px] blur-[220px] rounded-full pointer-events-none z-0 ${
                isDark ? "bg-rose-600/3" : "bg-rose-400/8"
            }`} />

            {/* ── Hero ── */}
            <div className="relative z-10">
                <HeroBannerSkeleton />
            </div>

            {/* ── Main ── */}
            <main className="max-w-7xl mx-auto px-4 pb-24 -mt-28 xs:-mt-36 sm:-mt-48 md:-mt-56 lg:-mt-64 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <SidebarSkeleton />
                    <div className="lg:col-span-9 space-y-6">
                        <MainContentSkeleton />
                        <TabsSectionSkeleton />
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className={`border-t py-12 text-center transition-colors duration-300 ${
                isDark
                    ? "bg-[#030102] border-[#1a0a0d]"
                    : "bg-slate-100 border-slate-300"
            }`}>
                <div className={`mx-auto h-3 w-64 rounded da-animate-pulse mb-2 ${
                    isDark ? "bg-[#1a0a0f]" : "bg-slate-300"
                }`} />
                <div className={`mx-auto h-2 w-48 rounded da-animate-pulse ${
                    isDark ? "bg-[#1a0a0f]" : "bg-slate-200"
                }`} />
            </footer>
        </div>
    );
}