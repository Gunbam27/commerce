import { useMutation } from "@tanstack/react-query"
import apiClient from "@/utils/apiClient"
import { LoginRequest, LoginResponse } from "@/features/auth/type/auth";
import Cookies from "js-cookie";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const useLogin = () => {
    const { loginAction } = useAuthStore();
    
    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: async (data: LoginRequest) => {
            const response = await apiClient.post('/auth/login', data)
            return response.data;
        },
        onSuccess: (data) => {
            if (data.accessToken && data.user) {
                loginAction(data.user, data.accessToken);
                Cookies.set('accessToken', data.accessToken, { expires: 1 });
            }
        }
    })
}