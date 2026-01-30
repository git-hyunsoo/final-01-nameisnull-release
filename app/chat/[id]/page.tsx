//채팅방

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

//채팅 목록
export default function ChatPage() {
  const goBack = useRouter();
  return (
    <div className="font-pretendard pb-15 bg-[#F4F5FA] min-h-screen">
      <header className="flex flex-col px-4 py-3.5 fixed top-0 left-0 right-0 bg-white z-10 gap-5.5">
        <div className="flex">
          <button
            type="button"
            onClick={() => goBack.back()}
            aria-label="뒤로 가기"
            className="flex gap-3.5 items-center"
          >
            <Image src="/icons/arrow-left.svg" alt="" width={8} height={16} />
            <span className="leading-none mb-0.5">소사동불주먹</span>
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
        <div className="flex">
          <Image
            src="https://res.cloudinary.com/ddedslqvv/image/upload/v1768981576/febc15-final01-ecad/qBJjByQxs.png"
            alt="강아지 실 장난감"
            width={56}
            height={56}
            className="rounded-[5px] object-cover mr-2.5"
          />
          <div>
            <p className="text-xs font-light pt-1.75">
              강아지 천 옷 팔아요. 진짜 재질 짱인데 꼭 사세요 진짜!
            </p>
            <p className="text-[14px] font-bold">5,000원</p>
          </div>
        </div>
      </header>
      <section className="pt-40 px-4 flex flex-col">
        <p className="text-xs text-br-input-active-line text-center">
          2026.01.29 목요일
        </p>
        {/* 본인 */}
        <div className="flex ml-auto items-end gap-1.5 ">
          <div className="flex flex-col">
            <span className="text-xs text-br-input-active-line ml-auto">
              읽음
            </span>
            <span className="text-xs text-br-input-active-line">오후 3:30</span>
          </div>
          <p className="min-w-25.25 max-w-53.25 w-fit bg-br-primary-500 px-3.5 py-2.5 text-[14px] text-[#ffffff] rounded-[10px] ">
            안녕하세요~!
          </p>
        </div>
        {/* 상대방 */}
        <div className="flex mr-auto gap-1.5 ">
          <Image
            src="/icons/chat-profile.svg"
            alt="프로필"
            width={34}
            height={34}
            className="self-start"
          />
          <p className="min-w-25.25 max-w-53.25 w-fit bg-white px-3.5 py-2.5 text-[14px] rounded-[10px] shadow-md">
            안녕하세요~! <br />
            강아지 옷 사실건가요?
          </p>
          <span className="text-xs text-br-input-active-line self-end">
            오후 3:30
          </span>
        </div>
        {/* 본인 */}
        <div className="flex ml-auto items-end gap-1.5 ">
          <div className="flex flex-col">
            <span className="text-xs text-br-input-active-line ml-auto">
              읽음
            </span>
            <span className="text-xs text-br-input-active-line">오후 3:30</span>
          </div>
          <p className="min-w-25.25 max-w-54 w-fit bg-br-primary-500 px-3.5 py-2.5 text-[14px] text-[#ffffff] rounded-[10px] ">
            직거래 가능할까요? 이번주에 시간 다 괜찮아요~~~~!
          </p>
        </div>
      </section>
      <footer className="bg-white fixed bottom-0 left-0 right-0 font-pretendard flex justify-between items-center w-full h-16 shadow-[0_-6px_12px_-8px_rgba(0,0,0,0.12)] px-5.75 ">
        <div className="flex gap-2.5 w-full items-center">
          <input
            type="file"
            id="file-upload"
            // onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Image src="/icons/add.svg" alt="첨부하기" width={28} height={28} />
          </label>

          <textarea
            placeholder="채팅창을 입력하세요."
            rows={1}
            className="w-full h-11.5 px-6.25 py-2.5 text-[17px] rounded-4xl resize-none bg-[#F4F5FA] overflow-hidden text-br-input-active-line"
          ></textarea>
          <button
            type="button"
            aria-label="채팅 보내기"
            onClick={() => {}}
            className="w-7 h-7 ml-1.5"
          >
            <Image src="/icons/chat-send.svg" alt="" width={28} height={28} />
          </button>
        </div>
      </footer>
    </div>
  );
}
