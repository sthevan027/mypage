"use client";

import {
  ArrowUpRight,
  Bell,
  FileText,
  LucideIcon,
  NotebookPen
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "@/styles/nav-tabs.module.css";

const iconMap = {
  blog: NotebookPen,
  sobre: FileText,
  novidades: Bell,
  links: ArrowUpRight
} satisfies Record<string, LucideIcon>;

export type NavTabItem = {
  href: string;
  label: string;
  icon: keyof typeof iconMap;
};

type NavTabsProps = {
  items: NavTabItem[];
};

function isTabActive(href: string, pathname: string, hash: string) {
  if (href === "/#links") {
    return pathname === "/" && hash === "links";
  }
  return pathname === href;
}

export function NavTabs({ items }: NavTabsProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(typeof window !== "undefined" ? window.location.hash.replace("#", "") : "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <nav className={styles.nav} aria-label="Atalhos da página inicial">
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        const active = isTabActive(item.href, pathname, hash);

        return (
          <Link key={item.href} className={`${styles.tab} ${active ? styles.active : ""}`} href={item.href}>
            <Icon size={16} aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
