import Image from "next/image";
import Link from "next/link";

import {AgoraPanel} from "@/components/agora-panel";
import {FeedItemView} from "@/components/feed-item";
import {siteData} from "@/data/site";
import {getFeed} from "@/lib/devlog";

// O "Agora" lê o GitHub com cache de 1 h; a página se atualiza junto.
export const revalidate = 3600;

export default function HomePage() {
  const feed = getFeed().slice(0, 5);

  return (
    <>
      <div className="topo" aria-hidden="true" />
      <main className="container home">
        <div>
          <Image className="profile__avatar" src={siteData.avatar} alt={siteData.name} width={72} height={72} priority />
          <h1 className="profile__name">{siteData.name}</h1>
          <p className="profile__bio">
            {siteData.bio.before}
            <span className="accent">{siteData.bio.highlight}</span>
            {siteData.bio.after}
          </p>
          <nav className="panel links" aria-label="Links">
            {siteData.links.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={link.featured ? "is-featured" : undefined}
              >
                <span>{link.label}</span>
                <span className="mono">{link.hint}</span>
              </a>
            ))}
          </nav>
        </div>

        <div style={{display: "grid", gap: 16, alignContent: "start"}}>
          <AgoraPanel />
          <section className="panel" aria-labelledby="devlog-title">
            <div className="section-head">
              <span className="eyebrow" id="devlog-title">
                Devlog · últimos
              </span>
              <Link href="/devlog" className="mono">
                ver tudo →
              </Link>
            </div>
            {feed.map(item => (
              <FeedItemView key={item.kind === "post" ? item.slug : item.id} item={item} />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
