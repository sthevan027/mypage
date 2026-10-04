import type {Metadata} from "next";

import {AgoraPanel} from "@/components/agora-panel";

export const metadata: Metadata = {
  title: "Agora",
  description: "No que estou trabalhando agora, com a atividade recente do GitHub."
};

export const revalidate = 3600;

export default function AgoraPage() {
  return (
    <>
      <div className="topo" aria-hidden="true" />
      <main className="container" style={{maxWidth: 820, paddingBottom: 56}}>
        <header className="page-head">
          <span className="eyebrow">Agora</span>
          <h1>No que estou trabalhando</h1>
          <p>
            Uma página &ldquo;now&rdquo;: o foco do momento em poucas linhas, mais o que está se mexendo no meu GitHub —
            atualizado sozinho a cada hora.
          </p>
        </header>
        <AgoraPanel full />
      </main>
    </>
  );
}
