'use client';

import UnderBar from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Spinner from '@/components/common/Spinner';
import SavedProductCard from '@/components/mypage/SavedProductCard';
import { getBookmarks } from '@/lib/api/bookmarks';
import { getRecentProducts, RecentProductItem } from '@/lib/utils/storage';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// 최근 본 상품 페이지
export default function HistoryPage() {
  const pathname = usePathname();
  // 최근 본 상품 목록 (로컬)
  const [products, setProducts] = useState<RecentProductItem[]>([]);
  // 찜한 상품 목록 (API)
  const [wishedProductIds, setWishedProductIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // 1. localStorage 먼저 읽기 (동기)
      const recentProducts = getRecentProducts();
      setProducts(recentProducts);
      // 2. API 호출 (비동기)
      try {
        const bookmarkData = await getBookmarks();

        if (bookmarkData.ok === 1) {
          const wishedIds = bookmarkData.item.map(
            bookmark => bookmark.product._id
          );
          setWishedProductIds(wishedIds);
        } else {
          setWishedProductIds([]);
        }
      } catch (error) {
        console.error('찜 목록 로드 중 오류:', error);
        setWishedProductIds([]);
      }
      setIsLoading(false);
    };

    // pathname이 바뀔 때마다 실행 (페이지로 돌아올 때)
    fetchData();
  }, [pathname]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header title="최근 본 상품" />

      {/* 최근 본 상품 목록 */}
      <main className="pb-20 font-pretendard">
        {products.length === 0 ? (
          <div className="text-center mt-20 text-gray-500">
            최근 본 상품이 없습니다.
          </div>
        ) : (
          <ul>
            {products.map(product => (
              <li key={product._id}>
                <SavedProductCard
                  product={product}
                  isWished={wishedProductIds.includes(product._id)}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      <UnderBar />
    </>
  );
}
