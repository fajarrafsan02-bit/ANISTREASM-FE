import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/animeDetail/HeroBanner';
import Sidebar from '../components/animeDetail/sidebar/Sidebar';
import MainContent from '../components/animeDetail/mainContent/MainContent';
import TabsSection from '../components/animeDetail/tabsSection/TabsSection';
import { customStyles } from '../components/animeDetail/constants/styles';
import useAnimeDetail from '../hooks/useDetailAnime';
import AnimeDetailSkeleton from '../skeletons/animeDetailsSkeleton/AnimeDetailSkeleton';
import { useTheme } from '../context/ThemeContext';

export default function AnimeDetailsPage() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [activeTab, setActiveTab] = useState('characters');
    const [activeRange, setActiveRange] = useState('1-50');

    const { anime, loading, error } = useAnimeDetail();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    if (loading || !anime) return <AnimeDetailSkeleton />;

    if (error) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center px-4 text-center text-red-400 ${isDark ? "bg-[#070204]" : "bg-white"
                    }`}
            >
                <p className="text-sm sm:text-base">{error}</p>
            </div>
        );
    }

    return (
        <div
            className={`font-sans antialiased relative overflow-x-hidden min-h-screen transition-colors duration-300 ${isDark ? "bg-[#070204] text-slate-100" : "bg-white text-slate-900"
                }`}
        >
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />

            {/* Ambient Glow */}
            {isDark && (
                <div className="absolute inset-0 dotted-bg pointer-events-none z-0" />
            )}

            <div
                className={`absolute top-[160px] sm:top-[220px] left-[-120px] sm:left-[-150px] w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] blur-[100px] sm:blur-[160px] rounded-full pointer-events-none z-0 ${isDark ? "bg-red-600/10 glow-pulse" : "bg-red-400/6"
                    }`}
            />
            <div
                className={`absolute top-[760px] sm:top-[1000px] right-[-120px] sm:right-[-150px] w-[380px] sm:w-[700px] h-[380px] sm:h-[700px] blur-[130px] sm:blur-[220px] rounded-full pointer-events-none z-0 ${isDark ? "bg-rose-600/5" : "bg-rose-400/5"
                    }`}
            />

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)} // ✅ navigate(-1) lebih natural — kembali ke halaman sebelumnya
                aria-label="Kembali"
                className={`fixed top-[72px] left-4 sm:absolute sm:top-8 sm:left-7 md:top-10 md:left-10 lg:left-12 z-[9999] group flex items-center justify-center gap-2 sm:gap-2.5 h-10 sm:h-9 px-3 sm:pl-3 sm:pr-4 rounded-full sm:rounded-xl backdrop-blur-md border active:scale-95 transition-all duration-300 shadow-sm ${isDark
                        ? "bg-[#070204]/85 border-[#ff1e56]/20 text-[#ff1e56] hover:text-white hover:bg-[#ff1e56] hover:border-[#ff1e56] hover:shadow-[0_0_20px_rgba(255,30,86,0.35)]"
                        : "bg-white/90 border-rose-200 text-rose-500 hover:text-white hover:bg-[#ff1e56] hover:border-[#ff1e56] hover:shadow-[0_0_20px_rgba(255,30,86,0.25)]"
                    }`}
            >
                <i className="fa-solid fa-arrow-left text-[12px] group-hover:-translate-x-0.5 transition-transform duration-300" />
                <span className="hidden sm:inline text-[10px] font-black tracking-[0.15em] uppercase">
                    Kembali
                </span>
            </button>

            {/* Hero Banner */}
            <HeroBanner bannerImage={anime?.bannerImage} />

            {/* Main Content */}
            <main className="relative z-20 mx-auto max-w-7xl px-3 sm:px-4 pb-16 sm:pb-20 md:pb-24 -mt-24 sm:-mt-32 md:-mt-56 space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
                    <div className="lg:col-span-4 xl:col-span-3">
                        <Sidebar anime={anime} />
                    </div>

                    <div className="lg:col-span-8 xl:col-span-9">
                        <MainContent
                            anime={anime}
                            activeRange={activeRange}
                            onRangeChange={setActiveRange}
                        />
                    </div>
                </div>

                <div className="pb-2 sm:pb-0">
                    <TabsSection
                        anime={anime}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>
            </main>

            {/* Footer */}
            <footer
                className={`border-t py-8 sm:py-10 md:py-12 text-center text-[11px] sm:text-xs relative z-30 transition-colors duration-300 px-4 ${isDark
                        ? "bg-[#030102] border-[#1a0a0d] text-slate-600"
                        : "bg-slate-100 border-slate-200 text-slate-400"
                    }`}
            >
                <p className="mb-2 tracking-wide leading-relaxed">
                    &copy; 2026 NontonAnime. Didesain menggunakan standar streaming antarmuka modern.
                </p>
                <p className={`text-[10px] leading-relaxed ${isDark ? "text-slate-700/80" : "text-slate-400/80"}`}>
                    Setiap aset gambar & data terintegrasi didukung oleh database publik.
                </p>
            </footer>
        </div>
    );
}