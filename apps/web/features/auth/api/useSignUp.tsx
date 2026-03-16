import { useMutation } from "@tanstack/react-query"
import apiClient from "../../../utils/apiClient"
import { SignUpRequest } from "../type/auth";

export const useSignUp = ()=>{
    return useMutation({
        mutationFn:async (data:SignUpRequest)=> { 
            const response = await apiClient.post('/auth/signup',data)
            return response.data
        }
    })
}