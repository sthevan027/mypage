import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { siteData } from "@/data/site";
import { sobreData } from "@/data/sobre";
import styles from "@/styles/sobre.module.css";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Bio resumida, o que me move e trajetória."
};

export default function SobrePage() {
  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/">
        <ArrowLeft size={18} aria-hidden />
        Voltar ao início
      </Link>

      <header className={styles.hero}>
        <div className={styles.avatarWrap}>
          <Image
            alt={siteData.name}
            className={styles.avatar}
            fill
            sizes="140px"
            src={siteData.avatar}
          />
        </div>
        <h1>{sobreData.heroTitle}</h1>
        <p className={styles.subtitle}>{sobreData.heroSubtitle}</p>
      </header>

      <div className={styles.bio}>
        {sobreData.bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <p className={styles.sectionEyebrow}>O que me move</p>
      <div className={styles.movesGrid}>
        {sobreData.whatMoves.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={styles.moveCard}>
              <Icon size={20} aria-hidden />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <p className={styles.sectionEyebrow}>Trajetória</p>
      <div className={styles.timeline}>
        {sobreData.timeline.map((entry, index) => (
          <div key={`${entry.year}-${index}`} className={styles.timelineItem}>
            <span className={styles.timelineYear}>{entry.year}</span>
            <p className={styles.timelineText}>{entry.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
