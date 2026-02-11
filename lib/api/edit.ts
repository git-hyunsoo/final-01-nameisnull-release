// 프로필 수정 API 함수

import useUserStore from '@/store/authStore';
import { ApiResponse } from '@/types/common';
import { type UpdateUser, type User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 프로필 수정
export async function updateProfile(
  formData: UpdateUser
): Promise<ApiResponse<User>> {
  try {
    // 인증 정보 가져오기
    let { accessToken, user } = useUserStore.getState();

    // 스토어에 정보가 없으면 세션 스토리지에서 복원 시도
    if (!accessToken || !user) {
      const sessionData = sessionStorage.getItem('auth-store');
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        accessToken = parsed.state.accessToken;
        user = parsed.state.user;
      }
    }

    // 인증 정보 유효성 검사
    if (!accessToken || !user?._id) {
      return {
        ok: 0,
        message: '로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.',
      };
    }

    // 프로필 수정 API 호출
    const res = await fetch(`${API_URL}/users/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    // API 응답 처리
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('프로필 수정 API 에러:', error);
    return {
      ok: 0,
      message: '프로필 수정에 실패했습니다.',
    };
  }
}
