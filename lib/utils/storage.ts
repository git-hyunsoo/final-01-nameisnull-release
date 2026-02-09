const RECENT_PRODUCTS_KEY = 'recentProducts';

// 최근 본 상품에 필요한 정보만 저장
export interface RecentProductItem {
  _id: number;
  seller_id: number;
  name: string;
  price: number;
  bookmarks: number;
  mainImages?: Array<{ path: string }>;
  seller: {
    name: string;
  };
}

// 최근 본 상품 추가
export function addRecentProduct(product: RecentProductItem): void {
  try {
    // 기존 목록 가져오기
    const recent = getRecentProducts();
    // 중복 제거, 맨 앞에 새 상품 추가
    const filtered = recent.filter(item => item._id !== product._id);
    const updated = [product, ...filtered];

    // 최대 20개로 제한
    const limited = updated.slice(0, 20);

    // localStorage에 저장
    localStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(limited));
  } catch (error) {
    console.error('최근 본 상품 저장 실패:', error);
  }
}

// 최근 본 상품 목록 가져오기
export function getRecentProducts(): RecentProductItem[] {
  try {
    const data = localStorage.getItem(RECENT_PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('최근 본 상품 불러오기 실패:', error);
    return [];
  }
}
