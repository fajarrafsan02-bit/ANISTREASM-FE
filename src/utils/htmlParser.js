export const stripHtml = (html) => {
    if (!html) return "";
    return html
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
};
