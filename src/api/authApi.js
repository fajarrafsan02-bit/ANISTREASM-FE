import { api } from "./axios";

export async function registerApi(data) {
    const response = await api.post(
        "/users/register",
        data
    );
    return response.data;
}
export async function loginApi(data) {
    const response = await api.post(
        "/users/login",
        data
    );
    return response.data;
}

export async function googleLoginApi(idToken) {
    const response = await api.post("/google/login", {
        token: idToken
    });

    return response.data;
}

export async function logoutApi() {
    const response = await api.post("/user/logout");
    return response.data;
}