import { useContext, useState, createContext, useCallback, useRef } from "react";

const AuthModalStateContext = createContext();
const AuthModalActionContext = createContext();

export function AuthModalProvider({ children }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        defaultMode: "login",
    });

    const redirectActionRef = useRef(null);

    const openModal = useCallback(({ redirectAction, mode = "login" } = {}) => {
        redirectActionRef.current = redirectAction ?? null;
        setModalState({ isOpen: true, defaultMode: mode });
    }, []);

    const closeModal = useCallback(() => {
        redirectActionRef.current = null;
        setModalState(prev => ({ ...prev, isOpen: false }));
    }, []);

    const getRedirectAction = useCallback(() => redirectActionRef.current, []);

    return (
        <AuthModalActionContext.Provider value={{ openModal, closeModal, getRedirectAction }}>
            <AuthModalStateContext.Provider value={{
                isOpen: modalState.isOpen,
                defaultMode: modalState.defaultMode,
            }}>
                {children}
            </AuthModalStateContext.Provider>
        </AuthModalActionContext.Provider>
    );
}

export const useAuthModal = () => {
    const state = useContext(AuthModalStateContext);
    const actions = useContext(AuthModalActionContext);
    return { ...state, ...actions };
};

export const useAuthModalState = () => useContext(AuthModalStateContext);
export const useAuthModalActions = () => useContext(AuthModalActionContext);