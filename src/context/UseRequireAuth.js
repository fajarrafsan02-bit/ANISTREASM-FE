import { useAuth } from "./AuthContext";
import { useAuthModal } from "./AuthModalContext";

export function useRequireAuth() {
    const { isLoggedIn } = useAuth();
    const { openModal } = useAuthModal();

    const requireAuth = (action) => {
        if (!isLoggedIn) {
            openModal({ redirectAction: action });
        } else {
            action();
        }
    }

    return { requireAuth };
}