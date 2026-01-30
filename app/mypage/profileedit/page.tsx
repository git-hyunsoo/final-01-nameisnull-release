// 프로필 수정

/* 
임시 확인용 URL - 추후 삭제 예정
http://localhost:3000/mypage/profileedit
*/

'use client';

import ArrowIcon from '@/public/icons/arrow-left.svg';
import DeleteIcon from '@/public/icons/delete-text.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfilePage() {
  const goBack = useRouter();
  const [nickname, setNickname] = useState('');

  return (
    <div className="min-h-screen flex justify-center">
      <div className="relative w-full px-4 bg-white">
        {/* 뒤로 가기 섹션 */}
        <Link href="/mypage">
          <button
            type="button"
            onClick={() => goBack.back()}
            aria-label="뒤로 가기 "
            className="absolute left-4 top-14 flex items-center flex-row gap-1.75 cursor-pointer"
          >
            <Image src={ArrowIcon} alt="뒤로 가기 아이콘" />
            <span className="text-[18px] leading-none font-medium">
              프로필 변경
            </span>
          </button>
        </Link>

        <form className="flex flex-col gap-4 mt-27.5">
          {/* 프로필 수정 */}
          <div className="flex items-center justify-center gap-5">
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
          </div>

          {/* 닉네임 입력 */}
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

          {/* 변경 버튼) */}
          {/* TODO  */}

          <div className="mb-5 pb-safe">
            <Link href={'/mypage'}>
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
