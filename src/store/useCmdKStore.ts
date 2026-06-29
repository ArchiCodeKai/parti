/**
 * useCmdKStore · Cmd+K 命令面板開關
 *
 * 規格見 .ai-context/global/state-management.md
 * 讓 Header 搜尋 icon 與全域鍵盤快捷鍵共享同一個開關狀態。
 */

import { create } from "zustand";

interface CmdKState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export const useCmdKStore = create<CmdKState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  toggle: () => set((state) => ({ open: !state.open })),
}));
