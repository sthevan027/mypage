export default function Loading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24
      }}
      aria-label="Carregando"
      role="status"
    >
      <div
        style={{
          width: "min(720px, 100%)",
          borderRadius: 18,
          border: "1px solid rgba(142, 168, 226, 0.16)",
          boxShadow: "0 28px 90px rgba(0, 0, 0, 0.62)",
          background: "rgba(10, 12, 18, 0.78)",
          backdropFilter: "blur(14px)",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 14px",
            borderBottom: "1px solid rgba(142, 168, 226, 0.12)",
            background: "rgba(22, 27, 34, 0.6)"
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "rgba(255, 163, 60, 0.7)"
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "rgba(34, 197, 94, 0.7)"
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "rgba(59, 130, 246, 0.7)"
            }}
          />
          <span
            style={{
              marginLeft: 10,
              fontSize: 13,
              color: "rgba(238, 243, 255, 0.74)",
              letterSpacing: "0.02em"
            }}
          >
            Terminal
          </span>
        </div>
        <div
          style={{
            padding: "16px 18px 18px",
            fontFamily:
              "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            fontSize: 14,
            lineHeight: 1.55,
            color: "rgba(238, 243, 255, 0.92)"
          }}
        >
          <div style={{ color: "rgba(238, 243, 255, 0.92)" }}>$ carregando rota…</div>
          <div style={{ color: "rgba(238, 243, 255, 0.7)" }}>aguarde</div>
        </div>
      </div>
    </main>
  );
}
