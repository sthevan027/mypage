import { XMLParser } from "fast-xml-parser";

import { FeedItem } from "@/data/site";

type YoutubeEntry = {
  link?: string;
  published?: string;
  title?: string;
};

type YoutubeFeed = {
  feed?: {
    entry?: YoutubeEntry | YoutubeEntry[];
  };
};

export async function getYoutubeVideos(rssUrl: string): Promise<FeedItem[]> {
  if (!rssUrl) {
    return [];
  }

  try {
    const response = await fetch(rssUrl, {
      next: {
        revalidate: 3600
      }
    });

    if (!response.ok) {
      return [];
    }

    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false
    });
    const parsed = parser.parse(xml) as YoutubeFeed;
    const entries = parsed.feed?.entry;
    const normalizedEntries = Array.isArray(entries) ? entries : entries ? [entries] : [];

    return normalizedEntries.slice(0, 4).map((entry) => ({
      category: "YouTube",
      dateLabel: formatDate(entry.published),
      description: "Vídeo puxado automaticamente do feed do canal.",
      platform: "YouTube RSS",
      title: entry.title ?? "Vídeo recente",
      url: entry.link ?? "#"
    }));
  } catch {
    return [];
  }
}

function formatDate(dateValue?: string) {
  if (!dateValue) {
    return "Recente";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(dateValue));
}
