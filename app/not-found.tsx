import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="topo topo--faint" aria-hidden="true" />
      <main className="container" style={{maxWidth: 620, padding: "80px 24px"}}>
        <span className="eyebrow">404</span>
        <h1 style={{fontSize: 30, letterSpacing: "-0.03em", margin: "8px 0"}}>Essa página saiu do mapa.</h1>
        <p style={{color: "var(--muted)"}}>
          Talvez o post ainda seja rascunho, ou o link mudou. <Link className="accent" href="/devlog">Ver o devlog →</Link>
        </p>
      </main>
    </>
  );
}
