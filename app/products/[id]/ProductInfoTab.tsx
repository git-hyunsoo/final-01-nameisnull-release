import { ProductDetail } from '@/types/product';

export default function ProductInfoTab({ detail }: { detail: ProductDetail }) {
  return (
    <>
      {/* 상품 정보 탭 */}
      <div>
        <nav
          className="py-2 mt-2 mb-2 text-sm text-br-input-disabled-text"
          aria-label="상품 카테고리"
        >
          고양이 &gt; 용품 &gt; 장난감
        </nav>
        <span
          className="mb-2 inline-block px-2 py-1 rounded-xl bg-br-primary-200 text-br-primary-500 border border-br-primary-500 text-xs"
          aria-label="판매 상태"
        >
          판매 중
        </span>
        <h2 className="mb-2 text-lg font-semibold break-all">{detail.name}</h2>
        <p className="mb-2 text-2xl font-bold text-br-primary-500">
          {detail.price.toLocaleString()}원
        </p>

        <article className="font-light break-all mb-2">
          {detail.content}
        </article>

        {/* 조회수/찜 수*/}
        <div className="flex items-center gap-3 text-sm text-br-input-disabled-text mb-6 justify-end">
          <div className="flex items-center gap-1">
            <img
              src="/icons/visile.svg"
              alt="조회수"
              width={16}
              height={16}
              className="brightness-30"
            />
            <span>{detail.views}</span>
          </div>

          <div className="flex items-center gap-1">
            <img
              src="/icons/heart-line.svg"
              alt="찜"
              width={16}
              height={16}
              className="grayscale opacity-80"
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
    </>
  );
}
