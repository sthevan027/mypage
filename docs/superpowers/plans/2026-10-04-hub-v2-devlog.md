# Hub v2 — plano de implementação

**Spec:** `docs/superpowers/specs/2026-10-04-hub-v2-devlog-design.md`
**Branch:** `hub-v2-devlog` → PR pra `main` (preview da Vercel).

1. **Base visual** — `globals.css` novo (tokens minimal dev), fontes Geist via
   `next/font`, `scripts/gen-topo.mjs` → `public/topo.svg`, layout com nav
   (topo no desktop, abas embaixo no mobile).
2. **Dados** — `data/site.ts` (perfil/links, X = @SantosSthevan),
   `data/agora.ts`, `lib/github.ts` (eventos públicos → releases e repos ativos).
3. **Devlog** — `lib/devlog.ts` (MDX com frontmatter, rascunhos, tempo de
   leitura, índice), componentes MDX (Figure, Video, Callout), código com destaque.
4. **Notas do X** — `content/x-links.json`, `scripts/sync-x-notes.mjs`
   (oEmbed + data pelo ID + expande t.co), `lib/notes.ts`.
5. **Páginas** — home, `/devlog` (filtro), `/devlog/[slug]`, `/agora`, `/sobre`,
   RSS, sitemap, robots, OG, redirecionamentos; remover o antigo.
6. **Paleta Ctrl+K** — componente cliente com páginas, posts e links.
7. **Conteúdo** — os 2 posts em rascunho com imagens reais + notas sincronizadas.
8. **Verificação** — `tsc`, lint, `next build`, conferência visual no navegador
   (desktop e mobile), README atualizado, PR com preview.
