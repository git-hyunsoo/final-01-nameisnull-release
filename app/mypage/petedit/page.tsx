// 나의 포포 수정 페이지

'use client';

import { useEffect, useState, useCallback } from 'react';
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
    if (user) {
      setIsChecking(false);
      // 초기값 설정 (기존 데이터가 있다면)
      if (user.extra?.pet) {
        setPetType(user.extra.pet.type || 'dog');
        setPetBreed(
          user.extra.pet.breed === '잘 모르겠어요'
            ? ''
            : user.extra.pet.breed || ''
        );
        setIsChecked(user.extra.pet.breed === '잘 모르겠어요');
        setPetName(user.extra.pet.name || '');
        setPetWeight(user.extra.pet.weight?.toString() || '');
        // 연령대 매핑 로직은 서비스 기획에 따라 추가 가능
      }
      return;
    }

    const timer = setTimeout(() => {
      if (!user) {
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

  // 체중 입력 핸들러 (숫자와 소수점만 허용) - 성능 최적화
  const handleWeightChange = useCallback((val: string) => {
    const rawValue = val.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

    setPetWeight(rawValue);
  }, []);

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      let finalImageUrl = user?.extra?.pet?.image;

      if (file) {
        const uploadResult = await uploadFile(file);
        if (uploadResult.ok) {
          finalImageUrl = uploadResult.item[0].path;
        }
      }

      const numericWeight = parseFloat(petWeight);

      const ageMapping: Record<string, 'junior' | 'adult' | 'senior'> = {
        '(0~1) 주니어': 'junior',
        '(2~6) 어덜트': 'adult',
        '(7+) 시니어': 'senior',
      };

      const updateData: UpdateUser = {
        extra: {
          ...user?.extra,
          pet: {
            type: petType,
            breed: isChecked ? '잘 모르겠어요' : petBreed,
            name: petName,
            weight: isNaN(numericWeight) ? 0 : numericWeight,
            ageGroup: ageMapping[petAge] || 'adult',
            image: finalImageUrl,
          },
        },
      };

      const result = await updateProfile(updateData);

      if (result.ok) {
        setUser({
          ...user,
          ...result.item,
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
      <main className="min-h-screen flex justify-center">
        <div className="relative w-full px-4 bg-white">
          <form
            className="flex flex-col gap-5 mt-7.5 pb-10"
            onSubmit={handleSubmit}
          >
            {/* 프로필 이미지 수정 섹션 */}
            <div className="flex items-center justify-center">
              <label
                htmlFor="profileUpload"
                className="relative cursor-pointer group"
                aria-label="반려동물 사진 수정"
              >
                <div className="relative w-17.5 h-17.5 flex items-center justify-center border border-white rounded-full bg-[#E5E5EA] overflow-hidden ">
                  <Image
                    src={previewUrl || user?.extra?.pet?.image || ProfileImage}
                    alt="반려동물 프로필"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  className="absolute bottom-0 right-0 flex items-center justify-center border border-white rounded-full bg-[#8A8F99]"
                  aria-hidden="true"
                >
                  <Image src="/icons/add.svg" alt="" width={18} height={18} />
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
            <div role="group" aria-labelledby="pet-select-label">
              <p
                id="pet-select-label"
                className="ml-1 text-[13px] font-medium text-[#0F1218]"
              >
                반려 동물 선택
              </p>
              <div className="flex gap-3.75 mt-1.5">
                <button
                  type="button"
                  onClick={() => setPetType('dog')}
                  aria-pressed={petType === 'dog'}
                  className={`flex-1 h-13 rounded-lg text-[15px] transition-colors ${
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
                  aria-pressed={petType === 'cat'}
                  className={`flex-1 h-13 rounded-lg text-[15px] transition-colors ${
                    petType === 'cat'
                      ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                      : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                  }`}
                >
                  고양이
                </button>
              </div>
            </div>

            {/* 견종/묘종 입력 영역 */}
            <div className="mt-2.5">
              <BaseInput
                id="petBreedInput"
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
                  <div
                    className="w-full h-full bg-[#e5e5ea]"
                    aria-hidden="true"
                  ></div>
                  <div className="absolute hidden peer-checked:flex items-center justify-center inset-0 pointer-events-none">
                    <Image src={CheckIcon} alt="" />
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

            <BaseInput
              id="petNameInput"
              label="이름"
              value={petName}
              onChange={setPetName}
              placeholder="반려 동물의 이름을 입력하세요."
            />

            <BaseInput
              id="petWeightInput"
              label="체중 (kg)"
              value={petWeight}
              onChange={handleWeightChange}
              placeholder="체중을 입력해주세요"
              suffix={
                <span className="mr-4 text-[#0f1218]" aria-hidden="true">
                  kg
                </span>
              }
            />

            <BaseSelect
              label="연령대"
              value={petAge}
              options={ageOptions}
              placeholder="반려동물 연령대를 선택하세요"
              onChange={setPetAge}
            />

            <SubmitButton title={isSubmitting ? '변경 중...' : '정보 변경'} />
          </form>
        </div>
      </main>
    </>
  );
}
