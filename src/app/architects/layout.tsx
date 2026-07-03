/**
 * /architects 列表頁 metadata
 *
 * page.tsx 為 client 元件無法直接匯出 metadata，
 * 由此 server 端 layout 提供（僅回傳 children、不改變渲染）。
 */

import type { Metadata } from "next";
import { ARCHITECTS } from "@/lib/data/architects";

export const metadata: Metadata = {
  title: "建築師 · PARTI",
  description: `PARTI 收錄的 ${ARCHITECTS.length} 位現代建築師索引 — 生平、代表作與所屬流派。`,
};

export default function ArchitectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
