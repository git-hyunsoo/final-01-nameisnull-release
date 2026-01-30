//채팅 목록

'use client';

import ChatList from '@/components/chat/ChatList';
import UnderBar from '@/components/common/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

//채팅 목록
export default function ChatPage() {
  const goBack = useRouter();
  return (
    <div className="font-pretendard pb-15">
      <header className="flex flex-col px-4 py-3.5 fixed top-0 left-0 right-0 bg-white z-10 gap-5.5">
        <div className="flex">
          <button
            type="button"
            onClick={() => goBack.back()}
            aria-label="뒤로 가기"
            className="flex gap-3.5 items-center"
          >
            <Image src="/icons/arrow-left.svg" alt="" width={8} height={16} />
            <span className="leading-none mb-0.5 text-[18px]">채팅</span>
          </button>
          <button
            type="button"
            aria-label="채팅 검색하기"
            onClick={() => {}}
            className=" ml-auto mr-6"
          >
            <Image src="/icons/generation.svg" alt="" width={19} height={19} />
          </button>
          <button type="button" aria-label="더보기" onClick={() => {}}>
            <Image src="/icons/more.svg" alt="" width={3} height={18} />
          </button>
        </div>
      </header>
      {/* 본문 */}
      <section className="mx-4 mt-10">
        <ChatList />
        <ChatList />
        <ChatList />
      </section>

      <UnderBar />
    </div>
  );
}
