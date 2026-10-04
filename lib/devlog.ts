import fs from "node:fs";
import path from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";

import xNotes from "@/content/x-notes.json";

const POSTS_DIR = path.join(process.cwd(), "content", "devlog");

export type PostMeta = {
  slug: string;
  title: string;
  /** AAAA-MM-DD */
  date: string;
  excerpt: string;
  project: string;
  cover?: string;
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & {
  source: string;
  toc: {id: string; title: string}[];
};

export type Note = {
  id: string;
  url: string;
  /** ISO */
  date: string;
  author: string;
  handle: string;
  text: string;
  links: string[];
  related?: string;
};

export type FeedItem =
  | ({kind: "post"} & PostMeta)
  | ({kind: "note"} & Note);

/**
 * Rascunhos aparecem em desenvolvimento e nos previews da Vercel, nunca em
 * produção — é onde o texto é revisado antes de publicar.
 */
export function showDrafts() {
  return process.env.VERCEL_ENV !== "production";
}

function readingMinutes(source: string) {
  const words = source.replace(/```[\s\S]*?```/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function slugsOnDisk() {
  if (!fs.existsSync(POSTS_DIR))
    return [];
  return fs.readdirSync(POSTS_DIR).filter(file => file.endsWith(".mdx")).map(file => file.replace(/\.mdx$/, ""));
}

function readPost(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file))
    return null;

  const {data, content} = matter(fs.readFileSync(file, "utf8"));
  const slugger = new GithubSlugger();
  const toc = [...content.matchAll(/^## (.+)$/gm)].map(match => {
    const title = match[1].trim();
    return {id: slugger.slug(title), title};
  });

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    project: String(data.project ?? "Geral"),
    cover: data.cover ? String(data.cover) : undefined,
    draft: Boolean(data.draft),
    readingMinutes: readingMinutes(content),
    source: content,
    toc
  };
}

export function getPost(slug: string): Post | null {
  const post = readPost(slug);
  if (!post || (post.draft && !showDrafts()))
    return null;
  return post;
}

export function getPosts(): PostMeta[] {
  return slugsOnDisk()
    .map(readPost)
    .filter((post): post is Post => post !== null && (!post.draft || showDrafts()))
    .map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      project: post.project,
      cover: post.cover,
      draft: post.draft,
      readingMinutes: post.readingMinutes
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNotes(): Note[] {
  return (xNotes as Note[]).slice().sort((a, b) => b.date.localeCompare(a.date));
}

/** Posts e notas juntos, do mais novo pro mais antigo. */
export function getFeed(): FeedItem[] {
  const posts: FeedItem[] = getPosts().map(post => ({kind: "post", ...post}));
  const notes: FeedItem[] = getNotes().map(note => ({kind: "note", ...note}));
  return [...posts, ...notes].sort((a, b) => b.date.localeCompare(a.date));
}
