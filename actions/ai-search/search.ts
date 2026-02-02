'use server';

import cosineSimilarity from '@/lib/utils/similarity';
import {
  EmbeddingProducts,
  ProductList,
  ProductSearchList,
} from '@/types/product';
import OpenAI from 'openai';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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

// 검색어 임베딩 데이터와 상품 설명 임베딩 데이터 비교하는 작업
export async function SimilarityCompare(
  formData: FormData
): Promise<ProductSearchList[]> {
  try {
    // 1. 폼 데이터인 검색어 추출
    const searchQuery = formData.get('query') as string;

    if (!searchQuery) {
      throw new Error('검색어가 없습니다');
    }

    console.log(`검색어: ${searchQuery}`);

    // 2. 검색어 임베딩
    const queryEmbedding = await getEmbedding(searchQuery);
    console.log(`검색어 임베딩 완료`);

    // 3. 모든 상품 목록 조회
    const listRes = await fetch(`${API_URL}/products`, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID!,
      },
    });

    if (!listRes.ok) {
      throw new Error('상품 목록 조회 실패');
    }

    const listData = await listRes.json();
    const products: EmbeddingProducts = listData.item;

    console.log(`총 ${products.length}개 상품 조회`);

    // 4. 각 상품의 임베딩과 유사도 계산

    // 4-1. 코사인 유사도 값을 저장하는 배열 생성
    const similarityArr = [];

    for (let i = 0; i < products.length; i++) {
      // 임베딩이 없는 상품은 스킵
      if (!products[i].extra.embeddings?.length) {
        continue;
      }

      // 4-2. 유사도 계산
      const similarity = cosineSimilarity(
        queryEmbedding,
        products[i].extra.embeddings as number[]
      );

      // 4-3. 상품 _id와 유사도를 같이 저장
      similarityArr.push({ _id: products[i]._id, similarity: similarity });
    }

    // 4-4. 유사도 높은 5개 추출해서 높은 순으로 정렬
    const highSimilarity = similarityArr
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);

    // 5개가 저장된 highSimilarity의 _id와 상품 목록에 있는 상품들의 _id 비교
    const productsList: ProductList[] = listData.item;
    const searchResult: ProductSearchList[] = highSimilarity.map(item => {
      return productsList.find(p => p._id === item._id)!;
    });
    return searchResult;
  } catch (error) {
    console.error('유사도 비교 실패:', error);
    return [];
  }
}
