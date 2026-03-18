import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeCart } from "@/features/cart/api/removeCart"
import { UpdateCartItemDto } from "@/features/cart/types/cart"

export const useRemoveCart =()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({productId,size,color,quantity}:UpdateCartItemDto)=>removeCart(productId,size,color,quantity),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["cart"]})
        }
    })
}