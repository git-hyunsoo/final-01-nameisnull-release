import { BookmarkCreateRes, BookmarkDeleteRes } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 찜하기
export async function addBookmark(
  productId: number
): Promise<BookmarkCreateRes> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/product`, {
      method: 'POST',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
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
  productId: number
): Promise<BookmarkDeleteRes> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/product`, {
      method: 'DELETE',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
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
