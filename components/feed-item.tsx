import Link from "next/link";

import {XIcon} from "@/components/icons";
import type {FeedItem} from "@/lib/devlog";
import {formatShortDate} from "@/lib/format";

function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function FeedItemView({item}: {item: FeedItem}) {
  if (item.kind === "post") {
    return (
      <Link href={`/devlog/${item.slug}`} className="feed-item">
        {item.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="feed-item__thumb" src={item.cover} alt="" loading="lazy" />
        ) : (
          <div className="feed-item__thumb" aria-hidden="true" />
        )}
        <div>
          <span className="eyebrow">
            {formatShortDate(item.date)} · {item.project} · {item.readingMinutes} min
            {item.draft ? " · rascunho" : ""}
          </span>
          <h3>{item.title}</h3>
          <p>{item.excerpt}</p>
        </div>
      </Link>
    );
  }

  return (
    <article className="feed-item note">
      <span className="note__icon" aria-hidden="true">
        <XIcon />
      </span>
      <div>
        <span className="eyebrow">
          {formatShortDate(item.date)} · nota no X · @{item.handle}
        </span>
        <p className="note__text">{item.text}</p>
        <div className="note__actions">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            abrir no X ↗
          </a>
          {item.related ? <Link href={`/devlog/${item.related}`}>ler o post completo →</Link> : null}
          {item.links
            .filter(link => !link.includes("x.com/"))
            .slice(0, 1)
            .map(link => (
              <a key={link} href={link} target="_blank" rel="noopener noreferrer">
                {hostOf(link)} ↗
              </a>
            ))}
        </div>
      </div>
    </article>
  );
}
