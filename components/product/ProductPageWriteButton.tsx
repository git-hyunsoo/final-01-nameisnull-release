'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/authStore';

export default function ProductPageWriteButton() {
  const router = useRouter();

  const accessToken = useUserStore(state => state.accessToken);

  const handleClick = (e: React.MouseEvent) => {
    // 토큰이 없다면
    if (!accessToken) {
      e.preventDefault();
      router.push('/auth');
    }
  };

  return (
    <Link href="/products/new" onClick={handleClick}>
      <button className="fixed bottom-20 right-4 bg-br-primary-500 z-10 text-[15px] text-white font-medium py-1.5 px-4.5 rounded-4xl shadow">
        <span className="text-[18px] mr-1">+</span> 글쓰기
      </button>
    </Link>
  );
}
