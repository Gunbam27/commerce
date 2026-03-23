'use client'

import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">로그인</h1>
            <LoginForm />
        </div>
    )
}