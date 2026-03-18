import apiClient from "@/utils/apiClient";
import { UpdateCartItemDto } from "../types/cart";

export const updateCart = async(productId:number,body:UpdateCartItemDto)=>{
    const {data} = await apiClient.patch(`/cart/${productId}`,body)
    console.log(data);
    return data;
}