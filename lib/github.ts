// Atividade pública do GitHub pro bloco "Agora": repositórios com movimento
// recente e as últimas releases. Uma chamada (eventos públicos), com cache
// de 1 hora. Sem token funciona (60 req/h por IP); com GITHUB_TOKEN no
// ambiente o limite sobe.

export type RepoActivity = {
  repo: string;
  url: string;
  /** Rótulo curto do último acontecimento: tag da release, "PR #30", "push". */
  label: string;
  /** ISO da última atividade. */
  at: string;
};

export type ReleaseActivity = {
  repo: string;
  tag: string;
  url: string;
  at: string;
};

export type GithubActivity = {
  repos: RepoActivity[];
  releases: ReleaseActivity[];
};

export type GithubEvent = {
  type: string;
  created_at: string;
  repo: {name: string};
  payload: {
    release?: {tag_name: string; html_url: string};
    pull_request?: {number: number};
  };
};

const EMPTY: GithubActivity = {repos: [], releases: []};

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? {Authorization: `Bearer ${token}`} : {})
  };
}

function shortName(fullName: string) {
  return fullName.split("/")[1] ?? fullName;
}

function labelFor(event: GithubEvent): string | null {
  if (event.type === "ReleaseEvent" && event.payload.release)
    return event.payload.release.tag_name;
  if (event.type === "PullRequestEvent" && event.payload.pull_request)
    return `PR #${event.payload.pull_request.number}`;
  if (event.type === "PushEvent")
    return "push";
  if (event.type === "CreateEvent")
    return "novo";
  return null;
}

/** Pura: transforma a lista de eventos (mais novo primeiro) no resumo do "Agora". */
export function summarizeEvents(events: GithubEvent[], maxRepos = 4, maxReleases = 3): GithubActivity {
  const repos = new Map<string, RepoActivity>();
  const releases: ReleaseActivity[] = [];

  for (const event of events) {
    const name = shortName(event.repo.name);

    if (event.type === "ReleaseEvent" && event.payload.release)
      releases.push({repo: name, tag: event.payload.release.tag_name, url: event.payload.release.html_url, at: event.created_at});

    const label = labelFor(event);
    if (label && !repos.has(name))
      repos.set(name, {repo: name, url: `https://github.com/${event.repo.name}`, label, at: event.created_at});
  }

  return {repos: [...repos.values()].slice(0, maxRepos), releases: releases.slice(0, maxReleases)};
}

export async function getGithubActivity(username: string): Promise<GithubActivity> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      headers: headers(),
      next: {revalidate: 3600}
    });
    if (!response.ok)
      return EMPTY;
    return summarizeEvents((await response.json()) as GithubEvent[]);
  } catch {
    return EMPTY;
  }
}

export type RepoInfo = {
  name: string;
  language: string | null;
  stars: number;
  pushedAt: string;
  url: string;
  homepage: string | null;
  license: string | null;
};

type GithubApiRepo = {
  name: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  html_url: string;
  homepage: string | null;
  license: {spdx_id: string} | null;
};

/**
 * Metadados dos repositórios públicos do usuário, por nome (cache de 1 h).
 * Falhou (limite da API, sem rede)? Devolve vazio e a página usa o texto de
 * `data/projetos.ts`.
 */
export async function getGithubRepoInfo(username: string): Promise<Record<string, RepoInfo>> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
      headers: headers(),
      next: {revalidate: 3600}
    });
    if (!response.ok)
      return {};
    const repos = (await response.json()) as GithubApiRepo[];
    return Object.fromEntries(
      repos.map(repo => [
        repo.name,
        {
          name: repo.name,
          language: repo.language,
          stars: repo.stargazers_count,
          pushedAt: repo.pushed_at,
          url: repo.html_url,
          homepage: repo.homepage || null,
          license: repo.license?.spdx_id && repo.license.spdx_id !== "NOASSERTION" ? repo.license.spdx_id : null
        }
      ])
    );
  } catch {
    return {};
  }
}
