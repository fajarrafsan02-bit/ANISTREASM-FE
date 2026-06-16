import { useEffect } from "react";
import { useState } from "react";
import { api } from "../api/axios";
import { mapToCompleteAnime } from "../mappers/AnimeMapper";

export default function useAnimeCompleteHome() {
    const [completeAnime, setCompleteAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await api.get("/anime-complete/home");

                const mapped = mapToCompleteAnime(response.data.data);
                setCompleteAnime(mapped);
                setError(null);
            } catch (error) {
                console.error(error.response?.data?.message ||
                    error.message ||
                    "Terjadi kesalahan");

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
        completeAnime,
        loading,
        error
    }
}