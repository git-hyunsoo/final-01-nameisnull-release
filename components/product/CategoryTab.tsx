'use client';

import { useState, useRef, useEffect } from 'react';
import { usePetStore } from '@/store/petStore';
import { categories } from '@/categories/categories';

export default function CategoryTab() {
  const { pet, selectedCategory, setCategory, setSub } = usePetStore();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const petCategories = categories[pet];
  type CategoryKey = keyof typeof petCategories;
  const categoryKeys = Object.keys(petCategories) as CategoryKey[];

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape 키로 닫기
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpenCategory(null);
  };

  return (
    <nav
      ref={navRef}
      role="tablist"
      aria-label="상품 카테고리"
      className="flex border-b border-gray-200 justify-around"
      onKeyDown={handleKeyDown}
    >
      {/* 전체 */}
      <button
        role="tab"
        aria-selected={selectedCategory === null}
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
            role="tab"
            aria-selected={selectedCategory === key}
            aria-expanded={openCategory === key}
            aria-haspopup="menu"
            aria-controls={`submenu-${key}`}
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
            <div
              id={`submenu-${key}`}
              role="menu"
              aria-label={`${petCategories[key].name} 하위 카테고리`}
              className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-b-lg min-w-20 z-20 divide-y divide-gray-200"
            >
              {Object.entries(petCategories[key].sub).map(
                ([subKey, subName]) => (
                  <button
                    key={subKey}
                    role="menuitem"
                    onClick={() => {
                      setCategory(key);
                      setSub(subKey);
                      setOpenCategory(null);
                    }}
                    className="block w-full px-4 py-2 text-[12px] text-br-input-active-text hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
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
