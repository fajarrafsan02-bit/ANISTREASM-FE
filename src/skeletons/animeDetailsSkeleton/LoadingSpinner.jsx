export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 bg-[#070204] z-50 flex flex-col items-center justify-center">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-2 border-[#1a0a0f]" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ff1e56] animate-spin" style={{ animationDuration: '1.2s' }} />
                <div className="absolute inset-3 rounded-full border-2 border-[#1a0a0f]" />
                <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-[#ff1e56]/60 animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#ff1e56] rounded-full da-animate-pulse" />
                </div>
            </div>
            <div className="mt-8 space-y-2 text-center">
                <p className="text-[#ff1e56] text-sm font-medium tracking-[0.3em] uppercase da-animate-pulse">Memuat</p>
                <div className="flex gap-1 justify-center">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-[#ff1e56]/60 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <div className="h-[2px] bg-gradient-to-r from-transparent via-[#ff1e56]/30 to-transparent" />
            </div>
        </div>
    );
}