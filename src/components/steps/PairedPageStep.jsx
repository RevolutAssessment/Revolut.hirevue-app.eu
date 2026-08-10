function PairedPairBlock({ item, answer, onChange }) {
  const cell = (key, label) => {
    const active = answer === key;
    return (
      <button
        type="button"
        onClick={() => onChange(key)}
        style={{
          border: "none",
          flex: 1,
          padding: "13px 6px",
          fontSize: 13.5,
          cursor: "pointer",
          background: active ? "var(--color-brand-primary)" : "#EFEEE9",
          color: active ? "#ffffff" : "#374151",
          fontWeight: active ? 600 : 400,
          transition: "all 0.12s ease",
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          border: "1px solid #E2DFD5",
          borderRadius: 8,
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ padding: "18px 16px", borderRight: "1px solid #E2DFD5", textAlign: "center", fontSize: 14, color: "#23272E", fontWeight: 500 }}>
          {item.a}
        </div>
        <div style={{ padding: "18px 16px", textAlign: "center", fontSize: 14, color: "#23272E", fontWeight: 500 }}>
          {item.b}
        </div>
        <div
          style={{
            gridColumn: "1 / span 2",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "#9CA3AF",
            padding: "3px 0",
            borderTop: "1px solid #E2DFD5",
            borderBottom: "1px solid #E2DFD5",
            background: "#FAF9F6",
          }}
        >
          OR
        </div>
        <div style={{ display: "flex", borderRight: "1px solid #E2DFD5" }}>
          {cell("mostA", "Most")}
          {cell("somewhatA", "Somewhat")}
        </div>
        <div style={{ display: "flex" }}>
          {cell("somewhatB", "Somewhat")}
          {cell("mostB", "Most")}
        </div>
      </div>
      <p style={{ textAlign: "center", fontSize: 12, fontStyle: "italic", color: "#6B7280", marginTop: 6 }}>
        like me
      </p>
    </div>
  );
}

export function PairedPageStep({ items, answer, setAnswer }) {
  const vals = answer || {};
  return (
    <div className="animate-fade-in">
      <p style={{ fontSize: 14, color: "#6B7280", textAlign: "center", marginBottom: 22, fontWeight: 500 }}>
        For each pair of statements, select which option is more like you.
      </p>
      <div style={{ maxHeight: 480, overflowY: "auto", paddingRight: 6 }}>
        {items.map((item) => (
          <PairedPairBlock
            key={item.id}
            item={item}
            answer={vals[item.id]}
            onChange={(val) => setAnswer({ ...vals, [item.id]: val })}
          />
        ))}
      </div>
    </div>
  );
}
