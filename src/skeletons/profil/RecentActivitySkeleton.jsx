// RecentActivitySkeleton.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function RecentActivitySkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="space-y-1">
            {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3.5 -mx-3 px-3 py-2.5 rounded-2xl animate-pulse">
                    {/* Skeleton Kotak Gambar */}
                    <div className={`w-11 h-11 rounded-xl flex-shrink-0 ${
                        isDark ? "bg-white/10" : "bg-neutral-200"
                    }`} />
                    
                    {/* Skeleton Teks */}
                    <div className="min-w-0 flex-1 space-y-2.5">
                        {/* Skeleton Baris Judul Aktivitas */}
                        <div className={`h-3 rounded-md ${
                            isDark ? "bg-white/10" : "bg-neutral-200"
                        } ${idx === 1 ? 'w-2/3' : 'w-5/6'}`} />
                        
                        {/* Skeleton Baris Waktu (Kecil) */}
                        <div className={`h-2 w-1/3 rounded-md ${
                            isDark ? "bg-white/5" : "bg-neutral-200/70"
                        }`} />
                    </div>
                </div>
            ))}
        </div>
    );
}