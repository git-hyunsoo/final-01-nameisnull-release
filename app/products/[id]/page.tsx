import { getProductDetail, getSellerProductList } from '@/lib/api/products';
import ProductDetailClient from './ProductDetailClient';
import { getUserReviews } from '@/lib/api/replies';

// 상품 상세 페이지 - 서버 컴포넌트
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await getProductDetail(id);

  if (response.ok === 0) {
    return <div>{response.message}</div>;
  }

  // 판매자의 모든 상품 조회
  const sellerProductsRes = await getSellerProductList(response.item.seller_id);
  const reviewResponse = await getUserReviews(response.item.seller_id);

  const detail = response.item;
  const sellerProducts =
    sellerProductsRes.ok === 1 ? sellerProductsRes.item : [];
  const reviews = reviewResponse.ok === 1 ? reviewResponse.item : [];

  // 판매자의 상품 중 판매 완료된 상품 갯수 계산
  const soldCount = sellerProducts.filter(p => p.buyQuantity === 1).length;

  // 판매중 or 판매 완료 상태 확인용
  const isSoldOut = detail.buyQuantity === 1;

  return (
    <ProductDetailClient
      detail={detail}
      sellerProducts={sellerProducts}
      review={reviews}
      soldCount={soldCount}
      isSoldOut={isSoldOut}
    />
  );
}
