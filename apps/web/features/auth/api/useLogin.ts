import { useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "@/utils/apiClient"
import { LoginRequest } from "@/features/auth/type/auth";

export const useLogin=()=>{
    return useMutation({
        mutationFn:async (data:LoginRequest)=>{
            const response = await apiClient.post('/auth/login',data)
            return response.data;
        }
    })
}