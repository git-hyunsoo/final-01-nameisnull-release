'use client';

import useChat from '@/app/chat/_hooks/useChat';
import ChatItem from '@/components/chat/ChatItem';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function ChatList() {
  const {
    rooms, // 전체 채팅방 목록 배열
    activeRoomId, // 현재 활성화된 방의 ID
    enterRoom, // 채팅방 입장
  } = useChat();

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      {rooms.map(room => (
        <ChatItem
          key={room._id}
          room={room}
          isActive={activeRoomId === room._id}
          onSelect={(id: string) => {
            enterRoom({ resourceType: 'room', resourceId: Number(id) });
            // 선택 시 URL 파라미터 초기화
            router.replace(pathname);
          }}
        />
      ))}
    </div>
  );
}
