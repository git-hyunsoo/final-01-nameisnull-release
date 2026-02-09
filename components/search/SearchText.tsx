import Image from 'next/image';

interface SearchTextProps {
  isGenerating: boolean;
  onGenerateEmbeddings: () => void;
}

export default function SearchText({
  isGenerating,
  onGenerateEmbeddings,
}: SearchTextProps) {
  return (
    <>
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
        onClick={onGenerateEmbeddings}
        disabled={isGenerating}
        className={`mb-4 px-4 py-2 rounded text-white font-bold ${
          isGenerating
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {isGenerating ? '임베딩 생성 중... (1~2분)' : '모든 상품 임베딩 생성'}
      </button>
    </>
  );
}
