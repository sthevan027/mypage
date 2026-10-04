import type {MetadataRoute} from "next";

import {siteData} from "@/data/site";
import {getPosts} from "@/lib/devlog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/devlog", "/agora", "/sobre"].map(path => ({url: `${siteData.url}${path}`}));
  const posts = getPosts()
    .filter(post => !post.draft)
    .map(post => ({url: `${siteData.url}/devlog/${post.slug}`, lastModified: post.date}));
  return [...pages, ...posts];
}
