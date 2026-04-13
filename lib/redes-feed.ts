import fs from "fs";
import path from "path";

import type { FeedItem } from "@/data/site";

const FILE = path.join(process.cwd(), "content/redes-feed.json");

type FileShape = {
  items: Array<{
    category: string;
    dateLabel: string;
    description: string;
    platform: string;
    title: string;
    url: string;
  }>;
};

export function getRedesFeed(): FeedItem[] {
  if (!fs.existsSync(FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    const data = JSON.parse(raw) as FileShape;
    return data.items ?? [];
  } catch {
    return [];
  }
}
