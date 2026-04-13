import { ArrowUpRight, CalendarDays, PlayCircle } from "lucide-react";

import { FeedItem } from "@/data/site";
import styles from "@/styles/feed-section.module.css";

type FeedSectionProps = {
  items: FeedItem[];
};

export function FeedSection({ items }: FeedSectionProps) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <article key={item.title} className={styles.card}>
          <div className={styles.cardMeta}>
            <span>{item.category}</span>
            <span className={styles.separator} />
            <span className={styles.date}>
              <CalendarDays size={14} />
              {item.dateLabel}
            </span>
          </div>

          <h3>{item.title}</h3>
          <p>{item.description}</p>

          <div className={styles.cardFooter}>
            <span className={styles.platform}>
              <PlayCircle size={16} />
              {item.platform}
            </span>
            <a href={item.url} target="_blank" rel="noreferrer">
              Abrir
              <ArrowUpRight size={16} />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
