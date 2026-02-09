import useUserStore from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 마이페이지
export async function getUserInfo() {
  try {
    const { accessToken, user } = useUserStore.getState();

    if (!accessToken || !user) {
      return {
        ok: 0,
        message: '로그인이 필요합니다.',
      };
    }
    const userId = user._id;

    const res = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message: '사용자 정보를 불러오는데 실패했습니다.',
    };
  }
}
