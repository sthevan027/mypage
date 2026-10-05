import type { LucideIcon } from "lucide-react";
import { Bug, Code2, Coffee, GitBranch, Play, Terminal } from "lucide-react";

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
  heroSubtitle: "Desenvolvedor fullstack • veio da obra, automação como marca",
  bio: [
    "Eu era eletricista de obra. Comecei automatizando relatório da engenharia com Python e não parei mais — hoje sou desenvolvedor fullstack, com a automação como o que mais me diferencia.",
    "Trabalho com React, Next.js e TypeScript no frontend, Supabase e Node.js no backend, e Python pra automação (OCR, geração de relatório) aplicada a engenharia e construção. Meu portfólio resume os projetos que já publiquei.",
    "Este hub é o devlog: o lugar pra contar o que estou construindo enquanto construo — bastidores, decisões e bugs — e não só o resultado final."
  ],
  whatMoves: [
    { icon: Terminal, label: "Linux & desenvolvimento" },
    { icon: Coffee, label: "Café & código" },
    { icon: Play, label: "Aprender em público" },
    { icon: Bug, label: "Bug bounty" },
    { icon: GitBranch, label: "GitHub & Git" },
    { icon: Code2, label: "Automação aplicada à engenharia" }
  ] satisfies MotivationItem[],
  timeline: [
    {
      year: "Antes de 2024",
      text: "Técnico em Automação. A base técnica que depois virou ponte pra programação."
    },
    {
      year: "Set 2024",
      text: "Eletricista FC na JL Construtora (obra Vale Tubarão, Serra/ES) — o cargo formal. Na prática, logo passei a apoiar a equipe de engenharia e virei o desenvolvedor fullstack interno."
    },
    {
      year: "2024 – 2025",
      text: "Devloop, minha primeira startup. Terminou no meio de 2025."
    },
    {
      year: "Jan 2025 — hoje",
      text: "Freelance pela Virex, minha empresa: 10 projetos entregues até agora."
    },
    {
      year: "2025 – hoje",
      text: "Canal no YouTube e Engenharia de Software em curso. Objetivo: sair do formato híbrido eletricista/dev — 100% dev, numa empresa ou na própria Virex."
    }
  ] satisfies TimelineEntry[]
};
