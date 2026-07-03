/**
 * /map 地圖頁 metadata
 *
 * page.tsx 為 client 元件無法直接匯出 metadata，
 * 由此 server 端 layout 提供（僅回傳 children、不改變渲染）。
 */

import type { Metadata } from "next";
import { BUILDINGS } from "@/lib/data/buildings";

export const metadata: Metadata = {
  title: "建築地圖 · PARTI",
  description: `純幾何座標場呈現 ${BUILDINGS.length} 件建築的地理分布。`,
};

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
