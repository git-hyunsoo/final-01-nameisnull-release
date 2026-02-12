import SplashScreen from '@/components/common/SplashScreen';
import './globals.css';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://fofo-forfour.vercel.app'),

  title: 'FOFO 포포',
  description: '네 발 달린 가족을 위해, AI가 골라주는 반려동물 중고 용품',
  openGraph: {
    title: 'FOFO 포포',
    description: '반려동물을 위한 스마트한 선택',
    url: 'https://fofo-forfour.vercel.app',
    siteName: '포포(FoFo)',
    images: [
      {
        url: '/assets/fofo-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Suspense fallback={<SplashScreen />}>{children}</Suspense>
      </body>
    </html>
  );
}
