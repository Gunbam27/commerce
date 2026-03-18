import { useQuery } from "@tanstack/react-query"
import { CartItem, ServerCartItem } from "@/features/cart/types/cart"
import { getCart } from "@/features/cart/api/getCart"

export const useCart = () => {
    return useQuery<ServerCartItem[], Error, CartItem[]>({
        queryKey: ["cart"],
        queryFn: getCart,
        select: (data) => data.map(item => ({
            id: item.id,
            productId: item.productId,
            name: item.product.name,
            price: Number(item.product.price),
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.product.images[0] || '/assets/clothes.png'
        }))
    });
};