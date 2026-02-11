'use client';

import UnderBar from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Spinner from '@/components/common/Spinner';
import SearchResultProduct from '@/components/search/SearchResultProduct';
import { mypageSellerProductList } from '@/lib/api/products';
import { SellerProductList } from '@/types/product';
import { useEffect, useState } from 'react';

//판매내역
export default function SalesPage() {
  const [activeTab, setActiveTab] = useState('selling');
  const [products, setProducts] = useState<SellerProductList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      setIsLoading(true);

      const response = await mypageSellerProductList();

      if (response.ok === 1) {
        setProducts(response.item);
      }

      setIsLoading(false);
    };

    fetchSellerProducts();
  }, []);

  // 판매 중 / 판매 완료 필터링
  const sellingProducts = products.filter(p => p.buyQuantity === 0);
  const soldProducts = products.filter(p => p.buyQuantity === 1);

  return (
    <div className="font-pretendard">
      <Header title="판매 내역" />

      {/* 판매 중 탭 / 판매 완료 탭 */}
      <nav className="flex border-b border-[#F4F5FA]" role="tablist">
        <button
          onClick={() => setActiveTab('selling')}
          role="tab"
          aria-selected={activeTab === 'selling'}
          className={`flex-1 py-3 text-center text-base ${
            activeTab === 'selling'
              ? 'border-b-2 border-br-primary-500 text-br-neutral-900'
              : 'text-br-input-disabled-text'
          }`}
        >
          판매 중
        </button>

        <button
          onClick={() => setActiveTab('sold')}
          role="tab"
          aria-selected={activeTab === 'sold'}
          className={`flex-1 py-3 text-center text-base ${
            activeTab === 'sold'
              ? 'border-b-2 border-br-primary-500 text-br-neutral-900'
              : 'text-br-input-disabled-text'
          }`}
        >
          판매 완료
        </button>
      </nav>

      {/* 상품 목록 */}
      <main className="flex-1 px-4 mb-20">
        {/* 판매 중 탭 */}
        {activeTab === 'selling' && (
          <>
            {isLoading ? (
              <Spinner />
            ) : sellingProducts.length > 0 ? (
              <ul>
                {sellingProducts.map(product => (
                  <li key={product._id}>
                    <SearchResultProduct product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center mt-20 text-gray-500 font-light">
                판매 중인 상품이 없습니다
              </div>
            )}
          </>
        )}

        {/* 판매 완료 탭 */}
        {activeTab === 'sold' && (
          <>
            {isLoading ? (
              <Spinner />
            ) : soldProducts.length > 0 ? (
              <ul>
                {soldProducts.map(product => (
                  <li key={product._id}>
                    <SearchResultProduct product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center mt-20 text-gray-500 font-light">
                판매 완료된 상품이 없습니다
              </div>
            )}
          </>
        )}
      </main>

      <UnderBar />
    </div>
  );
}
