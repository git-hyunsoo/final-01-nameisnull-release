// 로그인 페이지

'use client';

import Header from '@/components/common/Header';
import Image from 'next/image';
import useAuthStore from '@/store/authStore';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@/public/icons/delete-text.svg';
import hiddenIcon from '@/public/icons/hidden.svg';
import visibleIcon from '@/public/icons/visile.svg';
import CheckIcon from '@/public/icons/Frame.svg';

export default function LoginPage() {
  const [email, setEmail] = useState('cat2@market.com');
  const [password, setPassword] = useState('11111111');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const { setUser, setToken, setAutoLogin, user, accessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (accessToken && user) {
      router.replace('/products');
    } else {
      setCheckingAuth(false);
    }
  }, [accessToken, user, router]);

  // 성능: 유효성 검사 로직 메모이제이션
  const isValid = useMemo(
    () => email.includes('@') && password.length >= 8,
    [email, password]
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (data.ok === 1) {
        setAutoLogin(isChecked);
        setToken(data.item.token.accessToken);
        setUser(data.item);
        router.push('/products');
      } else {
        alert(data.message);
      }
    } catch {
      alert('네트워크 오류');
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAuth) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <>
      <Header title="로그인" />
      <main className="min-h-[calc(100svh-56px)] flex items-center justify-center px-11.5">
        <div className="w-full max-w-sm -translate-y-6">
          {/* 로고 섹션 */}
          <div>
            <h1>
              <Image
                src="/icons/logo-blue.svg"
                alt="FOFO 로고" // 접근성: 의미 있는 대체 텍스트
                width={94}
                height={24}
                priority // 성능: LCP 이미지 우선 로드
              />
            </h1>
            <p className="mt-5 text-2xl leading-none font-medium">
              간편하게 로그인하고
            </p>
            <p className="mt-3.25 text-2xl leading-none font-medium">
              시작하세요!
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-2 mt-25">
            {/* 이메일 입력 */}
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                이메일 주소
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="w-full h-12 px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
              {email.length > 0 && (
                <button
                  type="button" // 접근성: 기본 submit 방지
                  onClick={() => setEmail('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                  aria-label="이메일 입력란 비우기"
                >
                  <Image src={DeleteIcon} alt="" />
                </button>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full h-12 px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2">
                {password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setPassword('')}
                    aria-label="비밀번호 입력란 비우기"
                  >
                    <Image src={DeleteIcon} alt="" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={
                    showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                  }
                >
                  <Image
                    src={showPassword ? visibleIcon : hiddenIcon}
                    alt="" // 아이콘 자체보다 버튼의 aria-label이 중요
                  />
                </button>
              </div>
            </div>

            {/* 자동 로그인 */}
            <div className="flex items-center justify-end gap-1 mt-3">
              <div className="relative w-4 h-4">
                <input
                  type="checkbox"
                  id="autoLogin"
                  name="autoLogin"
                  checked={isChecked}
                  onChange={e => setIsChecked(e.target.checked)}
                  className="peer absolute w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <div className="w-full h-full bg-[#E5E5EA]"></div>
                <div className="absolute hidden peer-checked:flex items-center justify-center inset-0 pointer-events-none">
                  <Image src={CheckIcon} alt="" />
                </div>
              </div>
              <label
                htmlFor="autoLogin"
                className="text-[13px] text-[#B6BCC8] cursor-pointer"
              >
                자동 로그인
              </label>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`mt-7.5 w-full h-14 rounded-lg transition-colors 
                  ${
                    isValid
                      ? 'text-white bg-[#60CFFF] cursor-pointer'
                      : 'text-[#8A8F99] bg-[#E5E5EA] cursor-not-allowed'
                  } 
                  ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
