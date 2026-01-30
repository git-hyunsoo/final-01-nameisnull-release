// 반려동물 프로필 수정

'use client';

import Image from 'next/image';
import ArrowIcon from '@/public/icons/arrow-left.svg';
import CheckIcon from '@/public/icons/Frame.svg';
import ArrowBottomIcon from '@/public/icons/arrow-bottom.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function MyFofoPage() {
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

  return (
    <div className="min-h-screen flex justify-center">
      <div className="relative w-full px-4 bg-white">
        {/* 뒤로 가기 섹션 */}
        <Link href={'/mypage'}>
          <button
            type="button"
            onClick={() => goBack.back()}
            aria-label="뒤로 가기"
            className="absolute left-4 top-14 flex items-center flex-row gap-1.75 cursor-pointer"
          >
            <Image src={ArrowIcon} alt="뒤로 가기 아이콘" />
            <span className="text-[18px] leading-none font-medium">
              나의 포포
            </span>
          </button>
        </Link>

        <form className="flex flex-col gap-4 mt-27.5">
          {/* 프로필 수정 */}
          <div className="flex flex-row gap-5">
            <label
              htmlFor="profileUpload"
              className="relative cursor-pointer group"
            >
              <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                사진 등록
              </p>
              <div className="flex flex-row gap-3">
                <div className="w-17.5 h-17.5 flex items-center justify-center border border-[#E5E5EA] rounded-lg bg-white overflow-hidden "></div>
                <div className="relative">
                  <div className="relative w-17.5 h-17.5 flex items-center justify-center border border-white rounded-lg bg-[#E5E5EA] overflow-hidden "></div>
                  {/* <div className="absolute  top-0 right-0 flex items-center justify-center border border-white rounded-full bg-[#8A8F99]"></div> */}

                  <Image
                    src="/icons/add.svg"
                    alt="플러스 아이콘"
                    width={18}
                    height={18}
                  />
                </div>
              </div>
              <input
                type="file"
                id="profileUpload"
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
          {/* 선택 정보 - 카테고리 선택(버튼) */}
          <div>
            <div>
              <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                견종/묘종
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

          {/* 변경 버튼) */}
          {/* TODO  */}
          <div className="mb-5 pb-safe">
            <Link href="/mypage">
              <button
                type="submit"
                className="relative flex items-center justify-center mt-10  w-full h-14 rounded-lg bg-[#60CFFF] text-white font-medium"
              >
                정보 변경
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
