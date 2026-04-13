import type { LucideIcon } from "lucide-react";
import { Code2, Coffee, GitBranch, Heart, Play, Terminal } from "lucide-react";

export type MotivationItem = {
  icon: LucideIcon;
  label: string;
};

export type TimelineEntry = {
  year: string;
  text: string;
};

export const sobreData = {
  pageTitle: "Sobre mim",
  heroTitle: "Sobre o Sthevan",
  heroSubtitle: "Engenheiro de Software • frontend e produto",
  bio: [
    "Sou desenvolvedor focado em criar interfaces claras e código sustentável. Gosto de unir boa experiência de uso com arquitetura que escala e deixa o time mais produtivo.",
    "Trabalho principalmente com Linux, React, Next.js e TypeScript no frontend, e tenho contato com APIs, bancos e automações quando o projeto pede. Meu portfório resume projetos e experimentos que já publiquei.",
    "Este hub é o lugar para novidades rápidas, links e textos maiores no blog — menos “vitrine estática”, mais presença contínua."
  ],
  whatMoves: [
    { icon: Terminal, label: "linux & desenvolvimento" },
    { icon: Coffee, label: "Café & código" },
    { icon: Play, label: "Aprender em público" },
    { icon: Heart, label: "Bug bounty" },
    { icon: GitBranch, label: "Github & Git" },
    { icon: Code2, label: "Desenvolvimento de software e web" }
  ] satisfies MotivationItem[],
  timeline: [
    {
      year: "2020 - 2022",
      text: "Iniciando minha jornada na área de tecnologia."
    },
    {
      year: "2022 - 2023",
      text: "especialização em desenvolvimento de software e web, focado em React, Next.js e TypeScript."
    },
    {
      year: "2024 - 2025",
      text: "Criação da minha primeira startup,(Devloop)- terminou no meio do ano de 2025."
    },
    {
      year: "2025 - 2026",
      text: "Inicio do meu canal no youtube, e minha nova etapa dentro da empresa JL construtora - na area de desenvolvimento de software e web."
    },
  ] satisfies TimelineEntry[]
};
