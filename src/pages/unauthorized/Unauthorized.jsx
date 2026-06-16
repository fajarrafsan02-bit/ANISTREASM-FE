import React from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function UnauthorizedCard() {
    const navigate = useNavigate();
    // Animasi Staggered Container
    const containerVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier untuk transisi elegan & super halus
                when: "beforeChildren",
                staggerChildren: 0.12,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const lockVariants = {
        hidden: { scale: 0, rotate: -45 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10 w-full max-w-[460px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[36px] p-6 md:p-8 pt-12 flex flex-col items-center relative shadow-2xl"
        >
            {/* Lock Icon Overflowing at top with dynamic floating spring and hover */}
            <motion.div
                variants={lockVariants}
                whileHover={{ scale: 1.08 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#05060a] border border-white/10 flex items-center justify-center shadow-lg cursor-help group"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            "0 0 10px rgba(239, 68, 68, 0.1)",
                            "0 0 25px rgba(239, 68, 68, 0.3)",
                            "0 0 10px rgba(239, 68, 68, 0.1)"
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center"
                >
                    <Lock className="w-6 h-6 text-red-500 transition-transform group-hover:rotate-12 duration-300" />
                </motion.div>
            </motion.div>

            <div className="text-center space-y-4 mt-2 w-full">
                <motion.div variants={itemVariants} className="space-y-1.5">
                    <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em]">Security Protocol Alpha</p>
                    <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white uppercase selection:bg-blue-500/10">Akses Ditolak</h1>
                </motion.div>
                <motion.div
                    variants={itemVariants}
                    className="h-[1px] w-12 bg-white/25 mx-auto"
                />
                <motion.p
                    variants={itemVariants}
                    className="text-slate-400 text-xs md:text-sm leading-relaxed font-light px-2"
                >
                    Sistem mendeteksi bahwa otorisasi Anda terbatas. Anda tidak memiliki izin yang cukup untuk mengakses navigasi terminal ini.
                </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-8"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/")}
                    className="py-3 px-4 rounded-xl bg-white text-black font-semibold hover:bg-slate-100 transition-all shadow-md cursor-pointer uppercase tracking-widest text-[9.5px]"
                >
                    Kembali Utama
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => alert("Menghubungi Pusat Administrator jaringan...")}
                    className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all cursor-pointer uppercase tracking-widest text-[9.5px]"
                >
                    Hubungi Admin
                </motion.button>
            </motion.div>

            {/* Terminal Telemetry Diagnostics */}
            <motion.div
                variants={itemVariants}
                className="mt-8 pt-6 border-t border-white/5 w-full"
            >
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                    <div className="flex flex-col gap-0.5 text-left">
                        <span className="text-slate-600 text-[8px]">Identitas Node</span>
                        <span className="text-slate-300">SEC-MD-0921-X</span>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                        <span className="text-slate-600 text-[8px]">Alamat IP</span>
                        <span className="text-slate-300">192.168.42.108</span>
                    </div>
                    <div className="flex flex-col gap-0.5 text-left">
                        <span className="text-slate-600 text-[8px]">Status Sesi</span>
                        <span className="text-red-400/80">Unauthenticated</span>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                        <span className="text-slate-600 text-[8px]">Referensi Log</span>
                        <span className="text-slate-300">#ERR_403_FORB</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
