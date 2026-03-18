import { useProfile } from "@/features/auth/api/useProfile";
import { useCartStore } from "../store/useCartStore";
import { useAddCart } from "./useAddCart";
import { useUpdateCart } from "./useUpdateCart";
import { useRemoveCart } from "./useRemoveCart";
import { useClearCart } from "./useClearCart";
import { useCart } from "./useCart";
import { CartItem } from "../types/cart";

export const useCartManage = () => {
    const { data: profile } = useProfile();
    const isLogin = !!profile;
    
    const serverCart = useCart();
    const serverAdd = useAddCart();
    const serverUpdate = useUpdateCart();
    const serverRemove = useRemoveCart();
    const serverClear = useClearCart();
    
    const localStore = useCartStore();
    
    const items = isLogin ? (serverCart.data || []) : localStore.items;
    const isLoading = isLogin ? serverCart.isLoading : false;
    
    const addItem = (item: CartItem) => {
        if (isLogin) {
            serverAdd.mutate({ 
                productId: item.productId, 
                quantity: item.quantity, 
                size: item.size, 
                color: item.color 
            });
        } else {
            localStore.addItem(item);
        }
    };

    const updateQuantity = (productId: number, quantity: number, size: string, color: string) => {
        if (isLogin) {
            serverUpdate.mutate({ productId, quantity, size, color });
        } else {
            localStore.updateQuantity(productId, quantity, size, color);
        }
    };

    const removeItem = (productId: number, size: string, color: string) => {
        if (isLogin) {
            serverRemove.mutate({ productId, size, color, quantity: 0 });
        } else {
            localStore.removeItem(productId, size, color);
        }
    };

    const clearCart = () => {
        if (isLogin) {
            serverClear.mutate();
        } else {
            localStore.clearCart();
        }
    };

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return {
        items,
        isLoading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        isLogin
    };
};
