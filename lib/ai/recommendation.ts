// AI 추천 이유 생성

import { getOpenAIClient } from '@/lib/ai/opeinai-client';
import { ProductList } from '@/types/product';
import { Categories } from '@/types/search';

/**
 * 카테고리 영어 코드를 한글로 변환하는 함수
 */
function translateCategory(category: string): string {
  const categoryMap: { [key: string]: string } = {
    // 메인 카테고리
    food: '사료',
    treat: '간식',
    supplies: '용품',
    health: '건강',
    clothing: '의류',
    // 서브 카테고리 - 사료
    dry: '건식',
    wet: '습식',
    'freeze-dried': '건조',
    // 서브 카테고리 - 간식
    gum: '껌',
    jerky: '저키',
    'dried-meat': '육포',
    can: '캔',
    biscuit: '비스킷',
    pouch: '파우치',
    snack: '스낵',
    'whole-meat': '통살',
    catnip: '캣닢',
    // 서브 카테고리 - 용품
    hygiene: '위생',
    toilet: '배변',
    toy: '장난감',
    outdoor: '외출',
    mat: '방석',
    litter: '모래',
    tower: '캣타워',
    scratcher: '스크래쳐',
    // 서브 카테고리 - 건강
    supplement: '보조제',
    checkup: '건강검진',
    skin: '피부',
    ointment: '연고',
    // 서브 카테고리 - 의류
    accessory: '액세서리',
    sleeveless: '민소매',
    'all-in-one': '올인원',
    outer: '아우터',
  };

  return categoryMap[category] || category;
}

/**
 * AI를 사용하여 상품 추천 이유를 생성하는 함수
 * @param searchQuery : 사용자가 입력한 원본 검색어
 * @param topProducts : 유사도 높은 상위 상품들(최대 10개)
 * @param categoryFilter : 검색어에서 추출한 카테고리 정보
 * @param keywords : 검색어에서 추출한 핵심 키워드들
 * @returns Promise<string> : AI가 생성한 추천 이유
 */
export async function RecommendationReason(
  searchQuery: string,
  topProducts: ProductList[],
  categoryFilter: Categories,
  keywords: string[]
): Promise<string> {
  try {
    const client = getOpenAIClient();

    // 상품 정보를 간결하게 정리 (한글 변환 적용)
    const productSummary = topProducts
      .slice(0, 10) // 최대 10개의 상품에 대해서만 설명
      .map((product, index) => {
        const petType = product.extra?.pet === 'dog' ? '강아지용' : '고양이용';
        const mainCategory = product.extra?.mainCategory
          ? translateCategory(product.extra.mainCategory)
          : '';
        const subCategory = product.extra?.subCategory
          ? translateCategory(product.extra.subCategory)
          : '';

        return `${index + 1}. ${product.name} (${petType}, ${mainCategory}${subCategory ? ` - ${subCategory}` : ''})`;
      })
      .join('\n');

    // 카테고리 필터 정보를 문자열로 변환 (한글 변환 적용)
    const filterInfo = [];
    if (categoryFilter.pet) {
      filterInfo.push(
        `동물: ${categoryFilter.pet === 'dog' ? '강아지' : '고양이'}`
      );
    }
    if (categoryFilter.mainCategory) {
      filterInfo.push(
        `카테고리: ${translateCategory(categoryFilter.mainCategory)}`
      );
    }
    if (categoryFilter.subCategory) {
      filterInfo.push(
        `세부카테고리: ${translateCategory(categoryFilter.subCategory)}`
      );
    }
    const filterText = filterInfo.length > 0 ? filterInfo.join(', ') : '없음';

    const keywordText = keywords.length > 0 ? keywords.join(', ') : '없음';

    // GPT에게 추천 이유 생성 요청
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `당신은 반려동물 중고용품 쇼핑몰의 친절한 AI 어시스턴트야. 추천 이유는 사용자가 납득할 수 있게 작성해.
                    사용자의 검색어에 맞는 상품을 추천한 이유를 1-2문장, 최대 80자 이내로 간결하고 친근하게 설명해주세요.
                    - 검색어에서 파악한 주요 니즈 언급
                    - 반드시 구체적인 근거 2개를 문장에 녹여서 포함시켜
                    - 추천된 상품들의 공통된 특징 강조
                    - 친근하고 도움이 되는 톤 유지
                    
                    [좋은 예시]
                    - 관절 케어를 찾으셔서, 관절/연골 관리 표현이 있는 사료 위주로 골랐어요."`,
        },
        {
          role: 'user',
          content: `검색어: "${searchQuery}"

          추출된 필터: ${filterText}
          추출된 키워드: ${keywordText}
          추천된 상품 목록: ${productSummary}

          위 정보를 바탕으로 왜 이 상품들을 추천했는지 1-2문장, 80자 이내로 설명해줘.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    return (
      response.choices[0]?.message?.content ||
      '검색어와 유사한 상품들을 찾았습니다.'
    );
  } catch (error) {
    console.error('추천 이유 생성 실패:', error);
    // AI 생성 실패 시 기본 메시지 반환
    return '검색하신 조건에 맞는 상품들을 찾았습니다.';
  }
}
