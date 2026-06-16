// playerUtils.js

export const RESOLUTION_PRIORITY = ['1080p', '720p', '480p', '360p', 'unknown'];

export const BLOCKED_EMBED_DOMAINS = ['pixeldrain.com'];

export function isDirectVideoUrl(url) {
    return !!url?.match(/\.(mp4|m3u8|webm|ogg)(\?.*)?$/i);
}

export function isEmbeddableUrl(url) {
    if (!url) return false;
    return !BLOCKED_EMBED_DOMAINS.some(domain => url.includes(domain));
}

export function findDefaultServer(servers) {
    for (const res of RESOLUTION_PRIORITY) {
        const group = servers.find(q => q.resolution === res);
        if (group && group.serverList.length > 0) {
            return {
                serverId: group.serverList[0].serverId,
                resolution: group.resolution,
                name: group.serverList[0].title,
            };
        }
    }
    return null;
}

export const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    return `${m}:${String(sec).padStart(2, '0')}`;
};