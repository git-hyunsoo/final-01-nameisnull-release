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

  // useSearchStore 훅에서 setQuery 함수만 꺼내서 setQuery 변수에 할당
  // zustand에서 store 객체의 프로퍼티를 꺼낼 때 화살표 함수로 넘겨줌
  const setQuery = useSearchStore(s => s.setQuery);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 새로고침 방지

    if (!searchValue.trim()) {
      alert('검색어를 입력해주세요');
      return;
    }

    // 폼 데이터 생성
    const formData = new FormData();
    formData.append('query', searchValue);

    // 서버 액션 호출(results는 유사도 높은 5개가 담긴 배열을 반환 받은 값)
    const results = await SimilarityCompare(formData);
    const idList = results.map(item => item._id).join(',');

    // setQuery에 검색창 입력 값 넘겨줌.
    setQuery(searchValue);

    // 페이지 이동
    router.push(`/search/result?ids=${idList}`);
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
