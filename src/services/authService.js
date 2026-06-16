import { googleLoginApi, loginApi, logoutApi, registerApi } from "../api/authApi";

export async function registerUser(data) {
    return await registerApi(data);
}

export async function loginUser(data) {
    return await loginApi(data);
}

export async function googleLoginUser(idToken) {
    return await googleLoginApi(idToken);
}
export async function logoutUser() {
    return await logoutApi();
}