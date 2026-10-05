// Componentes disponíveis dentro dos posts (.mdx).

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  /** Imagens menores (GIF de interface, por exemplo) ficam centralizadas. */
  narrow?: boolean;
};

export function Figure({src, alt, caption, narrow}: FigureProps) {
  return (
    <figure className={`figure${narrow ? " figure--narrow" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Video({src, caption, poster}: {src: string; caption?: string; poster?: string}) {
  return (
    <figure className="figure">
      <video src={src} poster={poster} controls muted playsInline preload="metadata" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Callout({children}: {children: React.ReactNode}) {
  return <aside className="callout">{children}</aside>;
}

export const mdxComponents = {Figure, Video, Callout};
