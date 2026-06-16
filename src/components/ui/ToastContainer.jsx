// ToastContainer.jsx
import Toast from "./Toast";

export default function ToastContainer({ toasts, onRemove }) {
    if (toasts.length === 0) return null;

    return (
        <div className="
            fixed z-99999 flex flex-col gap-2 pointer-events-none

            /* Mobile: full width, mepet ke tepi, dari bawah */
            bottom-4 left-3 right-3
            items-stretch

            /* sm+: kembali ke pojok kanan bawah, lebar otomatis */
            sm:bottom-6 sm:left-auto sm:right-6
            sm:items-end
            sm:w-auto
        ">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto w-full sm:w-auto">
                    <Toast toast={toast} onRemove={onRemove} />
                </div>
            ))}
        </div>
    );
}