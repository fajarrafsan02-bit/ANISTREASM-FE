export function mapToOngoingAnime(animeList) {
    return animeList.map((anime, index) => {
        const rawScore = parseFloat(anime.score);
        const normalizedScore = rawScore > 10
            ? (rawScore / 10).toFixed(1)
            : rawScore?.toFixed(1) || "0.0";

        return {
            id: index + 1,
            title: anime.title,
            genre: anime.genreList?.slice(0, 2).join(" / "),
            rating: normalizedScore,
            episode: `Ep ${anime.episodes || anime.episode}`,
            image: anime.poster,
            status: anime.status?.toUpperCase(),
            year: anime.year,
            season: anime.season,
            studio: anime.studios,
            synopsis: anime.synopsis,
            duration: `${anime.duration} min`,
            animeId : anime.animeId
        };
    });
}


export function mapToCompleteAnime(animeList) {

    return animeList.map((anime, index) => {

        const rawScore = parseFloat(anime.score);
        const normalizedScore = rawScore > 10
            ? (rawScore / 10).toFixed(1)
            : rawScore?.toFixed(1) || "0.0";

        return {
            id: index + 1,
            title: anime.title,
            genre: anime.genreList?.slice(0, 2).join(" / "),
            rating: normalizedScore,
            episode: `Ep ${anime.episodes || "?"}`,
            image: anime.poster,
            status: anime.status?.toUpperCase(),
            year: anime.year,
            season: anime.season,
            studio: anime.studios,
            synopsis: anime.synopsis,
            duration: `${anime.duration} min`,
            animeId : anime.animeId
        }

    });
};

export function mapToHeroAnime(animeList) {
    return animeList.slice(0, 3).map((anime, index) => {
        const rawScore = parseFloat(anime.score);
        const normalizedScore = rawScore > 10
            ? (rawScore / 10).toFixed(1)
            : rawScore?.toFixed(1) || "0.0";
        return {
            id: index + 1,
            title: anime.title,
            subTitle: anime.season,
            genre: anime.genreList?.slice(0, 2).join(" / "),
            rating: normalizedScore,
            episode: `Episode ${anime.episodes || "?"}`,
            season: anime.season,
            status: anime.status?.toUpperCase(),
            description: anime.synopsis,
            image: anime.poster,
            year: anime.season?.match(/\d{4}/)?.[0],
            duration: `${anime.duration} min`,
            banner: anime.banner,
            animeId : anime.animeId
        }
    });
}

export function mapSearchAnimeList(animeList) {
    return animeList.map((anime) => ({
        title:   anime.title,
        poster:  anime.poster,
        type:    anime.type,
        score:   anime.score,
        status:  anime.status,
        animeId: anime.animeId,  // untuk navigasi ke detail
        genres:  anime.genreList.map(g => g.title)
    }));
}