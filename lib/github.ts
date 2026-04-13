export type GithubRepo = {
  description: string | null;
  homepage: string | null;
  language: string | null;
  name: string;
  stars: number;
  updatedAt: string;
  url: string;
};

type GithubApiRepo = {
  description: string | null;
  homepage: string | null;
  language: string | null;
  name: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
};

function mapRepo(repo: GithubApiRepo): GithubRepo {
  return {
    description: repo.description,
    homepage: repo.homepage,
    language: repo.language,
    name: repo.name,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    url: repo.html_url
  };
}

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
    headers: {
      Accept: "application/vnd.github+json"
    },
    next: {
      revalidate: 3600
    }
  });

  if (!response.ok) {
    return [];
  }

  const repos = (await response.json()) as GithubApiRepo[];

  return repos
    .filter((repo) => repo.name.toLowerCase() !== username.toLowerCase())
    .map(mapRepo);
}

/** Busca repositórios específicos por nome (ordem preservada). Útil para destacar 3 projetos ativos. */
export async function getGithubReposByNames(username: string, names: string[]): Promise<GithubRepo[]> {
  if (names.length === 0) {
    return [];
  }

  const results = await Promise.all(
    names.map((name) =>
      fetch(`https://api.github.com/repos/${username}/${encodeURIComponent(name)}`, {
        headers: {
          Accept: "application/vnd.github+json"
        },
        next: {
          revalidate: 3600
        }
      }).then(async (response) => {
        if (!response.ok) {
          return null;
        }
        const repo = (await response.json()) as GithubApiRepo;
        return mapRepo(repo);
      })
    )
  );

  return results.filter((r): r is GithubRepo => r !== null);
}
