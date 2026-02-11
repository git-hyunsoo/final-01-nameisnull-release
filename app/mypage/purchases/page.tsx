'use client';

import UnderBar from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Spinner from '@/components/common/Spinner';
import PurchasesProductList from '@/components/mypage/PurchasesProductList';
import { mypageOrderProductList } from '@/lib/api/orders';
import { PurchaseList } from '@/types/product';
import { useEffect, useState } from 'react';

// 구매 내역
export default function PurchasesPage() {
  const [orders, setOrders] = useState<PurchaseList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const response = await mypageOrderProductList();

      if (response.ok === 1) {
        setOrders(response.item);
      }

      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="font-pretendard">
      <Header title="구매 내역" />

      <main>
        {isLoading ? (
          <Spinner />
        ) : orders.length > 0 ? (
          <ul>
            {orders.map(order =>
              order.products.map(product => (
                <li key={`${order._id}-${product._id}`}>
                  <PurchasesProductList product={product} orderId={order._id} />
                </li>
              ))
            )}
          </ul>
        ) : (
          <div className="text-center mt-20 text-gray-500 font-light">
            구매 내역이 없습니다
          </div>
        )}
      </main>

      <UnderBar />
    </div>
  );
}
