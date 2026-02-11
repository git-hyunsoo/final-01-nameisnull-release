'use client';

import { usePetStore } from '@/store/petStore';
import useUserStore from '@/store/authStore';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductHeader() {
  const { pet, setPet } = usePetStore();
  const user = useUserStore(state => state.user);

  const petLabel = pet === 'dog' ? '강아지' : '고양이';
  const oppositePetLabel = pet === 'dog' ? '고양이' : '강아지';

  return (
    <header className="flex items-center justify-center py-4 relative">
      <div className="flex items-center gap-2">
        <Image
          src={pet === 'dog' ? '/icons/dog.svg' : '/icons/cat.svg'}
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
        />
        <span className="text-lg font-medium">{petLabel}</span>
        <button
          type="button"
          onClick={() => setPet(pet === 'dog' ? 'cat' : 'dog')}
          aria-label={`${oppositePetLabel}로 변경`}
        >
          <Image
            src="/icons/change.svg"
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
          />
        </button>
      </div>

      <nav className="absolute right-0" aria-label="사용자 메뉴">
        {user ? (
          <Link href="/mypage" aria-label="마이페이지">
            <Image
              src={user.image || '/icons/chat-profile.svg'}
              alt=""
              aria-hidden="true"
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
      </nav>
    </header>
  );
}
