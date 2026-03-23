import { useQuery } from "@tanstack/react-query"
import apiClient from "../../../utils/apiClient"
import { Product } from "../types/product"

export const useProduct = (id: string | number) => {
    return useQuery<Product>({
        queryKey: ['product', id],
        queryFn: async () => {
            if (!id) throw new Error("Product ID is required");
            const response = await apiClient.get(`/products/${id}`);
            return response.data;
        },
        enabled: !!id
    })
}
