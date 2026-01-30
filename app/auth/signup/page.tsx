//회원가입 페이지

/* 
임시 확인용 URL - 추후 삭제 예정
http://localhost:3000/signup
*/

'use client';

import Link from 'next/link';
import Image from 'next/image';
import ArrowIcon from '@/public/icons/arrow-left.svg';
import DeleteIcon from '@/public/icons/delete-text.svg';
import hiddenIcon from '@/public/icons/hidden.svg';
import visibleIcon from '@/public/icons/visile.svg';
import CheckIcon from '@/public/icons/Frame.svg';
import ArrowBottomIcon from '@/public/icons/arrow-bottom.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const goBack = useRouter();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  /* const handleClearEmail = () => {
    setEmail('');
  }; */
  const [password, setPassword] = useState('');
  const handleClearPassword = () => {
    setPassword('');
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [category, setCategory] = useState('dog');
  const [breeds, setBreeds] = useState('');
  const [petName, setPetName] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petAge, setPetAge] = useState('');
  /*   const [isOpen, setIsOpen] = useState(false); */

  return (
    <div className="min-h-screen flex justify-center">
      <div className="relative w-full px-4 bg-white">
        {/* 뒤로 가기 섹션 */}
        <Link href={'/auth/login'}>
          <button
            type="button"
            onClick={() => goBack.back()}
            aria-label="뒤로 가기 "
            className="absolute left-4 top-14 flex items-center flex-row gap-1.75 cursor-pointer"
          >
            <Image src={ArrowIcon} alt="뒤로 가기 아이콘" />
            <span className="text-[18px] leading-none font-medium">
              회원가입
            </span>
          </button>
        </Link>

        <form className="flex flex-col gap-4 mt-27.5">
          {/* 회원가입(필수 정보) 폼 섹션 */}
          <h2 className="text-[18px] font-semibold text-[#0F1218]">필수정보</h2>
          {/* 필수 정보 - 프로필 사진 */}
          {/* TODO 프로필 아이콘 추가 */}
          <div className="flex items-center gap-5">
            <label
              htmlFor="profileUpload"
              className="relative cursor-pointer group"
            >
              <div className="relative w-17.5 h-17.5 flex items-center justify-center border border-white rounded-full bg-[#E5E5EA] overflow-hidden ">
                <Image
                  src={DeleteIcon}
                  alt="프로필 이미지"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 flex items-center justify-center border border-white rounded-full bg-[#8A8F99]">
                <Image
                  src="/icons/add.svg"
                  alt="플러스 아이콘"
                  width={18}
                  height={18}
                />
              </div>
              <input
                type="file"
                id="profileUpload"
                className="hidden"
                accept="image/*"
              />
            </label>

            <div className="flex flex-col gap-2.75 text-[20px] leading-none font-medium">
              <p>같이 나누는 마음</p>
              <p>FOFO에 오신걸 환영해요!</p>
            </div>
          </div>

          {/* 필수 정보 - 닉네임 입력(인풋) */}
          <div className="mt-3.5">
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
              닉네임<span className="ml-0.5 text-[#60CFFF]">*</span>
            </p>

            <div className="relative mt-1.5 h-12">
              <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
                className="w-full h-full px-4 pr-21.25 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
              <button
                type="button"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-18.5 h-8.5 rounded-lg text-[13px] font-medium text-[#60CFFF] bg-[#E8F8FF] cursor-pointer"
              >
                중복 확인
              </button>
            </div>

            <div className="mt-2 ml-1 flex flex-col gap-1">
              <p className="text-[13px] text-[#B6BCC8]">
                알파벳, 숫자, 특수문자 포함 10자 이내
              </p>
              {/* TODO 조건에 따라 아래 문구 노출
                {nicknameError && (
                  <p className="text-[13px] text-[#FF4646]">
                    이미 사용 중인 닉네임입니다.
                  </p>
                )}
              */}
            </div>
          </div>
          {/* 필수 정보 - 이메일 입력(인풋) */}
          <div>
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
              이메일<span className="ml-0.5 text-[#60CFFF]">*</span>
            </p>

            <div className="relative mt-1.5 h-12">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="w-full h-full px-4 pr-21.25 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
              <button
                type="button"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-18.5 h-8.5 rounded-lg text-[13px] font-medium text-[#60CFFF] bg-[#E8F8FF] cursor-pointer"
              >
                중복 확인
              </button>
            </div>

            {/* TODO 조건에 따라 아래 문구 노출
            <div className="ml-1 flex flex-col">
                {emailError && (
                  <p className="mt-2 text-[13px] text-[#FF4646]">
                    이미 가입한 이메일입니다.
                  </p>
                )}
            </div>
            */}
          </div>
          {/* 필수 정보 - 비밀번호 입력(인풋) */}
          {/* TODO 비밀번호, 비밀번호 확인 2개 인풋으로 변경 필요 */}
          <div className="flex flex-col gap-1.5">
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
              비밀번호<span className="ml-0.5 text-[#60CFFF]">*</span>
            </p>

            <div className="relative h-12">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full h-12 px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 cursor-pointer">
                {password.length > 0 && (
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
            {/* TODO 조건에 따라 아래 문구 노출
            {passwordError && (
              <p className="mt-2 ml-1 text-[13px] text-[#FF4646]">
                비밀번호 형식이 올바르지 않습니다.
              </p>
            )}
            */}
            <div className="relative h-12">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호를 한 번 더 입력하세요"
                className="w-full h-12 px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 cursor-pointer">
                {password.length > 0 && (
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
            <div className="ml-1 flex flex-col gap-1">
              <p className="text-[13px] text-[#B6BCC8]">
                알파벳, 숫자, 특수문자 포함 8~24자
              </p>
              {/* TODO 조건에 따라 아래 문구 노출
                {isError && (
                  <p className="text-[13px] text-[#FF4646]">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
              */}
            </div>
          </div>
          {/* 회원가입(선택 정보) 폼 섹션 */}
          <h2 className="mt-6 text-[18px] font-semibold text-[#0F1218]">
            반려동물 정보(선택)
          </h2>
          {/* 선택 정보 - 카테고리 선택(버튼) */}
          <div>
            <div>
              <p className="ml-1 text-[13px] text-[#B6BCC8]">
                AI 맞춤 상품 추천을 위해 정보를 입력해주세요
              </p>
              <div className="flex gap-3.75 mt-4">
                <button
                  type="button"
                  onClick={() => setCategory('dog')}
                  className={`flex-1 h-13 rounded-lg text-[15px] ${
                    category === 'dog'
                      ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                      : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                  }`}
                >
                  강아지
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('cat')}
                  className={`flex-1 h-13 rounded-lg text-[15px] ${
                    category === 'cat'
                      ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                      : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                  }`}
                >
                  고양이
                </button>
              </div>
            </div>
          </div>
          {/* 선택 정보 - 견종/모종 입력(인풋) */}
          {/* TODO 잘 모르겠어요 선택 시 비활성화 */}
          <div>
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
              견종/묘종
            </p>
            <div className="relative mt-1.5 h-12">
              <input
                type="text"
                value={breeds}
                onChange={e => setBreeds(e.target.value)}
                placeholder="견종/묘종을 입력하세요"
                className="w-full h-full px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
            </div>

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
                잘 모르겠어요
              </label>
            </div>
          </div>
          {/* 선택 정보 - 반려동물 이름 입력(인풋) */}
          <div>
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">이름</p>
            <div className="relative mt-1.5 h-12">
              <input
                type="text"
                value={petName}
                onChange={e => setPetName(e.target.value)}
                placeholder="반려동물 이름을 입력하세요"
                className="w-full h-full px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
            </div>
          </div>
          {/* 선택 정보 - 반려동물 체중 입력(인풋) */}
          {/* TODO 위아래 화살표? 삭제 */}
          <div>
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">체중</p>
            <div className="relative mt-1.5 h-12">
              <input
                type="number"
                value={petWeight}
                onChange={e => setPetWeight(e.target.value)}
                placeholder="반려동물 체중을 입력하세요"
                className="w-full h-full px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#0F1218]">
                kg
              </span>
            </div>
          </div>
          {/* 선택 정보 - 반려동물 이름 입력(아코디언+라디오) */}
          <div>
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
              연령대
            </p>
            <div className="flex items-center mt-1.5 w-full h-12 border border-[#E5E5EA] rounded-lg cursor-pointer">
              <p className="w-full px-4 text-[15px] text-[#8A8F99]">
                반려동물 연령대를 선택하세요
              </p>
              <Image
                src={ArrowBottomIcon}
                alt="화살표 아이콘"
                className="relative right-4"
              />
              {/* TODO 연령대 클릭시 보이는 박스 */}
            </div>
          </div>

          {/* 회원가입 - 회원가입(버튼) */}
          <Link
            href="/auth/login"
            className="relative flex items-center justify-center mt-10 mb-5 pb-safe w-full h-14 rounded-lg bg-[#60CFFF] text-white font-medium"
          >
            <span className="text-white">회원가입</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
