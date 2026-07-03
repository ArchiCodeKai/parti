import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CmdKDialog } from "@/components/layout/CmdKDialog";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CompareBar } from "@/components/layout/CompareBar";
import { ARCHITECTS } from "@/lib/data/architects";
import { BUILDINGS } from "@/lib/data/buildings";
import { MOVEMENTS } from "@/lib/data/movements";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PARTI · 一部建築圖鑑",
  description: `An Atlas of Modern Architecture. ${ARCHITECTS.length} 位建築師、${BUILDINGS.length} 件建築、${MOVEMENTS.length} 個流派、用幾何原理本身呈現建築知識的結構。`,
  openGraph: {
    title: "PARTI · 一部建築圖鑑",
    description: "用幾何原理本身呈現建築知識的結構",
    type: "website",
    locale: "zh_TW",
  },
  // 強制 light mode、防止 Chrome force-dark / mobile dark mode 翻轉色彩
  other: {
    "color-scheme": "light only",
    "theme-color": "#FCFBF8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        <CustomCursor />
        <SiteHeader />
        <CmdKDialog />
        {children}
        <CompareBar />
      </body>
    </html>
  );
}
