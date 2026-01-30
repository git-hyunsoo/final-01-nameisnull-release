import Image from 'next/image';

export default function SplashScreen() {
  return (
    <>
      <section className="min-h-screen w-screen font-pretendard bg-br-primary-500">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <span className="text-br-chip-disabled-bg">
            for four, 반려동물을 위한 중고마켓
          </span>
          <Image
            src="/icons/logo-white.svg"
            alt="FOFO"
            width={195}
            height={50}
          />
          <div className="relative mt-4.25 flex flex-col">
            <div>
              <Image
                src="/icons/footprint.svg"
                alt="발자국"
                width={26}
                height={28}
              />
            </div>
            <div className="-ml-6.5 mt-1.5">
              <Image
                src="/icons/footprint.svg"
                alt="발자국"
                width={26}
                height={28}
                className="rotate-12"
              />
            </div>
            <div className="mt-3.75">
              <Image
                src="/icons/footprint.svg"
                alt="발자국"
                width={26}
                height={28}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
