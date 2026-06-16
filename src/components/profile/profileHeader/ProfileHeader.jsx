// ProfileHeader.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { api } from '../../../api/axios';
import useToast from '../../../hooks/useToast';
import CoverBanner from './CoverBanner';
import AvatarSection from './AvatarSection';
import BioSection from './BioSection';

export default function ProfileHeader({ animeWatchedCount }) {
    const { user, logout, updateUser } = useAuth();
    const { theme } = useTheme();
    const toast = useToast();
    const navigate = useNavigate();
    const isDark = theme === "dark";

    // ✅ Cloudinary URL selalu https:// — tidak perlu prefix API_BASE_URL lagi
    const getImageUrl = (path, fallback) => {
        if (!path) return fallback;
        // Sudah berupa URL lengkap (Cloudinary, blob, data URI) — langsung pakai
        if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) return path;
        // Fallback untuk data lama yang masih path lokal (migrasi bertahap)
        return fallback;
    };

    const avatar = getImageUrl(
        user?.profil?.avatar || user?.profile?.avatar || user?.avatar || null,
        null
    );
    const cover = getImageUrl(
        user?.profil?.cover || user?.profile?.cover || user?.cover || null,
        "/images/clean_header_bg_perfect.png"
    );

    const currentBio = user?.profil?.bio || user?.profile?.bio || user?.bio || "";

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);

    const displayAvatar = avatarPreview || avatar;
    const displayCover = coverPreview || cover;

    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [isSavingBio, setIsSavingBio] = useState(false);

    const avatarInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const [bio, setBio] = useState(currentBio);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [bioInput, setBioInput] = useState(currentBio);
    const bioRef = useRef(null);

    useEffect(() => {
        setBio(currentBio);
        setBioInput(currentBio);
    }, [user, currentBio]);

    useEffect(() => {
        if (isEditingBio && bioRef.current) {
            bioRef.current.focus();
            const len = bioRef.current.value.length;
            bioRef.current.setSelectionRange(len, len);
        }
    }, [isEditingBio]);

    const handleLogout = async () => {
        try {
            navigate("/");
            await logout();
        } catch (error) {
            console.error("Gagal logout:", error);
            toast.error("Terjadi kesalahan saat logout. Silakan coba kembali.");
        }
    };

    const handleBioSave = async () => {
        const trimmed = bioInput.trim();
        setIsSavingBio(true);
        try {
            const response = await api.put('/user/profile', { bio: trimmed });
            const result = response.data;
            if (response.status === 200 && result.success) {
                setBio(trimmed);
                setBioInput(trimmed);
                setIsEditingBio(false);
                if (updateUser) updateUser(result.data);
                toast.success("Deskripsi berhasil disimpan");
            } else {
                toast.error(result.message || "Gagal menyimpan deskripsi");
            }
        } catch (error) {
            toast.error(error.response?.data?.errors || "Terjadi kesalahan koneksi");
        } finally {
            setIsSavingBio(false);
        }
    };

    const handleBioCancel = () => {
        setBioInput(bio);
        setIsEditingBio(false);
    };

    const handleBioKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleBioSave(); }
        if (e.key === "Escape") handleBioCancel();
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const localPreview = URL.createObjectURL(file);
        setAvatarPreview(localPreview);
        setIsUploadingAvatar(true);

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await api.put('/user/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const result = response.data;
            if (response.status === 200 && result.success) {
                if (updateUser) updateUser(result.data);
                toast.success("Foto profil berhasil diperbarui");
            } else {
                toast.error(result.message || "Gagal mengunggah foto profil.");
            }
        } catch (error) {
            toast.error(error.response?.data?.errors || "Kesalahan jaringan saat mengunggah.");
        } finally {
            setIsUploadingAvatar(false);
            setAvatarPreview(null);
            URL.revokeObjectURL(localPreview);
        }
    };

    const handleCoverChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const localPreview = URL.createObjectURL(file);
        setCoverPreview(localPreview);
        setIsUploadingCover(true);

        const formData = new FormData();
        formData.append('cover', file);

        try {
            const response = await api.put('/user/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const result = response.data;
            if (response.status === 200 && result.success) {
                if (updateUser) updateUser(result.data);
                toast.success("Sampul berhasil diperbarui");
            } else {
                toast.error(result.message || "Gagal mengunggah sampul.");
            }
        } catch (error) {
            toast.error(error.response?.data?.errors || "Kesalahan jaringan saat mengunggah.");
        } finally {
            setIsUploadingCover(false);
            setCoverPreview(null);
            URL.revokeObjectURL(localPreview);
        }
    };

    const getInitial = () => {
        if (user?.username) return user.username.charAt(0).toUpperCase();
        if (user?.email) return user.email.charAt(0).toUpperCase();
        return "U";
    };

    const displayName = user?.username || user?.name || user?.email?.split("@")[0] || "User";

    return (
        <div className={`w-full rounded-3xl overflow-hidden border shadow-2xl relative transition-colors duration-500 ${isDark
            ? "bg-[#07070a] text-white border-white/5"
            : "bg-white text-neutral-800 border-neutral-200/60"
            }`}>
            <CoverBanner
                displayCover={displayCover}
                isUploadingCover={isUploadingCover}
                coverInputRef={coverInputRef}
                onCoverChange={handleCoverChange}
            />

            <section className="relative px-4 sm:px-6 md:px-8 pb-6 -mt-16 sm:-mt-20 md:-mt-24 z-10 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-5 md:gap-8 w-full">

                        <AvatarSection
                            displayAvatar={displayAvatar}
                            isUploadingAvatar={isUploadingAvatar}
                            avatarInputRef={avatarInputRef}
                            onAvatarChange={handleAvatarChange}
                            displayName={displayName}
                            getInitial={getInitial}
                        />

                        <div className="flex-1 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 w-full pb-1">
                            <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-auto flex-shrink-0">
                                <div className="space-y-1.5">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <h1 className={`font-sora text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-none transition-colors duration-300 ${isDark ? "text-white drop-shadow-md" : "text-neutral-900 drop-shadow-sm"
                                            }`}>
                                            {displayName}
                                        </h1>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase leading-none transition-colors duration-300 ${isDark
                                            ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                                            : "bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 text-red-600 shadow-[0_0_10px_rgba(239,68,68,0.05)]"
                                            }`}>
                                            PRO MEMBER
                                        </span>
                                    </div>

                                    {user?.email && (
                                        <p className={`text-sm font-mono tracking-tight leading-none opacity-90 transition-colors duration-300 ${isDark ? "text-neutral-400" : "text-neutral-500"
                                            }`}>
                                            {user.email}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-center md:justify-start">
                                    <div className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2 transition-all duration-300 backdrop-blur-sm shadow-sm cursor-default border ${isDark
                                        ? "bg-white/[0.03] hover:bg-white/[0.05] border-white/5 hover:border-red-500/30"
                                        : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 hover:border-red-500/30"
                                        }`}>
                                        <span className={`material-symbols-outlined text-base text-red-500 transition-all ${isDark ? "drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]" : ""
                                            }`}>movie</span>
                                        <span className={`font-sora text-sm font-black transition-colors ${isDark ? "text-white" : "text-neutral-800"
                                            }`}>{animeWatchedCount}</span>
                                        <span className={`text-[10px] tracking-widest font-bold uppercase font-mono transition-colors ${isDark ? "text-neutral-400" : "text-neutral-500"
                                            }`}>Anime Watched</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`hidden md:block w-px self-stretch bg-gradient-to-b from-transparent to-transparent my-1 mx-2 transition-colors duration-500 ${isDark ? "via-white/15" : "via-neutral-300"
                                }`}></div>

                            <div className="w-full md:flex-1 md:max-w-sm lg:max-w-md xl:max-w-lg flex flex-col justify-end">
                                <BioSection
                                    bio={bio}
                                    bioInput={bioInput}
                                    setBioInput={setBioInput}
                                    isEditingBio={isEditingBio}
                                    setIsEditingBio={setIsEditingBio}
                                    isSavingBio={isSavingBio}
                                    bioRef={bioRef}
                                    onBioSave={handleBioSave}
                                    onBioCancel={handleBioCancel}
                                    onBioKeyDown={handleBioKeyDown}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 lg:mt-0 flex-shrink-0 w-full md:w-auto self-center lg:self-end lg:mb-1">
                        <button onClick={handleLogout}
                            className={`w-full md:w-auto inline-flex items-center justify-center gap-2 border border-red-500/20 hover:border-red-500 hover:text-white px-5 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer group ${isDark
                                ? "bg-gradient-to-r from-red-500/10 to-transparent hover:from-red-600 hover:to-red-500 text-red-400 shadow-none hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                : "bg-gradient-to-r from-red-50/80 to-transparent hover:from-red-600 hover:to-red-500 text-red-600 shadow-sm hover:shadow-[0_4px_15px_rgba(239,68,68,0.2)]"
                                }`}>
                            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">logout</span>
                            LOGOUT
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}