import SplashScreen from '@/components/common/SplashScreen';
import './globals.css';
import { Suspense } from 'react';

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
