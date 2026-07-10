import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/axios'; 

export default function useAnimeCatalog() {
    const [activeTab, setActiveTab] = useState('popular');
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('latest');
    const [genreId, setGenreId] = useState(''); 
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let url = '';

            if (genreId) {
                url = `/anime/genres/${genreId}?page=${page}`;
            } else {
                if (activeTab === 'popular') url = `/anime/popular?page=${page}`;
                if (activeTab === 'complete') url = `/anime/complete?page=${page}&order=${order}`;
                if (activeTab === 'ongoing') url = `/anime/ongoing?page=${page}&order=${order}`;
                if (activeTab === 'recent') url = `/anime/recent?page=${page}`;
                if (activeTab === 'movies') url = `/anime/movies?page=${page}`; 
                if (activeTab === 'all') url = `/anime/all`;
            }

            const res = await api.get(url);

            // Khusus indeks A-Z, data tidak memiliki paginasi standar halaman
            if (activeTab === 'all' && !genreId) {
                setData(res.data.data ?? []);
                setPagination(null);
            } else {
                setData(res.data.data ?? []);
                setPagination(res.data.pagination ?? null);
            }
        } catch (err) {
            setError(err.response?.data?.message ?? err.message ?? 'Gagal memuat data');
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [activeTab, page, order, genreId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const changeTab = (tab) => {
        if (tab === activeTab) return;
        setActiveTab(tab);
        setGenreId(''); // Reset filter genre server-side saat pindah tab biasa
        setPage(1);
        setOrder('latest'); 
        setData([]);
    };

    const changeGenre = (gId) => {
        setGenreId(gId);
        setPage(1);
        setData([]);
    };

    return {
        activeTab, changeTab,
        page, setPage,
        order, setOrder,
        genreId, changeGenre, 
        data, pagination,
        loading, error,
        isRecent: activeTab === 'recent',
        isAll: activeTab === 'all',
    };
}