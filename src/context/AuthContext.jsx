import { useState, useEffect, useContext, createContext, useRef, useCallback } from "react";
import { logoutUser } from "../services/authService";
import { api } from "../api/axios";
import useToast from "../hooks/useToast";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    const toastRef = useRef(toast);
    useEffect(() => {
        toastRef.current = toast;
    }, [toast]);

    const handleForceClear = useCallback(() => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }, []);

    useEffect(() => {
        const verifySession = async () => {
            const savedUser = localStorage.getItem('user');

            if (!savedUser) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.get('/user');

                if (response.status === 200 && response.data.success) {
                    const freshUser = response.data.data;
                    setUser(freshUser);
                    setIsLoggedIn(true);
                    localStorage.setItem('user', JSON.stringify(freshUser));
                } else {
                    handleForceClear();
                }
            } catch (error) {
                console.error('Session verification error:', error);

                // ✅ PERBAIKAN: Deteksi apakah server merespon permintaan (artinya server online)
                const hasServerResponse = !!error.response;

                if (hasServerResponse) {
                    // Jika ada respon tetapi error, sesi tidak valid (cookie hilang/tidak cocok)
                    if (savedUser) {
                        toastRef.current.error("Sesi telah berakhir. Silakan masuk kembali.");
                    }
                    handleForceClear();
                } else {
                    // ✅ JIKA ERROR JARINGAN / TIMEOUT (Tidak ada respon dari server):
                    // Pulihkan data cadangan dari localStorage untuk mode offline
                    toastRef.current.error("Gagal terhubung ke server. Menggunakan sesi offline.");
                    try {
                        const parsedUser = JSON.parse(savedUser);
                        setUser(parsedUser);
                        setIsLoggedIn(true);
                    } catch (e) {
                        handleForceClear();
                        console.log(e);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        verifySession();
    }, [handleForceClear]);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const updateUser = (newProfileData) => {
        setUser((prev) => {
            const updated = {
                ...prev,
                profil: newProfileData,
                profile: newProfileData,
            };
            localStorage.setItem('user', JSON.stringify(updated));
            return updated;
        });
    };

    const logout = async () => {
        try {
            await logoutUser();
            toastRef.current.success("Berhasil keluar dari akun");
        } catch (error) {
            console.error('Logout error:', error);
            toastRef.current.error(
                error.response?.data?.errors || "Gagal melakukan proses logout"
            );
        } finally {
            setUser(null);
            setIsLoggedIn(false);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, isLoggedIn, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);