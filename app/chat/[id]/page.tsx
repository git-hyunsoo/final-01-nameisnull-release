import ChatRoom from '@/components/chat/ChatRoom';

export default async function ChatRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="font-pretendard pb-15 bg-[#F4F5FA] min-h-screen">
      <ChatRoom id={id} />
    </div>
  );
}
