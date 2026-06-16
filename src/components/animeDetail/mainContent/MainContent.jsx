import TitleSection from './TitleSection';
import InfoGrid from './InfoGrid';
import EpisodeDirectory from './episodeDirectory/EpisodeDirectory';

export default function MainContent({ anime, activeTab, onTabChange, activeRange, onRangeChange }) {
    return (
        <div className="lg:col-span-9 space-y-6">
            <TitleSection anime={anime} />
            <InfoGrid anime={anime} />
            <EpisodeDirectory
                episodes={anime?.episodes ?? []}
                poster={anime?.poster}
                duration={anime?.duration}
                activeRange={activeRange}
                onRangeChange={onRangeChange}
            />
        </div>
    );
}