import { ProductSearchList } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface ProdcutListProps {
  product: ProductSearchList;
}

export default function SearchResultProduct({ product }: ProdcutListProps) {
  return (
    <>
      <Link
        href={`/products/${product._id}`}
        className="flex flex-row w-full mt-4.25 gap-4"
      >
        {/* 썸네일 */}
        <div className="relative w-21 h-21 overflow-hidden rounded-xl shrink-0">
          <Image
            src={product.mainImages[0].path}
            alt={product.mainImages[0].name}
            fill
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
            <div className="flex flex-row items-center gap-0.5">
              <Image
                src="/icons/heart-line-gray.svg"
                alt="조회 수"
                width={12}
                height={12}
              />
              <span className="text-[12px] text-br-button-disabled-text">
                {product.bookmarks}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
