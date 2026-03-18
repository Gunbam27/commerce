import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCart } from "@/features/cart/api/addCart";
import { AddToCartDto } from "@/features/cart/types/cart";

export const useAddCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: AddToCartDto) => addCart(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        }
    });
};