// 반려동물 프로필 수정

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import SubmitButton from '@/components/shared/SubmitButton';
import BaseInput from '@/components/shared/BaseInput';
import BaseSelect from '@/components/shared/BaseSelect';
import useUserStore from '@/store/authStore';
import { updateProfile } from '@/lib/api/edit';
import { uploadFile } from '@/lib/api/new';
import { type UpdateUser } from '@/types/user';
import CheckIcon from '@/public/icons/Frame.svg';
import ProfileImage from '@/public/icons/chat-profile.svg';

export default function MyFofoPage() {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  // 입력 상태 관리
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [petBreed, setPetBreed] = useState('');
  const [petName, setPetName] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petAge, setPetAge] = useState('');

  // 체크 상태 관리
  const [isChecked, setIsChecked] = useState(false);
  const ageOptions = ['(0~1) 주니어', '(2~6) 어덜트', '(7+) 시니어'];

  // 제출 상태 관리
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // [방어 로직] 유저 정보가 없으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    // -1. 유저 정보가 이미 스토어에 있다면 즉시 세팅
    if (user) {
      setIsChecking(false);
      return;
    }

    // -2. 만약 없다면, 아주 잠깐(0.3초)만 기다려봅니다 (스토리지 복구 시간)
    const timer = setTimeout(() => {
      if (!user) {
        // 0.3초 후에도 없으면 그때 로그인 페이지로 이동
        router.replace('/auth/login?redirect=/mypage/petedit');
      } else {
        setIsChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, router]);

  // 사진 업로드 핸들러
  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  // 체중 입력 핸들러 (숫자와 소수점만 허용)
  const handleWeightChange = (val: string) => {
    const rawValue = val
      .replace(/[^0-9.]/g, '') // 숫자와 소수점만 허용
      .replace(/(\..*)\./g, '$1'); // 소수점이 두 번 이상 입력되는 것 방지

    setPetWeight(rawValue);
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      let finalImageUrl = user?.extra?.pet?.image;

      // -1. 새 이미지 파일이 선택된 경우에만 업로드 진행
      if (file) {
        const uploadResult = await uploadFile(file);
        if (uploadResult.ok) {
          finalImageUrl = uploadResult.item[0].path;
        }
      }

      // -2. 체중 문자열을 숫자로 변환
      const numericWeight = parseFloat(petWeight);

      // -3. 연령대 문자열 매핑 (선택 사항: 서버에서 영어 키값을 원할 경우)
      const ageMapping: Record<string, 'junior' | 'adult' | 'senior'> = {
        '(0~1) 주니어': 'junior',
        '(2~6) 어덜트': 'adult',
        '(7+) 시니어': 'senior',
      };

      // -4. 서버에 보낼 최종 데이터 구성
      const updateData: UpdateUser = {
        extra: {
          ...user?.extra, // 기존의 introduce 등 다른 정보 유지
          pet: {
            type: petType, // 'dog' | 'cat'
            breed: isChecked ? '잘 모르겠어요' : petBreed,
            name: petName,
            weight: isNaN(numericWeight) ? 0 : numericWeight, // 숫자가 아니면 0 처리
            ageGroup: ageMapping[petAge] || 'adult', // 매핑된 값 전달
            image: finalImageUrl, // 펫 프로필 이미지가 따로 있다면 여기에 할당
          },
        },
      };

      // -5. 인자 1개만 전달
      const result = await updateProfile(updateData);

      if (result.ok) {
        // 성공 시 전역 상태 업데이트 및 페이지 이동
        setUser({
          ...user, // 기존 정보 (토큰 등 유지)
          ...result.item, // 서버에서 온 수정된 정보
        });
        alert('나의 포포가 수정되었습니다!');
        setTimeout(() => {
          router.push('/mypage');
        }, 100);
      } else {
        alert(result.message || '수정 실패');
      }
    } catch (error) {
      console.error(error);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 중일 때 하얀 화면 방지
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-400">
        사용자 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <>
      <Header title="나의 포포" />
      <div className="min-h-screen flex justify-center">
        <div className="relative w-full px-4 bg-white">
          <form className="flex flex-col gap-5 mt-7.5" onSubmit={handleSubmit}>
            {/* 나의 포포 수정 */}
            <div className="flex items-center justify-center gap-5">
              <label
                htmlFor="profileUpload"
                className="relative cursor-pointer group"
              >
                <div className="relative w-17.5 h-17.5 flex items-center justify-center border border-white rounded-full bg-[#E5E5EA] overflow-hidden ">
                  <Image
                    src={previewUrl || user?.extra?.pet?.image || ProfileImage} // 여기서 user 이미지 사용
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
                  onChange={handleAddPhoto}
                />
              </label>
            </div>

            {/* 반려 동물 선택 영역 */}
            <div>
              <div>
                <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                  반려 동물 선택
                </p>
                <div className="flex gap-3.75 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setPetType('dog')}
                    className={`flex-1 h-13 rounded-lg text-[15px] ${
                      petType === 'dog'
                        ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                        : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                    }`}
                  >
                    강아지
                  </button>
                  <button
                    type="button"
                    onClick={() => setPetType('cat')}
                    className={`flex-1 h-13 rounded-lg text-[15px] ${
                      petType === 'cat'
                        ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                        : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                    }`}
                  >
                    고양이
                  </button>
                </div>
              </div>
            </div>
            {/* 견종/묘종 입력 영역 */}
            <div className="mt-2.5">
              <BaseInput
                label="견종/묘종"
                value={petBreed}
                onChange={setPetBreed}
                placeholder="견종/묘종을 입력하세요."
                disabled={isChecked}
              />
              {/* 체크 영역 */}
              <div className="flex items-center justify-end gap-1 mt-3">
                <div className="relative w-4 h-4">
                  <input
                    type="checkbox"
                    id="unknownBreed"
                    checked={isChecked}
                    onChange={e => setIsChecked(e.target.checked)}
                    className="peer absolute w-full h-full opacity-0 z-10 cursor-pointer"
                  />
                  <div className="w-full h-full bg-[#e5e5ea]"></div>
                  <div className="absolute hidden peer-checked:flex items-center justify-center inset-0">
                    <Image src={CheckIcon} alt="체크 아이콘" />
                  </div>
                </div>
                <label
                  htmlFor="unknownBreed"
                  className="text-[13px] text-[#8a8f99] cursor-pointer"
                >
                  잘 모르겠어요
                </label>
              </div>
            </div>

            {/* 반려 동물 이름 영역 */}
            <BaseInput
              label="이름"
              value={petName}
              onChange={setPetName}
              placeholder="반려 동물의 이름을 입력하세요."
            />
            {/* 반려 동물 체중 영역 */}
            <BaseInput
              label="체중 (kg)"
              value={petWeight}
              onChange={handleWeightChange}
              placeholder="체중을 입력해주세요"
              suffix={<span className="mr-4 text-[#0f1218]">kg</span>}
            />

            {/* 반려 동물 연령대 영역 */}
            <BaseSelect
              label="연령대"
              value={petAge}
              options={ageOptions}
              placeholder="반려동물 연령대를 선택하세요"
              onChange={setPetAge}
            />

            {/* 버튼 영역 */}
            <SubmitButton title={isSubmitting ? '변경 중...' : '정보 변경'} />
          </form>
        </div>
      </div>
    </>
  );
}
