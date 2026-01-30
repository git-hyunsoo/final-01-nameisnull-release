import Image from 'next/image';
import Link from 'next/link';

export default function ProductList() {
  return (
    <>
      <Link
        href={`/products/{id}`}
        className="flex flex-row w-full mt-4.25 gap-4"
      >
        {/* 썸네일 */}
        <div className="relative w-21 h-21 overflow-hidden rounded-xl shrink-0">
          <Image
            src="https://res.cloudinary.com/ddedslqvv/image/upload/v1768981576/febc15-final01-ecad/qBJjByQxs.png"
            alt="강아지 실 장난감"
            fill
            className="object-cover"
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="font-pretendard flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-[14px] line-clamp-2">
              강아지 실 장난감 판매합니다!! 터그 놀이용이고 새 상품이에요~!
            </p>
            <p className="text-[16px] font-bold">5,000원</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="flex flex-row items-center gap-0.5">
              <Image
                src="/icons/visile-gray.svg"
                alt="조회 수"
                width={12}
                height={12}
              />
              <span className="text-[12px] text-br-button-disabled-text">
                103
              </span>
            </div>
            <div className="flex flex-row items-center gap-0.5">
              <Image
                src="/icons/heart-line-gray.svg"
                alt="조회 수"
                width={12}
                height={12}
              />
              <span className="text-[12px] text-br-button-disabled-text">
                2
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
