'use client'
import { useState } from "react";
import { useLogin } from "@/features/auth/api/useLogin";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginForm(){
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const queryClient = useQueryClient();
    const loginAction = useAuthStore((state)=>state.loginAction);

    const {mutate:login,isPending,isError} = useLogin();

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        login({email,password},
          {
            onSuccess: (data) => {
              const user = data.user;
              queryClient.setQueryData(['profile'], user);
              loginAction(user, data.accessToken);
              router.push('/');
            },
            onError:(error:any)=>{
              console.log(error);
              alert("로그인에 실패했습니다.");

            }
          }
        );

    }
return (
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-sm mx-auto rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col gap-5 mb-[8rem]"
  >

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">이메일</label>
      <input
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition"
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">비밀번호</label>
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition"
      />
    </div>

    <button
      type="submit"
      disabled={isPending}
      className="h-10 rounded-md bg-black text-white text-sm font-medium transition hover:bg-neutral-800 disabled:opacity-50"
    >
      {isPending ? "로그인 중..." : "로그인"}
    </button>

    {isError && (
      <p className="text-sm text-red-500">
        로그인에 실패했습니다.
      </p>
    )}
  </form>
)
}