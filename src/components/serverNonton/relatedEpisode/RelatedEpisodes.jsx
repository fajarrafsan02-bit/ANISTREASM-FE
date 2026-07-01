import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import RelatedHeader from "./RelatedHeader";
import EpisodeCard from "./EpisodeCard";
import EmptyState from "./EmptyState";
import ScrollPaddles from "./ScrollPaddles";
import useEpisodeScroll from "./hooks/useEpisodeScroll";
import useActiveEpisode from "./hooks/useActiveEpisode";

export default function RelatedEpisodes({ episodes = [], currentEpisodeId }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const location = useLocation();
    const pathSegment = location.pathname.split("/episode/")[1] || "";
    const effectiveEpisodeId = currentEpisodeId || pathSegment;

    const { activeIndex, isDescending, handleEpisodeClick } = useActiveEpisode(episodes, effectiveEpisodeId);
    const { scrollRef, canScrollLeft, canScrollRight, scrollBy } = useEpisodeScroll(episodes, effectiveEpisodeId);

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const currentProgressIndex = hoveredIndex !== null ? hoveredIndex : activeIndex !== -1 ? activeIndex : 0;
    const displayProgressNumber = isDescending ? episodes.length - currentProgressIndex : currentProgressIndex + 1;
    const hasEpisodes = episodes.length > 0;

    return (
        <div className="relative group/section w-full">
            <RelatedHeader
                episodesCount={episodes.length}
                displayProgressNumber={displayProgressNumber}
                hasEpisodes={hasEpisodes}
            />

            <div className="relative px-4 sm:px-6 md:px-8">
                <ScrollPaddles
                    canScrollLeft={canScrollLeft}
                    canScrollRight={canScrollRight}
                    onScroll={scrollBy}
                />

                <div
                    ref={scrollRef}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide"
                    style={{
                        scrollbarWidth: "none",
                        scrollSnapType: "x mandatory",
                        scrollBehavior: "smooth",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: "16px",
                        paddingBottom: "24px",
                    }}
                >
                    {hasEpisodes ? (
                        episodes.map((ep, index) => (
                            <div
                                key={`${ep.episodeId || ep.slug || index}-${index}`}
                                style={{ scrollSnapAlign: "start", flexShrink: 0 }}
                            >
                                <EpisodeCard
                                    ep={ep}
                                    index={index}
                                    isActive={index === activeIndex}
                                    handleEpisodeClick={handleEpisodeClick}
                                    setHoveredIndex={setHoveredIndex}
                                />
                            </div>
                        ))
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>
        </div>
    );
}
