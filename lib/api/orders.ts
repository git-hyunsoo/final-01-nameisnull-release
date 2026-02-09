import useUserStore from '@/store/authStore';
import { ApiListResponse, ApiResponse } from '@/types/common';
import { OrderItem, PurchaseList } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 구매 내역 조회
export async function mypageOrderProductList(): Promise<
  ApiListResponse<PurchaseList>
> {
  try {
    const { accessToken } = useUserStore.getState();

    const res = await fetch(`${API_URL}/orders`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message: '구매 내역을 불러오는데 실패했습니다.',
    };
  }
}
// 판매 확정 (판매자가 구매 처리)
export async function confirmSale(
  {
    user_id,
    product_id,
    quantity = 1,
  }: {
    user_id: number;
    product_id: number;
    quantity?: number;
  },
  accessToken: string
): Promise<ApiResponse<OrderItem>> {
  try {
    const res = await fetch(`${API_URL}/seller/orders`, {
      method: 'POST',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        user_id,
        product_id,
        quantity,
      }),
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message: '판매 확정에 실패했습니다. 다시 시도해 주세요.',
    };
  }
}

//주문 목록 조회
export async function getOrderList(
  accessToken: string
): Promise<ApiListResponse<PurchaseList>> {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'GET',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message: '구매 내역을 불러오는 데 실패했습니다.',
    };
  }
}
// 주문 상세 조회
export async function getOrderDetail(
  orderId: string,
  accessToken: string
): Promise<ApiResponse<OrderItem>> {
  try {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message: '주문 정보를 불러오는데 실패했습니다.',
    };
  }
}
