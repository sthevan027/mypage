import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { siteData } from "@/data/site";
import { getAllPosts } from "@/lib/blog";
import styles from "@/styles/blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos, tutoriais e notas — publicados via Markdown no repositório."
};

function badgeClass(category: string) {
  const c = category.toLowerCase();
  if (c.includes("linux") || c.includes("servidor")) {
    return styles.badgeGreen;
  }
  if (c.includes("terminal") || c.includes("meta")) {
    return styles.badgeAmber;
  }
  if (c.includes("web") || c.includes("react") || c.includes("front")) {
    return styles.badgeBlue;
  }
  return styles.badgeDefault;
}

function formatDate(iso: string) {
  if (!iso) {
    return "";
  }
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/">
        <ArrowLeft size={18} aria-hidden />
        Voltar ao início
      </Link>

      <header className={styles.header}>
        <h1>Blog</h1>
        <p className={styles.subtitle}>
          Dicas, tutoriais e notas sobre desenvolvimento, ferramentas e carreira. Só você publica: edite os Markdown em{" "}
          <code>content/blog/</code>.
        </p>
      </header>

      <div className={styles.grid}>
        {posts.length === 0 ? (
          <p className={styles.footerNote}>Nenhum post ainda. Adicione um arquivo .md em content/blog/.</p>
        ) : (
          posts.map((post) => (
            <Link key={post.slug} className={styles.card} href={`/blog/${post.slug}`}>
              <div className={styles.cardTop}>
                <span className={`${styles.badge} ${badgeClass(post.category)}`}>{post.category}</span>
                <span className={styles.reading}>
                  <Clock size={15} aria-hidden />
                  {post.readingMinutes} min
                </span>
              </div>
              <h2>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <div className={styles.cardFooter}>
                <span className={styles.date}>{formatDate(post.date)}</span>
                <span className={styles.readMore}>Ler mais &gt;</span>
              </div>
            </Link>
          ))
        )}
      </div>

      <p className={styles.footerNote}>
        Mais posts em breve. Enquanto isso, acompanhe também no{" "}
        <a href={siteData.social.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>{" "}
        e no{" "}
        <a href={siteData.social.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
    </main>
  );
}
