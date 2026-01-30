//로그인 페이지

/* 
임시 확인용 URL - 추후 삭제 예정
http://localhost:3000/auth/login
*/

'use client';

import Link from 'next/link';
import Image from 'next/image';
import ArrowIcon from '@/public/icons/arrow-left.svg';
import DeleteIcon from '@/public/icons/delete-text.svg';
/* TODO 아이콘 이름 변경 visile > visible */
import hiddenIcon from '@/public/icons/hidden.svg';
import visibleIcon from '@/public/icons/visile.svg';
/* TODO 아이콘 이름 변경 Frame > check */
import CheckIcon from '@/public/icons/Frame.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const goBack = useRouter();
  const [email, setEmail] = useState('');
  const handleClearEmail = () => {
    setEmail('');
  };
  const [passwaord, setPassword] = useState('');
  const handleClearPassword = () => {
    setPassword('');
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex justify-center ">
      <div className="relative w-full px-11.5 bg-white">
        {/* 뒤로 가기 섹션 */}
        <Link href={'/auth'}>
          <button
            type="button"
            onClick={() => goBack.back()}
            aria-label="뒤로 가기 "
            className="absolute left-4 top-14 flex items-center flex-row gap-1.75 cursor-pointer"
          >
            <Image src={ArrowIcon} alt="뒤로 가기 아이콘" />
            <span className="text-[18px] leading-none font-medium">로그인</span>
          </button>
        </Link>

        {/* 로고 섹션 */}
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
            간편하게 로그인하고
          </p>
          <p className="mt-3.25 text-2xl leading-none font-medium">
            시작하세요!
          </p>
        </div>

        {/* 로그인 폼 섹션 */}
        <form className="flex flex-col gap-2 mt-25">
          {/* 로그인 - 이메일 입력(인풋) */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              className="w-full h-12 px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
            />
            {email.length > 0 && (
              <div
                onClick={handleClearEmail}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer "
              >
                <Image src={DeleteIcon} alt="삭제 아이콘" />
              </div>
            )}
          </div>

          {/* 로그인 - 비밀번호 입력(인풋) */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwaord}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full h-12 px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
            />
            {/* TODO 입력했을 경우, 눈 깜빡일 떄 보더 포커스 컬러로 유지 */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 cursor-pointer">
              {passwaord.length > 0 && (
                <div onClick={handleClearPassword}>
                  <Image src={DeleteIcon} alt="삭제 아이콘" />
                </div>
              )}
              <div onClick={togglePassword}>
                <Image
                  src={showPassword ? visibleIcon : hiddenIcon}
                  alt={
                    showPassword
                      ? '비밀번호 보기 아이콘'
                      : '비밀번호 숨기기 아이콘'
                  }
                />
              </div>
            </div>
          </div>

          {/* 로그인 - 자동 로그인(체크박스) */}
          <div className="flex items-center justify-end gap-1 mt-3">
            <div className="relative w-4 h-4">
              <input
                type="checkbox"
                id="autoLogin"
                className="peer absolute w-full h-full opacity-0 z-10 cursor-pointer"
              />
              <div className="w-full h-full bg-[#E5E5EA]"></div>
              <div className="absolute hidden peer-checked:flex items-center justify-center inset-0">
                <Image src={CheckIcon} alt="체크 아이콘" />
              </div>
            </div>
            <label
              htmlFor="autoLogin"
              className="text-[13px] text-[#B6BCC8] cursor-pointer"
            >
              자동 로그인
            </label>
          </div>

          {/* 로그인 - 로그인(버튼) */}
          {/* TODO: 로그인 href 제대로 넘어가는지 확인 */}
          <Link
            href="/products"
            className="relative flex items-center justify-center mt-7.5 w-full h-14 rounded-lg bg-[#60CFFF] text-white font-medium"
          >
            <span className="text-white">로그인</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
