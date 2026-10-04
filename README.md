# Hub do Sthevan — devlog

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![MDX](https://img.shields.io/badge/MDX-posts-1B1F24?logo=mdx&logoColor=white)

![Home do hub: perfil, links, bloco Agora e devlog sobre o fundo de curvas de nível](docs/hub-preview.png)

**[sthevan-hub.vercel.app](https://sthevan-hub.vercel.app)** — o lugar do **processo**. O trabalho pronto fica no [Portfolio](https://sthevandev.vercel.app); aqui fica o que eu estou construindo, enquanto construo.

- **Início** — link-in-bio + bloco **"Agora"** (texto curto + atividade do GitHub, atualizada sozinha de hora em hora) + últimos itens do devlog.
- **Devlog** — **posts** longos em MDX (imagem, GIF, vídeo, código, destaques, índice) e **notas** puxadas dos meus posts no X. Filtro Tudo / Posts / Notas e RSS.
- **Busca** — `Ctrl/⌘ + K` pula pra qualquer página, post ou link.
- Visual minimal dev (Geist, preto, azul `#60a5fa`) com **curvas de nível** geradas por código no fundo.

## Rodar

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # build de produção
pnpm typecheck
pnpm lint
```

## Escrever um post

Crie `content/devlog/<slug>.mdx`:

```mdx
---
title: "Título do post"
date: "2026-10-03"
excerpt: "Uma ou duas frases que aparecem na lista."
project: "Nome do projeto"
cover: "/devlog/<slug>/capa.png"
draft: true
---

Texto em Markdown. Imagens e vídeos ficam em `public/devlog/<slug>/`.

<Figure src="/devlog/<slug>/print.png" alt="Descrição" caption="Legenda" />
<Figure src="/devlog/<slug>/demo.gif" alt="…" narrow />
<Video src="/devlog/<slug>/demo.mp4" caption="Legenda" />
<Callout>Um destaque no meio do texto.</Callout>
```

- Cada `## Seção` vira um item do índice lateral.
- **Rascunho:** com `draft: true`, o post aparece em `pnpm dev` e nos **previews** da Vercel, mas **não em produção**. Revisou? Troque pra `draft: false`.

## Adicionar uma nota do X

1. Cole o link do post em [`content/x-links.json`](content/x-links.json) (opcional: `"related": "<slug>"` liga a nota a um post longo).
2. Rode `pnpm sync:x` — busca o embed público do X (sem login, sem chave, sem custo), expande os links `t.co` e grava [`content/x-notes.json`](content/x-notes.json).
3. Commit. O site não chama o X quando alguém abre a página.

## Onde editar

| O quê | Onde |
|---|---|
| Nome, frase, links | [`data/site.ts`](data/site.ts) |
| Bloco "Agora" (texto) | [`data/agora.ts`](data/agora.ts) — atualize também `updatedAt` |
| Sobre | [`data/sobre.ts`](data/sobre.ts) |
| Fundo de curvas de nível | [`scripts/gen-topo.mjs`](scripts/gen-topo.mjs) → `pnpm gen:topo` (troque a `SEED` pra outro desenho) |

O GitHub do "Agora" funciona sem token (limite de 60 req/h, com cache de 1 h). Pra subir o limite, defina `GITHUB_TOKEN` nas variáveis de ambiente da Vercel.

## Estrutura

```
app/                 páginas (/, /devlog, /devlog/[slug], /agora, /sobre, rss, sitemap)
components/          nav, paleta Ctrl+K, painel Agora, itens do devlog, componentes MDX
content/devlog/      posts (.mdx)
content/x-*.json     notas do X (links → notas sincronizadas)
data/                textos editáveis (perfil, Agora, sobre)
lib/                 devlog (posts/notas/rascunhos), github (atividade), formatação
scripts/             gen-topo (fundo), sync-x-notes (notas do X)
docs/superpowers/    spec e plano do hub v2
```

Rotas antigas redirecionam: `/blog` → `/devlog`, `/novidades` → `/agora`.
