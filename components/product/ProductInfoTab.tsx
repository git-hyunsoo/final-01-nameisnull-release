import ProductDetailCategory from '@/components/product/ProductDetailCategory';
import { ProductDetail } from '@/types/product';
import Image from 'next/image';

// 상품 정보 탭
export default function ProductInfoTab({
  detail,
  isSoldOut,
}: {
  detail: ProductDetail;
  isSoldOut: boolean;
}) {
  return (
    <div>
      {/* 카테고리 */}
      <ProductDetailCategory detail={detail} />

      {/* 판매 상태 */}
      {!isSoldOut ? (
        <span className="mb-2 inline-block px-2 py-1 rounded-xl bg-br-primary-200 text-br-primary-500 border border-br-primary-500 text-xs">
          판매중
        </span>
      ) : (
        <span className="mb-2 inline-block px-2 py-1 rounded-xl bg-br-input2-disabled-bg text-br-input2-disabled-text border border-br-input2-disabled-line text-xs">
          판매 완료
        </span>
      )}

      {/* 본문 */}
      <h2 className="mb-2 text-lg font-semibold break-all">{detail.name}</h2>
      <p className="mb-2 text-2xl font-bold text-br-primary-500">
        {detail.price.toLocaleString()}원
      </p>
      <p className="font-light break-all mb-2 whitespace-pre-wrap">
        {detail.content}
      </p>

      {/* 조회수/찜 수*/}
      <div className="flex items-center gap-3 text-sm text-br-input-disabled-text mb-6 justify-end">
        <div className="flex items-center gap-1">
          <Image
            src="/icons/visile.svg"
            alt="조회수"
            width={16}
            height={16}
            className="brightness-30"
            aria-hidden="true"
          />
          <span>{detail.views}</span>
        </div>

        <div className="flex items-center gap-1">
          <Image
            src="/icons/heart-line.svg"
            alt="찜수"
            width={16}
            height={16}
            className="grayscale opacity-80"
            aria-hidden="true"
          />
          <span>{detail.bookmarks}</span>
        </div>
      </div>

      {/* 구분선 */}
      <hr className="border-t border-[#F4F5FA] mb-6" />

      {/* 상세 정보 */}
      <section className="mb-1">
        <h3 className="text-lg font-semibold break-all mb-4">상세 정보</h3>

        <dl className="space-y-3">
          <div className="flex justify-between items-center">
            <dt className="text-sm font-light text-br-input-disabled-text">
              상품 상태
            </dt>
            <dd className="text-sm font-light text-br-text-body">
              {detail.extra.condition === 'new' ? '새상품' : '중고'}
            </dd>
          </div>

          <div className="flex justify-between items-center">
            <dt className="text-sm text-br-input-disabled-text font-light">
              희망 거래 방식
            </dt>
            <dd className="text-sm font-light text-br-text-body">
              {detail.extra.tradeType === 'delivery'
                ? '택배'
                : detail.extra.tradeType === 'direct'
                  ? '직거래'
                  : '택배/직거래'}
            </dd>
          </div>

          <div className="flex justify-between items-center">
            <dt className="text-sm text-br-input-disabled-text font-light">
              희망 거래 장소
            </dt>
            <dd className="text-sm text-br-text-body font-light">
              {detail.extra.tradeLocation}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
