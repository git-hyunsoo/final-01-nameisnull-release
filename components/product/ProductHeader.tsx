//강아지 고양이 변경 헤더
'use client';

import { usePetStore } from '@/store/petStore';
import Image from 'next/image';

export default function ProductHeader() {
  const { pet, setPet } = usePetStore();

  return (
    <header className="flex justify-center items-center gap-2 py-4">
      <Image
        src={pet === 'dog' ? '/icons/dog.svg' : '/icons/cat.svg'}
        alt={pet === 'dog' ? '강아지' : '고양이'}
        width={24}
        height={24}
      />
      <span className="text-lg font-medium">
        {pet === 'dog' ? '강아지' : '고양이'}
      </span>
      <button
        type="button"
        onClick={() => setPet(pet === 'dog' ? 'cat' : 'dog')}
      >
        <Image src="/icons/change.svg" alt="변경" width={24} height={24} />
      </button>
    </header>
  );
}
