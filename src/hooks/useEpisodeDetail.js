// src/hooks/useEpisodeDetail.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/axios';

export default function useEpisodeDetail() {
    const { episodeId } = useParams();
    const [episode, setEpisode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!episodeId) return;

        const fetchEpisode = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.get(`/anime/episode/${episodeId}`);
                setEpisode(res.data.data);
            } catch (err) {
                setError(err.response?.data?.message ?? err.message ?? 'Terjadi kesalahan');
            } finally {
                setLoading(false);
            }
        };

        fetchEpisode();
    }, [episodeId]);

    return { episode, loading, error };
}