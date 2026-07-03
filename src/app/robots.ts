/**
 * robots.txt
 *
 * 全站開放檢索，指向 sitemap。
 * 規格見 docs/00-總規格/04-開發路線圖.md T1.3
 */

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
