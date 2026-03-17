import { create } from "zustand";
import { User } from "@/features/auth/type/auth";
import Cookies from "js-cookie";
import apiClient from "@/utils/apiClient";

interface AuthState {
    user:User | null;
    isLoggedIn:boolean;
    token: string | null;
    loginAction:(user:User,token:string)=>void;
    logoutAction:()=>Promise<void>;
    setToken:(token:string)=>void;
}

export const useAuthStore = create<AuthState>((set)=>({
    user:null,
    isLoggedIn:false,
    token:null,
    setToken:(token)=>set({token,isLoggedIn:true}),
    loginAction:(userData,token)=>{
        set({user:userData,isLoggedIn:true,token:token})
        // AccessToken은 메모리에만 저장하고 쿠키에서는 제거 (선택)
        Cookies.remove('auth-token');
    },
    logoutAction:async ()=>{
        try {
            // 백엔드 쿠키(refreshToken) 삭제 요청
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            // 클라이언트 상태 초기화
            set({user:null,isLoggedIn:false,token:null})
            Cookies.remove('auth-token');
        }
    },
}));