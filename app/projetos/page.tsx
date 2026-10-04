import type {Metadata} from "next";
import Link from "next/link";

import {categories, projetos} from "@/data/projetos";
import {siteData} from "@/data/site";
import {getPosts} from "@/lib/devlog";
import {timeAgo} from "@/lib/format";
import {getGithubRepoInfo} from "@/lib/github";

export const metadata: Metadata = {
  title: "Projetos open source",
  description: "Os projetos de código aberto que eu mantenho, com linguagem, releases e o que já escrevi sobre cada um no devlog."
};

// Metadados do GitHub com cache de 1 h; a página se atualiza junto.
export const revalidate = 3600;

export default async function ProjetosPage() {
  const info = await getGithubRepoInfo(siteData.github);
  const posts = getPosts();

  return (
    <>
      <div className="topo topo--faint" aria-hidden="true" />
      <main className="container" style={{maxWidth: 860, paddingBottom: 56}}>
        <header className="page-head">
          <span className="eyebrow">Open source</span>
          <h1>Meus projetos</h1>
          <p>
            O que eu mantenho em código aberto, do app de bandeja ao site que você está lendo. Cada projeto vai
            ganhando seus posts no <Link className="accent" href="/devlog">devlog</Link>.
          </p>
        </header>

        {categories.map(category => {
          const items = projetos
            .filter(project => project.category === category.id)
            .map(project => ({project, repo: info[project.repo]}))
            // Mais ativo primeiro; sem dados do GitHub, mantém a ordem do arquivo.
            .sort((a, b) => (b.repo?.pushedAt ?? "").localeCompare(a.repo?.pushedAt ?? ""));
          if (items.length === 0)
            return null;

          return (
            <section key={category.id} className="project-group" aria-labelledby={`cat-${category.id}`}>
              <div className="project-group__head">
                <h2 className="eyebrow" id={`cat-${category.id}`}>
                  {category.title}
                </h2>
                <span className="mono">{category.blurb}</span>
              </div>
              <div className="panel">
                {items.map(({project, repo}) => {
                  const related = project.devlog ? posts.filter(post => post.project === project.devlog) : [];
                  const url = repo?.url ?? `https://github.com/${siteData.github}/${project.repo}`;
                  return (
                    <article key={project.repo} className="project">
                      <div className="project__top">
                        <h3>
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {project.title}
                          </a>
                        </h3>
                        <div className="project__badges">
                          {repo?.language ? <span className="badge">{repo.language}</span> : null}
                          {repo && repo.stars > 0 ? <span className="badge">★ {repo.stars}</span> : null}
                          {repo ? <span className="mono">{timeAgo(repo.pushedAt)}</span> : null}
                        </div>
                      </div>
                      <p>{project.description}</p>
                      <div className="project__links">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          código ↗
                        </a>
                        {repo?.homepage ? (
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                            {repo.homepage.includes("/releases") ? "release ↗" : "site ↗"}
                          </a>
                        ) : null}
                        {related.map(post => (
                          <Link key={post.slug} href={`/devlog/${post.slug}`} className="accent">
                            devlog: {post.title} →
                          </Link>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
