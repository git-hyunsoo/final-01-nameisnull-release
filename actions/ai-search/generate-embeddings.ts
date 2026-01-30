// db에 등록된 모든 상품들 임베딩
'use server';

import { ProductDetail, ProductList } from '@/types/product';
import OpenAI from 'openai';

// 관리자 accessToken
const ADMIN_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc2OTU4ODE3MiwiZXhwIjoxNzcyMTgwMTcyLCJpc3MiOiJGRUJDIn0.2ZL53UNV-qhHg1esDdwzPuyHf9MRJV3cEOWBxu89a4E';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// OpenAI 클라이언트 초기화 -> apiKey로 인증
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// 텍스트를 임베딩하는 함수
async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  return response.data[0].embedding;
}

// 모든 상품의 content를 임베딩하여 extra.embedding에 저장
// 최초 1회만 실행

export async function AllProductEmbeddings() {
  try {
    // ------ 1. 상품 목록 조회 api ------
    const listRes = await fetch(`${API_URL}/products`, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID!,
      },
    });

    if (!listRes.ok) {
      throw new Error('상품 목록 가져오기 실패');
    }

    const listData = await listRes.json();
    const products: ProductList[] = listData.item;

    console.log(`총 ${products.length}개 상품 발견\n`);

    // ------ 2. 각 상품 ID로 반복문 돌며 상품 상세 조회 -> content 필드를 뽑아내기 위해 ------
    const productIdList = products.map(p => p._id);

    for (let i = 0; i < productIdList.length; i++) {
      const productId = productIdList[i];

      try {
        // 2.1 상품 상세 조회 api
        const detailRes = await fetch(`${API_URL}/products/${productId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Client-Id': CLIENT_ID!,
          },
        });
        if (!detailRes.ok) {
          throw new Error('상품 상세 조회 실패');
        }
        const detailData = await detailRes.json();
        const productDetail: ProductDetail = detailData.item;

        // 2.2 상품 설명이 없을 때
        if (!productDetail.content) {
          console.log('content 없음!\n');
          continue;
        }

        // 2.3 이미 임베딩 된 상품이면 스킵!
        if (productDetail.extra?.embeddings?.length) {
          console.log('이미 embeddings 있음 → 스킵');
          continue;
        }

        // 2.4 상품 설명들 임베딩 작업
        const embedding = await getEmbedding(productDetail.content);
        console.log(`-> 임베딩 완료 ${embedding.length}개`);

        // ------ 3. 상품 수정 ------
        const extra = productDetail.extra;
        extra.embeddings = embedding;
        const body = {
          extra,
        };

        const editRes = await fetch(`${API_URL}/seller/products/${productId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Client-Id': CLIENT_ID!,
            Authorization: `Bearer ${ADMIN_TOKEN}`,
          },
          body: JSON.stringify(body),
        });

        if (!editRes.ok) {
          const errText = await editRes.text();
          throw new Error(`수정 실패: ${editRes.status} ${errText}`);
        }
      } catch (error) {
        console.error('-> 반복문 돌리기 실패...\n', error);
      }
    }
  } catch (error) {
    console.error('전체 배치 실패', error);
    throw error;
  }
}
