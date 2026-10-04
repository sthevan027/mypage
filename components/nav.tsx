"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

import {openPalette} from "@/components/command-palette";
import {NAV_ITEMS} from "@/lib/nav";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <Link href="/" className="nav__brand">
            sthevan<span className="accent">.dev</span>
          </Link>
          <nav className="nav__links" aria-label="Principal">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="nav__link"
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <button type="button" className="nav__search" onClick={openPalette}>
              Buscar <span className="kbd">Ctrl K</span>
            </button>
          </nav>
          <button type="button" className="nav__search tabbar-search" onClick={openPalette} aria-label="Buscar">
            Buscar
          </button>
        </div>
      </header>

      <nav className="tabbar" aria-label="Principal (mobile)">
        {NAV_ITEMS.map(item => (
          <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
