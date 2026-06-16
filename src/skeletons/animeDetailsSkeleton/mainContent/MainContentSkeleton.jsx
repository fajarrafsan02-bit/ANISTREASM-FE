import EpisodeDirectorySkeleton from "./episodeDirectory/EpisodeDirectorySkeleton";
import InfoGridSkeleton from "./InfoGridSkeleton";
import TitleSectionSkeleton from "./TitleSectionSkeleton";

export default function MainContentSkeleton() {
    return (
        <div className="lg:col-span-9 space-y-6">
            <TitleSectionSkeleton />
            <InfoGridSkeleton />
            <EpisodeDirectorySkeleton />
        </div>
    );
}