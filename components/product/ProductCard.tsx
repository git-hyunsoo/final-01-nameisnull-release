//상품 컴포넌트

import { ProductList } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({
  _id,
  price,
  name,
  mainImages,
  bookmarks,
  views,
}: ProductList) {
  console.log(mainImages);
  // link id변경
  return (
    <Link href={`/products/${_id}`}>
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={mainImages[0].path}
          alt={`${name} 이미지`}
          width={164}
          height={164}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-2 font-semibold">{price.toLocaleString()}원</p>
      <p className="mt-1.5 text-br-input-active-line">{name}</p>
      <div className="flex gap-0.5 mt-2">
        <Image src="/icons/visile-gray.svg" alt="" width={12} height={8} />
        <span className="text-br-input-active-line text-[12px]">
          {views ?? 0}
        </span>
        <Image
          src="/icons/heart-line-gray.svg"
          alt=""
          width={12}
          height={8}
          className="ml-1"
        />
        <span className="text-br-input-active-line text-[12px]">
          {bookmarks}
        </span>
      </div>
    </Link>
  );
}
