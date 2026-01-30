import { getProductDetail, getSellerProductList } from '@/lib/api/products';
import ProductDetailClient from './ProductDetailClient';
import { getUserReviews } from '@/lib/api/replies';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
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

  return (
    <ProductDetailClient detail={detail} sellerProducts={sellerProducts} />
  );
}
