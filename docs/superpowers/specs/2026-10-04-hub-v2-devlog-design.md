# Hub v2 — devlog + "Agora" (design)

> Decidido com o Sthevan em 03–04/10/2026 (brainstorming com mockups no
> navegador). Ele aprovou a direção e pediu pra construir enquanto dormia
> ("estamos prontos pra começar a criação… foca e cria o nosso blog pelo que
> a gente decidiu"). Entregue como PR com preview da Vercel pra revisão.

## Propósito

O Portfolio (`sthevandev.vercel.app`) é a vitrine do trabalho pronto. O hub
(`sthevan-hub.vercel.app`) passa a ser **o processo**:

1. **Link-in-bio + "Agora"** — quem chega pelo link da bio vê quem é o
   Sthevan, no que ele está trabalhando agora e os links principais, sem
   rolar no celular.
2. **Devlog** — diário do que ele está construindo, com dois tipos de item:
   - **Posts** longos (MDX), com imagem, GIF, vídeo, código e destaques,
     escritos "a dois" a partir dos logs de sessão do vault;
   - **Notas** — posts do X (`@SantosSthevan`, mais as antigas do
     `@SthevanCode`) puxados pelo embed público do X.

## Decisões

| Tema | Decisão |
|---|---|
| Caminho | **Refazer do zero** no mesmo repositório/projeto da Vercel (opção B). |
| Visual | **Minimal dev**: fundo `#0a0a0a`, Geist + Geist Mono, destaque azul `#60a5fa`, painéis com borda `#262626`. Sem gradiente em texto. |
| Fundo | **Curvas de nível** (topográfico) geradas por código num SVG estático (`public/topo.svg`), mais fortes na home e mais fracas nos posts. Nada de obra/canteiro — o foco é dev. |
| "Agora" | Misto: texto curto editado a dois (`data/agora.ts`) + dados automáticos do GitHub (releases e repositórios com push recente), revalidados de hora em hora. |
| Notas do X | Opção B (gratuita, semiautomática): links em `content/x-links.json` → `pnpm sync:x` busca o oEmbed (`publish.x.com`) e grava `content/x-notes.json`. A data sai do ID do post. Nada é chamado do X em tempo de requisição. |
| Excluídos | Posts de oferta de freela (12/03) e o do GitFut (03/07) não entram no devlog. |
| Rascunhos | Posts com `draft: true` aparecem em desenvolvimento e nos previews da Vercel, e **não** em produção — é como o Sthevan revisa o texto antes de publicar. |
| Busca | `Ctrl/Cmd + K` abre uma paleta pra pular pra qualquer página, post ou link. |
| Gerenciador | pnpm (lockfile existente), via `npx pnpm`. |

## Páginas

- `/` — perfil + links (Portfolio em destaque) | "Agora" | últimos itens do devlog.
- `/devlog` — lista com filtro Tudo / Posts / Notas.
- `/devlog/[slug]` — post longo com índice lateral, tempo de leitura e tag do projeto.
- `/agora` — versão completa do "Agora" com a atividade do GitHub.
- `/sobre` — reaproveita `data/sobre.ts` no visual novo.
- `/devlog/rss.xml`, `sitemap.xml`, `robots.txt`, metadados Open Graph.
- Redirecionamentos: `/blog` → `/devlog`, `/novidades` → `/agora`.

Saem: feed manual de redes, página Novidades, YouTube RSS e os componentes antigos.

## Conteúdo inicial

- Post (rascunho): **"PR Indicator: do GNOME ao Windows"** — fatos do vault
  (sessões de 21/09 a 03/10) e imagens/GIFs reais do repositório.
- Post (rascunho): **"De eletricista de obra a dev: o portfólio novo"** — fatos
  do post do X de 02/10 e da sessão de redesign do Portfolio.
- Notas: os posts do X acordados (sem freela/GitFut).

## Fora de escopo (agora)

Comentários, newsletter, analytics, CMS, busca de texto completo, posts em inglês.
