// 검색어를 저장하는 전역 변수 생성
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SearchState = {
  query: string;
  setQuery: (q: string) => void;
};

// 전역에서 쓸 수 있는 useSearchState 훅 생성
export const useSearchStore = create<SearchState>()(
  persist(
    set => ({
      query: '', // query의 초기 값
      setQuery: q => set({ query: q }), // query의 상태 변경을 해주는 set 함수
    }),
    { name: 'search-store' }
  )
);
