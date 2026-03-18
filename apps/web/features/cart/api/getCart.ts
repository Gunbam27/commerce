import apiClient from "@/utils/apiClient";
import { ServerCartItem } from "@/features/cart/types/cart";

export const getCart = async (): Promise<ServerCartItem[]> => {
    const { data } = await apiClient.get("/cart");
    return data;
};