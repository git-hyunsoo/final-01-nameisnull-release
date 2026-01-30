// 로그인, 회원가입 버튼 페이지

import Link from 'next/link';
import Image from 'next/image';
import LoginIcon from '@/public/icons/login.svg';
import SignupIcon from '@/public/icons/join.svg';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full px-11.5">
        {/* 로고 섹션 */}
        {/* TODO: 로고 svg 추가 - icon폴더에 넣나? */}
        <div className="mt-42.5">
          <h1>
            <Image
              src="/icons/logo-blue.svg"
              alt="FOFO 로고"
              width={94}
              height={24}
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
        {/* TODO: 아이콘 컬러 BK > WH, primary */}
        {/* TODO: 아이콘 이름 join > signup */}
        {/* TODO: 먼저 둘러보기 href 제대로 넘어가는지 확인 */}
        <div className="flex flex-col gap-2 mt-25">
          <Link
            href="/auth/login"
            className="relative flex items-center justify-center w-full h-14 rounded-lg bg-[#60CFFF] text-white font-medium"
          >
            <Image
              src={LoginIcon}
              alt="로그인 아이콘"
              className="absolute left-4"
            />
            <span className="text-white">이메일로 로그인</span>
          </Link>
          <Link
            href="/auth/signup"
            className="relative flex items-center justify-center w-full h-14 rounded-lg border border-[#60CFFF] text-[#60CFFF] font-medium"
          >
            <Image
              src={SignupIcon}
              alt="회원가입 아이콘"
              className="absolute left-4"
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
    </div>
  );
}
