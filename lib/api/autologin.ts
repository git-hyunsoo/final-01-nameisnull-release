// 로그인 이후 API 공통 fetch 함수 (자동 로그인 처리)

import useAuthStore from '@/store/authStore';

export async function apiClient(input: RequestInfo, init?: RequestInit) {
  const { accessToken, setAutoLogin, resetUser } = useAuthStore.getState();

  // 기본 요청
  const res = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });

  // accessToken 만료
  if (res.status !== 401) {
    return res;
  }

  // refresh 시도
  const refreshRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/refresh`,
    {
      method: 'POST',
      credentials: 'include',
    }
  );

  // refresh 실패 → 로그아웃
  if (!refreshRes.ok) {
    resetUser();
    throw new Error('세션이 만료되었습니다.');
  }

  // 새 accessToken 저장
  const data = await refreshRes.json();
  setAutoLogin(data.item);

  // 원래 요청 다시 시도
  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${data.item.token.accessToken}`,
    },
    credentials: 'include',
  });
}
