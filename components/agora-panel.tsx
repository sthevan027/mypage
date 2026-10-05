import {agoraData} from "@/data/agora";
import {siteData} from "@/data/site";
import {timeAgo} from "@/lib/format";
import {getGithubActivity} from "@/lib/github";

/** Bloco "Agora": texto curto editado a dois + atividade do GitHub (1 h de cache). */
export async function AgoraPanel({full = false}: {full?: boolean}) {
  const activity = await getGithubActivity(siteData.github);

  return (
    <section className="panel agora" aria-labelledby="agora-title">
      <div className="eyebrow" id="agora-title">
        <span className="pulse" aria-hidden="true" />
        Agora · atualizado {timeAgo(agoraData.updatedAt)}
      </div>
      <div className="agora__grid">
        <div>
          <p className="agora__headline">{agoraData.headline}</p>
          <ul className="agora__list">
            {agoraData.items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow" style={{marginBottom: 6}}>
            Do GitHub · automático
          </div>
          {activity.repos.length === 0 ? (
            <p className="mono">Sem atividade pública recente.</p>
          ) : (
            activity.repos.map(repo => (
              <a key={repo.repo} className="gh-row" href={repo.url} target="_blank" rel="noopener noreferrer">
                <span>{repo.repo}</span>
                <span className="badge">{repo.label === "push" ? timeAgo(repo.at) : repo.label}</span>
              </a>
            ))
          )}
          {full && activity.releases.length > 0 ? (
            <>
              <div className="eyebrow" style={{margin: "16px 0 6px"}}>
                Últimas releases
              </div>
              {activity.releases.map(release => (
                <a key={`${release.repo}-${release.tag}`} className="gh-row" href={release.url} target="_blank" rel="noopener noreferrer">
                  <span>
                    {release.repo} <span className="mono">{release.tag}</span>
                  </span>
                  <span className="badge">{timeAgo(release.at)}</span>
                </a>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
