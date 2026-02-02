export const dynamic = 'force-dynamic';
import UnderBar from '@/components/common/Footer';
import ProductPage from '@/app/products/page';

/* 
임시 확인용 URL - 추후 삭제 예정
http://localhost:3000/login
*/

export default function Home() {
  return (
    <>
      <ProductPage />
      <UnderBar />
    </>
  );
}
