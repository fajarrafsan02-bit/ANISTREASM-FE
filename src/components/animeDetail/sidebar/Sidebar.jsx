import PosterCard from './PosterCard';
import StatusCard from './StatusCard';
import StatsCard from './StatsCard';
import MetadataCard from './MetaDataCard';

export default function Sidebar({ anime }) {
    const popularRankYearly = anime?.rankings?.find(
        (r) =>
            r.type === 'POPULAR' &&
            r.season === null &&
            r.allTime === false
    )?.rank;

    return (
        <aside
            className="
                lg:col-span-3
                w-full
                space-y-4
                sm:space-y-5
                lg:space-y-6
            "
        >
            {/* Poster */}
            <div className="flex justify-center lg:block">
                <PosterCard
                    poster={anime?.poster}
                    title={anime?.title?.main ?? anime?.title?.romaji}
                    rank={popularRankYearly}
                />
            </div>

            {/* Status */}
            <StatusCard anime={anime} />

            {/* Statistics */}
            <StatsCard anime={anime} />

            {/* Metadata */}
            <MetadataCard anime={anime} />
        </aside>
    );
}