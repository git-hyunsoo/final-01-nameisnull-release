import Image from 'next/image';
import { User } from '@/types/user';

interface SellerProfileBarProps {
  seller: User;
  rating: number;
}

// 상품 상세 페이지 - 판매자 프로필 바
export default function SellerProfileBar({
  seller,
  rating,
}: SellerProfileBarProps) {
  return (
    <>
      <section className="flex items-center gap-3">
        <img
          src={seller.image}
          alt="판매자"
          className="w-11 h-11 rounded-full object-cover"
        />

        <span className="text-lg font-regular text-br-text-body">
          {seller.name}
        </span>

        <div className="flex items-center gap-1 ml-auto">
          <Image
            src="/icons/footer-mypage-fill.svg"
            alt=""
            width={16}
            height={16}
            className="w-8 h-8"
          />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-light text-br-text-body leading-tight">
              젤리 지수
            </span>
            <span className="text-xl font-light text-br-text-body leading-none">
              {rating?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
