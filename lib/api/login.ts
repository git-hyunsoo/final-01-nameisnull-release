// 로그인 시 API 호출 함수 (로그인 전용 서버 액션)

'use server';

import { ApiResponse } from '@/types/common';
import { LoginRequest, LoginResponse } from '@/types/user';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

type LoginActionState = ApiResponse<LoginResponse> | null;

// 실제 API 호출하는 원래
export async function login(formData: FormData): Promise<LoginActionState> {
  // FormData에서 값 추출
  const email = formData.get('email');
  const password = formData.get('password');
  const autoLogin = formData.get('autoLogin') === 'on';

  // 타입가드, 값 검증(문자열 확인)
  if (typeof email !== 'string' || typeof password !== 'string') {
    return {
      ok: 0,
      message: '이메일 또는 비밀번호가 올바르지 않습니다.',
    };
  }

  const body: LoginRequest & { autoLogin: boolean } = {
    email,
    password,
    autoLogin,
  };

  try {
    // 로그인 API 호출
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    const data: ApiResponse<LoginResponse> = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message: '일시적인 네트워크 문제가 발생했습니다.',
    };
  }
}
