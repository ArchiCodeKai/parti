/**
 * SiteHeader · 全站固定頂部導覽
 *
 * 規格見 src/design-reference/page-briefs/01-landing.md（Header fixed top）
 * 樣式用 themes.css 既有的 .parti-header / .cmdk-btn class。
 *
 * 永遠可見（hidden-until-touched.md：關鍵導覽不可隱藏）。
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useCmdKStore } from "@/store/useCmdKStore";

type NavItem = {
  label: string;
  href: string;
  ready: boolean;
};

const NAV: NavItem[] = [
  { label: "People", href: "/architects", ready: true },
  { label: "Buildings", href: "/buildings", ready: true },
  { label: "Movements", href: "/movements", ready: true },
  { label: "Map", href: "/map", ready: false },
];

export function SiteHeader() {
  const pathname = usePathname();
  const toggleCmdK = useCmdKStore((s) => s.toggle);

  return (
    <header className="parti-header">
      <Link href="/" className="brand" aria-label="PARTI 首頁">
        <span className="dot-red" />
        PARTI · ATLAS
      </Link>

      <nav aria-label="主導覽">
        {NAV.map((item) => {
          if (!item.ready) {
            return (
              <span key={item.label} className="is-soon" title="即將推出">
                {item.label}
              </span>
            );
          }
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={isActive ? "is-active" : ""}
            >
              {item.label}
            </Link>
          );
        })}

        <button
          type="button"
          className="cmdk-btn"
          onClick={toggleCmdK}
          aria-label="開啟搜尋（⌘K）"
        >
          <Search size={13} strokeWidth={1.5} aria-hidden="true" />
          ⌘K
        </button>
      </nav>
    </header>
  );
}
