import Image from 'next/image';

export default function SearchRecommendation({
  recommendationReason,
}: {
  recommendationReason: string;
}) {
  return (
    <div className="font-pretendard mx-4 my-6 py-5 px-6 bg-br-primary-200 rounded-4xl rounded-bl-none ">
      <div className="flex flex-row gap-3 items-center">
        <Image
          src="/icons/aisearch-sparkle.svg"
          alt="AI 검색"
          width={25}
          height={25}
          aria-hidden="false"
        />
        <h3 className="font-medium text-gray-800 text-base">
          왜 이 상품들을 추천했나요?
        </h3>
      </div>
      <div className="mt-2">
        <p className="text-gray-700 text-sm leading-relaxed">
          {recommendationReason}
        </p>
      </div>
    </div>
  );
}
