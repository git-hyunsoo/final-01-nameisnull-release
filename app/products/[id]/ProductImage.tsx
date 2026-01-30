'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface ProductDetailImageProps {
  mainImages: string[];
}

// 상품 상세 페이지 - 상품 이미지 슬라이더 컴포넌트
export default function ProductDetailImage({
  mainImages,
}: ProductDetailImageProps) {
  return (
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
        {mainImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`상품 이미지 ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
