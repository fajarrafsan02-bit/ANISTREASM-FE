import { api } from "../../api/axios";

export function fetchCommentsApi(animeId, sort, page, limit) {
    return api
        .get("/comments", { params: { animeId, sort, page, limit } })
        .then((r) => r.data?.data || {});
}

export function createCommentApi(animeId, content, parentId) {
    return api.post("/comments", { animeId, content, parentId }).then((r) => r.data?.data);
}

export function updateCommentApi(id, content) {
    return api.patch(`/comments/${id}`, { content }).then((r) => r.data?.data);
}

export function deleteCommentApi(id) {
    return api.delete(`/comments/${id}`);
}

export function likeCommentApi(id) {
    return api.post(`/comments/${id}/like`).then((r) => r.data?.data || {});
}

export function fetchRepliesApi(parentId) {
    return api.get(`/comments/${parentId}/replies`).then((r) => r.data?.data || []);
}
