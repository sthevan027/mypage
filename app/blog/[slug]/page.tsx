import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Metadata } from "next";

import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import styles from "@/styles/blog-post.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Post" };
  }
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt
  };
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className={styles.page}>
      <Link className={styles.back} href="/blog">
        <ArrowLeft size={18} aria-hidden />
        Voltar ao blog
      </Link>

      <div className={styles.meta}>
        <span className={styles.badge}>{post.category}</span>
        <span className={styles.reading}>
          <Clock size={15} aria-hidden />
          {post.readingMinutes} min de leitura
        </span>
      </div>

      <header>
        <h1>{post.title}</h1>
        <p className={styles.dateLine}>{formatDate(post.date)}</p>
      </header>

      <div className={styles.prose}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
