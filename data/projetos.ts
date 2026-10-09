// Curadoria da página /projetos (open source).
//
// É uma LISTA DE PERMISSÃO: só aparece aqui o que estiver neste arquivo.
// Um repositório novo (de cliente, do trabalho, privado que virou público
// sem querer) nunca entra sozinho — pra entrar, adicione em `projetos`.
// Linguagem, estrelas e último push vêm do GitHub (cache de 1 h); o texto
// abaixo é o fallback que garante a página mesmo se a API falhar.
//
// Ficam de FORA de propósito (públicos no GitHub, mas não são "open source
// meu" pra vitrine):
//   - Strivo           → projeto de cliente
//   - System-control   → sistema interno, fora do Portfolio também
//   - Analise_Medicao  → Medição JL, projeto do trabalho
//   - alethe-agents, Specview → forks de outros autores
//   - sthevan027       → repositório de perfil

export type CategoryId = "ferramentas" | "web" | "automacao" | "sites" | "estudo";

export const categories: {id: CategoryId; title: string; blurb: string}[] = [
  {id: "ferramentas", title: "Ferramentas do dia a dia", blurb: "Apps de bandeja, widgets, CLIs e utilitários que uso."},
  {id: "web", title: "Apps web e produtos", blurb: "Sistemas e produtos em web."},
  {id: "automacao", title: "Automação e dados", blurb: "Scripts e dashboards que tiram trabalho manual."},
  {id: "sites", title: "Sites", blurb: "Meus próprios sites."},
  {id: "estudo", title: "Estudo", blurb: "Exercícios e experimentos."}
];

export type ProjectConfig = {
  /** Nome exato do repositório em github.com/sthevan027. */
  repo: string;
  /** Nome exibido. */
  title: string;
  category: CategoryId;
  description: string;
  /** Valor de `project` nos posts do devlog (liga o card aos posts). */
  devlog?: string;
};

export const projetos: ProjectConfig[] = [
  {
    repo: "focusbrew",
    title: "focusbrew",
    category: "ferramentas",
    description:
      "Tracker do dia pra quem programa, num widget colado no topo ou na lateral da tela: tarefas por dia com timer, resumo do que você fez, PRs do GitHub virando tarefa e notas rápidas pra escrever e rabiscar. Tauri + Rust + React.",
    devlog: "focusbrew"
  },
  {
    repo: "pacer",
    title: "Pacer",
    category: "ferramentas",
    description: "Widget para Windows que mostra o uso do seu plano Claude e para onde o ritmo atual te leva. Tauri + Rust + React.",
    devlog: "Pacer"
  },
  {
    repo: "gnome-pr-indicator",
    title: "PR Indicator",
    category: "ferramentas",
    description:
      "Indicador com os PRs esperando sua revisão e os seus PRs abertos: extensão do GNOME Shell e, agora, app de bandeja do Windows com o mesmo visual.",
    devlog: "PR Indicator"
  },
  {
    repo: "organizador",
    title: "Organizador",
    category: "ferramentas",
    description:
      "Organiza arquivos por tipo/extensão e faz limpeza de disco integrada (temporários, cache, lixeira, downloads parados). GUI em CustomTkinter, tema claro/escuro."
  },
  {
    repo: "DevRadar",
    title: "DevRadar",
    category: "ferramentas",
    description: "CLI em PowerShell que analisa perfis do GitHub e gera um relatório HTML com métricas e insights."
  },
  {
    repo: "Dotfile",
    title: "Dotfile",
    category: "ferramentas",
    description: "Dotfiles e scripts do meu ambiente de desenvolvimento (Linux, Zsh e Bash)."
  },
  {
    repo: "Converso",
    title: "Converso",
    category: "ferramentas",
    description: "Conversor/ferramenta em Python."
  },
  {
    repo: "MeuSalario",
    title: "MeuSalario",
    category: "web",
    description:
      "Simulador e comparador de salário CLT vs PJ/MEI, com cálculo de INSS/IRRF e gestão financeira pessoal. Next.js + TypeScript."
  },
  {
    repo: "LaudoFacil",
    title: "LaudoFácil",
    category: "web",
    description: "Sistema para laboratório de eletrônica."
  },
  {
    repo: "PontoLeve",
    title: "PontoLeve",
    category: "web",
    description: "Portal do colaborador e protótipo de RH, em React."
  },
  {
    repo: "ObraTrack",
    title: "ObraTrack",
    category: "web",
    description: "Rastreabilidade e controle de materiais com QR Code, para obras industriais."
  },
  {
    repo: "AtaAI",
    title: "AtaAI",
    category: "web",
    description: "Automação de reuniões: agenda, notas e follow-ups."
  },
  {
    repo: "AgendaZap",
    title: "AgendaZap",
    category: "web",
    description: "Sistema de secretaria (MVP) em Java."
  },
  {
    repo: "Analisado-de-Contratos",
    title: "Analisado de Contratos",
    category: "automacao",
    description:
      "Lê planilhas orçamentárias de contrato e gera um dashboard financeiro local (Flask + Chart.js), com composição de custos e Curva S planejada."
  },
  {
    repo: "Portfolio",
    title: "Portfolio",
    category: "sites",
    description: "Meu portfólio em Next.js + TypeScript: projetos, currículo e contato.",
    devlog: "Portfolio"
  },
  {
    repo: "mypage",
    title: "Este hub",
    category: "sites",
    description: "O site que você está lendo: devlog, \"Agora\", posts em MDX e notas do X.",
    devlog: "Hub"
  },
  {
    repo: "Calculadora.dotnet",
    title: "Calculadora .NET",
    category: "estudo",
    description: "Calculadora em C#/.NET, para estudo e exercícios."
  }
];
