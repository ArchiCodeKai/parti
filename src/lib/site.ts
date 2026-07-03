/**
 * 站點層級常數
 *
 * SITE_URL 供 metadataBase / sitemap / robots / OG image 共用。
 * 網域未定案前以 .env.example 的 parti.studio 為預設，部署時以環境變數覆寫。
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://parti.studio";
