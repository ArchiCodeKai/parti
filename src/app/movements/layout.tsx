/**
 * /movements 列表頁 metadata
 *
 * page.tsx 為 client 元件無法直接匯出 metadata，
 * 由此 server 端 layout 提供（僅回傳 children、不改變渲染）。
 */

import type { Metadata } from "next";
import { MOVEMENTS } from "@/lib/data/movements";

export const metadata: Metadata = {
  title: "流派 · PARTI",
  description: `${MOVEMENTS.length} 個現代建築流派 — 以 N→幾何呈現群體關係結構。`,
};

export default function MovementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
