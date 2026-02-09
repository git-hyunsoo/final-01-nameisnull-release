import { ProductList } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface ProductListProps {
  product: ProductList;
}

export default function SearchResultProduct({ product }: ProductListProps) {
  // 한국식 가격 표시(ex) 20,000)
  const formattedPrice = product.price.toLocaleString('ko-KR');

  return (
    <article className="mt-4.25">
      <Link
        href={`/products/${product._id}`}
        className="flex flex-row w-full gap-4 hover:opacity-80 transition-opacity
                   focus:outline-none focus:ring-2 focus:ring-br-primary-500 
                   focus:ring-offset-2 rounded-xl p-1 -m-1"
        aria-label={`${product.name}, 가격 ${formattedPrice}원, 조회수 ${product.views}, 찜 ${product.bookmarks}`}
      >
        {/* 썸네일 */}
        <div
          className="relative w-21 h-21 overflow-hidden rounded-xl shrink-0"
          aria-hidden="true"
        >
          <Image
            src={product.mainImages[0].path}
            alt=""
            fill
            className="object-cover"
            sizes="84px"
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="font-pretendard flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="text-[14px] line-clamp-2">{product.name}</h3>
            <p className="text-[16px] font-bold mt-1">
              <span className="sr-only">가격:</span>
              {formattedPrice}원
            </p>
          </div>

          {/* 조회수, 찜 수*/}
          <div
            className="flex flex-row items-center gap-1"
            aria-label="상품 통계"
          >
            <div className="flex flex-row items-center gap-0.5">
              <Image
                src="/icons/visile-gray.svg"
                alt=""
                width={12}
                height={12}
                aria-hidden="true"
              />
              <span
                className="text-[12px] text-br-button-disabled-text"
                aria-label={`조회수 ${product.views}`}
              >
                {product.views}
              </span>
            </div>
            <div className="flex flex-row items-center gap-0.5">
              <Image
                src="/icons/heart-line-gray.svg"
                alt=""
                width={12}
                height={12}
                aria-hidden="true"
              />
              <span
                className="text-[12px] text-br-button-disabled-text"
                aria-label={`찜 ${product.bookmarks}`}
              >
                {product.bookmarks}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
