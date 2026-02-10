import useUserStore from '@/store/authStore';
import {
  BookmarkCreateRes,
  BookmarkDeleteRes,
  BookmarkListRes,
} from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 찜하기
export async function addBookmark(
  productId: number
): Promise<BookmarkCreateRes> {
  try {
    const { accessToken, user } = useUserStore.getState();

    if (!accessToken || !user) {
      return {
        ok: 0,
        message: '로그인이 필요합니다.',
      };
    }

    const res = await fetch(`${API_URL}/bookmarks/product`, {
      method: 'POST',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        target_id: productId,
      }),
    });

    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }
}

// 찜 삭제
export async function deleteBookmark(
  bookmarkId: number
): Promise<BookmarkDeleteRes> {
  const { accessToken } = useUserStore.getState();

  try {
    const res = await fetch(`${API_URL}/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }
}

// 찜 목록
export async function getBookmarks(): Promise<BookmarkListRes> {
  try {
    const { accessToken } = useUserStore.getState();
    const res = await fetch(`${API_URL}/bookmarks/product`, {
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message: '요청하신 작업 처리에 실패했습니다.',
    };
  }
}
