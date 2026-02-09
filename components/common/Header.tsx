'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Header {
  title: string;
}

export default function Header({ title }: Header) {
  const goBack = useRouter();

  return (
    <header>
      <button
        type="button"
        onClick={() => goBack.back()}
        aria-label="뒤로 가기"
        className="font-pretendard flex flex-row gap-3.5 mt-4.5 ml-5.5 items-center"
      >
        <Image src="/icons/arrow-left.svg" alt="" width={8} height={16} />
        <span className="leading-none mb-0.5">{title}</span>
      </button>
    </header>
  );
}
