import { getProductDetail } from '@/lib/api/products';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const response = await getProductDetail(id);

  // 에러 처리
  if (response.ok === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-br-input-disabled-text mb-4">{response.message}</p>
          <p className="text-sm text-br-input-disabled-text">
            상품을 불러오는데 실패했습니다.
          </p>
        </div>
      </div>
    );
  }

  // Client Component에 데이터 전달
  return <ProductDetailClient product={response.item} />;
}
