import { useState } from "react";
import { loginUser } from "../services/authService";

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (formData) => {
        try {
            setLoading(true);
            setError(null);

            const result = await loginUser(formData);

            return result
        } catch (error) {
            const message = error.response?.data?.errors ||
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
        login,
        loading,
        error
    }
}