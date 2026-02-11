import Image from 'next/image';
import Link from 'next/link';

interface SavedProductCardProps {
  product: {
    _id: number;
    name: string;
    price: number;
    mainImages?: Array<{ path: string }>;
    seller: {
      name: string;
    };
    bookmarks?: number;
  };
  isWished?: boolean;
}

export default function SavedProductCard({
  product,
  isWished = false,
}: SavedProductCardProps) {
  return (
    <article className="ml-4 mb-6 mt-4">
      <Link
        href={`/products/${product._id}`}
        className="flex justify-between gap-4"
      >
        {/* 상품 이미지 */}
        <div className="relative shrink-0 rounded-xl overflow-hidden">
          <Image
            src={product.mainImages?.[0]?.path || '/icons/no-image.png'}
            alt={product.name}
            width={120}
            height={120}
            className="w-30 h-30 rounded-lg object-cover"
          />
        </div>
        {/* 상품 정보 */}
        <div className="flex flex-col justify-between flex-1 mr-4">
          <div>
            <p className="text-sm text-br-text-body mb-1">{product.name}</p>
            <p className="font-bold">{product.price.toLocaleString()}원</p>
          </div>
          {/* 판매자 닉네임 + 찜 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{product.seller.name}</span>
            <div className="flex items-center gap-1">
              <Image
                src={
                  isWished ? '/icons/heart-fill.svg' : '/icons/heart-line.svg'
                }
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
                aria-hidden="true"
              />
              <span className="text-sm text-br-text-body">
                {product.bookmarks}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
