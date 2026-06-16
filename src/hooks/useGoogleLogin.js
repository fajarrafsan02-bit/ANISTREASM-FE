import { useState } from "react";
import { googleLoginUser } from "../services/authService";

export default function useGoogleLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const googleLogin = async (idToken) => {
        try {
            setLoading(true);
            setError(null);

            const result = await googleLoginUser(idToken);

            return result;
        } catch (error) {
            const message =
                error.response?.data?.errors ||
                error.response?.data?.message ||
                error.message ||
                "Terjadi kesalahan";

            setError(message);
            console.log(error.response?.data);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        googleLogin,
        loading,
        error,
    };
}