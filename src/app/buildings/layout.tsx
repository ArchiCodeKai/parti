/**
 * /buildings 列表頁 metadata
 *
 * page.tsx 為 client 元件無法直接匯出 metadata，
 * 由此 server 端 layout 提供（僅回傳 children、不改變渲染）。
 */

import type { Metadata } from "next";
import { BUILDINGS } from "@/lib/data/buildings";

export const metadata: Metadata = {
  title: "建築 · PARTI",
  description: `${BUILDINGS.length} 件現代建築的年表索引 — 依年代與設計者瀏覽。`,
};

export default function BuildingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
