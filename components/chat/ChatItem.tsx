import { ChatRoomState } from '@/types/chat';
import useUserStore from '@/store/authStore';
import { getProductDetail } from '@/lib/api/products';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface ChatItemProps {
  room: ChatRoomState;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export default function ChatItem({ room }: ChatItemProps) {
  const { user: currentUser } = useUserStore();
  const [productImage, setProductImage] = useState<string | null>(null);

  // 상품 이미지 가져오기
  useEffect(() => {
    const fetchProduct = async () => {
      if (room.resourceType === 'product' && room.resourceId) {
        const res = await getProductDetail(String(room.resourceId));
        if (res.ok === 1 && res.item?.mainImages?.[0]?.path) {
          setProductImage(res.item.mainImages[0].path);
        }
      }
    };

    fetchProduct();
  }, [room.resourceId, room.resourceType]);

  // 현재 로그인한 사용자를 제외한 상대방 정보 추출
  const partner = room.members.find(
    m => String(m._id) !== String(currentUser?._id)
  );
  const displayName = partner?.name || '알 수 없는 사용자';
  const displayImage = partner?.image || '/images/favicon.svg';

  // 마지막 메시지 정보
  const lastMessage = room.lastMessage;

  // 읽지 않은 메시지 수
  const unreadCount = room.unreadCount || 0;

  // 마지막 메시지 내용 렌더링 함수
  const renderLastMessage = () => {
    if (!lastMessage) return '새로운 채팅방이 생성되었습니다.';
    return lastMessage.content || '새로운 메시지가 있습니다.';
  };

  // 시간 포맷팅 함수
  const formatTime = (createdAt?: string) => {
    if (!createdAt) return '';
    const timePart = createdAt.split(' ')[1];
    if (!timePart) return '';

    const [hour, minute] = timePart.split(':');
    const hourNum = parseInt(hour);
    const period = hourNum < 12 ? '오전' : '오후';
    const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;

    return `${period} ${hour12}:${minute}`;
  };

  return (
    <Link
      href={`/chat/${room.resourceId}`}
      className="flex border-b border-[#F4F5FA] py-4.5"
      aria-label={`${displayName}님과의 채팅, ${renderLastMessage()}${unreadCount > 0 ? `, 읽지 않은 메시지 ${unreadCount}개` : ''}`}
    >
      <div className="relative w-fit">
        <Image
          src={displayImage}
          alt=""
          aria-hidden="true"
          width={46}
          height={46}
          className="w-11.5 h-11.5 rounded-full object-cover"
        />
        {unreadCount > 0 && (
          <span className="absolute top-0 -right-2 bg-br-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>
      <div className="ml-5 flex-1 min-w-0">
        <p className="text-[15px]">{displayName}</p>
        <p className="text-[12px] text-br-input-active-line truncate">
          {renderLastMessage()}
        </p>
        <span className="text-[9px] text-br-input-active-line">
          {formatTime(lastMessage?.createdAt)}
        </span>
      </div>
      {/* 상품 이미지 */}
      <Image
        src={productImage || '/icons/no-image.png'}
        alt="상품 이미지"
        width={56}
        height={56}
        className="rounded-[5px] ml-auto object-cover w-14 h-14"
      />
    </Link>
  );
}
