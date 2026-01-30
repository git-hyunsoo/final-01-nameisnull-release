import UnderBar from '@/components/common/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getProducts } from '@/lib/api/products';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductPage() {
  // 스플래시 화면이 나오도록 2.5초 지연 걸어둠
  await new Promise(resolve => setTimeout(resolve, 1000 * 2.5));

  const res = await getProducts();
  const categories = ['전체', '사료', '간식', '용품', '건강', '의류'];
  // 기능 구현때 번경 예정
  const subCategories = ['건식', '습식/화식', '건조', '기타'];
  return (
    <div className="font-pretendard">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 px-3.5">
        {/* 펫 타입 선택 */}
        <header className="flex justify-center items-center gap-2 py-4">
          <Image src="/icons/cat.svg" alt="" width={24} height={24} />
          <Image src="/icons/dog.svg" alt="" width={24} height={24} />
          <span className="text-lg font-medium">강아지</span>
          <button type="button">
            <Image src="/icons/change.svg" alt="" width={24} height={24} />
          </button>
        </header>

        {/* 검색창 */}
        <div>
          <div className="flex items-center bg-[#F4F5FA] rounded-full px-4 py-2.5">
            <Image
              src="/icons/generation-gray.svg"
              alt=""
              width={18}
              height={18}
            />
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="bg-transparent ml-2 w-full outline-none text-sm text-br-input-active-line"
            />
          </div>
        </div>

        {/* 카테고리 탭 */}
        <nav className="flex border-b border-gray-200 justify-around">
          {categories.map(category => (
            <div key={category} className="relative">
              <button
                className={`py-3 px-3.5 text-sm ${
                  category === '사료'
                    ? ' font-medium border-b-2 border-br-primary-500'
                    : 'text-[#0F1218]'
                }`}
              >
                {' '}
                {category}
              </button>

              {/* 소분류 - 확인용으로 사료에만 넣음 (기능개발때 상태로 진행할 예정) */}
              {category === '사료' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-b-lg min-w-20 z-20 divide-y divide-gray-200">
                  {subCategories.map(sub => (
                    <button
                      key={sub}
                      className="block w-full px-4 py-2 text-[12px] text-[#0F1218] hover:bg-gray-100"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* 본문 */}
      <div className="pt-36 px-3.5">
        {/* 서브 카테고리 */}
        <p className="pt-5 pb-3 text-sm text-br-input-active-line">
          사료 &gt; 건식
        </p>

        {/* 상품 목록 */}
        <section className="grid grid-cols-2 gap-4 pb-20">
          {res.ok === 1 &&
            res.item.map(product => (
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

      <Link href={'/products/new'}>
        <button className="fixed bottom-20 right-4 bg-br-primary-500 z-10 text-[15px] text-white font-medium py-1.5 px-4.5 rounded-4xl shadow">
          <span className="text-[18px]">+</span> 글쓰기
        </button>
      </Link>
      <UnderBar />
    </div>
  );
}
