import type {Metadata} from "next";
import Image from "next/image";

import {siteData} from "@/data/site";
import {sobreData} from "@/data/sobre";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Quem é o Sthevan, o que move o trabalho dele e a trajetória até aqui."
};

export default function SobrePage() {
  return (
    <>
      <div className="topo topo--faint" aria-hidden="true" />
      <main className="container" style={{maxWidth: 760}}>
        <header className="page-head">
          <Image className="profile__avatar" src={siteData.avatar} alt={siteData.name} width={72} height={72} />
          <h1>{sobreData.heroTitle}</h1>
          <p>{sobreData.heroSubtitle}</p>
        </header>

        <div className="about">
          <section className="panel">
            {sobreData.bio.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="panel" aria-labelledby="move-title">
            <h2 className="eyebrow" id="move-title" style={{margin: "0 0 12px"}}>
              O que me move
            </h2>
            <div className="chips">
              {sobreData.whatMoves.map(item => (
                <span key={item.label}>{item.label}</span>
              ))}
            </div>
          </section>

          <section className="panel" aria-labelledby="timeline-title">
            <h2 className="eyebrow" id="timeline-title" style={{margin: "0 0 4px"}}>
              Trajetória
            </h2>
            <ul className="timeline">
              {sobreData.timeline.map(entry => (
                <li key={entry.year}>
                  <span className="mono">{entry.year}</span>
                  <span>{entry.text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
