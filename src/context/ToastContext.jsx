import { useContext } from "react";
import { createContext } from "react";
import { useCallback } from "react";
import { useState } from "react"
import ToastContainer from "../components/ui/ToastContainer";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "success", duration = 3000) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type, duration }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration + 4000);
    },[]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    },[])

    return (
        <ToastContext value={{toasts,addToast,removeToast}}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast}/>
        </ToastContext>
    )
}

export function useToastContext() {
    const context = useContext(ToastContext);

    if (!context) throw new Error("useToastContext must be inside ToastProvider");

    return context;
}