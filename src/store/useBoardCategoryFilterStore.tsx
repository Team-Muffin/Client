import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BoardCategoryFilterState {
  savedBoardCategory: string | null;
  savedBoardFilter: string | null;
  setBoardCategoryAndFilters: (
    category: string,
    filters: string | null
  ) => void;
  clearBoardCategoryAndFilters: () => void;
}

const categoryFilterSlice: StateCreator<
  BoardCategoryFilterState,
  [["zustand/persist", unknown]]
> = (set) => ({
  savedBoardCategory: null,
  savedBoardFilter: null,
  setBoardCategoryAndFilters: (category, filters) => {
    set({
      savedBoardCategory: category,
      savedBoardFilter: filters,
    });
  },
  clearBoardCategoryAndFilters: () => {
    set({
      savedBoardCategory: null,
      savedBoardFilter: null,
    });
  },
});

export const useBoardCategoryFilterStore = create<BoardCategoryFilterState>()(
  persist(categoryFilterSlice, {
    name: "board-category-filter-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useBoardCategoryFilterStore;
