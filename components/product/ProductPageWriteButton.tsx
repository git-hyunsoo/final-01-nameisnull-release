//상품 목록 글쓰기 버튼
'use client';

//import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductPageWriteButton() {
  //로그인 구현 완료 후 추가 예정
  // const router = useRouter();

  // const handleClick = (e: React.MouseEvent) => {
  //   const token = localStorage.getItem('토큰이름');

  //   if (!token) {
  //     e.preventDefault();
  //     router.push('/auth');
  //   }
  // };

  return (
    <Link href="/products/new">
      {/*onClick={handleClick}*/}
      <button className="fixed bottom-20 right-4 bg-br-primary-500 z-10 text-[15px] text-white font-medium py-1.5 px-4.5 rounded-4xl shadow">
        <span className="text-[18px]">+</span> 글쓰기
      </button>
    </Link>
  );
}
