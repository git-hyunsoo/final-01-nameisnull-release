'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import ProductDetailFooter from '@/app/products/[id]/ProductDetailFooter';
import ProductDetailImage from '@/app/products/[id]/ProductImage';
import SellerProfileBar from '@/app/products/[id]/SellerProfileBar';
import InfoTabs from '@/app/products/[id]/InfoTabs';
import ProductInfoTab from '@/app/products/[id]/ProductInfoTab';
import SellerInfoTab from '@/app/products/[id]/SellerInfoTab';
import { ProductDetail, SellerProductList } from '@/types/product';

export default function ProductDetailClient({
  detail,
  sellerProducts,
}: {
  detail: ProductDetail;
  sellerProducts: SellerProductList[];
}) {
  const [activeTab, setActiveTab] = useState('productInfo');

  return (
    <>
      <div className="font-pretendard pb-20">
        <Header title="상품 상세" />

        <ProductDetailImage
          mainImages={detail.mainImages.map(img => img.path)}
        />

        <div className="px-4 py-4">
          <SellerProfileBar seller={detail.seller} rating={detail.rating} />
          <InfoTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'productInfo' && <ProductInfoTab detail={detail} />}
          {activeTab === 'sellerInfo' && (
            <SellerInfoTab detail={detail} sellerProducts={sellerProducts} />
          )}

          <ProductDetailFooter />
        </div>
      </div>
    </>
  );
}
