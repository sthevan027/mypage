"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

import styles from "@/styles/site-effects.module.css";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return coarse;
}

type TerminalLine = { text: string; dim?: boolean; delayMs?: number };

const TERMINAL_LINES: TerminalLine[] = [
  { text: "$ next build", delayMs: 420 },
  { text: "info  - Detectando ambiente…", dim: true, delayMs: 520 },
  { text: "info  - Compilando rotas (App Router)…", dim: true, delayMs: 760 },
  { text: "warn  - Otimizando imagens remotas…", dim: true, delayMs: 620 },
  { text: "info  - Gerando páginas estáticas…", dim: true, delayMs: 820 },
  { text: "info  - Coletando dados do hub…", dim: true, delayMs: 720 },
  { text: "success  - Build concluído", delayMs: 520 },
  { text: "$ pnpm run start sthevan.Dev --open", delayMs: 520 },
  { text: "OK - sistema online", dim: true, delayMs: 520 }
];

function useTerminalTyping(enabled: boolean) {
  const [buffer, setBuffer] = useState<{ line: string; dim?: boolean }[]>([]);

  useEffect(() => {
    if (!enabled) {
      setBuffer([]);
      return;
    }

    let cancelled = false;
    let timeoutId: number | undefined;

    const run = async () => {
      const next: { line: string; dim?: boolean }[] = [];
      setBuffer([]);

      for (const item of TERMINAL_LINES) {
        if (cancelled) return;
        const line = item.text;
        const dim = item.dim;
        const delay = item.delayMs ?? 110;

        let typed = "";
        for (const ch of line) {
          if (cancelled) return;
          typed += ch;
          const preview = [...next, { line: typed, dim }];
          setBuffer(preview);
          await new Promise<void>((r) => {
            timeoutId = window.setTimeout(r, 22);
          });
        }

        next.push({ line, dim });
        setBuffer([...next]);
        await new Promise<void>((r) => {
          timeoutId = window.setTimeout(r, delay);
        });
      }
    };

    void run();

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [enabled]);

  return buffer;
}

function TerminalSplash({ enabled }: { enabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [readyToClose, setReadyToClose] = useState(false);
  const lines = useTerminalTyping(open);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    setReadyToClose(false);
    setOpen(true);

    const t = window.setTimeout(() => setReadyToClose(true), 2600);
    return () => window.clearTimeout(t);
  }, [enabled]);

  useEffect(() => {
    if (!open) return;
    if (!readyToClose) return;
    if (lines.length < TERMINAL_LINES.length) return;

    const t = window.setTimeout(() => setOpen(false), 900);
    return () => window.clearTimeout(t);
  }, [open, readyToClose, lines.length]);

  if (!open) return null;

  return (
    <div className={styles.splash} aria-label="Carregando" role="status">
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.title}>Terminal</span>
        </div>
        <div className={styles.terminalBody}>
          {lines.map((l, idx) => (
            <div key={idx} className={`${styles.line} ${l.dim ? styles.dim : ""}`}>
              {l.line}
              {idx === lines.length - 1 ? <span className={styles.caret} aria-hidden /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TRAIL_LENGTH = 10;

function FancyCursor({ enabled }: { enabled: boolean }) {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);

  const trail = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({
      x: 0,
      y: 0
    }))
  );

  const state = useRef({
    x: 0,
    y: 0,
    visible: false,
    raf: 0
  });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      state.current.x = e.clientX;
      state.current.y = e.clientY;
      state.current.visible = true;
    };

    const leave = () => {
      state.current.visible = false;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      const s = state.current;

      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
        dot.style.opacity = s.visible ? "1" : "0";
      }

      const pts = trail.current;
      pts[0].x += (s.x - pts[0].x) * 0.42;
      pts[0].y += (s.y - pts[0].y) * 0.42;
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.38;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.38;
      }

      const trailEls = trailRefs.current;
      for (let i = 0; i < trailEls.length; i++) {
        const tEl = trailEls[i];
        if (!tEl) continue;
        tEl.style.transform = `translate3d(${pts[i].x}px, ${pts[i].y}px, 0)`;
        tEl.style.opacity = s.visible ? "1" : "0";
      }

      s.raf = window.requestAnimationFrame(tick);
    };

    const s = state.current;
    s.raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(s.raf);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          className={styles.cursorTrailDot}
          ref={(node) => {
            trailRefs.current[i] = node;
          }}
          style={{ "--trailIndex": i } as CSSProperties}
          aria-hidden
        />
      ))}
      <div className={styles.cursorDot} ref={dotRef} aria-hidden />
    </>
  );
}

export function SiteEffects() {
  const reduced = usePrefersReducedMotion();
  const coarse = useIsCoarsePointer();

  const enableCursor = useMemo(() => !reduced && !coarse, [reduced, coarse]);
  const enableSplash = useMemo(() => !reduced, [reduced]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("cursorNone", enableCursor);
    return () => {
      document.body.classList.remove("cursorNone");
    };
  }, [enableCursor]);

  return (
    <>
      <FancyCursor enabled={enableCursor} />
      <TerminalSplash enabled={enableSplash} />
    </>
  );
}
