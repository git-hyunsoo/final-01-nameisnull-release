import Image from 'next/image';
import { UserReview } from '@/types/product';
import { User } from '@/types/user';

// 상품 상세 페이지 - 판매자 프로필 바
export default function SellerProfileBar({
  seller,
  sellerReviews,
}: {
  seller: User;
  sellerReviews: UserReview[];
}) {
  const averageRating =
    sellerReviews.length > 0
      ? (
          sellerReviews.reduce((sum, review) => sum + review.rating, 0) /
          sellerReviews.length
        ).toFixed(1)
      : '0.0';
  return (
    <>
      <section className="flex items-center gap-3">
        <Image
          src={seller.image || '/icons/chat-profile.svg'}
          alt="판매자"
          width={44}
          height={44}
          className="w-11 h-11 rounded-full object-cover"
        />

        <span className="text-lg font-regular text-br-text-body">
          {seller.name}
        </span>

        <div className="flex items-center gap-1 ml-auto">
          <Image
            src="/icons/footer-mypage-fill.svg"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7"
          />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-light text-br-text-body leading-tight">
              젤리 지수
            </span>
            <span className="text-xl font-light text-br-text-body leading-none">
              {averageRating}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
