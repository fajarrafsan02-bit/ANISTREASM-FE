import Toast from "./Toast";

export default function ToastContainer({ toasts, onRemove }) {
    if (toasts.length === 0) return null;

    return (
        <div className="
            fixed z-[99999] flex flex-col gap-3 pointer-events-none
            
            /* Mobile (hingga 320px): Full width dengan margin kiri-kanan kecil, stack dari bawah */
            bottom-4 left-3 right-3
            items-center sm:items-end
            
            /* sm+: Pindah ke pojok kanan bawah, lebar sesuai konten */
            sm:bottom-6 sm:left-auto sm:right-6
            sm:w-auto
        ">
            {toasts.map((toast) => (
                <div 
                    key={toast.id} 
                    className="pointer-events-auto w-full max-w-[calc(100vw-24px)] sm:w-auto transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                    <Toast toast={toast} onRemove={onRemove} />
                </div>
            ))}
        </div>
    );
}