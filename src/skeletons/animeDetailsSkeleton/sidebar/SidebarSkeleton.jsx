import PosterCardSkeleton from "./PosterCardSkeleton";
import StatusCardSkeleton from "./StatusCardSkeleton";
import StatsCardSkeleton from "./StatsCardSkeleton";
import MetadataCardSkeleton from "./MetadataCardSkeleton";

export default function SidebarSkeleton() {
    return (
        <div className="lg:col-span-3 space-y-3 sm:space-y-4 lg:space-y-6">
            <div className="max-w-[180px] xs:max-w-[220px] sm:max-w-none mx-auto w-full">
                <PosterCardSkeleton />
            </div>
            
            <StatusCardSkeleton />
            <StatsCardSkeleton />
            <MetadataCardSkeleton />
        </div>
    );
}