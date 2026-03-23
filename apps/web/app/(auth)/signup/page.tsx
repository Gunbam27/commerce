'use client'

import SignupForm from "@/features/auth/components/SignupForm";

export default function SignupPage(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">회원가입</h1>
            <SignupForm />
        </div>
    )
}