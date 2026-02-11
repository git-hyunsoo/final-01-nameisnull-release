//상품 목록 페이지 검색
'use client';

import { useState } from 'react';
import { usePetStore } from '@/store/petStore';
import Image from 'next/image';

export default function ProductPageSearch() {
  const [keyword, setKeyword] = useState('');
  const { setSearchKeyword } = usePetStore();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchKeyword(keyword);
    }
  };

  return (
    <div className="flex items-center bg-[#F4F5FA] rounded-full px-4 py-2.5">
      <label htmlFor="product-search" className="sr-only">
        상품 검색
      </label>
      <Image src="/icons/generation-gray.svg" alt="" width={18} height={18} />
      <input
        type="search"
        id="product-search"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent ml-2 w-full outline-none text-sm text-br-input-active-line"
      />
    </div>
  );
}
