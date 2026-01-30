'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function SearchForm() {
  const [searchValue, setSearchValue] = useState('');

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

        <form>
          {/* 서버로 검색어 전달 */}
          <input type="hidden" name="keyword" value={searchValue} />

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
