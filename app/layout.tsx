import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

import { SiteEffects } from "@/components/site-effects";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Sthevan Santos | Hub pessoal",
  description:
    "Hub pessoal para posts, projetos, currículo, redes sociais e atualizações de Sthevan Santos."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${displayFont.variable} ${monoFont.variable}`}>
        <SiteEffects />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
