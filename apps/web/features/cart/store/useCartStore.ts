import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore } from '@/features/cart/types/cart';

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            
            addItem: (newItem) => {
                const items = get().items;
                const existingItem = items.find(
                    (item) => 
                        item.productId === newItem.productId && 
                        item.size === newItem.size && 
                        item.color === newItem.color
                );

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.productId === newItem.productId && 
                            item.size === newItem.size && 
                            item.color === newItem.color
                                ? { ...item, quantity: item.quantity + newItem.quantity }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, newItem] });
                }
            },

            removeItem: (productId, size, color) => {
                set({
                    items: get().items.filter(
                        (item) => 
                            !(item.productId === productId && item.size === size && item.color === color)
                    ),
                });
            },

            updateQuantity: (productId, quantity, size, color) => {
                set({
                    items: get().items.map((item) =>
                        item.productId === productId && item.size === size && item.color === color
                            ? { ...item, quantity }
                            : item
                    ),
                });
            },

            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
        }
    )
);
