// src/hooks/useEpisodeDetail.js
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/axios';

export default function useEpisodeDetail() {
    const { episodeId } = useParams();
    const [episode, setEpisode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const prevEpisodeRef = useRef(null);

    useEffect(() => {
        if (!episodeId) return;

        const fetchEpisode = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.get(`/anime/episode/${episodeId}`);
                const data = res.data.data;
                setEpisode(data);
                prevEpisodeRef.current = data;
            } catch (err) {
                setError(err.response?.data?.message ?? err.message ?? 'Terjadi kesalahan');
                // Keep previous episode data so RelatedEpisodes can still render
                // but set episode to null so the video player shows error
                setEpisode(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisode();
    }, [episodeId]);

    return { episode, loading, error, prevEpisode: prevEpisodeRef.current };
}