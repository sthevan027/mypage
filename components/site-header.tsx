"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteData } from "@/data/site";
import styles from "@/styles/site-header.module.css";

const nav = [
  { href: "/", label: "Início" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre" },
  { href: "/novidades", label: "Novidades" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.shell}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/">
          {siteData.name.split(" ")[0]}
          <span className={styles.brandMuted}> / hub</span>
        </Link>
        <nav className={styles.nav} aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              className={`${styles.link} ${pathname === item.href ? styles.active : ""}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
