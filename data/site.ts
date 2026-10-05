export type SiteLink = {
  label: string;
  /** Texto curto à direita (domínio, @, etc.). */
  hint: string;
  url: string;
  /** Destaque visual (o Portfolio é onde está o trabalho pronto). */
  featured?: boolean;
};

export const siteData = {
  name: "Sthevan Santos",
  handle: "sthevan.dev",
  url: "https://sthevan-hub.vercel.app",
  role: "Fullstack · automação · Virex",
  /** Frase da home. O trecho em `highlight` ganha a cor de destaque. */
  bio: {
    before: "Construo produtos web e ",
    highlight: "automações",
    after: ". Fundador da Virex. Aqui eu conto o que estou construindo, enquanto construo."
  },
  description:
    "Devlog e links do Sthevan Santos: o que estou construindo agora, bastidores dos projetos e notas do X.",
  avatar: "/foto-perfil.jpg",
  github: "sthevan027",
  x: {
    handle: "SantosSthevan",
    url: "https://x.com/SantosSthevan"
  },
  links: [
    {label: "Portfolio", hint: "sthevandev ↗", url: "https://sthevandev.vercel.app", featured: true},
    {label: "GitHub", hint: "sthevan027 ↗", url: "https://github.com/sthevan027"},
    {label: "LinkedIn", hint: "sthevanssantos ↗", url: "https://www.linkedin.com/in/sthevanssantos/"},
    {label: "X", hint: "@SantosSthevan ↗", url: "https://x.com/SantosSthevan"},
    {label: "Instagram", hint: "@sthevan.dev ↗", url: "https://instagram.com/sthevan.dev"},
    {label: "Currículo", hint: "online ↗", url: "https://sthevan027.github.io/Curriculo/"},
    {label: "Virex · orçamento", hint: "WhatsApp ↗", url: "https://wa.me/5527988772784"}
  ] satisfies SiteLink[]
};
