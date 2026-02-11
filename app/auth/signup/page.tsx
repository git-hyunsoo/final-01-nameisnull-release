// 회원가입 페이지

'use client';

import Image from 'next/image';
import DeleteIcon from '@/public/icons/delete-text.svg';
import hiddenIcon from '@/public/icons/hidden.svg';
import visibleIcon from '@/public/icons/visile.svg';
import CheckIcon from '@/public/icons/Frame.svg';
import { useState, useCallback } from 'react';
import Header from '@/components/common/Header';
import ToggleButton from '@/components/shared/ToggleButton';
import BaseInput from '@/components/shared/BaseInput';
import BaseSelect from '@/components/shared/BaseSelect';
import SubmitButton from '@/components/shared/SubmitButton';

export default function SignupPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [petType, setPetType] = useState('dog');
  const [petBreed, setPetBreed] = useState('');
  const [petName, setPetName] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petAge, setPetAge] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting] = useState(false);

  const ageOptions = ['(0~1) 주니어', '(2~6) 어덜트', '(7+) 시니어'];

  const handleClearPassword = () => setPassword('');
  const togglePassword = () => setShowPassword(!showPassword);

  const handleWeightChange = useCallback((val: string) => {
    const rawValue = val.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setPetWeight(rawValue);
  }, []);

  return (
    <>
      <Header title="회원가입" />
      <div className="min-h-screen flex justify-center">
        <div className="relative w-full px-4 pb-40 bg-white">
          <form className="flex flex-col gap-4 mt-7.5">
            {/* 필수정보 영역 */}
            <div
              role="group"
              aria-labelledby="essential-title"
              className="flex flex-col gap-4"
            >
              <h2
                id="essential-title"
                className="text-[18px] font-semibold text-[#0F1218]"
              >
                필수정보
              </h2>
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

              {/* 닉네임 입력 */}
              <div className="mt-3.5">
                <label
                  htmlFor="nickname"
                  className="ml-1 text-[13px] font-medium text-[#0F1218]"
                >
                  닉네임<span className="ml-0.5 text-[#60CFFF]">*</span>
                </label>
                <div className="relative mt-1.5 h-12">
                  <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    placeholder="닉네임을 입력하세요"
                    className="w-full h-full px-4 pr-21.25 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
                  />
                  <button
                    type="button"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-18.5 h-8.5 rounded-lg text-[13px] font-medium text-[#60CFFF] bg-[#E8F8FF]"
                  >
                    중복 확인
                  </button>
                </div>
                <div className="mt-2 ml-1 flex flex-col gap-1">
                  <p className="text-[13px] text-[#B6BCC8]">
                    알파벳, 숫자, 특수문자 포함 10자 이내
                  </p>
                </div>
              </div>

              {/* 이메일 입력 */}
              <div>
                <label
                  htmlFor="email"
                  className="ml-1 text-[13px] font-medium text-[#0F1218]"
                >
                  이메일<span className="ml-0.5 text-[#60CFFF]">*</span>
                </label>
                <div className="relative mt-1.5 h-12">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="이메일을 입력하세요"
                    className="w-full h-full px-4 pr-21.25 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
                  />
                  <button
                    type="button"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-18.5 h-8.5 rounded-lg text-[13px] font-medium text-[#60CFFF] bg-[#E8F8FF]"
                  >
                    중복 확인
                  </button>
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="ml-1 text-[13px] font-medium text-[#0F1218]"
                >
                  비밀번호<span className="ml-0.5 text-[#60CFFF]">*</span>
                </label>
                <div className="relative h-12">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full h-12 px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {password.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearPassword}
                        aria-label="입력 지우기"
                      >
                        <Image src={DeleteIcon} alt="" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={togglePassword}
                      aria-label={
                        showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                      }
                    >
                      <Image
                        src={showPassword ? visibleIcon : hiddenIcon}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
                <div className="relative h-12">
                  <label htmlFor="passwordConfirm" className="sr-only">
                    비밀번호 확인
                  </label>
                  <input
                    id="passwordConfirm"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 한 번 더 입력하세요"
                    className="w-full h-12 px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {password.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearPassword}
                        aria-label="입력 지우기"
                      >
                        <Image src={DeleteIcon} alt="" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={togglePassword}
                      aria-label={
                        showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                      }
                    >
                      <Image
                        src={showPassword ? visibleIcon : hiddenIcon}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
                <div className="ml-1 flex flex-col gap-1">
                  <p className="text-[13px] text-[#B6BCC8]">
                    알파벳, 숫자, 특수문자 포함 8~24자
                  </p>
                </div>
              </div>
            </div>

            {/* 선택 정보 영역 */}
            <div
              role="group"
              aria-labelledby="pet-info-title"
              className="flex flex-col gap-4"
            >
              <h2
                id="pet-info-title"
                className="mt-6 text-[18px] font-semibold text-[#0F1218]"
              >
                반려동물 정보(선택)
              </h2>
              <ToggleButton
                label="반려동물 선택"
                options={[
                  { label: '강아지', value: 'dog' },
                  { label: '고양이', value: 'cat' },
                ]}
                selectedValue={petType}
                onChange={value => setPetType(value as 'dog' | 'cat')}
              />
              <div className="mt-2.5">
                <BaseInput
                  id="petBreed"
                  label="견종/묘종"
                  value={petBreed}
                  onChange={setPetBreed}
                  placeholder="견종/묘종을 입력하세요."
                  disabled={isChecked}
                />
                <div className="flex items-center justify-end gap-1 mt-3">
                  <div className="relative w-4 h-4">
                    <input
                      type="checkbox"
                      id="unknownBreed"
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
                    htmlFor="unknownBreed"
                    className="text-[13px] text-[#8A8F99] cursor-pointer"
                  >
                    잘 모르겠어요
                  </label>
                </div>
              </div>
              <BaseInput
                id="petName"
                label="이름"
                value={petName}
                onChange={setPetName}
                placeholder="반려 동물의 이름을 입력하세요."
              />
              <BaseInput
                id="petWeight"
                label="체중 (kg)"
                value={petWeight}
                onChange={handleWeightChange}
                placeholder="체중을 입력해주세요"
                suffix={<span className="mr-4 text-[#0F1218]">kg</span>}
              />
              <BaseSelect
                label="연령대"
                value={petAge}
                options={ageOptions}
                placeholder="반려동물 연령대를 선택하세요"
                onChange={setPetAge}
              />
            </div>

            <SubmitButton title={isSubmitting ? '변경 중...' : '회원가입'} />
          </form>
        </div>
      </div>
    </>
  );
}
