import apiClient from "@/utils/apiClient";

export const removeCart = async (productId: number, size: string = '', color: string = '',quantity:number=1) => {
    const { data } = await apiClient.delete(`/cart/${productId}`, {
        params: { size, color,quantity }
    });
    console.log(data);
    return data;
};