import { FileText, Github, Instagram, Linkedin, MessageCircle } from "lucide-react";
import Image from "next/image";

import { FeedSection } from "@/components/feed-section";
import { LinkGrid } from "@/components/link-grid";
import { NavTabs } from "@/components/nav-tabs";
import { ProjectGrid } from "@/components/project-grid";
import { IconThreads, IconX } from "@/components/social-brand-icons";
import { siteData } from "@/data/site";
import { getGithubReposByNames } from "@/lib/github";
import { getRedesFeed } from "@/lib/redes-feed";
import { getYoutubeVideos } from "@/lib/youtube";
import styles from "@/styles/home.module.css";

export default async function HomePage() {
  const youtubeRssUrl = siteData.social.youtubeRssUrl.trim();
  const redesFeed = getRedesFeed();
  const [featuredProjects, youtubeVideos] = await Promise.all([
    getGithubReposByNames(siteData.github.username, siteData.github.featuredRepoNames),
    youtubeRssUrl ? getYoutubeVideos(youtubeRssUrl) : Promise.resolve([])
  ]);

  const feedItems = [...redesFeed, ...(youtubeVideos.length > 0 ? youtubeVideos : []), ...siteData.editorialPosts];

  const feedHint = (() => {
    if (youtubeVideos.length > 0) {
      return "YouTube + redes + notas";
    }
    if (redesFeed.length > 0) {
      return "X/Threads via JSON (edite content/redes-feed.json)";
    }
    if (youtubeRssUrl) {
      return "Nenhum vídeo no RSS ainda";
    }
    return "YouTube desligado — notas abaixo";
  })();

  return (
    <main className={styles.pageShell}>
      <div className={styles.backdrop} />
      <section className={styles.heroCard}>
        <div className={styles.heroTopbar}>
          <div className={styles.badge}>Hub pessoal</div>
          <div className={styles.iconRow}>
            <a href={siteData.social.github} aria-label="GitHub" target="_blank" rel="noreferrer">
              <Github size={18} />
            </a>
            <a href={siteData.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <Linkedin size={18} />
            </a>
            <a href={siteData.social.x} aria-label="X (@SthevanCode)" target="_blank" rel="noreferrer">
              <IconX size={18} />
            </a>
            <a href={siteData.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
              <Instagram size={18} />
            </a>
            <a href={siteData.social.threads} aria-label="Threads" target="_blank" rel="noreferrer">
              <IconThreads size={18} />
            </a>
          </div>
        </div>

        <div className={styles.profileRow}>
          <div className={styles.avatarWrap}>
            <Image
              alt={siteData.name}
              className={styles.avatar}
              fill
              priority
              sizes="(max-width: 640px) 120px, 154px"
              src={siteData.avatar}
            />
            <span className={styles.statusDot} />
          </div>

          <div className={styles.heroText}>
            <p className={styles.kicker}>{siteData.kicker}</p>
            <h1>{siteData.name}</h1>
            <p className={styles.summary}>{siteData.summary}</p>

            <div className={styles.metricRow}>
              {siteData.metrics.map((metric) => (
                <div key={metric.label} className={styles.metricCard}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.heroActions}>
          <a className={styles.primaryAction} href={siteData.resumeUrl} target="_blank" rel="noreferrer">
            <FileText size={18} />
            Ver currículo
          </a>
          <a className={styles.secondaryAction} href={siteData.social.whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            Falar comigo
          </a>
        </div>
      </section>

      <NavTabs
        items={[
          { href: "/blog", label: "Blog", icon: "blog" },
          { href: "/sobre", label: "Sobre", icon: "sobre" },
          { href: "/novidades", label: "Novidades", icon: "novidades" },
        ]}
      />

      <section className={styles.section} id="feed">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Atualizações</p>
            <h2>Posts e notas recentes</h2>
          </div>
          <span className={styles.sectionHint}>{feedHint}</span>
        </div>
        <FeedSection items={feedItems} />
      </section>

      <section className={styles.section} id="projetos">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Projetos</p>
            <h2>Três repositórios em destaque</h2>
          </div>
          <a className={styles.inlineLink} href={siteData.social.github} target="_blank" rel="noreferrer">
            Ver GitHub completo
          </a>
        </div>
        {featuredProjects.length === 0 ? (
          <p className={styles.emptyProjects}>
            Nenhum dos repositórios listados em <code>featuredRepoNames</code> foi encontrado. Confira os nomes em{" "}
            <code>data/site.ts</code>.
          </p>
        ) : (
          <ProjectGrid projects={featuredProjects} />
        )}
      </section>

      <section className={styles.section} id="links">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.linksEyebrow}>Alguns links importantes…</p>
            <h2>Currículo, redes e atalhos</h2>
          </div>
        </div>
        <LinkGrid links={siteData.linkCards} />
      </section>
    </main>
  );
}
