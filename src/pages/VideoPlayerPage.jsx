import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useEpisodeDetail from '../hooks/useEpisodeDetail';
import useWatchHistory from '../hooks/useWatchHistory';
import { api } from '../api/axios';
import { useTheme } from '../context/ThemeContext';

import LoadingState from '../components/serverNonton/videoPlayer/LoadingState';
import ErrorState from '../components/serverNonton/videoPlayer/ErrorState';
import VideoPlayer from '../components/serverNonton/videoPlayer/VideoPlayer';
import EpisodeInfo from '../components/serverNonton/EpisodeInfo';
import RelatedEpisodes from '../components/serverNonton/relatedEpisode/RelatedEpisodes';
import RelatedMovies from '../components/serverNonton/relatedMovie/RelatedMovies';
import DownloadSection from '../components/serverNonton/DownloadSection';
import { normalizeEpisodeId } from '../utils/relatedUtils';

export default function VideoPlayerPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { episodeId } = useParams();
    const navigate = useNavigate();
    const normalizedEpisodeId = normalizeEpisodeId(episodeId);
    const { episode, loading, error, prevEpisode } = useEpisodeDetail();
    const { saveHistory } = useWatchHistory();

    console.log("normalizedEpisodeId", normalizedEpisodeId);

    const [selectedServer, setSelectedServer] = useState(null);
    const [activeStreamUrl, setActiveStreamUrl] = useState(null);
    const [serverLoading, setServerLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    // ✅ Mencegah double-hit API pada render session yang sama
    const historySavedFor = useRef(null);

    // ✅ Scroll ke atas saat episode berganti
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [normalizedEpisodeId]);

    // ✅ Reset semua state saat episode berganti
    useEffect(() => {
        setSelectedServer(null);
        setActiveStreamUrl(null);
        setServerError(null);
        setServerLoading(false);
    }, [normalizedEpisodeId]);

    // ✅ Simpan history tontonan dengan pengambilan nomor episode yang 100% Akurat
    useEffect(() => {
        if (!episode) return;

        // Cegah eksekusi ulang jika episode ini sudah tersimpan di sesi render saat ini
        if (historySavedFor.current === normalizedEpisodeId) return;

        // 1. Ekstrak Nomor Episode dari ID (karena ID selalu konsisten)
        // Contoh: "snowball-earth-episode-12" -> akan mengambil angka "12"
        const epMatchFromId = normalizedEpisodeId.match(/-episode-(\d+)/i);
        const parsedEpisodeTitle = epMatchFromId ? `Episode ${epMatchFromId[1]}` : "Episode Baru";

        // 2. Ekstrak Judul Anime
        let parsedAnimeTitle = episode.title || "";
        const titleMatch = parsedAnimeTitle.match(/(.*?)\s+(?:episode|ep|ep\.)\s+\d+/i);
        if (titleMatch) {
            parsedAnimeTitle = titleMatch[1].trim(); // Ambil nama animenya saja
        }

        saveHistory({
            animeId: episode.animeId || normalizedEpisodeId.split("-episode-")[0] || "",
            episodeId: normalizedEpisodeId,
            title: parsedAnimeTitle,
            episodeTitle: parsedEpisodeTitle, // Menggunakan angka akurat dari URL/ID
            poster: episode.poster || null
        });

        // Tandai bahwa request history sudah dikirim
        historySavedFor.current = normalizedEpisodeId;

    }, [episode, saveHistory, normalizedEpisodeId]);

    // ✅ Set defaultStreamingUrl saat episode masuk
    useEffect(() => {
        if (!episode) return;
        setActiveStreamUrl(episode.defaultStreamingUrl ?? null);
        setSelectedServer(null);
        setServerError(null);
    }, [episode?.episodeId]);

    // ✅ useCallback — referensi stabil untuk perpindahan server
    const handleChangeServer = useCallback(async (serverId, resolution, serverName) => {
        if (serverLoading) return;

        if (selectedServer?.serverId === serverId) return;

        setServerLoading(true);
        setServerError(null);

        try {
            const res = await api.get(`/anime/server/${serverId}`);
            const url = res.data?.data?.url;

            if (!url) throw new Error('URL tidak ditemukan');

            setActiveStreamUrl(url);
            setSelectedServer({ serverId, resolution, name: serverName });

        } catch (err) {
            console.error('[handleChangeServer]', err.message);
            setServerError(`Gagal memuat server "${serverName}". Coba server lain.`);

            if (episode?.defaultStreamingUrl && !activeStreamUrl) {
                setActiveStreamUrl(episode.defaultStreamingUrl);
            }
        } finally {
            setServerLoading(false);
        }
    }, [serverLoading, selectedServer?.serverId, episode?.defaultStreamingUrl, activeStreamUrl]);

    if (loading) return <LoadingState />;

    const effectiveEpisode = episode || prevEpisode;
    const relatedEpisodes = episode?.recommendedEpisodes || prevEpisode?.recommendedEpisodes;
    const animeTitle = episode?.title ?? prevEpisode?.title ?? 'Unknown Anime';

    return (
        <div
            key={normalizedEpisodeId}
            className={`min-h-screen overflow-x-hidden selection:bg-[#ff1e56] selection:text-white transition-colors duration-300 ${isDark ? 'bg-[#070204] text-white' : 'bg-white text-slate-900'
                }`}
        >
            {/* Server error banner */}
            {serverError && (
                <div className={`mx-3 sm:mx-4 md:mx-auto md:max-w-[1440px] mt-3 rounded-lg text-xs py-2 px-4 border flex items-center justify-between gap-3 ${isDark ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-rose-50 border-rose-200 text-rose-600'
                    }`}>
                    <span>{serverError}</span>
                    <button
                        onClick={() => setServerError(null)}
                        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                    >
                        <i className="fa-solid fa-xmark text-xs" />
                    </button>
                </div>
            )}

            {/* Video Player Container */}
            <div className="mx-auto max-w-[1440px] px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
                {error ? (
                    <ErrorState error={error} onBack={() => navigate(-1)} />
                ) : (
                    <VideoPlayer
                        episode={episode}
                        activeStreamUrl={activeStreamUrl}
                        selectedServer={selectedServer}
                        serverLoading={serverLoading}
                        onChangeServer={handleChangeServer}
                    />
                )}
            </div>

            {/* Info & Related Container */}
            <section className={`mx-auto max-w-[1440px] px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'
                }`}>
                <RelatedEpisodes
                    episodes={relatedEpisodes}
                    currentEpisodeId={normalizedEpisodeId}
                />

                {episode && (
                    <div className={`h-px bg-gradient-to-r my-5 sm:my-6 ${isDark ? 'from-[#2a1117]/60 via-[#2a1117]/30 to-transparent' : 'from-slate-200 via-slate-300/60 to-transparent'
                        }`} />
                )}

                {episode && (
                    <EpisodeInfo
                        episode={episode}
                        animeTitle={animeTitle}
                        selectedServer={selectedServer}
                    />
                )}

                {effectiveEpisode?.movies?.length > 0 && (
                    <>
                        <div className={`h-px my-5 sm:my-6 bg-gradient-to-r ${isDark ? 'from-[#2a1117]/60 via-[#2a1117]/30 to-transparent' : 'from-slate-200 via-slate-300/60 to-transparent'
                            }`} />
                        <RelatedMovies movies={effectiveEpisode.movies} />
                    </>
                )}

                {effectiveEpisode?.downloadFormats?.length > 0 && (
                    <>
                        <div className={`h-px my-5 sm:my-6 bg-gradient-to-r ${isDark ? 'from-[#2a1117]/60 via-[#2a1117]/30 to-transparent' : 'from-slate-200 via-slate-300/60 to-transparent'
                            }`} />
                        <DownloadSection formats={effectiveEpisode.downloadFormats} />
                    </>
                )}
            </section>
        </div>
    );
}