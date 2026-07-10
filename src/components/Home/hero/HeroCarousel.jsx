import { useMemo } from "react";
import { useTheme } from "../../../context/ThemeContext";

import useHeroCarousel from "./useHeroCarousel";
import useHeroMouseParallax from "../../../hooks/useHeroMouseParallax";
import { getSectionStyle, heroKeyframes } from "../hero/HeroStyle";

import HeroBackground from "./HeroBackground";
import HeroOverlays from "./HeroOverlays";
import HeroContent from "./HeroContent";
import HeroInfoCard from "./HeroInfoCard";
import HeroControls from "./HeroControls";
import HeroParticles from "./HeroParticles";

export default function HeroCarousel({ animeList = [] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const total = animeList.length;

  const { containerRef, mousePos } = useHeroMouseParallax();

  const {
    currentSlide,
    isLoaded,
    animationKey,
    goTo,
    handlePrev,
    handleNext,
    handleTouchStart,
    handleTouchEnd,
  } = useHeroCarousel(total);

  const current = animeList[currentSlide];

  const sectionStyle = useMemo(() => getSectionStyle(isDark), [isDark]);

  const bgSlides = useMemo(() => {
    if (total === 0) return [];
    const prev = ((currentSlide - 1) % total + total) % total;
    const next = (currentSlide + 1) % total;
    const indices = new Set([prev, currentSlide, next]);
    return Array.from(indices).sort((a, b) => a - b).map((i) => animeList[i]);
  }, [animeList, currentSlide, total]);

  return (
    <section
      ref={containerRef}
      className="relative h-[80vh] sm:h-[90vh] min-h-[500px] sm:min-h-[650px] max-h-[1000px] overflow-hidden select-none transition-colors duration-500"
      style={sectionStyle}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* === BACKGROUND (only active + neighbors) === */}
      {bgSlides.map((anime) => (
        <HeroBackground
          key={anime.id}
          anime={anime}
          index={animeList.indexOf(anime)}
          currentSlide={currentSlide}
          isLoaded={isLoaded}
          isDark={isDark}
        />
      ))}

      {/* === PARTICLES === */}
      <HeroParticles isDark={isDark} mousePos={mousePos} />

      {/* === OVERLAYS === */}
      <HeroOverlays isDark={isDark} isLoaded={isLoaded} currentSlide={currentSlide} />

      {/* === MAIN CONTENT === */}
      <HeroContent current={current} isDark={isDark} animationKey={animationKey} />

      {/* === RIGHT INFO CARD === */}
      <HeroInfoCard current={current} isDark={isDark} animationKey={animationKey} />

      {/* === BOTTOM CONTROLS === */}
      <HeroControls
        heroAnime={animeList}
        currentSlide={currentSlide}
        total={total}
        isDark={isDark}
        goTo={goTo}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      {/* === SCROLL INDICATOR === */}
      <div className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 z-5 flex flex-col items-center gap-1.5">
        <span className={`text-[9px] sm:text-[11px] tracking-[0.35em] uppercase font-medium animate-pulse transition-colors duration-500 ${isDark ? "text-white/25" : "text-gray-400"}`}>
          Scroll
        </span>
        <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-700 animate-bounce ${isDark ? "text-white/25" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style>{heroKeyframes}</style>
    </section>
  );
}