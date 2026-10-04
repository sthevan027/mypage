"use client";

import {useState} from "react";

import {FeedItemView} from "@/components/feed-item";
import type {FeedItem} from "@/lib/devlog";

const FILTERS = [
  {id: "all", label: "Tudo"},
  {id: "post", label: "Posts"},
  {id: "note", label: "Notas"}
] as const;

type Filter = (typeof FILTERS)[number]["id"];

export function FeedList({items}: {items: FeedItem[]}) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? items : items.filter(item => item.kind === filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrar o devlog">
        {FILTERS.map(option => (
          <button
            key={option.id}
            type="button"
            aria-pressed={filter === option.id}
            onClick={() => setFilter(option.id)}
          >
            {option.label}
            <span className="visually-hidden"> ({option.id === "all" ? items.length : items.filter(i => i.kind === option.id).length})</span>
          </button>
        ))}
      </div>
      <div className="panel">
        {visible.map(item => (
          <FeedItemView key={item.kind === "post" ? item.slug : item.id} item={item} />
        ))}
      </div>
    </>
  );
}
