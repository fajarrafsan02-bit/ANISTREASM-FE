export const normalizeId = (id = '') => {
    return id
        .trim()
        .toLowerCase()
        .replace(/#/g, '')
        .replace(/\s+/g, '-');
};

export const getEpisodeNumber = (str = '') => {
    const match = str.match(/(?:episode|ep|ep\.)\s*(\d+)/i) || str.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
};

export const getEpisodeBadge = (title = '') => {
    const match = title.match(/episode\s*(\d+)/i);
    return match ? `EP ${match[1]}` : 'EP';
};

export const cleanEpisodeTitle = (title = '') => {
    const match = title.match(/(episode|ep|ep\.)\s*\d+/i);
    if (match) {
        const startIndex = title.toLowerCase().indexOf(match[0].toLowerCase());
        return title.substring(startIndex);
    }
    return title;
};

export const normalizeEpisodeId = (id = '') => {
    return id
        .trim()
        .toLowerCase()
        .replace(/\s*(?:-\s*)?(?:\[end\]|end)\s*$/i, '');
};