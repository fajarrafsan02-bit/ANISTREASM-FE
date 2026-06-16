// ─── Validasi ─────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(activeTab, fields) {
    const errors = {};

    if (activeTab === "register") {
        if (!fields.username.trim())
            errors.username = "Username wajib diisi";
        else if (fields.username.trim().length < 3)
            errors.username = "Username minimal 3 karakter";
    }

    if (!fields.email.trim())
        errors.email = "Email wajib diisi";
    else if (!EMAIL_RE.test(fields.email))
        errors.email = "Format email tidak valid";

    if (!fields.password)
        errors.password = "Kata sandi wajib diisi";
    else if (fields.password.length < 6)
        errors.password = "Kata sandi minimal 6 karakter";

    if (activeTab === "register" && fields.password !== fields.confirmPassword)
        errors.confirmPassword = "Kata sandi tidak cocok";

    return errors;
}