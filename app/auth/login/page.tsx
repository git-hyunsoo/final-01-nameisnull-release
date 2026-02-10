//로그인 페이지

'use client';

/* 컴포넌트 및 훅 관리 */
import Header from '@/components/common/Header';
import Image from 'next/image';
import useAuthStore from '@/store/authStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/* 아이콘 */
import DeleteIcon from '@/public/icons/delete-text.svg';
import hiddenIcon from '@/public/icons/hidden.svg';
import visibleIcon from '@/public/icons/visile.svg';
import CheckIcon from '@/public/icons/Frame.svg';

export default function LoginPage() {
  /* ========== 상태 ========== */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false); //<----무한 루프 수정

  const { setUser, setToken, setAutoLogin, user, accessToken } = useAuthStore();
  const router = useRouter();

  // 자동 로그인 처리
  useEffect(() => {
    if (accessToken && user) {
      router.replace('/products');
    } else {
      setCheckingAuth(false);
    }
  }, [accessToken, user, router]);

  // 로그인 성공 시 처리
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
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.ok === 1) {
        const accessToken = data.item.token.accessToken;
        const userData = data.item; // User 전체 객체

        // 자동 로그인 설정을 먼저 적용
        setAutoLogin(isChecked);

        // 그 다음 토큰과 사용자 정보 저장 (storage가 자동으로 결정됨)
        setToken(accessToken);
        setUser(userData);

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

  // 입력 유효성 검사
  const isValid = email.includes('@') && password.length >= 8;

  // 자동 로그인 확인 중일 때 로딩 처리
  if (checkingAuth) {
    return <div className="min-h-screen bg-white" />;
    // return null; <----무한 루프 수정
  }

  /* ========== 랜더 ========== */
  return (
    <>
      <Header title="로그인" />
      <div className="min-h-screen flex justify-center ">
        <div className="relative w-full px-11.5 bg-white">
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
          <form onSubmit={handleLogin} className="flex flex-col gap-2 mt-25">
            {/* 로그인 - 이메일 입력(인풋) */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="w-full h-12 px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
              {email.length > 0 && (
                <div
                  onClick={() => setEmail('')}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full h-12 px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 cursor-pointer">
                {password.length > 0 && (
                  <div onClick={() => setPassword('')}>
                    <Image src={DeleteIcon} alt="삭제 아이콘" />
                  </div>
                )}
                <div onClick={() => setShowPassword(p => !p)}>
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
                  name="autoLogin"
                  checked={isChecked}
                  onChange={e => setIsChecked(e.target.checked)}
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
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
