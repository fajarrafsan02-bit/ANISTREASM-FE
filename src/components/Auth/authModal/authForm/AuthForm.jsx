import { Eye, EyeOff, ArrowRight, Loader2, Mail, Lock, User } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";
import useAuthForm from "./useAuthForm";
import AuthFormField from "./AuthFormField";
import AuthFormError from "./AuthFormError";

export default function AuthForm({ activeTab, onSuccess, onChange }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const {
        fields,
        errors,
        loading,
        currentError,
        isErrorVisible,
        isTransitioning,
        showPassword,
        showConfirm,
        setField,
        setShowPassword,
        setShowConfirm,
        setIsErrorVisible,
        handleSubmit,
    } = useAuthForm(activeTab, onSuccess, onChange);

    // Menggunakan warna Zinc yang lebih serasi dengan tema hitam modern
    const iconClass = isDark ? "text-zinc-500" : "text-zinc-400";
    const hoverIconClass = isDark ? "hover:text-zinc-200" : "hover:text-zinc-700";

    return (
        <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
            <div
                className="space-y-3.5 transition-all duration-300 ease-out"
                style={{
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning ? "scale(0.98)" : "scale(1)",
                    filter: isTransitioning ? "blur(2px)" : "blur(0px)",
                }}
            >
                {/* Username — Register only */}
                {activeTab === "register" && (
                    <AuthFormField
                        label="Username"
                        icon={<User className={`w-3.5 h-3.5 ${iconClass}`} />}
                        value={fields.username}
                        onChange={setField("username")}
                        placeholder="nama pengguna"
                        error={errors.username}
                        isDark={isDark}
                    />
                )}

                {/* Email */}
                <AuthFormField
                    label={activeTab === "login" ? "Email atau Username" : "Email"}
                    icon={<Mail className={`w-3.5 h-3.5 ${iconClass}`} />}
                    value={fields.email}
                    onChange={setField("email")}
                    placeholder="nama@email.com"
                    error={errors.email}
                    isDark={isDark}
                />

                {/* Password */}
                <AuthFormField
                    label="Kata Sandi"
                    icon={<Lock className={`w-3.5 h-3.5 ${iconClass}`} />}
                    type={showPassword ? "text" : "password"}
                    value={fields.password}
                    onChange={setField("password")}
                    placeholder="••••••••"
                    error={errors.password}
                    isDark={isDark}
                    extraLabel={
                        activeTab === "login" && (
                            <span className={`text-[10px] cursor-pointer transition-colors ${isDark
                                    ? "text-zinc-400 hover:text-zinc-200"
                                    : "text-red-500 hover:text-red-600"
                                }`}>
                                Lupa kata sandi?
                            </span>
                        )
                    }
                    right={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`${iconClass} ${hoverIconClass} transition-colors shrink-0`}
                        >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                    }
                />

                {/* Confirm Password — Register only */}
                {activeTab === "register" && (
                    <AuthFormField
                        label="Konfirmasi Kata Sandi"
                        icon={<Lock className={`w-3.5 h-3.5 ${iconClass}`} />}
                        type={showConfirm ? "text" : "password"}
                        value={fields.confirmPassword}
                        onChange={setField("confirmPassword")}
                        placeholder="••••••••"
                        error={errors.confirmPassword}
                        isDark={isDark}
                        right={
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className={`${iconClass} ${hoverIconClass} transition-colors shrink-0`}
                            >
                                {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                        }
                    />
                )}

                {/* Error */}
                <AuthFormError
                    error={currentError}
                    isVisible={isErrorVisible}
                    isDark={isDark}
                    onClose={() => setIsErrorVisible(false)}
                />

                {/* Submit Button - Menggunakan warna merah premium solid yang bersih */}
                <button
                    type="submit"
                    disabled={loading || isTransitioning}
                    className={`w-full py-2.5 font-semibold text-white rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 group mt-4 ${isDark
                            ? "bg-red-600 hover:bg-red-500 active:scale-95 hover:shadow-[0_0_20px_rgba(220,38,38,0.25)]"
                            : "bg-red-600 hover:bg-red-700 active:scale-98 shadow-sm hover:shadow-md"
                        } disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none`}
                    style={{
                        opacity: isTransitioning ? 0.6 : 1,
                        transform: isTransitioning ? "scale(0.97)" : "scale(1)",
                        transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{activeTab === "login" ? "Masuk..." : "Mendaftar..."}</span>
                        </>
                    ) : (
                        <>
                            <span>{activeTab === "login" ? "Masuk" : "Daftar"}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}