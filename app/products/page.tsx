// app/products/page.tsx
import ProductHeader from '@/components/product/ProductHeader';
import UnderBar from '@/components/common/Footer';
import CategoryTab from '@/components/product/CategoryTab';
import ProductPageList from '@/components/product/ProductPageList';
import { getProducts } from '@/lib/api/products';
import ProductPageSearchBar from '@/components/product/ProductPageSearchBar';
import ProductPageWriteButton from '@/components/product/ProductPageWriteButton';

export default async function ProductPage() {
  // 스플래시 화면이 나오도록 2.5초 지연 걸어둠
  await new Promise(resolve => setTimeout(resolve, 1000 * 2.5));
  const res = await getProducts();

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

      {/* 글쓰기 버튼 (나중에 토큰 유무 조건 걸어둘 예정 ) */}
      <ProductPageWriteButton />
      <UnderBar />
    </div>
  );
}
