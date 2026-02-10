export const dynamic = 'force-dynamic';
import ProductHeader from '@/components/product/ProductHeader';
import UnderBar from '@/components/common/Footer';
import CategoryTab from '@/components/product/CategoryTab';
import ProductPageList from '@/components/product/ProductPageList';
import { getCustomProducts } from '@/lib/api/products';
import ProductPageSearchBar from '@/components/product/ProductPageSearchBar';
import ProductPageWriteButton from '@/components/product/ProductPageWriteButton';

export default async function ProductPage() {
  await new Promise(resolve => setTimeout(resolve, 1000 * 0.5));
  const res = await getCustomProducts();

  return (
    <div className="font-pretendard">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 px-3.5">
        {/* 강아지, 고양이 선택 */}
        <ProductHeader />
        {/* 검색바 */}
        <ProductPageSearchBar />
        {/* 카테고리 */}
        <CategoryTab />
      </div>
      {/* 상품 목록 */}
      {res.ok === 1 && <ProductPageList products={res.item} />}

      {/* 글쓰기 버튼 */}
      <ProductPageWriteButton />
      <UnderBar />
    </div>
  );
}
