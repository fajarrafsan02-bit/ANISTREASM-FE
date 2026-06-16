import { useState } from "react"
import { registerUser } from "../services/authService";

export default function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (formData) => {
        try {
            setLoading(true);
            setError(null);

            const result = await registerUser(formData);

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
        register,
        loading,
        error
    }
}