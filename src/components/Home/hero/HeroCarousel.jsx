// HeroCarousel.jsx
import { useTheme } from "../../../context/ThemeContext";

import useHeroCarousel from "./useHeroCarousel";
import { getSectionStyle, heroKeyframes } from "../hero/HeroStyle";

import HeroBackground from "./HeroBackground";
import HeroOverlays from "./HeroOverlays";
import HeroContent from "./HeroContent";
import HeroInfoCard from "./HeroInfoCard";
import HeroControls from "./HeroControls";

export default function HeroCarousel({ animeList = [] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const total = animeList.length;

  const {
    currentSlide,
    direction,
    isLoaded,
    animationKey,
    progressRef,
    goTo,
    resetAuto,
    handlePrev,
    handleNext,
    handleTouchStart,
    handleTouchEnd,
  } = useHeroCarousel(total);

  const current = animeList[currentSlide];

  return (
    <section
      className="relative h-[75vh] sm:h-[85vh] min-h-[480px] sm:min-h-[600px] max-h-[900px] overflow-hidden select-none transition-colors duration-700"
      style={getSectionStyle(isDark)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* === CINEMATIC BACKGROUND LAYERS === */}
      <div className="absolute inset-0">
        {animeList.map((anime, index) => (
          <HeroBackground
            key={anime.id}
            anime={anime}
            index={index}
            currentSlide={currentSlide}
            direction={direction}
            isLoaded={isLoaded}
            total={total}
            isDark={isDark}
          />
        ))}
      </div>

      {/* === OVERLAYS === */}
      <HeroOverlays isDark={isDark} isLoaded={isLoaded} />

      {/* === MAIN CONTENT === */}
      <HeroContent current={current} isDark={isDark} animationKey={animationKey} />

      {/* === RIGHT SIDE: EPISODE INFO CARD === */}
      <HeroInfoCard current={current} isDark={isDark} animationKey={animationKey} />

      {/* === BOTTOM CONTROLS === */}
      <HeroControls
        heroAnime={animeList}
        currentSlide={currentSlide}
        total={total}
        isDark={isDark}
        progressRef={progressRef}
        goTo={goTo}
        resetAuto={resetAuto}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      {/* CSS Keyframes */}
      <style>{heroKeyframes}</style>
    </section>
  );
}