// lib/api/edit.ts

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
    // -1. 먼저 Zustand 스토어에서 데이터 시도
    let { accessToken, user } = useUserStore.getState();

    // -2. [안전장치] 만약 스토어가 비어있다면 세션 스토리지에서 직접 강제로 가져옴
    // Zustand Persist의 기본 저장 키인 'auth-store' 또는 'userStore' 등을 확인해야 합니다.
    if (!accessToken || !user) {
      const sessionData = sessionStorage.getItem('auth-store'); // 본인의 스토어 name 확인
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        accessToken = parsed.state.accessToken;
        user = parsed.state.user;
      }
    }

    // -3. 최종 방어: 여전히 정보가 없다면 에러 리턴
    if (!accessToken || !user?._id) {
      return {
        ok: 0,
        message: '로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.',
      };
    }

    // -4. API 호출
    const res = await fetch(`${API_URL}/users/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

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
