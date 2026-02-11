// 상품 등록 API 및 파일 업로드 API 함수

import { ApiResponse } from '@/types/common';
import { Product, SellerProduct } from '@/types/product';
import { FileUploadRes } from '@/types/file';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 상품 등록
export async function registProduct(
  formData: SellerProduct,
  accessToken: string
): Promise<ApiResponse<Product>> {
  try {
    const res = await fetch(`${API_URL}/seller/products/`, {
      method: 'POST',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message: '상품 등록에 실패했습니다. 다시 시도해 주세요.',
    };
  }
}

// 파일 업로드
export async function uploadFile(file: File): Promise<FileUploadRes> {
  // 새로운 FormData 객체 생성 후 파일 추가
  const fileForm = new FormData();
  fileForm.append('attach', file);

  // API 서버에 파일 업로드 요청
  const res = await fetch(`${API_URL}/files`, {
    method: 'POST',
    headers: {
      'Client-Id': CLIENT_ID,
    },
    body: fileForm,
  });
  return res.json();
}
