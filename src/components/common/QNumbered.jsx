export function QNumbered({ index, n, text, label, children }) {
  const num = index ?? n;
  const title = text ?? label;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 10 }}>
        {typeof num === "number" && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--color-brand-light)",
              color: "var(--color-brand-primary)",
              fontSize: 14,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontFamily: "var(--font-heading)",
            }}
          >
            {num}
          </div>
        )}
        {title && (
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--color-text-main)",
              lineHeight: 1.5,
              fontFamily: "var(--font-heading)",
              paddingTop: 4,
            }}
          >
            {title}
          </div>
        )}
      </div>

      {children && (
        <div style={{ paddingLeft: typeof num === "number" ? 46 : 0 }}>
          {children}
        </div>
      )}
    </div>
  );
}
