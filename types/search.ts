// search.ts 서버 액션에서 쓰이는 타입 정의

import { ProductList } from '@/types/product';

/**
 * 반려동물 종류
 */
export type PetType = 'dog' | 'cat';

/**
 * 카테고리 필터 타입
 * 검색어에서 추출된 카테고리 정보를 담는 객체
 */
export type Categories = {
  pet?: PetType; // 동물 종류 (강아지/고양이)
  mainCategory?: string; // 메인 카테고리 (사료/간식/용품/건강/의류)
  subCategory?: string; // 서브 카테고리 (건식/습식/껌 등)
};

/**
 * 유사도 계산 결과
 * 각 상품의 ID와 계산된 유사도 점수를 저장
 */
export interface SimilarityResult {
  _id: number; // 상품 ID
  similarity: number; // 최종 유사도 점수
}

/**
 * 상품의 extra 필드 타입
 */
export interface ProductExtra {
  pet: PetType; // 동물 종류
  mainCategory: string; // 메인 카테고리
  subCategory?: string; // 서브 카테고리
  embeddings?: number[]; // 임베딩 벡터
}

/**
 * 카테고리 매칭에 사용되는 상품 객체 타입
 */
export interface ProductForBonus {
  extra: ProductExtra;
}

/**
 * 키워드 매칭에 사용되는 상품 객체 타입
 */
export interface ProductForKeyword {
  name: string;
}

/**
 * 상품 추천 이유에 사용되는 타입
 */
export interface SearchResultWithReason {
  products: ProductList[];
  recommReason: string;
}
