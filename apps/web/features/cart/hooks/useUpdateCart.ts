import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCart } from "@/features/cart/api/updateCart"
import { UpdateCartItemDto } from "@/features/cart/types/cart"

export const useUpdateCart =() => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(body:UpdateCartItemDto)=>updateCart(body.productId,body),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["cart"]})
        }
    })
}