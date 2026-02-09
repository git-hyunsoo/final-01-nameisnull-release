//상품 목록
'use client';

import { usePetStore } from '@/store/petStore';
import { categories } from '@/categories/categories';
import ProductCard from './ProductCard';
import { ProductWithoutEmbeddings } from '@/types/product';

export default function ProductPageList({
  products,
}: {
  products: ProductWithoutEmbeddings[];
}) {
  const { pet, selectedCategory, selectedSub, searchKeyword } = usePetStore();

  let petCategories;

  if (pet === 'dog') {
    petCategories = categories.dog;
  } else {
    petCategories = categories.cat;
  }

  type CategoryKey = keyof typeof petCategories;

  // 필터로 조건
  const productsItem = products.filter(product => {
    if (product.extra.pet !== pet) return false;
    if (searchKeyword) {
      return product.name.includes(searchKeyword);
    }
    if (selectedCategory && product.extra.mainCategory !== selectedCategory)
      return false;
    if (selectedSub && product.extra.subCategory !== selectedSub) return false;

    return true;
  });

  // 이름변환
  const getCategoryName = () => {
    if (searchKeyword) return '검색';
    if (!selectedCategory) return '전체';
    return petCategories[selectedCategory as CategoryKey]?.name;
  };

  const getSubName = () => {
    if (searchKeyword) return `"${searchKeyword}"`;
    if (!selectedCategory || !selectedSub) return null;
    return petCategories[selectedCategory as CategoryKey]?.sub[
      selectedSub as keyof (typeof petCategories)[CategoryKey]['sub']
    ];
  };

  return (
    <div className="pt-36 px-3.5">
      <p className="pt-5 pb-3 text-sm text-br-input-active-line">
        {getCategoryName()}
        {(selectedSub || searchKeyword) && ` > ${getSubName()}`}
      </p>

      {/* 상품 목록 */}
      <section className="grid grid-cols-2 gap-4 pb-20 lg:grid-cols-6 lg:gap-x-6 lg:gap-y-12">
        {productsItem.map(product => (
          <ProductCard
            key={product._id}
            _id={product._id}
            price={product.price}
            mainImages={product.mainImages}
            name={product.name}
            views={product.views}
            bookmarks={product.bookmarks}
          />
        ))}
      </section>
    </div>
  );
}
