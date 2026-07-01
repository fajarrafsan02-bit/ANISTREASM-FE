function formatScore(score) {
    const num = parseFloat(score);
    if (isNaN(num)) return "0.0";
    return num > 10 ? (num / 10).toFixed(1) : num.toFixed(1);
}

export function mapToOngoingAnime(animeList) {
    return animeList.map((anime, index) => {
        return {
            id: index + 1,
            title: anime.title || "Unknown Title",
            genre: anime.genreList?.slice(0, 2).join(" / "),
            rating: formatScore(anime.score),
            episode: anime.episodes || anime.episode ? `Ep ${anime.episodes || anime.episode}` : "Ep ?",
            image: anime.poster,
            status: anime.status?.toUpperCase(),
            year: anime.year,
            season: anime.season,
            studio: anime.studios,
            synopsis: anime.synopsis,
            duration: anime.duration ? `${anime.duration} min` : null,
            animeId : anime.animeId
        };
    });
}


export function mapToCompleteAnime(animeList) {

    return animeList.map((anime, index) => {
        return {
            id: index + 1,
            title: anime.title || "Unknown Title",
            genre: anime.genreList?.slice(0, 2).join(" / "),
            rating: formatScore(anime.score),
            episode: anime.episodes ? `Ep ${anime.episodes}` : "Ep ?",
            image: anime.poster,
            status: anime.status?.toUpperCase(),
            year: anime.year,
            season: anime.season,
            studio: anime.studios,
            synopsis: anime.synopsis,
            duration: anime.duration ? `${anime.duration} min` : null,
            animeId : anime.animeId
        }

    });
};

export function mapToHeroAnime(animeList) {
    return animeList.slice(0, 3).map((anime, index) => {
        return {
            id: index + 1,
            title: anime.title || "Unknown Title",
            subTitle: anime.season || null,
            genre: anime.genreList?.slice(0, 2).join(" / ") || null,
            rating: formatScore(anime.score),
            episode: anime.episodes ? `Episode ${anime.episodes}` : null,
            season: anime.season || null,
            status: anime.status?.toUpperCase() || null,
            description: anime.synopsis || null,
            image: anime.poster || null,
            year: anime.season?.match(/\d{4}/)?.[0] || null,
            duration: anime.duration ? `${anime.duration} min` : null,
            banner: anime.banner || null,
            animeId : anime.animeId
        }
    });
}

export function mapSearchAnimeList(animeList) {
    return animeList.map((anime) => ({
        title:   anime.title || "Unknown Title",
        poster:  anime.poster,
        type:    anime.type,
        score:   anime.score,
        status:  anime.status,
        animeId: anime.animeId,
        genres:  anime.genreList?.map(g => g.title) || []
    }));
}