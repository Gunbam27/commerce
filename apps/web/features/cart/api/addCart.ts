import apiClient from "@/utils/apiClient";
import { AddToCartDto } from "../types/cart";

export const addCart = async (body:AddToCartDto) => {
    const {data} = await apiClient.post("/cart",body)
    console.log(data);
    return data;
}