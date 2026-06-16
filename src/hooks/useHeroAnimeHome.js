import { useEffect } from "react";
import { useState } from "react";
import { api } from "../api/axios";
import { mapToHeroAnime } from "../mappers/AnimeMapper";

export default function useHeroAnimeHome() {
    const [heroAnime, setHeroAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await api.get("/hero-anime/home");

                const mapped = mapToHeroAnime(response.data.data);
                setHeroAnime(mapped);
                setError(null);
            } catch (error) {
                console.error("Terjadi kesalahan");

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Terjadi kesalahan"
                )
            } finally {
                setLoading(false);
            }
        }

        fetchData()

    }, []);

    return {
        heroAnime,
        loading,
        error
    }
}