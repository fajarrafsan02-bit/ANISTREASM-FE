import { User, LogOut } from "lucide-react";
import { useState } from "react";

export default function AuthSection({
    isDark,
    isLoggedIn,
    user,
    userAvatar,
    isOnProfile,
    openModal,
    navigate,
    getImageUrl,
    onLogout,
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        await onLogout();
        setDropdownOpen(false);
    };

    return (
        <div className="relative z-10 hidden sm:block">
            {isLoggedIn ? (
                <>
                    <button
                        onClick={() => {
                            if (!isOnProfile) setDropdownOpen(!dropdownOpen);
                        }}
                        className={`relative flex items-center gap-2 group focus:outline-none ${isOnProfile ? "cursor-default" : "cursor-pointer"
                            }`}
                        aria-label="Profile"
                    >
                        <div className={`
                            w-9 h-9 rounded-full border-2 overflow-hidden
                            flex items-center justify-center font-bold text-sm
                            transition-all duration-300
                            ${isOnProfile
                                ? isDark
                                    ? "border-red-500 bg-zinc-900 text-white shadow-[0_0_0_3px_rgba(239,68,68,0.25),0_0_20px_rgba(239,68,68,0.4)] scale-105"
                                    : "border-red-500 bg-red-50 text-red-600 shadow-[0_0_0_3px_rgba(239,68,68,0.15),0_0_16px_rgba(239,68,68,0.25)] scale-105"
                                : isDark
                                    ? "border-red-500/40 bg-zinc-900 text-white group-hover:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.15)] group-hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                                    : "border-red-300 bg-red-50 text-red-600 group-hover:border-red-500"
                            }
                        `}>
                            {userAvatar ? (
                                <img
                                    src={getImageUrl(userAvatar, null)}
                                    alt={user?.username || "User"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span>{user?.username?.charAt(0).toUpperCase() ?? "U"}</span>
                            )}
                        </div>

                        {isOnProfile && (
                            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
                        )}
                    </button>

                    {dropdownOpen && !isOnProfile && (
                        <>
                            <div className="fixed inset-0 z-998" onClick={() => setDropdownOpen(false)} />
                            <div className={`
                                absolute right-0 mt-3 w-52 rounded-2xl border shadow-2xl z-999
                                overflow-hidden origin-top-right
                                animate-in fade-in slide-in-from-top-2 duration-200
                                ${isDark
                                    ? "bg-zinc-950/95 border-zinc-800/80 backdrop-blur-md shadow-black/60"
                                    : "bg-white/95 border-zinc-200/80 backdrop-blur-md"
                                }
                            `}>
                                <div className={`px-4 py-3.5 border-b flex flex-col gap-1 ${isDark ? "border-zinc-800/80" : "border-gray-100"}`}>
                                    <div className="flex items-center justify-between gap-2 min-w-0">
                                        <p className={`text-xs font-bold truncate ${isDark ? "text-zinc-100" : "text-zinc-800"}`}>
                                            {user?.username}
                                        </p>
                                        <span className="shrink-0 bg-red-500/10 text-red-500 text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                                            VIP
                                        </span>
                                    </div>
                                    <p className={`text-[10px] truncate ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                                        {user?.email}
                                    </p>
                                </div>

                                <div className="p-1.5 flex flex-col gap-1">
                                    <button
                                        onClick={() => { setDropdownOpen(false); navigate("/profile"); }}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${isDark
                                            ? "text-zinc-300 hover:text-white hover:bg-white/5"
                                            : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100/50"
                                            }`}
                                    >
                                        <User className="w-4 h-4 text-zinc-400" />
                                        <span>Buka Profil</span>
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${isDark
                                            ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            : "text-red-600 hover:text-red-700 hover:bg-red-50"
                                            }`}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Keluar</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <button
                    onClick={() => openModal()}
                    className="hidden sm:flex items-center gap-2 group bg-linear-to-r from-red-500 to-red-600 text-white border border-red-400/50 px-4 md:px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:from-red-600 hover:to-red-700 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 relative z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg>
                    <span>Masuk</span>
                </button>
            )}
        </div>
    );
}