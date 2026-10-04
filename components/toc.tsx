"use client";

import {useEffect, useState} from "react";

type TocItem = {id: string; title: string};

/**
 * Índice lateral do post que acompanha a leitura: marca a seção em que o
 * leitor está. A seção ativa é a última cujo título já passou do topo da
 * tela (com uma folga abaixo da navegação fixa).
 */
export function Toc({items}: {items: TocItem[]}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map(item => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0)
      return;

    const update = () => {
      const offset = 120;
      let current = headings[0].id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top - offset <= 0)
          current = heading.id;
      }
      // No fim da página, a última seção pode não chegar ao topo.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4)
        current = headings[headings.length - 1].id;
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, {passive: true});
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <aside className="toc" aria-label="Nesta página">
      <span className="eyebrow">Nesta página</span>
      {items.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={active === item.id ? "location" : undefined}
          onClick={() => setActive(item.id)}
        >
          {item.title}
        </a>
      ))}
    </aside>
  );
}
