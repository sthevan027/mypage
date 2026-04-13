import { ArrowUpRight, Star } from "lucide-react";

import { GithubRepo } from "@/lib/github";
import styles from "@/styles/project-grid.module.css";

type ProjectGridProps = {
  projects: GithubRepo[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <article key={project.name} className={styles.card}>
          <div className={styles.topline}>
            <span className={styles.language}>{project.language ?? "Projeto"}</span>
            <span className={styles.stars}>
              <Star size={14} />
              {project.stars}
            </span>
          </div>

          <h3>{project.name}</h3>
          <p>{project.description || "Repositório público no GitHub."}</p>

          <div className={styles.links}>
            <a href={project.url} target="_blank" rel="noreferrer">
              Repositório
              <ArrowUpRight size={16} />
            </a>
            {project.homepage ? (
              <a href={project.homepage} target="_blank" rel="noreferrer">
                Demo
                <ArrowUpRight size={16} />
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
