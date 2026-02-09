//로그인 정보

import { create, type StateCreator } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import { type User } from '../types/user';

// 로그인한 사용자 정보를 관리하는 스토어의 상태 인터페이스
interface UserStoreState {
  user: User | null;
  accessToken: string | null;
  isAutoLogin: boolean; // 자동 로그인 여부
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  setAutoLogin: (isAuto: boolean) => void;
  resetUser: () => void;
}

// 동적 storage: isAutoLogin 값에 따라 localStorage 또는 sessionStorage 사용
const dynamicStorage: PersistStorage<UserStoreState> = {
  getItem: (name: string) => {
    // localStorage에 값이 있으면 localStorage 사용 (자동 로그인)
    const localValue = localStorage.getItem(name);
    if (localValue) {
      return JSON.parse(localValue);
    }

    // 없으면 sessionStorage 확인
    const sessionValue = sessionStorage.getItem(name);
    if (sessionValue) {
      return JSON.parse(sessionValue);
    }

    return null;
  },
  setItem: (name: string, value) => {
    const stringValue = JSON.stringify(value);

    // isAutoLogin이 true면 localStorage에 저장
    if (value.state?.isAutoLogin) {
      localStorage.setItem(name, stringValue);
      sessionStorage.removeItem(name);
    } else {
      // false면 sessionStorage에 저장
      sessionStorage.setItem(name, stringValue);
      localStorage.removeItem(name);
    }
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

const UserStore: StateCreator<UserStoreState> = set => ({
  user: null,
  accessToken: null,
  isAutoLogin: false,

  setUser: user => set({ user }),

  setToken: token => set({ accessToken: token }),

  setAutoLogin: isAuto => set({ isAutoLogin: isAuto }),

  resetUser: () =>
    set({
      user: null,
      accessToken: null,
      isAutoLogin: false,
    }),
});

const useUserStore = create<UserStoreState>()(
  persist(UserStore, {
    name: 'userStore', // localStorage와 sessionStorage 모두 'userStore'로 저장
    storage: dynamicStorage,
  })
);

export default useUserStore;
