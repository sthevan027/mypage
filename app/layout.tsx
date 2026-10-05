import type {Metadata, Viewport} from "next";
import {Geist, Geist_Mono} from "next/font/google";

import {CommandPalette, type PaletteItem} from "@/components/command-palette";
import {Nav} from "@/components/nav";
import {siteData} from "@/data/site";
import {getPosts} from "@/lib/devlog";
import {NAV_ITEMS} from "@/lib/nav";

import "./globals.css";

const geist = Geist({subsets: ["latin"], variable: "--font-geist"});
const geistMono = Geist_Mono({subsets: ["latin"], variable: "--font-geist-mono"});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.url),
  title: {
    default: `${siteData.name} · devlog`,
    template: `%s · ${siteData.name}`
  },
  description: siteData.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteData.name,
    url: siteData.url,
    title: `${siteData.name} · devlog`,
    description: siteData.description
  },
  twitter: {card: "summary_large_image", creator: `@${siteData.x.handle}`},
  alternates: {types: {"application/rss+xml": "/devlog/rss.xml"}}
};

export const viewport: Viewport = {themeColor: "#0a0a0a"};

function paletteItems(): PaletteItem[] {
  return [
    ...NAV_ITEMS.map(item => ({title: item.label, kind: "página", href: item.href})),
    ...getPosts().map(post => ({title: post.title, kind: "post", href: `/devlog/${post.slug}`})),
    ...siteData.links.map(link => ({title: link.label, kind: "link", href: link.url, external: true}))
  ];
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <Nav />
        {children}
        <footer className="footer">
          <div className="container footer__inner">
            <span>
              © {new Date().getFullYear()} {siteData.name}
            </span>
            <span>
              <a href="/devlog/rss.xml">RSS</a> · <a href="https://github.com/sthevan027/mypage">código do site</a>
            </span>
          </div>
        </footer>
        <CommandPalette items={paletteItems()} />
      </body>
    </html>
  );
}
