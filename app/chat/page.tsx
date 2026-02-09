import ChatList from '@/components/chat/ChatList';
import UnderBar from '@/components/common/Footer';
import Header from '@/components/common/Header';

//채팅 목록
export default function ChatPage() {
  return (
    <div className="font-pretendard pb-15">
      <Header title="채팅" />
      {/* 본문 */}
      <section className="px-4">
        <ChatList />
      </section>
      <UnderBar />
    </div>
  );
}
