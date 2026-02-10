'use client';

import { ProductDetail, SellerProductList, UserReview } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

// 판매자 정보 탭
export default function SellerInfoTab({
  detail,
  sellerProducts,
  review,
  sellerReviews,
  soldCount,
}: {
  detail: ProductDetail;
  sellerProducts: SellerProductList[];
  review: UserReview[];
  sellerReviews: UserReview[];
  soldCount: number; // ← 타입 수정
}) {
  sellerProducts = sellerProducts.filter(product => product.buyQuantity === 0);
  const [showReviews, setShowReviews] = useState(false);
  const reviewList = showReviews ? review : review.slice(0, 3);
  const moreReviews = review.length > 3;
  const averageRating =
    sellerReviews.length > 0
      ? (
          sellerReviews.reduce((sum, review) => sum + review.rating, 0) /
          sellerReviews.length
        ).toFixed(1)
      : '0.0';

  return (
    <div className="mt-5">
      {/* 소개글 */}
      <section>
        <h3 className="text-lg font-semibold mb-4">소개글</h3>

        {detail.seller.extra?.introduce ? (
          <p className="font-light text-br-text-body leading-relaxed whitespace-pre-line mb-5">
            {detail.seller.extra?.introduce}
          </p>
        ) : (
          <p className="text-center text-br-input-disabled-text p-5 mb-4">
            아직 등록된 소개글이 없어요.
          </p>
        )}
      </section>

      {/* 활동 지수(젤리 지수 & 거래 횟수) */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-br-text-body">활동 지수</h3>
        <div className="flex">
          <div className="flex-1 text-center py-4">
            <div className="flex items-center justify-center gap-1 mb-0">
              <span className="text-lg text-br-text-body">{averageRating}</span>
              <Image
                src="/icons/footer-mypage-fill.svg"
                alt=""
                width={20}
                height={20}
                className="w-4 h-4"
              />
            </div>
            <div className="text-sm text-br-input-disabled-text">젤리 지수</div>
          </div>

          {/* 중앙 구분선 */}
          <div className="w-px bg-br-input-disabled-line"></div>

          <div className="flex-1 text-center py-4">
            <div className="text-lg text-br-text-body">{soldCount}</div>
            <div className="text-sm text-br-input-disabled-text">거래 횟수</div>
          </div>
        </div>
      </section>

      {/* 발자국 */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-br-text-body">
          발자국({review.length})
        </h3>

        {review.length > 0 ? (
          <>
            <div className="relative">
              {/* 후기 리스트 */}
              <ul
                className={`space-y-3 ${!showReviews && moreReviews ? 'max-h-90 overflow-hidden' : ''}`}
              >
                {reviewList.map(reviewItem => (
                  <li
                    key={reviewItem._id}
                    className="flex gap-3 pt-4 pb-4 border-b border-br-input-disabled-line"
                  >
                    {reviewItem.user?.image ? (
                      <Image
                        src={reviewItem.user.image}
                        alt="사용자"
                        className="w-10 h-10 rounded-full"
                        width={10}
                        height={10}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-xs">?</span>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-br-text-body mb-1 wrap-break-words font-light">
                        {reviewItem.content}
                      </p>
                      <span className="text-xs text-br-input-disabled-text">
                        {reviewItem.user?.name || '익명'} ·{' '}
                        {formatDistanceToNow(new Date(reviewItem.createdAt), {
                          addSuffix: true,
                          locale: ko,
                        })}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <Image
                        src="/icons/footer-mypage-fill.svg"
                        alt=""
                        className="w-4 h-4"
                        width={4}
                        height={4}
                      />
                      <span className="text-xs font-light text-br-text-body">
                        {reviewItem.rating}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              {/* 후기 더보기 그라디언트 */}
              {moreReviews && !showReviews && (
                <div
                  className="
                          pointer-events-none
                          absolute bottom-0 left-0
                          w-full h-20
                          bg-linear-to-b
                          from-white/40
                          via-white/90
                          to-white
                        "
                />
              )}
            </div>

            {/* 후기 더보기 버튼 */}
            {moreReviews && (
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="mt-2 w-full py-3 font-light bg-br-input2-disabled-bg text-br-input2-disabled-text rounded-xl"
              >
                {showReviews ? '닫기' : '후기 더보기'}
              </button>
            )}
          </>
        ) : (
          <p className="text-center text-br-input-disabled-text p-5 mb-4 mt-4">
            아직 남겨진 발자국이 없어요.
          </p>
        )}
      </section>

      {/* 판매자의 다른 상품 */}
      <section>
        <h3 className="text-lg font-semibold text-br-text-body mb-4">
          판매자의 다른 상품
        </h3>

        {sellerProducts.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto">
            {sellerProducts
              .filter(p => p._id !== detail._id) // ← 현재 상품 제외
              .map(product => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="
                          w-30
                          shrink-0
                          overflow-hidden
                        "
                >
                  <Image
                    src={
                      product.mainImages?.[0]?.path || '/images/no-image.png'
                    }
                    alt={product.name}
                    width={120}
                    height={120}
                    className="w-30 h-30 rounded-lg object-cover"
                  />
                  <div className="mt-2 mb-1">
                    <p className="font-semibold text-br-text-body">
                      {product.price.toLocaleString()}원
                    </p>
                    <p className="text-sm text-br-input-disabled-text line-clamp-1">
                      {product.name}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <p className="text-center text-br-input-disabled-text p-5 mb-4 mt-4">
            아직 등록된 다른 상품이 없어요.
          </p>
        )}
      </section>
    </div>
  );
}
