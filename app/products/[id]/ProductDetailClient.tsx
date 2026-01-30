//브라우저에서 실행되는 리액트 컴포넌트
'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import ProductDetailFooter from '@/app/products/[id]/ProductDetailFooter';
import ProductDetailImage from '@/app/products/[id]/ProductImage';
import SellerProfileBar from '@/app/products/[id]/SellerProfileBar';
import InfoTabs from '@/app/products/[id]/InfoTabs';
import ProductInfoTab from '@/app/products/[id]/ProductInfoTab';
import SellerInfoTab from '@/app/products/[id]/SellerInfoTab';
import { ProductDetail } from '@/types/product';

interface Props {
  product: ProductDetail;
}

export default function ProductDetailClient({ product }: Props) {
  const [activeTab, setActiveTab] = useState('product');

  return (
    <>
      <div className="font-pretendard pb-20">
        <Header title="상품 상세" />

        <ProductDetailImage
          mainImages={product.mainImages.map(imng => imng.path)}
        />

        <div className="px-4 py-4">
          <SellerProfileBar />
          <InfoTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'product' && <ProductInfoTab />}
          {activeTab === 'seller' && <SellerInfoTab />}

          <ProductDetailFooter />
        </div>
      </div>
    </>
  );
}
