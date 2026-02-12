import Image from 'next/image';

const footprints = [
  { delay: '1.2s', className: '' }, // 제일 위 → 마지막에 찍힘
  { delay: '0.75s', className: '-ml-6.5 mt-1.5' }, // 중간 → 두 번째
  { delay: '0.3s', className: 'mt-3.75' }, // 제일 아래 → 제일 먼저 찍힘
];

export default function SplashScreen() {
  return (
    <section className="min-h-screen w-screen font-pretendard bg-br-primary-500">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <span className="text-br-chip-disabled-bg">
          for four, 반려동물을 위한 중고마켓
        </span>
        <Image src="/icons/logo-white.svg" alt="FOFO" width={195} height={50} />
        <div className="relative mt-4.25 flex flex-col">
          {footprints.map((step, i) => (
            <div
              key={i}
              className={`animate-footstep ${step.className}`}
              style={{ animationDelay: step.delay, opacity: 0 }}
            >
              <Image
                src="/icons/footprint.svg"
                alt="발자국"
                width={26}
                height={28}
                className={i === 1 ? 'rotate-12' : ''}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
