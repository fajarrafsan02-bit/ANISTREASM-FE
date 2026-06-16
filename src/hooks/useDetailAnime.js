// src/hooks/useAnimeDetail.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/axios';          // import instance axios

export default function useAnimeDetail() {
    const { slug } = useParams();              // ambil slug dari URL
    const [anime, setAnime] = useState(null); // gunakan null, bukan array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;                     // jika slug tidak ada, tidak usah fetch

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get(`/anime/${slug}`); // perbaiki backticks

                // asumsikan response.data.data berisi object anime detail
                const mapped = response.data.data;
                setAnime(mapped);
                setError(null);
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Terjadi kesalahan"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]); // jalankan ulang jika slug berubah

    return {
        anime,   // object detail anime (bisa null jika belum ada)
        loading,
        error
    };
}