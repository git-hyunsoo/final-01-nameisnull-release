// 검색 폼
'use client';

import { SimilarityCompare } from '@/actions/ai-search/search';
import { useSearchStore } from '@/store/searchStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchForm() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const setQuery = useSearchStore(s => s.setQuery);
  const setRecommendationReason = useSearchStore(
    s => s.setRecommendationReason
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      alert('검색어를 입력해주세요');
      return;
    }

    // 폼 데이터 생성
    const formData = new FormData();
    formData.append('query', searchValue);

    // SimilarityCompare 서버 액션 함수 호출
    const result = await SimilarityCompare(formData);

    const productIds = result.products.map(item => item._id).join(',');
    const recommendationReason = result.recommReason;

    // 검색어, 상품 추천 이유 전역 상태에 저장
    setQuery(searchValue);
    setRecommendationReason(recommendationReason ?? '');

    // url에 id들만 넘김
    router.push(
      productIds ? `/search/result?ids=${productIds}` : `/search/result`
    );
  };

  return (
    <>
      <div className="relative w-full mt-12">
        <Image
          src="/icons/aisearch-generation.svg"
          alt="검색"
          width={26}
          height={25}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />

        <form onSubmit={handleSubmit}>
          <input
            type="search"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder='"말랑한 간식 추천해 줘"'
            className="w-full h-13 rounded-full border border-br-input-disabled-line
                    focus:border-br-primary-500 focus:border-2 focus:outline-none
                    shadow-[0_6px_14px_-10px_rgba(0,0,0,0.25)] pl-12 pr-4
                    text-left text-[15px] text-br-input-disabled-text
                    placeholder:text-center"
          />
        </form>
      </div>
    </>
  );
}
