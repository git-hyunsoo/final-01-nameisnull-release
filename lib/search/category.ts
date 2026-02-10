// 카테고리 추출

import { Categories } from '@/types/search';

// 키워드 기반 카테고리 추출 작업
export function extractCategories(searchQuery: string): Categories {
  const query = searchQuery.toLowerCase();
  const result: Categories = {};

  // 강아지/고양이 판별
  if (
    query.includes('강아지') ||
    query.includes('개') ||
    query.includes('견')
  ) {
    result.pet = 'dog';
  } else if (query.includes('고양이') || query.includes('묘')) {
    result.pet = 'cat';
  }

  // 메인 카테고리 판별
  if (query.includes('사료')) {
    result.mainCategory = 'food';
  } else if (query.includes('간식')) {
    result.mainCategory = 'treat';
  } else if (query.includes('용품')) {
    result.mainCategory = 'supplies';
  } else if (query.includes('건강') || query.includes('영양제')) {
    result.mainCategory = 'health';
  } else if (query.includes('의류') || query.includes('옷')) {
    result.mainCategory = 'clothing';
  }

  // 서브 카테고리 판별 - 사료 (공통)
  if (query.includes('건식')) {
    result.subCategory = 'dry';
  } else if (query.includes('습식') || query.includes('화식')) {
    result.subCategory = 'wet';
  } else if (query.includes('건조')) {
    result.subCategory = 'freeze-dried';
  }

  // 서브 카테고리 판별 - 강아지 간식
  else if (query.includes('껌')) {
    result.subCategory = 'gum';
  } else if (query.includes('저키')) {
    result.subCategory = 'jerky';
  } else if (query.includes('육포')) {
    result.subCategory = 'dried-meat';
  } else if (query.includes('캔')) {
    result.subCategory = 'can';
  } else if (query.includes('비스킷')) {
    result.subCategory = 'biscuit';
  }
  // 서브 카테고리 판별 - 고양이 간식
  else if (query.includes('파우치')) {
    result.subCategory = 'pouch';
  } else if (query.includes('스낵') || query.includes('트릿')) {
    result.subCategory = 'snack';
  } else if (query.includes('통살')) {
    result.subCategory = 'whole-meat';
  } else if (query.includes('캣닢')) {
    result.subCategory = 'catnip';
  }

  // 서브 카테고리 판별 - 강아지 용품
  else if (query.includes('위생') || query.includes('케어')) {
    result.subCategory = 'hygiene';
  } else if (query.includes('배변')) {
    result.subCategory = 'toilet';
  } else if (query.includes('장난감')) {
    result.subCategory = 'toy';
  } else if (query.includes('외출') || query.includes('산책')) {
    result.subCategory = 'outdoor';
  } else if (query.includes('방석') || query.includes('매트')) {
    result.subCategory = 'mat';
  }
  // 서브 카테고리 판별 - 고양이 용품
  else if (query.includes('모래')) {
    result.subCategory = 'litter';
  } else if (query.includes('캣타워') || query.includes('타워')) {
    result.subCategory = 'tower';
  } else if (query.includes('스크래쳐')) {
    result.subCategory = 'scratcher';
  }

  // 서브 카테고리 판별 - 건강 (강아지)
  else if (query.includes('보조제')) {
    result.subCategory = 'supplement';
  } else if (query.includes('건강검진') || query.includes('검진')) {
    result.subCategory = 'checkup';
  } else if (query.includes('피부') || query.includes('모질')) {
    result.subCategory = 'skin';
  } else if (query.includes('연고')) {
    result.subCategory = 'ointment';
  }
  // 서브 카테고리 판별 - 의류 (공통)
  else if (query.includes('액세서리') || query.includes('악세서리')) {
    result.subCategory = 'accessory';
  } else if (query.includes('민소매')) {
    result.subCategory = 'sleeveless';
  } else if (query.includes('올인원')) {
    result.subCategory = 'all-in-one';
  } else if (query.includes('아우터')) {
    result.subCategory = 'outer';
  }

  return result;
}
