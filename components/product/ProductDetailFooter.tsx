import { addBookmark, deleteBookmark, getBookmarks } from '@/lib/api/bookmarks';
import useUserStore from '@/store/authStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 상품 상세 페이지 푸터
export default function ProductDetailFooter({
  productId,
  sellerId,
}: {
  productId: number;
  sellerId: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();

  const [isWished, setIsWished] = useState(false);
  const [bookmarkId, setBookmarkId] = useState<number | null>(null);

  // 현재 사용자가 판매자인지 확인
  const isSeller = user?._id === sellerId;

  // 클라이언트에서 찜 상태 확인
  useEffect(() => {
    const checkBookmark = async () => {
      if (!user) return;

      const bookmarkData = await getBookmarks();
      if (bookmarkData.ok === 1) {
        const myBookmark = bookmarkData.item.find(
          b => b.product._id === productId
        );
        if (myBookmark) {
          setIsWished(true);
          setBookmarkId(myBookmark._id);
        }
      }
    };

    checkBookmark();
  }, [productId, user]);

  // 좋아요 클릭시 비로그인 상태면 로그인 페이지로
  const wishClick = async () => {
    if (!user) {
      router.push(`/auth/login?redirect=${pathname}`);
      return;
    }

    try {
      if (isWished && bookmarkId) {
        const result = await deleteBookmark(bookmarkId);
        if (result.ok === 1) {
          setIsWished(false);
          setBookmarkId(null);
          console.log('💔 찜하기 취소');
        }
      } else {
        const result = await addBookmark(productId);
        if (result.ok === 1) {
          setIsWished(true);
          setBookmarkId(result.item._id);
          console.log('♥️ 찜하기');
        }
      }
    } catch (error) {
      console.error('찜하기 처리 중 오류:', error);
    }
  };

  // 채팅하기 클릭시 비로그인 상태면 로그인 페이지로
  const chatClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault(); // Link 동작 막기
      router.push(`/auth/login?redirect=${pathname}`);
      return;
    }
  };

  // 상태 변경 버튼
  if (isSeller) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 flex gap-2 px-4 py-3 bg-white border-t border-br-input-disabled-line">
        <button className="flex-1 py-4 font-light bg-br-button-active-bg text-br-button-active-text rounded-xl text-center">
          상품 수정
        </button>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex gap-2 px-2 py-3 mr-4 bg-white border-t border-br-input-disabled-line">
      {/* 찜하기 */}
      <button
        className="flex flex-col items-center justify-center w-16 py-2"
        onClick={wishClick}
        aria-label={isWished ? '찜하기 취소' : '찜하기'}
      >
        <Image
          src={isWished ? '/icons/heart-fill.svg' : '/icons/heart-line.svg'}
          alt=""
          width={24}
          height={24}
          className="w-6 h-6"
          aria-hidden="true"
        />
        <span className="text-[9px] text-br-text-body mt-0.5">찜하기</span>
      </button>
      {/* 채팅하기 */}
      <Link
        href={`/chat/${productId}`}
        onClick={chatClick}
        className="flex-1 py-4 font-light bg-br-button-active-bg text-br-button-active-text rounded-xl text-center"
      >
        채팅 하기
      </Link>
    </footer>
  );
}
