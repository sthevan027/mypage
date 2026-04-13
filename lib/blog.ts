import fs from "fs";
import path from "path";

import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
};

export type BlogPostSummary = BlogFrontmatter & {
  slug: string;
};

export type BlogPost = BlogPostSummary & {
  content: string;
};

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    return false;
  }
  return true;
}

export function getPostSlugs(): string[] {
  if (!ensureBlogDir()) {
    return [];
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPostSummary[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      const fm = data as Partial<BlogFrontmatter>;
      return {
        slug,
        title: fm.title ?? slug,
        date: fm.date ?? "",
        excerpt: fm.excerpt ?? "",
        category: fm.category ?? "Geral",
        readingMinutes: typeof fm.readingMinutes === "number" ? fm.readingMinutes : 5
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<BlogFrontmatter>;
  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date ?? "",
    excerpt: fm.excerpt ?? "",
    category: fm.category ?? "Geral",
    readingMinutes: typeof fm.readingMinutes === "number" ? fm.readingMinutes : 5,
    content
  };
}
