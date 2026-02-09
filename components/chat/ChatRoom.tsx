'use client';

import MessageBubble from '@/components/chat/MessageBubble';
import useChat from '@/app/chat/_hooks/useChat';
import useUserStore from '@/store/authStore';
import { getProductDetail } from '@/lib/api/products';
import { confirmSale, getOrderList } from '@/lib/api/orders';
import { ProductDetail } from '@/types/product';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';

export default function ChatRoom({ id }: { id: string }) {
  const router = useRouter();
  const { activeRoomId, rooms, messages, sendMessage, enterRoom, leaveRoom } =
    useChat();
  const user = useUserStore(state => state.user);
  const accessToken = useUserStore(state => state.accessToken);

  const [message, setMessage] = useState('');
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  const fetchProduct = async () => {
    const res = await getProductDetail(id);
    if (res.ok === 1) {
      setProduct(res.item);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!user?._id) return;
    enterRoom({ resourceType: 'product', resourceId: Number(id) });
  }, [user, enterRoom, id]);

  useEffect(() => {
    const checkMyOrder = async () => {
      if (!accessToken || !user || !product) return;

      const isSeller = product.seller_id === user._id;
      const isSoldOut =
        product.quantity != null &&
        product.buyQuantity != null &&
        product.quantity <= product.buyQuantity;

      // 내가 판매자가 아니고, 상품이 판매 완료된 상태일 때 주문 내역 조회
      if (!isSeller && isSoldOut) {
        const res = await getOrderList(accessToken);
        if (res.ok === 1) {
          // 내 전체 주문 목록(res.item) 중 이 상품 ID가 포함된 주문 찾기
          const myOrder = res.item.find(order =>
            order.products.some(p => String(p._id) === String(id))
          );
          if (myOrder) {
            setOrderId(myOrder._id);
          }
        }
      }
    };

    checkMyOrder();
  }, [accessToken, user, product, id]);

  if (!user) return null;

  const activeRoom = rooms.find(
    r => activeRoomId !== undefined && String(r._id) === String(activeRoomId)
  );

  const partner = activeRoom?.members.find(
    m => String(m._id) !== String(user._id)
  );

  // 판매자 여부 및 판매 완료 여부 계산
  const isSeller = product?.seller_id === user._id;
  const isSoldOut =
    product?.quantity != null &&
    product?.buyQuantity != null &&
    product.quantity <= product.buyQuantity;

  // 판매 확정 핸들러 (판매자용)
  const handleConfirmSale = async () => {
    if (!partner?._id || !product?._id || !accessToken) {
      alert('거래 정보를 확인할 수 없습니다.');
      return;
    }

    if (!confirm('판매를 확정하시겠습니까?')) return;

    const res = await confirmSale(
      {
        user_id: partner._id,
        product_id: product._id,
        quantity: 1,
      },
      accessToken
    );

    if (res.ok === 1) {
      alert('판매가 확정되었습니다!');

      fetchProduct();
    } else {
      alert(res.message || '판매 확정에 실패했습니다.');
    }
  };

  // 리뷰 쓰기 핸들러
  const handleWriteReview = () => {
    if (!orderId) {
      alert('주문 정보를 확인할 수 없습니다.');
      return;
    }

    router.push(`/review/${orderId}`);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message.trim());
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  // 채팅방 나가기 핸들러
  const handleLeave = () => {
    // activeRoomId가 실제 채팅방 ID
    if (activeRoomId) {
      const success = leaveRoom(activeRoomId);
      if (success) {
        router.push('/chat');
      }
    }
  };
  return (
    <div className="font-pretendard pb-15 bg-[#F4F5FA] min-h-screen">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
        <Header title={partner?.name || '상대방'} />

        {/* 상단 상품 정보 바 */}
        <div className="flex px-4 py-3.5 items-center">
          <Image
            src={product?.mainImages?.[0]?.path || '/icons/no-image.png'}
            alt={product?.name || '상품 이미지'}
            width={56}
            height={56}
            className="rounded-[5px] object-cover mr-2.5 w-14 h-14"
          />

          <div className="flex flex-col justify-center flex-1 min-w-0">
            <p className="text-xs font-light line-clamp-1 mb-1">
              {product?.name || '상품 정보 불러오는 중...'}
            </p>
            <p className="text-[14px] font-bold">
              {product?.price?.toLocaleString() || 0}원
            </p>
          </div>

          <div className="flex gap-2 ml-4">
            {/* 판매자용 UI */}
            {isSeller &&
              (isSoldOut ? (
                <span className="h-8.5 px-3 flex items-center text-[13px] bg-gray-100 text-gray-500 rounded-[10px]">
                  판매 완료
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmSale}
                  className="h-8.5 px-3 py-1.5 text-[13px] bg-[#E8F8FF] text-br-primary-500 rounded-[10px] font-medium"
                >
                  판매 확정
                </button>
              ))}

            {/* 구매자: 리뷰 쓰기 버튼 (판매 완료 + orderId 있을 때만) */}
            {!isSeller && isSoldOut && orderId && (
              <button
                type="button"
                onClick={handleWriteReview}
                className="h-8.5 px-3 py-1.5 text-[13px] bg-[#E8F8FF] text-br-primary-500 rounded-[10px]"
              >
                리뷰쓰기
              </button>
            )}
            <button
              type="button"
              onClick={handleLeave}
              className="h-8.5 px-3 py-1.5 text-[13px]  bg-br-button-disabled-bg text-gray-700 rounded-[10px] font-medium"
            >
              채팅방 나가기
            </button>
          </div>
        </div>
      </div>

      {/* 메시지 영역 */}
      <section className="pt-40 px-4 flex flex-col pb-20">
        {messages.map((msg, index) => (
          <MessageBubble
            key={`${msg._id}-${index}`}
            message={msg}
            isMe={String(msg.senderId) === String(user._id)}
            sender={partner || undefined}
          />
        ))}
      </section>

      {/* 채팅 입력창 */}
      <footer className="bg-white fixed bottom-0 left-0 right-0 h-16 shadow-[0_-6px_12px_-8px_rgba(0,0,0,0.12)] px-5.75 z-10">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2.5 w-full h-full items-center"
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
          />
          <label htmlFor="file-upload" className="cursor-pointer shrink-0">
            <Image src="/icons/add.svg" alt="첨부하기" width={28} height={28} />
          </label>

          <textarea
            placeholder="채팅을 입력하세요."
            rows={1}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-11 px-5 py-2.5 text-[16px] rounded-full resize-none bg-[#F4F5FA] overflow-hidden focus:outline-none focus:ring-1 focus:ring-br-primary-500"
          />

          <button
            type="submit"
            aria-label="채팅 보내기"
            className="shrink-0 ml-1"
          >
            <Image
              src="/icons/chat-send.svg"
              alt="보내기"
              width={28}
              height={28}
            />
          </button>
        </form>
      </footer>
    </div>
  );
}
