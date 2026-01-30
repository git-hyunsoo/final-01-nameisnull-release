import { ProductDetail, SellerProductList } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function SellerInfoTab({
  detail,
  sellerProducts,
}: {
  detail: ProductDetail;
  sellerProducts: SellerProductList[];
}) {
  console.log('sellerProducts:', sellerProducts);
  console.log('sellerProducts.length:', sellerProducts.length);

  return (
    <>
      {/* 판매자 정보 탭 */}
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
                <span className="text-lg text-br-text-body">
                  {detail.rating?.toFixed(1) || '0.0'}
                </span>
                <img
                  src="/icons/footer-mypage-fill.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
              </div>
              <div className="text-sm text-br-input-disabled-text">
                젤리 지수
              </div>
            </div>

            {/* 중앙 구분선 */}
            <div className="w-px bg-br-input-disabled-line"></div>

            <div className="flex-1 text-center py-4">
              <div className="text-lg text-br-text-body">
                {detail.replies.length}
              </div>
              <div className="text-sm text-br-input-disabled-text">
                거래 횟수
              </div>
            </div>
          </div>
        </section>

        {/* 발자국 */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-br-text-body">
            발자국({detail.replies.length})
          </h3>

          {detail.replies.length > 0 ? (
            <>
              <div className="relative">
                {/* 후기 리스트 */}
                <ul className="space-y-3 max-h-90 overflow-hidden">
                  {detail.replies.map(review => (
                    <li
                      key={review._id}
                      className="flex gap-3 pt-4 pb-4 border-b border-br-input-disabled-line"
                    >
                      <img
                        src={review.user.image}
                        alt="사용자"
                        className="w-10 h-10 rounded-full"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-br-text-body mb-1 wrap-break-words font-light">
                          {review.content}
                        </p>
                        {/* 이거 날짠데..? */}
                        <span className="text-xs text-br-input-disabled-text">
                          {review.user.name}
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <img
                          src="/icons/footer-mypage-fill.svg"
                          alt=""
                          className="w-4 h-4"
                        />
                        <span className="text-xs font-light text-br-text-body">
                          {review.rating}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* 후기 더보기 그라디언트 */}
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
              </div>
              {/* 후기 더보기 버튼 */}
              <button className="mt-2 w-full py-3 font-light bg-br-input2-disabled-bg text-br-input2-disabled-text rounded-xl">
                후기 더보기
              </button>
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
                      src={product.mainImages[0].path}
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
    </>
  );
}
