//구매내역
'use client';

import UnderBar from '@/components/common/Footer';
import Header from '@/components/common/Header';
import PurchasesProductList from '@/components/mypage/PurchasesProductList';

export default function PurchasesPage() {
  return (
    <>
      <div className="font-pretendard">
        <Header title="구매 내역" />
        <PurchasesProductList />
        <PurchasesProductList />
        <PurchasesProductList />
        <PurchasesProductList />
        <PurchasesProductList />
        <UnderBar />
      </div>
    </>
  );
}
