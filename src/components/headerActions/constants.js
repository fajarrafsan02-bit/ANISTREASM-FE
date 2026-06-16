export const getImageUrl = (path, fallback) => {
    if (!path) return fallback;
    // Cloudinary / blob / data URI — langsung pakai
    if (path.startsWith("http") || path.startsWith("blob:") || path.startsWith("data:")) return path;
    // Path lokal lama (migrasi bertahap) — fallback ke default
    return fallback;
};