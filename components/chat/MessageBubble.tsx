import { ChatMessage } from '@/types/chat';
import { User } from '@/types/user';
import Image from 'next/image';

interface MessageBubbleProps {
  message: ChatMessage;
  isMe: boolean;
  sender?: User;
}

export default function MessageBubble({
  message,
  isMe,
  sender,
}: MessageBubbleProps) {
  const displayImage = sender?.image || '/icons/chat-profile.svg';

  // 시간 포맷팅 함수
  const formatTime = (createdAt: string) => {
    if (!createdAt) return '';
    const timePart = createdAt.split(' ')[1]; // "16:10:33"
    if (!timePart) return '';

    const [hour, minute] = timePart.split(':');
    const hourNum = parseInt(hour);
    const period = hourNum < 12 ? '오전' : '오후';
    const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;

    return `${period} ${hour12}:${minute}`; // "오후 4:10"
  };

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mt-2`}>
      <div
        className={`flex max-w-[80%] ${isMe ? 'flex-row-reverse' : 'flex-row'} items-end gap-1.5`}
      >
        {/* 상대방 메시지일 경우에만 프로필 이미지 표시 */}
        {!isMe && (
          <Image
            src={displayImage}
            alt="프로필"
            width={34}
            height={34}
            className="w-8.5 h-8.5 self-start rounded-full object-cover"
          />
        )}

        {/* 메시지 말풍선 */}
        <div
          className={`relative max-w-53.25 w-fit px-3.5 py-2.5 text-[14px] rounded-[10px] ${
            isMe ? 'bg-br-primary-500 text-white' : 'bg-white shadow-md'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>

          {/* 메시지 부가 정보 (시간, 읽음 상태) */}
          <div
            className={`absolute bottom-0 ${isMe ? '-left-12' : '-right-12'} flex flex-col ${isMe ? 'items-end' : 'items-start'} w-10 gap-0.5`}
          >
            {isMe && message.readUserIds && message.readUserIds.length >= 2 && (
              <span className="text-[10px] text-br-input-active-line">
                읽음
              </span>
            )}
            {/* 내가 보낸 메시지인데 상대방이 아직 안 읽었을 때만 '1' 표시 */}
            {isMe && message.readUserIds && message.readUserIds.length < 2 && (
              <span className="text-[10px] text-br-primary-500 font-bold">
                1
              </span>
            )}
            <span className="text-[10px] text-br-input-active-line whitespace-nowrap">
              {formatTime(message.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
