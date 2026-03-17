"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignup } from "@/features/auth/api/useSignUp";

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp, isPending } = useSignup();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. 이름 검사 (2자 이상)
    if (name.trim().length < 2) {
      setErrorMsg("이름은 최소 2자 이상 입력해주세요.");
      return;
    }

    // 2. 이메일 형식 검사 (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("올바른 이메일 형식이 아닙니다.");
      return;
    }

    // 3. 비밀번호 검사 (6자 이상 + 영문/숫자 필수)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMsg("비밀번호는 영문과 숫자를 포함하여 6자 이상이어야 합니다.");
      return;
    }

    signUp({ name, email, password }, {
      onSuccess: () => {
        setShowModal(true);
      },
      onError: (error: any) => {
        if (error.response?.status === 409) {
          setErrorMsg("이미 존재하는 이메일입니다.");
        } else {
          setErrorMsg("회원가입에 실패했습니다.");
        }
      }
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col gap-5 mb-[8rem]"
      >
        <div className="flex flex-col gap-1">
          <p className="text-sm text-neutral-500">새로운 계정을 만들어보세요</p>
        </div>

        {/* 이름 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">이름</label>
          <input
            type="text"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-10 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>

        {/* 이메일 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">이메일</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-10 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-10 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="h-10 rounded-md bg-black text-white text-sm font-medium transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {isPending ? "가입 중..." : "회원가입"}
        </button>

        {errorMsg && (
          <p className="text-sm text-red-500">{errorMsg}</p>
        )}
      </form>

      {/* 성공 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold">회원가입 완료!</h2>
                <p className="text-sm text-neutral-500">
                  반갑습니다! 로그인 페이지로 이동합니다.
                </p>
              </div>
              <button
                onClick={() => router.push('/login')}
                className="w-full h-11 rounded-xl bg-black text-white text-sm font-semibold transition hover:bg-neutral-800 active:scale-95"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}