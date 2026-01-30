export default function ProductInfoTab() {
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
        <h2 className="mb-2 text-lg font-semibold break-all">
          고양이 쥐 장난감 팔아요 🐭
        </h2>
        <p className="mb-2 text-2xl font-bold text-br-primary-500">5,000원</p>

        <article className="font-light break-all mb-2">
          <p>고양이들 좋아 죽는 쥐 인형 팝니다 !</p>
          <p>장난감으로 딱이에요</p>
          <p>여러 개 샀는데 우리 고양이는 안 가지고 노네요 .....</p>
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
            <span>103</span>
          </div>

          <div className="flex items-center gap-1">
            <img
              src="/icons/heart-line.svg"
              alt="찜"
              width={16}
              height={16}
              className="grayscale opacity-80"
            />
            <span>2</span>
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
              <dd className="text-sm font-light text-br-text-body">새상품</dd>
            </div>

            <div className="flex justify-between items-center">
              <dt className="text-sm text-br-input-disabled-text font-light">
                희망 거래 방식
              </dt>
              <dd className="text-sm font-light text-br-text-body">직거래</dd>
            </div>

            <div className="flex justify-between items-center">
              <dt className="text-sm text-br-input-disabled-text font-light">
                희망 거래 장소
              </dt>
              <dd className="text-sm text-br-text-body font-light">
                종각역 1번 출구
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}
