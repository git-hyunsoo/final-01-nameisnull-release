'use client';

import UnderBar from '@/components/common/Footer';
import Header from '@/components/common/Header';

import SearchForm from '@/components/search/SearchForm';
import SearchHint from '@/components/search/SearchHint';
import SearchText from '@/components/search/SearchText';

export default function SearchPage() {
  return (
    <>
      {/* 화면 전체 래퍼 */}
      <div className="font-pretendard min-h-screen pb-15">
        {/* 헤더 */}
        <Header title="AI 검색" />
        {/* 본문 */}
        <main className="px-4">
          <div className="mx-auto w-full max-w-130 flex flex-col items-center text-center">
            <SearchText />
            {/* 검색창 */}
            <SearchForm />
            <SearchHint />
          </div>
        </main>
        <UnderBar />
      </div>
    </>
  );
}
