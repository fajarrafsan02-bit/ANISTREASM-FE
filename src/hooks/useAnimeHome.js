import { useEffect } from "react";
import { useState } from "react";
import { api } from "../api/axios";
import { mapToOngoingAnime } from "../mappers/AnimeMapper";

export default function useAnimeHome() {
    const [ongoingAnime, setOngoingAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await api.get("/anime/home");

                const mapped = mapToOngoingAnime(response.data.data);
                setOngoingAnime(mapped);
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
        ongoingAnime,
        loading,
        error
    }
}