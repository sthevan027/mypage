// Sincroniza as notas do devlog a partir dos posts do X.
//
// Fluxo (opção B — gratuita, semiautomática): cole o link do post em
// content/x-links.json e rode `pnpm sync:x`. O script busca o embed público
// do X (oEmbed, sem login nem chave), extrai o texto, expande os links t.co,
// calcula a data pelo ID do post e grava content/x-notes.json — que é o que
// o site lê. Nada é chamado no X quando alguém abre o site.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const linksFile = path.join(root, "content", "x-links.json");
const notesFile = path.join(root, "content", "x-notes.json");

// O ID do post no X é um "snowflake": os bits altos são milissegundos desde
// 2010-11-04 (época do Twitter).
const TWITTER_EPOCH = 1288834974657n;
function dateFromId(id) {
  return new Date(Number((BigInt(id) >> 22n) + TWITTER_EPOCH)).toISOString();
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&nbsp;/g, " ");
}

async function expand(shortUrl) {
  try {
    const response = await fetch(shortUrl, {method: "HEAD", redirect: "manual"});
    return response.headers.get("location") ?? shortUrl;
  } catch {
    return shortUrl;
  }
}

async function toNote({url, related}) {
  const id = url.match(/status\/(\d+)/)?.[1];
  if (!id)
    throw new Error(`Link sem ID de post: ${url}`);

  const endpoint = `https://publish.x.com/oembed?url=${encodeURIComponent(url)}&omit_script=1&lang=pt`;
  const response = await fetch(endpoint);
  if (!response.ok)
    throw new Error(`oEmbed respondeu ${response.status} para ${url}`);
  const data = await response.json();

  const body = data.html.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "";
  let hasMedia = false;
  const links = [];

  // Troca cada <a> pelo destino real; links de foto (pic.twitter.com) viram
  // só uma marcação de que o post tem mídia.
  const parts = [];
  let last = 0;
  for (const match of body.matchAll(/<a href="([^"]+)">([\s\S]*?)<\/a>/g)) {
    parts.push(body.slice(last, match.index));
    const label = decodeEntities(match[2]);
    if (label.startsWith("pic.twitter.com") || label.startsWith("pic.x.com")) {
      hasMedia = true;
    } else if (!match[1].includes("t.co/")) {
      // Hashtag ou menção: fica o texto (#frontend, @alguem).
      parts.push(label);
    } else {
      const target = match[1].includes("t.co/") ? await expand(match[1]) : match[1];
      links.push(target);
      // O embed às vezes cola o link no texto anterior ("Virexhttps://…").
      const before = parts.join("") + body.slice(last, match.index);
      parts.push(/\s$/.test(before) || before === "" ? target : ` ${target}`);
    }
    last = match.index + match[0].length;
  }
  parts.push(body.slice(last));

  const text = decodeEntities(parts.join("").replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, ""))
    .replace(/[ \t]+\n/g, "\n")
    .trim();

  const handle = data.author_url.split("/").pop();
  return {
    id,
    url: `https://x.com/${handle}/status/${id}`,
    date: dateFromId(id),
    author: data.author_name,
    handle,
    text,
    links,
    hasMedia,
    ...(related ? {related} : {})
  };
}

const entries = JSON.parse(fs.readFileSync(linksFile, "utf8"));
const notes = [];
for (const entry of entries) {
  try {
    notes.push(await toNote(entry));
    console.log(`✓ ${entry.url}`);
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exitCode = 1;
  }
}

notes.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(notesFile, `${JSON.stringify(notes, null, 2)}\n`);
console.log(`${notes.length} notas gravadas em content/x-notes.json`);
