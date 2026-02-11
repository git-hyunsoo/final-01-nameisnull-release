// 프로필 수정 페이지

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

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState(user?.name || '');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [description, setDescription] = useState('');

  const [isChecking, setIsChecking] = useState(true);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // [방어 로직] 유저 정보가 없으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (user) {
      setNickname(user.name || '');
      setDescription(user.extra?.introduce || '');
      setIsChecking(false);
      return;
    }

    const timer = setTimeout(() => {
      if (!user) {
        router.replace('/auth/login?redirect=/mypage/profileedit');
      } else {
        setIsChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, router]);

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
      setNicknameMessage('현재 사용 중인 닉네임입니다.');
      setIsNicknameError(false);
      setIsNicknameChecked(true);
      return;
    }

    // 팀의 중복검사 API 연동(지금은 목데이터 사용)
    setNicknameMessage('사용 가능한 닉네임입니다.');
    setIsNicknameError(false);
    setIsNicknameChecked(true);
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (nickname !== user?.name && !isNicknameChecked) {
      alert('닉네임 중복 확인이 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      let finalImageUrl = user?.image;

      if (file) {
        const uploadResult = await uploadFile(file);
        if (uploadResult.ok) {
          finalImageUrl = uploadResult.item[0].path;
        }
      }

      const updateData: UpdateUser = {
        name: nickname,
        image: finalImageUrl,
        extra: {
          ...user?.extra,
          introduce: description,
        },
      };

      const result = await updateProfile(updateData);

      if (result.ok) {
        setUser({
          ...user,
          ...result.item,
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
      <main className="min-h-screen flex justify-center">
        <div className="relative w-full px-4 bg-white">
          <form
            className="flex flex-col gap-5 mt-7.5 pb-10"
            onSubmit={handleSubmit}
          >
            {/* 프로필 이미지 수정 */}
            <div className="flex items-center justify-center">
              <label
                htmlFor="profileUpload"
                className="relative cursor-pointer group"
                aria-label="프로필 사진 수정"
              >
                <div className="relative w-17.5 h-17.5 flex items-center justify-center border border-white rounded-full bg-[#E5E5EA] overflow-hidden ">
                  <Image
                    src={previewUrl || user?.image || ProfileImage}
                    alt="프로필 이미지"
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

            {/* 닉네임 영역 */}
            <div className="mt-2.5">
              <BaseInput
                id="nickname"
                label="닉네임"
                value={nickname}
                onChange={val => {
                  setNickname(val);
                  setIsNicknameChecked(false);
                  setIsNicknameError(false);
                  setNicknameMessage('');
                }}
                isError={isNicknameError}
                errorMsg={nicknameMessage}
                hint={!isNicknameError ? nicknameMessage : ''}
                suffix={
                  <button
                    type="button"
                    onClick={handleCheckDuplicate}
                    disabled={isNicknameChecked || nickname === user?.name}
                    className={`mr-1.5 w-18.5 h-8.5 rounded-lg text-[13px] font-medium transition-colors ${
                      isNicknameChecked || nickname === user?.name
                        ? 'bg-[#F4F5FA] text-[#8A8F99] cursor-default'
                        : 'bg-[#e8f8ff] text-[#60cfff] cursor-pointer'
                    }`}
                  >
                    {isNicknameChecked || nickname === user?.name
                      ? '확인 완료'
                      : '중복 확인'}
                  </button>
                }
              />
            </div>

            {/* 소개글 영역 */}
            <BaseInput
              id="description"
              label="설명글"
              type="textarea"
              value={description}
              placeholder="소개글을 입력하세요."
              onChange={setDescription}
            />

            <SubmitButton title={isSubmitting ? '변경 중...' : '정보 변경'} />
          </form>
        </div>
      </main>
    </>
  );
}
