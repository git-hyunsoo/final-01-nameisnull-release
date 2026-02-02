import { create } from 'zustand';
import { Product } from '@/types/product';

type PetType = Product['extra']['pet'];

interface PetStore {
  pet: PetType;
  selectedCategory: string | null;
  selectedSub: string | null;
  searchKeyword: string;
  setPet: (pet: PetType) => void;
  setCategory: (category: string | null) => void;
  setSub: (sub: string | null) => void;
  setSearchKeyword: (keyword: string) => void;
}

export const usePetStore = create<PetStore>(set => ({
  pet: 'dog',
  selectedCategory: null,
  selectedSub: null,
  searchKeyword: '',
  setPet: pet =>
    set({ pet, selectedCategory: null, selectedSub: null, searchKeyword: '' }),
  setCategory: selectedCategory =>
    set({ selectedCategory, selectedSub: null, searchKeyword: '' }),
  setSub: selectedSub => set({ selectedSub, searchKeyword: '' }),
  setSearchKeyword: searchKeyword =>
    set({
      searchKeyword,
      selectedCategory: null,
      selectedSub: null,
    }),
}));
