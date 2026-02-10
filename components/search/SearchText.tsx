import Image from 'next/image';

export default function SearchText() {
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
    </>
  );
}
