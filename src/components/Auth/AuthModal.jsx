import { useState, useEffect } from "react";
import AuthModalLayout from "./authModal/AuthModalLayout";
import AuthModalHeader from "./authModal/AuthModalheader";
import AuthModalTabs from "./authModal/AuthModalTabs";
import AuthForm from "./authModal/authForm/AuthForm";
import SocialLogin from "./authModal/SocialLogin";
import AuthModalFooter from "./authModal/AuthModalFooter";
import { useAuthModal } from "../../context/AuthModalContext";
import { useAuth } from "../../context/AuthContext";

export default function AuthModal() {
    const { isOpen, closeModal, getRedirectAction, defaultMode } = useAuthModal();
    const { login } = useAuth();
    const [activeTab, setActiveTab] = useState("login");

    useEffect(() => {
        if (isOpen) setActiveTab(defaultMode ?? "login");
    }, [isOpen, defaultMode]);

    const switchTab = () => setActiveTab((prev) => (prev === "login" ? "register" : "login"));

    const handleSuccess = (userData) => {
        console.log("MASUK SINI JUGA")
        login(userData);
        closeModal();
        getRedirectAction()?.();
    };

    return (
        <AuthModalLayout isOpen={isOpen} onClose={closeModal}>
            <AuthModalHeader />
            <AuthModalTabs activeTab={activeTab} onChange={setActiveTab} />
            <AuthForm activeTab={activeTab} onSuccess={handleSuccess} onChange={setActiveTab} />
            <SocialLogin />
            <AuthModalFooter activeTab={activeTab} onSwitch={switchTab} />
        </AuthModalLayout>
    );
}