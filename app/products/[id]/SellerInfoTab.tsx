import Image from 'next/image';
import Link from 'next/link';

export default function SellerInfoTab() {
  // 게시물 있을 때 버전 (***테스트용)
  const sellerData = {
    intro:
      '반갑습니다 ~ 😺 \n상점 내 합배송 환영입니당 \n언제든지 편하게 연락 부탁드려요!',
    activityScore: 4.5,
    tradeCount: 13,
    footprints: [
      {
        id: 1,
        avatar:
          'https://res.cloudinary.com/ddedslqvv/image/upload/v1769060488/febc15-final01-ecad/0OtsJhqxDW.png',
        text: '진짜 친절하시고, 상품 정말도~ 그대로예요! 제가 있는 곳까지 운전해 주셔서 감사합니다~',
        date: '대강아이지구 · 3분 전',
        rating: 5.0,
      },
      {
        id: 1,
        avatar:
          'https://res.cloudinary.com/ddedslqvv/image/upload/v1769060488/febc15-final01-ecad/0OtsJhqxDW.png',
        text: '진짜 친절하시고, 상품 정말도~ 그대로예요! 제가 있는 곳까지 운전해 주셔서 감사합니다~',
        date: '대강아이지구 · 3분 전',
        rating: 5.0,
      },
    ],
    otherProducts: [
      {
        id: 1,
        image:
          'https://res.cloudinary.com/ddedslqvv/image/upload/v1769060488/febc15-final01-ecad/2-Y2nqJ3Y.jpg',
        price: '10,000원',
        name: '푸드리본 텀 소재...',
      },
    ],
  };
  // 게시물 없을 때 버전 (***테스트용)
  // const sellerData = {
  //   intro: '', // 빈 문자열
  //   activityScore: 0, // 0
  //   tradeCount: 0, // 0
  //   footprints: [], // 빈 배열
  //   otherProducts: [], // 빈 배열
  // };

  return (
    <>
      {/* 판매자 정보 탭 */}
      <div className="mt-5">
        {/* 소개글 */}
        <section>
          <h3 className="text-lg font-semibold mb-4">소개글</h3>

          {sellerData.intro ? (
            <p className="font-light text-br-text-body leading-relaxed whitespace-pre-line mb-5">
              {sellerData.intro}
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
                  {sellerData.activityScore.toFixed(1)}
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
                {sellerData.tradeCount}건
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
            발자국({sellerData.footprints.length})
          </h3>

          {sellerData.footprints.length > 0 ? (
            <>
              <div className="relative">
                {/* 후기 리스트 */}
                <ul className="space-y-3 max-h-90 overflow-hidden">
                  {sellerData.footprints.map(footprint => (
                    <li
                      key={footprint.id}
                      className="flex gap-3 pt-4 pb-4 border-b border-br-input-disabled-line"
                    >
                      <img
                        src={footprint.avatar}
                        alt="사용자"
                        className="w-10 h-10 rounded-full"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-br-text-body mb-1 wrap-break-words font-light">
                          {footprint.text}
                        </p>
                        <span className="text-xs text-br-input-disabled-text">
                          {footprint.date}
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <img
                          src="/icons/footer-mypage-fill.svg"
                          alt=""
                          className="w-4 h-4"
                        />
                        <span className="text-xs font-light text-br-text-body">
                          {footprint.rating}
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

          {sellerData.otherProducts.length > 0 ? (
            <div className="flex gap-2 overflow-x-auto">
              {sellerData.otherProducts.map(product => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="
                          min-w-30
                          shrink-0
                          rounded-lg
                          overflow-hidden
                        "
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="w-full h-30 rounded-lg"
                  />
                  <div className="mt-2 mb-1">
                    <p className="font-semibold text-br-text-body">
                      {product.price}
                    </p>
                    <p className="text-sm text-br-input-disabled-text truncate">
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
