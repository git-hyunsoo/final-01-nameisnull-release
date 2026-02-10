'use client';

import UnderBar from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Spinner from '@/components/common/Spinner';
import { getUserInfo } from '@/lib/api/users';
import useUserStore from '@/store/authStore';
import { User } from '@/types/user';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 마이페이지
export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 로그아웃
  const handleLogout = () => {
    useUserStore.getState().resetUser();
    router.push('/'); // 홈으로 이동
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { ok, item } = await getUserInfo();
      if (ok === 1) {
        setUser(item);
      } else {
        router.push('/auth/login');
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [router]);

  if (isLoading) {
    return <Spinner />;
  }

  // user 없으면 null (로그인 페이지로 이동)
  if (!user) return null;

  return (
    <>
      <Header title="마이페이지" />
      <div className="font-pretendard pb-20">
        {/* 프로필 */}
        <section className="px-4 py-4 flex items-center gap-4">
          <label className="relative cursor-pointer">
            <div className="relative w-16 h-16">
              <Image
                src={user?.image || '/icons/chat-profile.svg'}
                alt="프로필"
                width={64}
                height={64}
                className="rounded-full object-cover w-16 h-16"
              />
            </div>
          </label>

          <div className="flex-1">
            <h2 className="text-lg text-br-text-body">{user.name}</h2>
            <p className="text-xs text-br-input-disabled-text">{user.email}</p>
          </div>

          <Link
            href="/mypage/profileedit"
            className="px-4 py-2 text-sm font-light bg-br-input2-disabled-bg text-br-input2-disabled-text rounded-xl"
          >
            프로필 변경
          </Link>
        </section>

        {/* 나의 포포 */}
        <section className="px-4 py-4">
          <h3 className="text-lg font-semibold mb-4">나의 포포</h3>

          {user.extra?.pet ? (
            <div className="p-4 border border-br-input-disabled-line rounded-xl flex gap-5">
              <dl className="flex-1 space-y-1 mt-2 ml-2">
                <div className="flex text-sm">
                  <dt className="text-br-primary-500 w-14">
                    이 &nbsp; &nbsp;름
                  </dt>
                  <dd>{user.extra?.pet?.name}</dd>
                </div>
                <div className="flex text-sm">
                  <dt className="text-br-primary-500 w-14">
                    품 &nbsp; &nbsp;종
                  </dt>
                  <dd>{user.extra?.pet?.breed}</dd>
                </div>
                <div className="flex text-sm">
                  <dt className="text-br-primary-500 w-14">
                    체 &nbsp; &nbsp;중
                  </dt>
                  <dd>{user.extra?.pet?.weight} kg</dd>
                </div>
                <div className="flex text-sm">
                  <dt className="text-br-primary-500 w-14 tracking-[0.05em]">
                    연령대
                  </dt>
                  <dd className="text-br-text-body">
                    {user.extra?.pet?.ageGroup === 'junior'
                      ? '주니어'
                      : user.extra?.pet?.ageGroup === 'adult'
                        ? '어덜트'
                        : '시니어'}
                  </dd>
                </div>
                {/* 버튼 */}
                <Link
                  href="/mypage/petedit"
                  className="flex justify-center items-center w-full h-8 text-sm font-light bg-br-input2-disabled-bg text-br-input2-disabled-text rounded-xl mt-2"
                >
                  나의 포포 변경
                </Link>
              </dl>
              {/* 이미지 */}
              <div className="mr-2 w-36 h-36 rounded-lg shrink-0 flex items-center justify-center bg-br-input2-disabled-bg">
                {user.extra?.pet?.image?.[0] ? (
                  <Image
                    src={user.extra.pet.image}
                    alt="반려동물 프로필 이미지"
                    width={144}
                    height={144}
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <p className="text-sm font-light text-gray-400 text-center px-4">
                    나의 포포 이미지를
                    <br />
                    등록해주세요
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center text-br-input-disabled-text mb-1 pt-2">
                아직 등록된 나의 포포가 없어요.
              </p>
              <p className="text-center font-light text-br-input-disabled-text pb-2 text-sm">
                AI 맞춤 상품 추천을 위해 정보를 입력해주세요
              </p>
              <Link
                href="/mypage/petedit"
                type="submit"
                className="flex items-center justify-center mt-4 w-full h-14 rounded-lg bg-br-primary-500 text-white text-lg"
              >
                나의 포포 등록
              </Link>
            </div>
          )}
        </section>
        {/* 나의 관심 */}
        <section className="px-4 py-4">
          <h3 className="text-lg font-semibold mb-4">나의 관심</h3>

          <div className="flex py-4">
            <Link
              href="/mypage/wishlist"
              className="flex-1 flex flex-col items-center gap-2"
            >
              <Image
                src="/icons/heart-line.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-xs text-br-input-disabled-text">
                찜 목록
              </span>
            </Link>

            {/* 구분선 */}
            <div className="w-px bg-br-input-disabled-line"></div>

            <Link
              href="/mypage/history"
              className="flex-1 flex flex-col items-center gap-2"
            >
              <Image
                src="/icons/recently.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-xs text-br-input-disabled-text">
                최근 본 상품
              </span>
            </Link>
          </div>
        </section>

        {/* 나의 거래 */}
        <section className="px-4 py-4">
          <h3 className="text-lg font-semibold mb-4">나의 거래</h3>

          <ul className="space-y-1 ml-7">
            <li>
              <Link
                href="/mypage/sales"
                className="w-full flex items-center justify-between py-2"
              >
                <span className="text-br-input-disabled-text">판매 내역</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </Link>
            </li>
            <li>
              <Link
                href="/mypage/purchases"
                className="w-full flex items-center justify-between py-2"
              >
                <span className="text-br-input-disabled-text">구매 내역</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </Link>
            </li>
            <li>
              <button className="w-full flex items-center justify-between py-2">
                <span className="text-br-input-disabled-text">
                  내 상품 관리하기
                </span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </li>
            <li>
              <button className="w-full flex items-center justify-between py-2">
                <span className="text-br-input-disabled-text">설정</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </li>
          </ul>
        </section>

        {/* 고객지원 */}
        <section className="px-4 py-4 mt-2">
          <h3 className="text-lg font-semibold mb-4">고객지원</h3>

          <ul className="space-y-1 ml-7">
            <li>
              <button className="w-full flex items-center justify-between py-2">
                <span className="text-br-input-disabled-text">공지사항</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </li>
            <li>
              <button className="w-full flex items-center justify-between py-2">
                <span className="text-br-input-disabled-text">고객센터</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </li>
            <li>
              <button className="w-full flex items-center justify-between py-2">
                <span className="text-br-input-disabled-text">
                  약관 및 정책
                </span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center justify-between py-2"
                onClick={handleLogout}
              >
                <span className="text-br-error">로그아웃</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </li>
          </ul>
        </section>
      </div>
      <UnderBar />
    </>
  );
}
