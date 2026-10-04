import {siteData} from "@/data/site";
import {getFeed} from "@/lib/devlog";

function escape(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const dynamic = "force-static";

export function GET() {
  const items = getFeed()
    .map(item => {
      const isPost = item.kind === "post";
      const link = isPost ? `${siteData.url}/devlog/${item.slug}` : item.url;
      const title = isPost ? item.title : item.text.split("\n")[0].slice(0, 90);
      const description = isPost ? item.excerpt : item.text;
      const date = new Date(isPost ? `${item.date}T12:00:00-03:00` : item.date).toUTCString();
      return `<item><title>${escape(title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${date}</pubDate><description>${escape(description)}</description></item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(siteData.name)} · devlog</title><link>${siteData.url}/devlog</link><description>${escape(siteData.description)}</description><language>pt-BR</language>${items}</channel></rss>`;

  return new Response(xml, {headers: {"Content-Type": "application/rss+xml; charset=utf-8"}});
}
