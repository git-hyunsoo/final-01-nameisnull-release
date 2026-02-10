'use server';

import { getEmbedding } from '@/lib/ai/embedding';
import { RecommendationReason } from '@/lib/ai/recommendation';
import { getProducts } from '@/lib/api/products';
import { extractCategories } from '@/lib/search/category';
import {
  calculateKeywordBonus,
  extractKeywords,
  giveBonus,
} from '@/lib/search/keyword';
import cosineSimilarity from '@/lib/search/similarity';
import { EmbeddingProducts, ProductList } from '@/types/product';
import { SearchResultWithReason, SimilarityResult } from '@/types/search';

// 검색어 임베딩 데이터와 상품 설명 임베딩 데이터 비교하는 작업
export async function SimilarityCompare(
  formData: FormData
): Promise<SearchResultWithReason> {
  try {
    // 1. 폼 데이터인 검색어 추출
    const searchQuery = formData.get('query') as string;

    if (!searchQuery) {
      throw new Error('검색어가 없습니다');
    }

    // 1-1. 검색어에서 카테고리 추출
    const categoryFilter = extractCategories(searchQuery);

    // 1-2. 검색어에서 카테고리를 제외한 키워드 추출
    const keywords = extractKeywords(searchQuery);

    console.log(`검색어: ${searchQuery}`);

    // 2. 검색어 임베딩
    const queryEmbedding = await getEmbedding(searchQuery);
    console.log(`검색어 임베딩 완료`);

    // 3. 모든 상품 목록 조회
    const listRes = await getProducts();
    if (!listRes.ok) {
      throw new Error(listRes.message);
    }

    const products: EmbeddingProducts = listRes.item;

    console.log(`총 ${products.length}개 상품 조회`);

    // 4. 각 상품의 임베딩과 유사도 계산

    // 4-1. 코사인 유사도 값을 저장하는 배열 생성
    const similarityArr: SimilarityResult[] = [];

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

      // 4-3. 카테고리 매칭에 따른 가중치 계산
      const categoryBonus = giveBonus(products[i], categoryFilter);

      // 4-4. 카테고리를 제외한 키워드 매칭 보너스
      const keywordBonus = calculateKeywordBonus(
        {
          name: products[i].name,
        },
        keywords
      );

      const totalSimilarity = similarity * categoryBonus + keywordBonus;
      // 4-5. 상품 _id와 유사도를 같이 저장
      similarityArr.push({ _id: products[i]._id, similarity: totalSimilarity });
    }

    // 4-6. 검색어 길이에 따라 임계값 조정
    const queryLength = searchQuery.replace(/\s/g, '').length; // 공백 제거한 길이
    let threshold = 0.5; // 기본값

    if (queryLength <= 5) {
      threshold = 0.25; // 짧은 검색어 (예: "캣닢")
    } else if (queryLength <= 10) {
      threshold = 0.35; // 중간 검색어 (예: "고양이 간식")
    } else {
      threshold = 0.4; // 긴 검색어 (예: "가루날림 적은 캣닢 티백")
    }

    // 4-7. 유사도가 0.5 이상인 상품들을 유사도가 높은 순으로 추출
    const highSimilarity = similarityArr
      .filter(item => item.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity);

    // 5.유사도 높은 순으로 저장된 highSimilarity의 _id와 상품 목록에 있는 상품들의 _id 비교
    const productsList: ProductList[] = listRes.item;
    const searchResult: ProductList[] = highSimilarity.map(item => {
      return productsList.find(p => p._id === item._id)!;
    });
    //  6. AI가 상품을 추천하는 이유 추가
    let recommReason = '검색 조건에 맞는 상품들을 찾았습니다.';

    if (searchResult.length > 0) {
      const topProducts = searchResult.slice(0, 10);
      recommReason = await RecommendationReason(
        searchQuery,
        topProducts,
        categoryFilter,
        keywords
      );
      console.log('추천 이유 생성 완료');
    }

    return {
      products: searchResult,
      recommReason,
    };
  } catch (error) {
    console.error('유사도 비교 실패:', error);
    return {
      products: [],
      recommReason: '검색 중 오류가 발생했습니다.',
    };
  }
}
