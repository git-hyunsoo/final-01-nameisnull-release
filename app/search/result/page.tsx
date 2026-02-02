/* 검색 결과 페이지 */
'use client';

import UnderBar from '@/components/common/Footer';
import Header from '@/components/common/Header';
import SearchResultProduct from '@/components/search/SearchResultProduct';
import { useSearchStore } from '@/store/searchStore';
import { ProductSearchList } from '@/types/product';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export default function SearchResultPage() {
  const [proudcts, setProducts] = useState<ProductSearchList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // url의 id 정보가 담긴 쿼리 파리미터 가져오기
  const searchParams = useSearchParams();

  // 전역으로 저장한 useSearchStore의 query 값을 가져옴
  const queryText = useSearchStore(s => s.query);

  // 상품 상세 정보 불러오는 api 호출 함수
  async function searchResult(id: string): Promise<ProductSearchList> {
    const res = await fetch(`${API_URL}/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID!,
      },
    });
    const data = await res.json();
    return data.item;
  }

  // 상품 정보 가져오기
  useEffect(() => {
    const idsString = searchParams.get('ids');
    const idArray = idsString?.split(',') || [];

    const loadProducts = async () => {
      try {
        // result: Promise 5개가 배열로 있음(아직 상품 정보 아님 -> 아직 pending 상태!)
        // await Promise.all()로 모든 Promise 완료 대기 후 실제 상품 정보 추출
        const result = idArray.map(id => searchResult(id));
        // productList가 실제 상품 정보 5개를 담고 있는 배열
        const productList = await Promise.all(result);

        setProducts(productList);
      } catch (error) {
        console.error('상품 조회 실패', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (idArray.length > 0) {
      loadProducts();
    }
  }, [searchParams]);

  if (isLoading) {
    return <div>검색 결과 찾는 중...</div>;
  }
  return (
    <>
      <div className="font-pretendard pb-15">
        <Header title="AI 검색 결과" />
        <section>
          <div className="flex flex-row items-center gap-1.5 mt-8 ml-4.75">
            <Image
              src="/icons/aisearch-sparkle.svg"
              alt=""
              width={25}
              height={25}
            />
            <p className="text-br-button-disabled-text leading-6 text-[13px]">
              <span className="text-br-primary-500">
                &quot;{queryText}&quot;
              </span>{' '}
              분석 결과 <br /> 총 5개의 맞춤 상품을 찾았습니다.
            </p>
          </div>
        </section>
        <main className="px-4 mt-7.25">
          <p className="text-[18px]">AI 추천 상품</p>
          {proudcts.map(product => {
            return <SearchResultProduct key={product._id} product={product} />;
          })}
          <button
            type="button"
            className="w-full h-12 rounded-xl bg-br-button-more-bg text-br-button-more-text mt-5 mb-13"
          >
            일반 검색 결과 더보기
          </button>
        </main>

        <UnderBar />
      </div>
    </>
  );
}
