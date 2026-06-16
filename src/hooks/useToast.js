import { useToastContext } from "../context/ToastContext";

export default function useToast() {
    const { addToast } = useToastContext();

    return {
        success: (message, duration) => addToast(message, "success", duration),
        error: (message, duration) => addToast(message, "error", duration),
        info: (message, duration) => addToast(message, "info", duration),
        warning: (message, duration) => addToast(message, "warning", duration) // Tambahkan ini
    }
}