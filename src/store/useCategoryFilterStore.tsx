import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CategoryFilterState {
  savedCategory: string | null;
  savedFilter: string | null;
  setCategoryAndFilters: (category: string, filters: string | null) => void;
  clearCategoryAndFilters: () => void;
}

const categoryFilterSlice: StateCreator<
  CategoryFilterState,
  [["zustand/persist", unknown]]
> = (set) => ({
  savedCategory: null,
  savedFilter: null,
  setCategoryAndFilters: (category, filters) => {
    set({
      savedCategory: category,
      savedFilter: filters,
    });
  },
  clearCategoryAndFilters: () => {
    set({
      savedCategory: null,
      savedFilter: null,
    });
  },
});

export const useCategoryFilterStore = create<CategoryFilterState>()(
  persist(categoryFilterSlice, {
    name: "category-filter-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useCategoryFilterStore;
