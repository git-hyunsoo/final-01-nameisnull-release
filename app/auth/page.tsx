// 로그인, 회원가입 버튼 페이지

import Link from 'next/link';
import Image from 'next/image';
import LoginIcon from '@/public/icons/login.svg';
import SignupIcon from '@/public/icons/join.svg';

export default function AuthPage() {
  return (
    // 접근성: main 태그로 감싸 페이지의 주요 콘텐츠 영역임을 명시 (여백 영향 없음)
    <main className="min-h-[calc(100svh-56px)] flex items-center justify-center px-11.5">
      <div className="w-full max-w-sm -translate-y-6">
        {/* 로고 섹션 */}
        <div>
          <h1>
            <Image
              src="/icons/logo-blue.svg"
              alt="FOFO 로고"
              width={94}
              height={24}
              priority // 성능: 첫 화면의 핵심 로고이므로 우선순위 로딩 추가
            />
          </h1>
          <p className="mt-5 text-2xl leading-none font-medium">
            같이 나누는 마음
          </p>
          <p className="mt-3.25 text-2xl leading-none font-medium">
            FOFO에 오신걸 환영해요!
          </p>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex flex-col gap-2 mt-25">
          <Link
            href="/auth/login"
            className="relative flex items-center justify-center w-full h-14 rounded-lg bg-[#60CFFF] text-white font-medium"
          >
            <Image
              src={LoginIcon}
              alt="" // 접근성: 인접한 텍스트 "이메일로 로그인"과 중복되므로 비워둠 (스크린 리더 무시)
              className="absolute left-4"
              aria-hidden="true" // 접근성: 명시적으로 장식 요소임을 선언
            />
            <span className="text-white">이메일로 로그인</span>
          </Link>
          <Link
            href="/auth/signup"
            className="relative flex items-center justify-center w-full h-14 rounded-lg border border-[#60CFFF] text-[#60CFFF] font-medium"
          >
            <Image
              src={SignupIcon}
              alt="" // 접근성: 인접한 텍스트 "회원가입"과 중복되므로 비워둠
              className="absolute left-4"
              aria-hidden="true"
            />
            <span>회원가입</span>
          </Link>
          <Link
            href="/products"
            className="flex justify-center mt-5 text-[13px] text-[#B6BCC8]"
          >
            <span className="leading-none">먼저 둘러볼게요</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
