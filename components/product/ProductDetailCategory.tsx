'use client';

import { usePetStore } from '@/store/petStore';
import { categories } from '@/categories/categories';
import { ProductDetail } from '@/types/product';

//상품 상세 페이지 - 카테고리
export default function ProductDetailCategory({
  detail,
}: {
  detail: ProductDetail;
}) {
  const { pet } = usePetStore();

  let petCategories;

  if (pet === 'dog') {
    petCategories = categories.dog;
  } else {
    petCategories = categories.cat;
  }

  type CategoryKey = keyof typeof petCategories;

  const mainCategory = detail.extra.mainCategory;
  const subCategory = detail.extra.subCategory;

  const getPetName = () => {
    return pet === 'dog' ? '강아지' : '고양이';
  };

  // 이름변환 - detail의 카테고리 정보 사용
  const getCategoryName = () => {
    if (!mainCategory) return '전체';
    return petCategories[mainCategory as CategoryKey]?.name;
  };

  const getSubName = () => {
    if (!mainCategory || !subCategory) return null;
    return petCategories[mainCategory as CategoryKey]?.sub[
      subCategory as keyof (typeof petCategories)[CategoryKey]['sub']
    ];
  };

  return (
    <nav className="py-2 mt-2 mb-1 text-sm font-light text-br-input-disabled-text">
      {getPetName()} &gt; {getCategoryName()}
      {subCategory && ` > ${getSubName()}`}
    </nav>
  );
}
