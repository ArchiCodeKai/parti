/**
 * useCompareStore · Compare 比較工具狀態
 *
 * v3.1：無人數上限、依 N→幾何自動切換。
 * 詳細規範見 docs/04-頁面設計/compare-tool.md
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareState {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) =>
        set((state) => {
          if (state.ids.includes(id)) return state;
          return { ids: [...state.ids, id] };
        }),
      remove: (id) =>
        set((state) => ({ ids: state.ids.filter((i) => i !== id) })),
      clear: () => set({ ids: [] }),
      has: (id) => get().ids.includes(id),
    }),
    {
      name: "parti:compare",
    },
  ),
);
