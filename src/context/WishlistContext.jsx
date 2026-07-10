import { createContext, useContext } from "react";
import { useWishlist as useWishlistHook } from "../hooks/useWishList";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
    const wishlist = useWishlistHook(); 
    return (
        <WishlistContext.Provider value={wishlist}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) {
        throw new Error("useWishlist must be used within WishlistProvider");
    }
    return ctx;
}