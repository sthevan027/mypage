import type { Metadata } from "next";
import Link from "next/link";

import { getNovidades } from "@/lib/novidades";
import styles from "@/styles/novidades.module.css";

export const metadata: Metadata = {
  title: "Novidades",
  description: "Changelog e atualizações rápidas do hub."
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function NovidadesPage() {
  const items = getNovidades();

  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/">
        Voltar ao início
      </Link>

      <header className={styles.header}>
        <h1>Novidades</h1>
        <p className={styles.subtitle}>
          Atualizações curtas e changelog do que muda por aqui. Edite <code>content/novidades.json</code> para publicar.
        </p>
      </header>

      {items.length === 0 ? (
        <p className={styles.empty}>Nenhuma novidade ainda. Adicione itens no JSON.</p>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <article key={item.id} className={styles.item}>
              <span className={styles.date}>{formatDate(item.date)}</span>
              <h2>{item.title}</h2>
              <p className={styles.body}>{item.body}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
