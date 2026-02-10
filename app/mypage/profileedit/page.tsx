// 사용자 프로필 수정

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import SubmitButton from '@/components/shared/SubmitButton';
import BaseInput from '@/components/shared/BaseInput';
import useUserStore from '@/store/authStore';
import { updateProfile } from '@/lib/api/edit';
import { uploadFile } from '@/lib/api/new';
import { type UpdateUser } from '@/types/user';
import ProfileImage from '@/public/icons/chat-profile.svg';

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  /* 입력 상태 관리 */
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  /* 유효성 및 로딩 상태 */
  const [isChecking, setIsChecking] = useState(true); // <--- 무한루프, 로딩(방어 로직) 상태 추가
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // [방어 로직] 유저 정보가 없으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    // -1. 유저 정보가 이미 스토어에 있다면 즉시 세팅
    if (user) {
      setNickname(user.name || '');
      setDescription(user.extra?.introduce || '');
      setIsChecking(false);
      return;
    }

    // -2. 만약 없다면, 아주 잠깐(0.3초)만 기다려봅니다 (스토리지 복구 시간)
    const timer = setTimeout(() => {
      if (!user) {
        // 0.3초 후에도 없으면 그때 로그인 페이지로 이동
        router.replace('/auth/login?redirect=/mypage/profileedit');
      } else {
        setIsChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, router]);

  // 닉네임 변경 시 중복검사 초기화
  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setIsNicknameChecked(false);
    setIsNicknameError(false);
  };

  // 사진 변경 핸들러
  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  // 중복 검사 로직
  const handleCheckDuplicate = async () => {
    if (!nickname) return alert('닉네임을 입력해주세요.');
    if (nickname === user?.name) {
      alert('현재 사용 중인 닉네임입니다.');
      setIsNicknameChecked(true);
      return;
    }

    // TODO: 팀의 중복검사 API가 있다면 여기에 연동
    alert('사용 가능한 닉네임입니다.');
    setIsNicknameChecked(true);
  };

  // 제출 핸들러 (수정된 API 방식 반영)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // -1. 닉네임이 변경되었을 때만 중복 검사 여부 확인
    if (nickname !== user?.name && !isNicknameChecked) {
      alert('닉네임 중복 확인이 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      let finalImageUrl = user?.image;

      // -2. 새 이미지 파일이 선택된 경우에만 업로드 진행
      if (file) {
        const uploadResult = await uploadFile(file);
        if (uploadResult.ok) {
          finalImageUrl = uploadResult.item[0].path;
        }
      }

      // -3 서버에 보낼 데이터 구성
      const updateData: UpdateUser = {
        name: nickname,
        image: finalImageUrl,
        extra: {
          ...user?.extra,
          introduce: description,
        },
      };

      // -4. 인자 1개만 전달
      const result = await updateProfile(updateData);

      if (result.ok) {
        // 성공 시 전역 상태 업데이트 및 페이지 이동
        setUser({
          ...user, // 기존 정보 (토큰 등 유지)
          ...result.item, // 서버에서 온 수정된 정보
        });
        alert('프로필이 수정되었습니다!');
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
      <Header title="프로필 변경" />
      <div className="min-h-screen flex justify-center">
        <div className="relative w-full px-4 bg-white">
          <form className="flex flex-col gap-5 mt-7.5" onSubmit={handleSubmit}>
            {/* 프로필 수정 */}
            <div className="flex items-center justify-center gap-5">
              <label
                htmlFor="profileUpload"
                className="relative cursor-pointer group"
              >
                <div className="relative w-17.5 h-17.5 flex items-center justify-center border border-white rounded-full bg-[#E5E5EA] overflow-hidden ">
                  <Image
                    src={previewUrl || user?.image || ProfileImage} // 여기서 user 이미지 사용
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
            {/* 닉네임 영역 */}
            <div className="mt-2.5">
              <BaseInput
                label="닉네임"
                value={nickname}
                onChange={handleNicknameChange}
                isError={isNicknameError}
                errorMsg="이미 사용 중인 닉네임입니다"
                suffix={
                  <button
                    type="button"
                    onClick={handleCheckDuplicate}
                    disabled={isNicknameChecked || nickname === user?.name}
                    className={`mr-1.5 w-18.5 h-8.5 rounded-lg cursor-pointer transition-colors ${
                      isNicknameChecked
                        ? 'bg-[#F4F5FA] text-[#8A8F99] cursor-default'
                        : 'bg-[#e8f8ff] text-[#60cfff]'
                    }`}
                  >
                    {isNicknameChecked ? '확인 완료' : '중복 확인'}
                  </button>
                }
              />
            </div>
            {/* 소개글 영역 */}
            <BaseInput
              label="설명글"
              type="textarea"
              value={description}
              placeholder="소개글을 입력하세요."
              onChange={setDescription}
            />{' '}
            {/* 버튼 영역 */}
            <SubmitButton title={isSubmitting ? '변경 중...' : '정보 변경'} />
          </form>
        </div>
      </div>
    </>
  );
}
