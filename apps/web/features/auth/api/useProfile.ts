import { useQuery } from "@tanstack/react-query"
import apiClient from "@/utils/apiClient"
import { ProfileResponse } from "@/features/auth/type/auth"

export const getProfile = async () =>{
    const response = await apiClient.get('/auth/profile');
    return response.data;
}

export const useProfile = () =>{
    return useQuery<ProfileResponse>({
        queryKey:['profile'],
        queryFn:()=>getProfile()

    })
}