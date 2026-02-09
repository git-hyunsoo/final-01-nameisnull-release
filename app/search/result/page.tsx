/* 검색 결과 페이지 */
'use client';

import UnderBar from '@/components/common/Footer';
import Spinner from '@/components/common/Spinner';
import SearchResultHeader from '@/components/search/SearchResultHeader';
import SearchResultProductList from '@/components/search/SearchResultProductList';
import { getProductDetail } from '@/lib/api/products';
import { useSearchStore } from '@/store/searchStore';
import { ProductList } from '@/types/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchResultPage() {
  const [proudcts, setProducts] = useState<ProductList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // url의 id 정보가 담긴 쿼리 파리미터 가져오기
  const searchParams = useSearchParams();

  // 전역으로 저장한 useSearchStore의 query 값을 가져옴
  const queryText = useSearchStore(s => s.query);

  // 상품 정보 가져오기
  useEffect(() => {
    const idsString = searchParams.get('ids');
    const idArray = idsString?.split(',').filter(id => id.trim()) || [];

    const loadProducts = async () => {
      try {
        // result: Promise 5개가 배열로 있음(아직 상품 정보 아님 -> 아직 pending 상태!)
        // await Promise.all()로 모든 Promise 완료 대기 후 실제 상품 정보 추출
        const result = idArray.map(async id => {
          // 상품 상세 정보 불러오는 api 호출 함수
          const detailRes = await getProductDetail(id);

          if (!detailRes.ok) {
            throw new Error(`상품 조회 실패: ${detailRes.message}`);
          }
          return detailRes.item;
        });
        // productList가 실제 상품 정보를 담고 있는 배열
        const productList = await Promise.all(result);
        // null 제거 및 유효한 상품만 필터링

        setProducts(productList);
      } catch (error) {
        console.error('상품 조회 실패', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (idArray.length > 0) {
      loadProducts();
    } else {
      // ID가 없을 때(검색 결과가 없을 때)도 로딩 종료
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading) {
    return <Spinner />;
  }

  // 검색 결과가 없을 때
  if (proudcts.length === 0) {
    return (
      <div className="font-pretendard">
        <SearchResultHeader queryText={queryText} productsCount={0} />
        <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
          <p className="text-gray-500 text-lg mb-2">검색 결과가 없습니다</p>
          <p className="text-gray-400 text-sm">
            다른 검색어로 다시 시도해보세요
          </p>
        </div>
        <UnderBar />
      </div>
    );
  }

  return (
    <>
      <div className="font-pretendard pb-15">
        <SearchResultHeader
          queryText={queryText}
          productsCount={proudcts.length}
        />
        <SearchResultProductList products={proudcts} />

        <UnderBar />
      </div>
    </>
  );
}
