import apiClient from "@/utils/apiClient";

export const clearCart = async()=>{
    const {data} = await apiClient.delete("/cart")
    console.log(data);
    return data;
}