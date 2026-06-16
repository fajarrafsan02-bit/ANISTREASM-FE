import { useTheme } from "../../../context/ThemeContext";
import { useGoogleLogin as useGoogleOAuth } from "@react-oauth/google";
import useGoogleLogin from "../../../hooks/useGoogleLogin";
import { useAuth } from "../../../context/AuthContext";
import { useAuthModal } from "../../../context/AuthModalContext";
import useToast from "../../../hooks/useToast";

export default function SocialLogin() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { login } = useAuth();
    const { closeModal, redirectAction } = useAuthModal();
    const { googleLogin, loading, error } = useGoogleLogin();
    const toast = useToast();

    const handleGoogleOAuth = useGoogleOAuth({
        flow: "implicit",
        onSuccess: async (credentialResponse) => {
            try {
                const result = await googleLogin(credentialResponse.access_token);
                const { token, user } = result.data;
                login({ ...user, token });

                toast.success(`Selamat datang! 👋 Anda berhasil login sebagai ${user.email}`, 3000);

                setTimeout(() => {
                    closeModal();
                    redirectAction?.();
                }, 500);
            } catch (err) {
                console.error(err);
                const errorMsg = err.response?.data?.message || err.message || "Gagal login dengan Google";
                toast.error(errorMsg, 3000);
            }
        },
        onError: (err) => {
            console.error("Google OAuth error:", err);
            toast.error("Terjadi kesalahan saat login dengan Google", 3000);
        },
    });

    // Styling tombol agar selaras dengan input field (Zinc style)
    const btnClass = `w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all duration-200 active:scale-[0.98] ${
        isDark
            ? "bg-zinc-900/30 border-zinc-800/80 text-zinc-200 hover:bg-zinc-900/80 hover:text-white"
            : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm shadow-zinc-100/50"
    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`;

    return (
        <div className="w-full">
            {/* Divider modern menggunakan Flexbox */}
            <div className="flex items-center my-5">
                <div className={`flex-1 border-t ${isDark ? "border-zinc-800/60" : "border-zinc-200"}`} />
                <span className={`px-3 text-[10px] tracking-wider uppercase font-semibold ${
                    isDark ? "text-zinc-500" : "text-zinc-400"
                }`}>
                    Atau masuk dengan
                </span>
                <div className={`flex-1 border-t ${isDark ? "border-zinc-800/60" : "border-zinc-200"}`} />
            </div>

            {/* Social Buttons - Side-by-side Grid */}
            <div className="grid grid-cols-2 gap-2.5">
                <button
                    className={btnClass}
                    onClick={() => handleGoogleOAuth()}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="w-3.5 h-3.5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <GoogleIcon />
                    )}
                    <span>{loading ? "Memproses..." : "Google"}</span>
                </button>

                <button className={btnClass} type="button">
                    <AppleIcon isDark={isDark} />
                    <span>Apple</span>
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <p className="mt-3 text-red-500 text-[11px] text-center font-medium animate-in fade-in duration-300">
                    {error}
                </p>
            )}
        </div>
    );
}

function GoogleIcon() {
    return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
        </svg>
    );
}

function AppleIcon({ isDark }) {
    return (
        <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.33 3.95-1.33 1.35 0 2.51.74 3.24 1.87-2.85 1.45-2.37 5.98.22 7.13-.57 1.5-1.31 2.99-2.49 4.56zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
    );
}