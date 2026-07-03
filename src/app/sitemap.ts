/**
 * sitemap.xml
 *
 * 全部靜態路由 + 三類詳情頁（URL 由資料導出，禁止寫死清單）。
 * 規格見 docs/00-總規格/04-開發路線圖.md T1.3
 */

import type { MetadataRoute } from "next";
import { ARCHITECTS } from "@/lib/data/architects";
import { BUILDINGS } from "@/lib/data/buildings";
import { MOVEMENTS } from "@/lib/data/movements";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/architects",
    "/buildings",
    "/movements",
    "/map",
    "/compare",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const detailRoutes = [
    ...ARCHITECTS.map((a) => `/architects/${a.id}`),
    ...BUILDINGS.map((b) => `/buildings/${b.id}`),
    ...MOVEMENTS.map((m) => `/movements/${m.id}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...detailRoutes];
}
