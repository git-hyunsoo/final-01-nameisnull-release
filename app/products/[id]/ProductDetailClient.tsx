'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import SellerProfileBar from '@/components/product/SellerProfileBar';
import ProductInfoTab from '@/components/product/ProductInfoTab';
import SellerInfoTab from '@/components/product/SellerInfoTab';
import { ProductDetail, SellerProductList, UserReview } from '@/types/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductDetailFooter from '@/components/product/ProductDetailFooter';
import { addRecentProduct } from '@/lib/utils/storage';
import Image from 'next/image';

// 상품 상세 페이지 - 클라이언트 컴포넌트
export default function ProductDetailClient({
  detail,
  sellerProducts,
  review,
  soldCount,
  isSoldOut,
}: {
  detail: ProductDetail;
  sellerProducts: SellerProductList[];
  review: UserReview[];
  soldCount: number;
  isSoldOut: boolean;
}) {
  const [activeTab, setActiveTab] = useState('productInfo');

  // 최근 본 상품 저장
  useEffect(() => {
    if (detail) {
      addRecentProduct({
        _id: detail._id,
        name: detail.name,
        price: detail.price,
        mainImages: detail.mainImages,
        seller: detail.seller,
        bookmarks: detail.bookmarks,
        seller_id: detail.seller_id,
      });
    }
  }, [detail._id]);

  return (
    <div className="font-pretendard pb-20">
      {/* 헤더 */}
      <Header title="상품 상세" />

      {/* 이미지 */}
      <section className="w-full mt-4">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="aspect-square"
          style={
            {
              '--swiper-pagination-color': 'var(--primary-500)',
              '--swiper-pagination-bullet-inactive-color': 'var(--neutral-300)',
            } as React.CSSProperties
          }
        >
          {detail.mainImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image.path}
                alt={`상품 이미지 ${index + 1}`}
                className="w-full h-full object-cover"
                fill
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="px-4 py-4">
        {/* 판매자 프로필 바 */}
        <SellerProfileBar seller={detail.seller} sellerReviews={review} />
        {/* 상품 정보 / 판매자 정보 탭 UI */}
        <nav className="flex border-b border-[#F4F5FA]" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'productInfo'}
            onClick={() => setActiveTab('productInfo')}
            className={`flex-1 py-3 text-center text-base ${
              activeTab === 'productInfo'
                ? 'border-b-2 border-br-primary-500 text-br-neutral-900'
                : 'text-br-input-disabled-text'
            }`}
          >
            상품 정보
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'sellerInfo'}
            onClick={() => setActiveTab('sellerInfo')}
            className={`flex-1 py-3 text-center text-base ${
              activeTab === 'sellerInfo'
                ? 'border-b-2 border-br-primary-500 text-br-neutral-900'
                : 'text-br-input-disabled-text'
            }`}
          >
            판매자 정보
          </button>
        </nav>
        {/* 탭 & 본문 */}
        {activeTab === 'productInfo' && (
          <ProductInfoTab detail={detail} isSoldOut={isSoldOut} />
        )}
        {activeTab === 'sellerInfo' && (
          <SellerInfoTab
            detail={detail}
            sellerProducts={sellerProducts}
            review={review}
            sellerReviews={review}
            soldCount={soldCount}
          />
        )}

        {/* 푸터 */}
        <ProductDetailFooter
          productId={detail._id}
          sellerId={detail.seller._id}
        />
      </div>
    </div>
  );
}
