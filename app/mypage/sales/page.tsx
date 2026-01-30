'use client';

import UnderBar from '@/components/common/Footer';
import Header from '@/components/common/Header';
import ProductList from '@/components/search/ProductList';
import { useState } from 'react';

//판매내역
export default function SalesPage() {
  const [activeTab, setActiveTab] = useState('selling');

  return (
    <>
      <Header title="판매 내역" />

      {/* 판매 중 탭 / 판매 완료 탭 */}
      <div className="font-pretendard flex border-b border-[#F4F5FA]">
        {/* 판매 중 */}
        <button
          onClick={() => setActiveTab('selling')}
          className={`flex-1 py-3 text-center text-base ${
            activeTab === 'selling'
              ? 'border-b-2 border-br-primary-500 text-br-neutral-900'
              : 'text-br-input-disabled-text'
          }`}
        >
          판매 중
        </button>

        {/* 판매 완료 */}
        <button
          onClick={() => setActiveTab('sold')}
          className={`flex-1 py-3 text-center text-base ${
            activeTab === 'sold'
              ? 'border-b-2 border-br-primary-500 text-br-neutral-900'
              : 'text-br-input-disabled-text'
          }`}
        >
          판매 완료
        </button>
      </div>
      <div>
        {/* 상품 목록 */}
        {/* 상품 목록 */}
        <main className="flex-1 px-4">
          {/* 판매 중 탭 */}
          {activeTab === 'selling' && (
            <>
              <ProductList />
              <ProductList />
              <ProductList />
              <ProductList />
              <ProductList />
              <ProductList />
              <ProductList />
              <ProductList />
              <ProductList />
              <ProductList />
            </>
          )}

          {/* 판매 완료 탭 */}
          {activeTab === 'sold' && (
            <>
              <ProductList />
              <ProductList />
            </>
          )}
        </main>
        <UnderBar />
      </div>
    </>
  );
}
