import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { normalizeId, normalizeEpisodeId, getEpisodeNumber } from "../../../../utils/relatedUtils";

export default function useActiveEpisode(episodes, effectiveEpisodeId) {
    const navigate = useNavigate();

    const activeIndex = useMemo(() => {
        const cleanString = (str) => {
            if (!str) return "";
            return str.toLowerCase().replace(/[^a-z0-9]/g, "");
        };

        return episodes.findIndex((ep) => {
            const cleanCurrentId = cleanString(effectiveEpisodeId);
            const cleanEpTitle = cleanString(ep.title);
            if (!cleanCurrentId) return false;
            return normalizeEpisodeId(cleanEpTitle) === cleanCurrentId;
        });
    }, [episodes, effectiveEpisodeId]);

    const isDescending = useMemo(() => {
        if (episodes.length < 2) return false;
        const firstNum = getEpisodeNumber(episodes[0]?.title || episodes[0]?.episodeId || "");
        const lastNum = getEpisodeNumber(episodes[episodes.length - 1]?.title || episodes[episodes.length - 1]?.episodeId || "");
        if (firstNum !== null && lastNum !== null) return firstNum > lastNum;
        return false;
    }, [episodes]);

    const handleEpisodeClick = (episodeTitle) => {
        window.scrollTo({ top: 0, behavior: "auto" });
        const id = normalizeEpisodeId(normalizeId(episodeTitle));
        navigate(`/episode/${id}`);
    };

    return { activeIndex, isDescending, handleEpisodeClick };
}
