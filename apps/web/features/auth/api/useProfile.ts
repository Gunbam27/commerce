import { useQuery } from "@tanstack/react-query"
import apiClient from "@/utils/apiClient"
import { ProfileResponse } from "@/features/auth/type/auth"
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const getProfile = async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
}

export const useProfile = () => {
    const { token } = useAuthStore();
    
    return useQuery<ProfileResponse>({
        queryKey: ['profile'],
        queryFn: () => getProfile(),
        enabled: !!token,
    })
}