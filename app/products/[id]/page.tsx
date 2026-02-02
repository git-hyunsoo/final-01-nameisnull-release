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

  const sellerProductsRes = await getSellerProductList(response.item.seller_id);
  const reviewResponse = await getUserReviews(response.item.seller_id);

  const detail = response.item;
  const sellerProducts =
    sellerProductsRes.ok === 1 ? sellerProductsRes.item : [];
  const reviews = reviewResponse.ok === 1 ? reviewResponse.item : [];
  const addBookmark = response.item;
  const deleteBookmark = response.item;

  return (
    <ProductDetailClient
      detail={detail}
      sellerProducts={sellerProducts}
      review={reviews}
    />
  );
}
