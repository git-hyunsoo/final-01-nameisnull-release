'use client';

import UnderBar from '@/components/common/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const goBack = useRouter();

  return (
    <>
      <div className="font-pretendard">
        {/* 헤더 */}
        <header className="flex flex-row gap-3.5 mt-4.5 ml-5.5 mb-4.5 items-center justify-between">
          <button
            type="button"
            onClick={() => goBack.back()}
            aria-label="뒤로 가기"
            className="flex items-center gap-2"
          >
            <Image
              src="/icons/arrow-left.svg"
              alt=""
              width={8}
              height={16}
              className="w-4 h-4"
            />
            <span className="leading-none items-center text-center text-lg font-medium">
              찜 목록
            </span>
          </button>

          <button type="button" aria-label="더보기">
            <Image
              src="/icons/more.svg"
              alt=""
              width={3}
              height={18}
              className="flex items-center gap-3.5 mr-5.5 w-1 h-4"
            />
          </button>
        </header>

        {/* 상품 목록 */}
        <Link href={'/products/id'}>
          <section className="ml-4 mb-6">
            <article className="flex justify-between gap-4">
              {/* 상품 이미지 */}
              <div className="relative shrink-0 rounded-xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/ddedslqvv/image/upload/v1769060488/febc15-final01-ecad/aVkSaWfTp.jpg"
                  alt="상품 이미지"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full "
                />
              </div>

              {/* 상품 정보 */}
              <div className="flex flex-col justify-between flex-1 mr-4">
                {/* 제목 + 가격 */}
                <div>
                  <p className="text-sm text-br-text-body mb-1">
                    고양이 장난감 팔아요. 전부 미개봉 상태입니다!
                  </p>
                  <p className=" font-bold">20,000원</p>
                </div>
                {/* 닉네임 + 좋아요 */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">소식동물주먹</span>
                  <button className="flex items-center gap-1" aria-label="찜">
                    <Image
                      src="/icons/heart-fill.svg"
                      alt="찜 수"
                      width={20}
                      height={20}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-br-text-body">5</span>
                  </button>
                </div>
              </div>
            </article>
          </section>
        </Link>

        <Link href={'/products/id'}>
          <section className="ml-4 mb-6">
            <article className="flex justify-between gap-4">
              {/* 상품 이미지 */}
              <div className="relative shrink-0 rounded-xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/ddedslqvv/image/upload/v1769060488/febc15-final01-ecad/aVkSaWfTp.jpg"
                  alt="상품 이미지"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full "
                />
              </div>

              {/* 상품 정보 */}
              <div className="flex flex-col justify-between flex-1 mr-4">
                {/* 제목 + 가격 */}
                <div>
                  <p className="text-sm text-br-text-body mb-1">
                    고양이 장난감 팔아요. 전부 미개봉 상태입니다! 고양이들이
                    너무 좋아하는 물고기 모양 🐡🐠🐟🎏🎣
                  </p>
                  <p className=" font-bold">20,000원</p>
                </div>
                {/* 닉네임 + 좋아요 */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">소식동물주먹</span>
                  <button className="flex items-center gap-1" aria-label="찜">
                    <Image
                      src="/icons/heart-fill.svg"
                      alt="찜 수"
                      width={20}
                      height={20}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-br-text-body">5</span>
                  </button>
                </div>
              </div>
            </article>
          </section>
        </Link>

        <Link href={'/products/id'}>
          <section className="ml-4 mb-6">
            <article className="flex justify-between gap-4">
              {/* 상품 이미지 */}
              <div className="relative shrink-0 rounded-xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/ddedslqvv/image/upload/v1769060488/febc15-final01-ecad/aVkSaWfTp.jpg"
                  alt="상품 이미지"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full "
                />
              </div>

              {/* 상품 정보 */}
              <div className="flex flex-col justify-between flex-1 mr-4">
                {/* 제목 + 가격 */}
                <div>
                  <p className="text-sm text-br-text-body mb-1">
                    고양이 장난감 팔아요. 전부 미개봉 상태입니다!
                  </p>
                  <p className=" font-bold">20,000원</p>
                </div>
                {/* 닉네임 + 좋아요 */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">소식동물주먹</span>
                  <button className="flex items-center gap-1" aria-label="찜">
                    <Image
                      src="/icons/heart-fill.svg"
                      alt="찜 수"
                      width={20}
                      height={20}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-br-text-body">5</span>
                  </button>
                </div>
              </div>
            </article>
          </section>
        </Link>

        <Link href={'/products/id'}>
          <section className="ml-4 mb-6">
            <article className="flex justify-between gap-4">
              {/* 상품 이미지 */}
              <div className="relative shrink-0 rounded-xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/ddedslqvv/image/upload/v1769060488/febc15-final01-ecad/aVkSaWfTp.jpg"
                  alt="상품 이미지"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full "
                />
              </div>

              {/* 상품 정보 */}
              <div className="flex flex-col justify-between flex-1 mr-4">
                {/* 제목 + 가격 */}
                <div>
                  <p className="text-sm text-br-text-body mb-1">
                    고양이 장난감 팔아요. 전부 미개봉 상태입니다! 고양이들이
                    너무 좋아하는 물고기 모양 🐟
                  </p>
                  <p className=" font-bold">20,000원</p>
                </div>
                {/* 닉네임 + 좋아요 */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">소식동물주먹</span>
                  <button className="flex items-center gap-1" aria-label="찜">
                    <Image
                      src="/icons/heart-fill.svg"
                      alt="찜 수"
                      width={20}
                      height={20}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-br-text-body">5</span>
                  </button>
                </div>
              </div>
            </article>
          </section>
        </Link>

        <UnderBar />
      </div>
    </>
  );
}
