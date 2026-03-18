"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // localStorage에서 대기 시간을 가져옴
    const hideUntil = localStorage.getItem("promo_banner_hide_until");
    const now = Date.now();

    // 숨김 기한이 없거나, 기한이 지났다면 배너를 보여줌
    if (!hideUntil || now > Number(hideUntil)) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // 현재 시간 + 24시간(1일) 뒤의 타임스탬프 저장
    const dayInMs = 24 * 60 * 60 * 1000;
    const hideUntil = Date.now() + dayInMs;
    localStorage.setItem("promo_banner_hide_until", hideUntil.toString());
  };

  // 서버 사이드 렌더링과의 하이드레이션 불일치를 피하기 위해 마운트 전에는 아무것도 렌더링하지 않음
  if (!isMounted) return null;

  return (
    <div 
      className={`w-full bg-black overflow-hidden transition-all duration-500 ease-in-out flex items-center justify-center ${
        isVisible ? "h-8 opacity-100" : "h-0 opacity-0"
      }`}
    >
      <div className="relative w-full max-w-[1240px] flex items-center justify-center">
        <p className="text-white text-[10px] sm:text-xs md:text-sm">
          Sign up and get 20% off your first order.&nbsp;
        </p>
        <Link 
          href="/signup" 
          className="text-white text-[10px] sm:text-xs md:text-sm underline font-medium hover:text-neutral-300 transition"
        >
          Sign Up Now
        </Link>
        <button 
          onClick={handleClose}
          className="absolute right-4 sm:right-10 text-white text-sm hover:opacity-70 transition cursor-pointer"
          aria-label="Close banner for 24 hours"
        >
          X
        </button>
      </div>
    </div>
  );
}