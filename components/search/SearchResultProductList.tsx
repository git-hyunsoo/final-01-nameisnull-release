import SearchResultProduct from '@/components/search/SearchResultProduct';
import { ProductList } from '@/types/product';
import { useRouter } from 'next/navigation';

export default function SearchResultProductList({
  products,
}: {
  products: ProductList[];
}) {
  const router = useRouter();

  const handleGoGenerateSearch = () => {
    router.push('/products');
  };

  return (
    <main className="px-4 mt-7.25">
      <h2 className="text-[18px] font-semibold">AI 추천 상품</h2>

      {/* 상품이 없을 때 대체 텍스트 */}
      {products.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="text-center py-10 text-br-button-disabled-text"
        >
          검색 결과가 없습니다.
        </div>
      ) : (
        <ul
          className="list-none"
          role="list"
          aria-label={`AI 추천 상품 목록 (총 ${products.length}개)`}
        >
          {products.map(product => {
            return (
              <li key={product._id}>
                <SearchResultProduct product={product} />
              </li>
            );
          })}
        </ul>
      )}

      {/* 안내 문구 + 버튼 */}
      <div className="mt-10 mb-13 flex flex-col items-center">
        <p
          className="text-br-button-disabled-text text-[14px] text-center mb-3"
          id="no-result-guide"
        >
          찾으시는 상품이 없으신가요?
          <br />
          &quot;일반 검색&quot;으로 더 많은 상품을 확인해보세요
        </p>
        <button
          type="button"
          onClick={handleGoGenerateSearch}
          className="w-full h-12 rounded-xl bg-br-primary-500 text-br-button-active-text
                     hover:bg-br-primary-600 focus:outline-none focus:ring-2 
                     focus:ring-br-primary-500 focus:ring-offset-2 transition-colors"
          aria-describedby="no-result-guide"
        >
          홈으로 가기
        </button>
      </div>
    </main>
  );
}
