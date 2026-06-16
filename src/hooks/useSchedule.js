import { useState, useEffect } from 'react';
import { api } from '../api/axios';
// Parse "0d 0h 33m" → detik
function parseEstimationToSeconds(estimation) {
    if (!estimation) return 0;

    const d = parseInt(estimation.match(/(\d+)d/)?.[1] ?? 0);
    const h = parseInt(estimation.match(/(\d+)h/)?.[1] ?? 0);
    const m = parseInt(estimation.match(/(\d+)m/)?.[1] ?? 0);

    return d * 86400 + h * 3600 + m * 60;
}

export default function useSchedule() {
    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);

                const response = await api.get("/anime/schedule");
                const raw = response.data.data ?? {};

                const mapped = {};
                for (const [day, animeList] of Object.entries(raw)) {
                    mapped[day] = animeList.map((anime) => ({
                        ...anime,
                        airingInSeconds: parseEstimationToSeconds(anime.estimation),
                    }));
                }

                setSchedule(mapped);
                setError(null);
            } catch (error) {
                console.error(
                    error.response?.data?.message ||
                    error.message ||
                    "Terjadi kesalahan"
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Terjadi kesalahan"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    return {
        schedule,
        loading,
        error,
    };
}