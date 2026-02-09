'use client';

import useChat from '@/app/chat/_hooks/useChat';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotificationBadge() {
  const { totalUnreadCount } = useChat();
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Link href="/chat" className="relative flex flex-col items-center gap-0.75">
      {totalUnreadCount > 0 && (
        <span className="absolute -top-1 left-4 min-w-4 h-4 px-1 flex items-center justify-center bg-br-primary-500 text-white text-[10px] font-bold rounded-full">
          {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
        </span>
      )}

      <Image
        src={
          isActive('/chat')
            ? '/icons/footer-chat-fill.svg'
            : '/icons/footer-chat-line.svg'
        }
        alt="채팅페이지"
        width={22}
        height={22}
      />
      <span
        className={`text-[11px] leading-none ${
          isActive('/chat')
            ? 'text-br-primary-500'
            : 'text-br-button-disabled-text'
        }`}
      >
        포포톡
      </span>
    </Link>
  );
}
