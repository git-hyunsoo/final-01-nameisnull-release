import Image from 'next/image';
import Link from 'next/link';

//채팅 컴포넌트
//채팅 부분 api 알게 되면 수정예정
export default function ChatList() {
  return (
    <Link href="/chat/1" className="flex border-b border-[#F4F5FA] py-4.5">
      <div className="relative w-fit">
        <Image
          src="/icons/chat-profile.svg"
          alt="프로필"
          width={46}
          height={46}
        />
        <span className="absolute top-0 -right-2 bg-br-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          14
        </span>
      </div>
      <div className="ml-5">
        <p className="text-[15px]">인천주디</p>
        <p className="text-[12px] text-br-input-active-line">
          물건 다 팔렸나요ㅠㅠ?
        </p>
        <span className="text-[9px] text-br-input-active-line">오후 3:30</span>
      </div>
      <Image
        src="https://res.cloudinary.com/ddedslqvv/image/upload/v1768981576/febc15-final01-ecad/qBJjByQxs.png"
        alt="강아지 실 장난감"
        width={56}
        height={56}
        className="rounded-[5px] ml-auto object-cover"
      />
    </Link>
  );
}
