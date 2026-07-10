import { useState, useCallback, useRef } from "react";
import { api } from "../api/axios";
import { mapSearchAnimeList } from "../mappers/AnimeMapper";

export default function useAnimeSearch() {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQueryState] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [phase, setPhase] = useState("idle"); // 'idle' | 'loading' | 'results' | 'error'

    const lastFetchedQuery = useRef("");
    const isOpenRef = useRef(false);

    const setQuery = useCallback((value) => {
        setQueryState(value);
        if (!value.trim()) {
            setPhase("idle");
            setResults([]);
            setError(null);
            lastFetchedQuery.current = "";
        }
    }, []);

    const openSearch = useCallback(() => {
        isOpenRef.current = true;
        setIsOpen(true);
    }, []);

    const closeSearch = useCallback(() => {
        isOpenRef.current = false;
        setIsOpen(false);
    }, []);

    const searchAnime = useCallback(async (keyword) => {
        const trimmed = keyword.trim();
        if (!trimmed) return;

        if (trimmed === lastFetchedQuery.current && isOpenRef.current && phase === "results") return;
        lastFetchedQuery.current = trimmed;

        setPhase("loading");
        setError(null);
        isOpenRef.current = true;
        setIsOpen(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await api.get("/anime/search", {
                params: { q: trimmed },
            });

            const mapped = mapSearchAnimeList(response.data.data.animeList);
            setResults(mapped);
            setPhase("results");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Terjadi kesalahan"
            );
            setResults([]);
            setPhase("error");
        }
    }, [phase]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter") searchAnime(query);
    }, [query, searchAnime]);

    return {
        query,
        setQuery,
        results,
        loading: phase === "loading",   
        error,
        isOpen,
        openSearch,
        phase,                           
        searchAnime,
        closeSearch,
        handleKeyDown,
    };
}