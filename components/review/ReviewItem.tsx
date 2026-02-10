'use client';

import Header from '@/components/common/Header';
import useUserStore from '@/store/authStore';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { postReview } from '@/lib/api/replies';
import { getOrderDetail } from '@/lib/api/orders';
import { getProductDetail } from '@/lib/api/products';
import { OrderItem } from '@/types/product';
import Spinner from '@/components/common/Spinner';

export default function ReviewItem({ orderId }: { orderId: string }) {
  const router = useRouter();
  const accessToken = useUserStore(state => state.accessToken);

  const [order, setOrder] = useState<OrderItem | null>(null);
  const [sellerName, setSellerName] = useState<string>('판매자');
  const [sellerImage, setSellerImage] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // 주문 정보 가져오기
  useEffect(() => {
    const fetchOrder = async () => {
      if (!accessToken) return;

      const res = await getOrderDetail(orderId, accessToken);

      if (res.ok === 1) {
        setOrder(res.item);

        // 상품 정보에서 판매자 정보 가져오기
        const productId = res.item.products?.[0]?._id;
        if (productId) {
          const productRes = await getProductDetail(String(productId));
          if (productRes.ok === 1) {
            setSellerName(productRes.item.seller?.name || '판매자');
            setSellerImage(productRes.item.seller?.image || '');
          }
        }
      } else {
        alert('주문 정보를 찾을 수 없습니다.');
        router.back();
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId, accessToken, router]);

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('후기 내용을 입력해주세요.');
      return;
    }

    if (!order || !accessToken) {
      alert('주문 정보가 없습니다.');
      return;
    }

    const productId = order.products?.[0]?._id;
    if (!productId) {
      alert('상품 정보가 없습니다.');
      return;
    }

    const res = await postReview(
      {
        order_id: order._id,
        product_id: productId,
        rating,
        content,
      },
      accessToken
    );

    if (res.ok === 1) {
      alert('후기가 등록되었습니다!');
      router.push('/');
    } else {
      alert(res.message || '후기 등록에 실패했습니다.');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!order) return null;

  return (
    <>
      <Header title="발자국 등록" />

      <div className="px-4 pt-8.25 pb-22.5 font-pretendard">
        {/* 프로필 */}
        <section className="flex items-center gap-3 py-6 lg:flex-col lg:items-center">
          <Image
            src={sellerImage || '/icons/chat-profile.svg'}
            alt="프로필"
            width={70}
            height={70}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="lg:flex lg:flex-col lg:items-center">
            <p className="text-br-input-active-text font-medium">
              {sellerName}님과
            </p>
            <p className="font-medium text-br-input-active-text">
              거래하셨나요?
            </p>
          </div>
        </section>

        {/* 젤리 지수 */}
        <section className="py-7.5">
          <p className="text-sm font-medium mb-4">젤리 지수를 선택하세요</p>

          <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
            {[5, 4, 3, 2, 1].map(value => (
              <label
                key={value}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={() => setRating(value)}
                  className="peer hidden"
                />
                <span className="w-5 h-5 rounded-full border-[5px] border-gray-300 bg-white peer-checked:border-br-primary-500"></span>
                <Image
                  src={`/icons/paw-${value}.svg`}
                  alt={`발바닥 ${value}개`}
                  width={120}
                  height={24}
                />
              </label>
            ))}
          </div>
        </section>

        {/* 후기 */}
        <section className="lg:mt-5 w-full">
          <p className="text-sm font-medium mb-3">
            포포에게 경험한 따뜻한 후기를 알려주세요.
          </p>
          <textarea
            placeholder="거래 중 경험한 따뜻한 순간들을 남겨보세요."
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full h-45 p-4 border border-br-input-disabled-line rounded-lg resize-none text-br-input-disabled-text focus:outline-none focus:border-br-primary-500"
          />
        </section>
      </div>

      {/* 발자국 등록 */}
      <div className="bottom-0 left-0 right-0 px-4 pb-5 bg-white">
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-br-primary-500 text-white rounded-lg font-medium disabled:bg-gray-300"
        >
          발자국 등록
        </button>
      </div>
    </>
  );
}
