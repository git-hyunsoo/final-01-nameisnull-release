import ReviewItem from '@/components/review/ReviewItem';

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return <ReviewItem orderId={orderId} />;
}
