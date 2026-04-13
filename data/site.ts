export type FeedItem = {
  category: string;
  dateLabel: string;
  description: string;
  platform: string;
  title: string;
  url: string;
};

export type LinkCardVariant = "primary" | "featured" | "default";

export type LinkCardIconKey =
  | "github"
  | "fileText"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "portfolio"
  | "whatsapp"
  | "form"
  | "x"
  | "threads";

export type LinkCard = {
  description: string;
  icon: LinkCardIconKey;
  title: string;
  url: string;
  variant: LinkCardVariant;
};

export const siteData = {
  name: "Sthevan Santos",
  kicker: "Engenheiro de Software • React • Next.js • TypeScript",
  summary:
    "Um hub pessoal para publicar atualizações, agrupar projetos, centralizar currículo e deixar seus links principais num lugar só.",
  avatar: "/foto-perfil.jpg",
  resumeUrl: "https://sthevan027.github.io/Curriculo/",
  github: {
    username: "sthevan027",
    /** Nomes exatos dos repositórios no GitHub (3 em destaque). Ajuste à vontade. */
    featuredRepoNames: ["mypage", "Portfolio", "Strivo"]
  },
  social: {
    github: "https://github.com/sthevan027",
    instagram: "https://instagram.com/sthevan.dev",
    linkedin: "https://www.linkedin.com/in/sthevanssantos/",
    x: "https://x.com/SthevanCode",
    /** Quando criar o perfil no Threads com o mesmo @, o link costuma ser threads.com/@SthevanCode */
    threads: "https://www.threads.com/@SthevanCode",
    whatsapp: "https://wa.me/5527988772784",
    youtubeRssUrl: ""
  },
  metrics: [
    { label: "repositórios públicos", value: "26+" },
    { label: "foco em Fullstack", value: "React / Next / TypeScript" },
    { label: "site pessoal", value: "posts + links" }
  ],
  about: {
    siteFocus:
      "Esse layout foi pensado para funcionar como página pessoal viva: você pode colocar posts curtos, novidades, vídeos, projetos, links de redes e materiais de apresentação sem cair em um modelo tradicional de portfólio.",
    stack:
      "A base foi feita em Next.js com componentes simples, dados centralizados e integração com GitHub. O feed pode usar posts manuais e também aceitar RSS do YouTube.",
    usage:
      "Blog em content/blog/, novidades em content/novidades.json e links neste arquivo. Para YouTube automático no futuro, preencha youtubeRssUrl."
  },
  editorialPosts: [
    {
      category: "Post",
      dateLabel: "Abr 2026",
      description: "Resumo do que estou construindo agora, ideias novas e próximos experimentos.",
      platform: "Publicação interna",
      title: "Notas da semana: código, setup e roadmap",
      url: "https://github.com/sthevan027"
    },
    {
      category: "Projeto",
      dateLabel: "Abr 2026",
      description: "Uma vitrine rápida dos projetos e MVPs que estão evoluindo no meu GitHub.",
      platform: "GitHub",
      title: "Projetos em andamento e deploys recentes",
      url: "https://github.com/sthevan027?tab=repositories"
    },
    {
      category: "Social",
      dateLabel: "Abr 2026",
      description: "Atalho para acompanhar bastidores, atualizações rápidas e lançamentos.",
      platform: "Instagram",
      title: "Acompanhe os bastidores do meu dia a dia dev",
      url: "https://instagram.com/sthevan.dev"
    }
  ] satisfies FeedItem[],
  linkCards: [
    {
      title: "GitHub",
      description: "Repositórios, projetos e código aberto.",
      icon: "github",
      variant: "primary",
      url: "https://github.com/sthevan027"
    },
    {
      title: "Currículo do Sthevan",
      description: "Currículo online do Sthevan para compartilhar.",
      icon: "fileText",
      variant: "featured",
      url: "https://sthevan027.github.io/Curriculo/"
    },
    {
      title: "LinkedIn",
      description: "Perfil profissional e trajetória.",
      icon: "linkedin",
      variant: "default",
      url: "https://www.linkedin.com/in/sthevanssantos/"
    },
    {
      title: "X — @SthevanCode",
      description: "Conta principal: posts sobre código e tech.",
      icon: "x",
      variant: "default",
      url: "https://x.com/SthevanCode"
    },
    {
      title: "Instagram",
      description: "Bastidores e atualizações rápidas.",
      icon: "instagram",
      variant: "default",
      url: "https://instagram.com/sthevan.dev"
    },
    {
      title: "Threads — @SthevanCode",
      description: "Mesmo @ do X; link já preparado para quando o perfil existir.",
      icon: "threads",
      variant: "default",
      url: "https://www.threads.com/@SthevanCode"
    },
    {
      title: "Portfólio",
      description: "Site anterior e referência de projetos.",
      icon: "portfolio",
      variant: "default",
      url: "https://portiflio-seven.vercel.app/"
    },
    {
      title: "Formulário",
      description: "Substitua pelo link do seu Google Forms ou Typeform.",
      icon: "form",
      variant: "default",
      url: "https://forms.gle/"
    },
    {
      title: "WhatsApp",
      description: "Contato direto para oportunidades.",
      icon: "whatsapp",
      variant: "default",
      url: "https://wa.me/5527988772784"
    }
  ] satisfies LinkCard[]
};
