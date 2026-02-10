'use client';

import { usePetStore } from '@/store/petStore';
import useUserStore from '@/store/authStore';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductHeader() {
  const { pet, setPet } = usePetStore();
  const user = useUserStore(state => state.user);

  return (
    <header className="flex items-center justify-center py-4 relative">
      <div className="flex items-center gap-2">
        <Image
          src={pet === 'dog' ? '/icons/dog.svg' : '/icons/cat.svg'}
          alt={pet === 'dog' ? '강아지' : '고양이'}
          width={24}
          height={24}
        />
        <span className="text-lg font-medium">
          {pet === 'dog' ? '강아지' : '고양이'}
        </span>
        <button
          type="button"
          onClick={() => setPet(pet === 'dog' ? 'cat' : 'dog')}
        >
          <Image src="/icons/change.svg" alt="변경" width={24} height={24} />
        </button>
      </div>

      <div className="absolute right-0">
        {user ? (
          <Link href="/mypage">
            <Image
              src={user.image || '/icons/chat-profile.svg'}
              alt="프로필"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border border-br-button-disabled-bg"
            />
          </Link>
        ) : (
          <Link
            href="/auth"
            className="pr-2 text-br-primary-500 text-xs font-medium"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
