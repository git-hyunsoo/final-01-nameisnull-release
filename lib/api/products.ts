//상품 API 관련 함수들

import useUserStore from '@/store/authStore';
import { ApiListResponse, ApiResponse } from '@/types/common';
import { Product, ProductDetail, SellerProductList } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

//상품 목록
export async function getProducts(): Promise<ApiListResponse<Product>> {
  try {
    const res = await fetch(`${API_URL}/products?limit=300`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }
}

//상품 상세 페이지
export async function getProductDetail(
  id: string
): Promise<ApiResponse<ProductDetail>> {
  try {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    const res = await fetch(`${API_URL}/products/${id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }
}

//상품 상세 페이지 - 판매자 상품 목록
export async function getSellerProductList(
  sellerId: number
): Promise<ApiListResponse<SellerProductList>> {
  try {
    const res = await fetch(
      `${API_URL}/products?seller_id=${sellerId}&showSoldOut=true`,
      {
        headers: {
          'Client-Id': CLIENT_ID,
        },
      }
    );

    return res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }
}

//마이페이지 - 판매 내역
export async function mypageSellerProductList(): Promise<
  ApiListResponse<SellerProductList>
> {
  try {
    const { accessToken } = useUserStore.getState();

    const res = await fetch(`${API_URL}/seller/products`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }
}

//상품 커스텀 검색
export async function getCustomProducts(): Promise<ApiListResponse<Product>> {
  try {
    const res = await fetch(
      `${API_URL}/products?excludeFields=extra.embeddings&limit=300`,
      {
        headers: {
          'Client-Id': CLIENT_ID,
        },
        cache: 'no-store',
      }
    );
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }
}
