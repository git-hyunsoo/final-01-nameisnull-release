'use client';

import UnderBar from '@/components/common/Footer';
import Image from 'next/image';
import Header from '@/components/common/Header';

import { useState } from 'react';
import { AllProductEmbeddings } from '@/actions/ai-search/generate-embeddings';
import SearchForm from '@/components/search/SearchForm';
import SearchHint from '@/components/search/SearchHint';

export default function SearchPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  // 임베딩 생성 함수
  const handleGenerateEmbeddings = async () => {
    if (!confirm('모든 상품을 임베딩하시겠습니까? (1~2분 소요)')) {
      return;
    }

    setIsGenerating(true);
    console.log('🚀 임베딩 생성 시작...');

    try {
      await AllProductEmbeddings();
      console.log('✅ 완료! Bruno로 확인하세요.');
      alert('완료! Bruno에서 extra.embeddings 확인하세요.');
    } catch (error) {
      console.error('❌ 실패:', error);
      alert('실패! 콘솔 확인하세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* 화면 전체 래퍼 */}
      <div className="font-pretendard min-h-screen pb-15">
        {/* 헤더 */}
        <Header title="AI 검색" />
        {/* 본문 */}
        <main className="px-4">
          <div className="mx-auto w-full max-w-130 flex flex-col items-center text-center">
            <div className="pt-24 sm:pt-28" />

            <Image
              src="/icons/aisearch-sparkle.svg"
              alt="별빛"
              width={40}
              height={40}
            />

            <p className="text-2xl mt-4">
              AI 검색으로 나의 포포에게
              <br /> 맞는 상품을 추천해드려요.
            </p>

            {/* 임베딩 생성 버튼 */}
            <button
              onClick={handleGenerateEmbeddings}
              disabled={isGenerating}
              className={`mb-4 px-4 py-2 rounded text-white font-bold ${
                isGenerating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isGenerating
                ? '임베딩 생성 중... (1~2분)'
                : '모든 상품 임베딩 생성'}
            </button>

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
