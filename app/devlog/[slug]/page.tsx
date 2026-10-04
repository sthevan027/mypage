import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {compileMDX} from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import {mdxComponents} from "@/components/mdx";
import {getPost, getPosts} from "@/lib/devlog";
import {formatDate} from "@/lib/format";

type Params = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return getPosts().map(post => ({slug: post.slug}));
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post)
    return {};
  return {
    title: post.title,
    description: post.excerpt,
    robots: post.draft ? {index: false} : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: post.cover ? [post.cover] : undefined
    }
  };
}

export default async function PostPage({params}: Params) {
  const {slug} = await params;
  const post = getPost(slug);
  if (!post)
    notFound();

  const {content} = await compileMDX({
    source: post.source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, {theme: "github-dark-default", keepBackground: false}]]
      }
    }
  });

  const posts = getPosts();
  const index = posts.findIndex(item => item.slug === slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <>
      <div className="topo topo--faint" aria-hidden="true" />
      <div className="post-layout">
        <article className="article">
          {post.draft ? (
            <p className="draft-banner">
              Rascunho — visível só no preview. Revise o texto e troque <code>draft: true</code> por{" "}
              <code>false</code> pra publicar.
            </p>
          ) : null}
          <div className="article__meta">
            <span className="badge">{post.project}</span>
            <span className="mono">
              {formatDate(post.date)} · {post.readingMinutes} min de leitura
            </span>
          </div>
          <h1>{post.title}</h1>
          <p className="article__excerpt">{post.excerpt}</p>
          <div className="prose">{content}</div>
          <nav className="post-footer" aria-label="Outros posts">
            {older ? <Link href={`/devlog/${older.slug}`}>← {older.title}</Link> : <Link href="/devlog">← Devlog</Link>}
            {newer ? <Link href={`/devlog/${newer.slug}`}>{newer.title} →</Link> : null}
          </nav>
        </article>
        {post.toc.length > 1 ? (
          <aside className="toc" aria-label="Nesta página">
            <span className="eyebrow">Nesta página</span>
            {post.toc.map(item => (
              <a key={item.id} href={`#${item.id}`}>
                {item.title}
              </a>
            ))}
          </aside>
        ) : null}
      </div>
    </>
  );
}
