import type {Metadata} from "next";

import {FeedList} from "@/components/feed-list";
import {getFeed} from "@/lib/devlog";

export const metadata: Metadata = {
  title: "Devlog",
  description: "O que estou construindo, enquanto construo: posts longos sobre os projetos e notas do X."
};

export default function DevlogPage() {
  return (
    <>
      <div className="topo topo--faint" aria-hidden="true" />
      <main className="container" style={{maxWidth: 820, paddingBottom: 56}}>
        <header className="page-head">
          <span className="eyebrow">Devlog</span>
          <h1>O que estou construindo</h1>
          <p>
            Posts longos sobre os projetos — bastidores, decisões e bugs — e notas curtas que publiquei no X.
          </p>
        </header>
        <FeedList items={getFeed()} />
      </main>
    </>
  );
}
