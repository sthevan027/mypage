"use client";

import {useRouter} from "next/navigation";
import {useEffect, useMemo, useRef, useState} from "react";

export type PaletteItem = {
  title: string;
  /** Texto à direita: "página", "post", "link". */
  kind: string;
  href: string;
  external?: boolean;
};

const OPEN_EVENT = "hub:open-palette";

export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function CommandPalette({items}: {items: PaletteItem[]}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(value => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return q ? items.filter(item => normalize(`${item.title} ${item.kind}`).includes(q)) : items;
  }, [items, query]);

  if (!open)
    return null;

  const go = (item: PaletteItem) => {
    setOpen(false);
    if (item.external)
      window.open(item.href, "_blank", "noopener,noreferrer");
    else
      router.push(item.href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected(index => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected(index => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && results[selected]) {
      event.preventDefault();
      go(results[selected]);
    }
  };

  return (
    <div className="palette-backdrop" onMouseDown={() => setOpen(false)}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Buscar no hub"
        onMouseDown={event => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          autoFocus
          value={query}
          onChange={event => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          placeholder="Buscar páginas, posts e links…"
          aria-label="Buscar"
        />
        {results.length === 0 ? (
          <div className="palette__empty">Nada encontrado.</div>
        ) : (
          <ul role="listbox">
            {results.map((item, index) => (
              <li key={`${item.kind}-${item.href}`} role="option" aria-selected={index === selected}>
                <a
                  href={item.href}
                  onMouseEnter={() => setSelected(index)}
                  onClick={event => {
                    event.preventDefault();
                    go(item);
                  }}
                >
                  <span>{item.title}</span>
                  <span className="mono">{item.kind}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
