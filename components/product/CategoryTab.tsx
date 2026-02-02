//상품목록 페이지 카테고리 탭
'use client';

import { useState } from 'react';
import { usePetStore } from '@/store/petStore';
import { categories } from '@/categories/categories';

export default function CategoryTab() {
  const { pet, selectedCategory, setCategory, setSub } = usePetStore();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const petCategories = categories[pet];
  type CategoryKey = keyof typeof petCategories;
  const categoryKeys = Object.keys(petCategories) as CategoryKey[];

  return (
    <nav className="flex border-b border-gray-200 justify-around">
      {/* 전체 */}
      <button
        onClick={() => {
          setCategory(null);
          setOpenCategory(null);
        }}
        className={`py-3 px-3.5 text-sm ${
          selectedCategory === null
            ? 'font-medium border-b-2 border-br-primary-500'
            : 'text-br-input-active-text'
        }`}
      >
        전체
      </button>

      {/* 카테고리 */}
      {categoryKeys.map(key => (
        <div key={key} className="relative">
          <button
            onClick={() => setOpenCategory(openCategory === key ? null : key)}
            className={`py-3 px-3.5 text-sm ${
              selectedCategory === key
                ? 'font-medium border-b-2 border-br-primary-500'
                : 'text-br-input-active-text'
            }`}
          >
            {petCategories[key].name}
          </button>

          {/* 서브 카테고리 */}
          {openCategory === key && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-b-lg min-w-20 z-20 divide-y divide-gray-200">
              {Object.entries(petCategories[key].sub).map(
                ([subKey, subName]) => (
                  <button
                    key={subKey}
                    onClick={() => {
                      setCategory(key);
                      setSub(subKey);
                      setOpenCategory(null);
                    }}
                    className="block w-full px-4 py-2 text-[12px] text-br-input-active-text hover:bg-gray-100"
                  >
                    {subName}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
