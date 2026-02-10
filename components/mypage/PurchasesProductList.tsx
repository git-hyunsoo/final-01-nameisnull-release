// components/mypage/PurchasesProductList.tsx

import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface PurchasesProductListProps {
  product: Product;
  orderId: number;
}

export default function PurchasesProductList({
  product,
  orderId,
}: PurchasesProductListProps) {
  // 내가 이 상품에 리뷰 작성했는지 확인
  const hasReview =
    product.review_id !== undefined && product.review_id !== null;

  return (
    <div className="relative mr-4">
      <Link
        href={`/products/${product._id}`}
        className="relative flex flex-row mt-4.25 gap-4 m-4 mr-4"
      >
        {/* 썸네일 */}
        <div className="relative w-21 h-21 overflow-hidden rounded-xl shrink-0">
          <Image
            src={product.image?.path || product.mainImages[0].path}
            alt={product.name}
            fill
            sizes="84px"
            className="object-cover"
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="font-pretendard flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-[14px] line-clamp-2">{product.name}</p>
            <p className="text-[16px] font-bold">
              {product.price.toLocaleString('ko-KR')}원
            </p>
          </div>

          <div className="flex flex-row items-center gap-1">
            {product.views !== undefined && (
              <div className="flex flex-row items-center gap-0.5">
                <Image
                  src="/icons/visile-gray.svg"
                  alt="조회 수"
                  width={12}
                  height={12}
                />
                <span className="text-[12px] text-br-button-disabled-text">
                  {product.views}
                </span>
              </div>
            )}
            {product.bookmarks !== undefined && (
              <div className="flex flex-row items-center gap-0.5">
                <Image
                  src="/icons/heart-line-gray.svg"
                  alt="찜 수"
                  width={12}
                  height={12}
                />
                <span className="text-[12px] text-br-button-disabled-text">
                  {product.bookmarks}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* 발자국 등록 버튼 */}
      {!hasReview && (
        <Link
          href={`/review/${orderId}`}
          className="absolute bottom-1 right-0 flex items-center justify-center font-pretendard px-3 py-2 w-23 h-8 text-sm bg-br-chip-active-bg text-br-chip-active-text rounded-xl z-10"
        >
          발자국 등록
        </Link>
      )}
    </div>
  );
}
