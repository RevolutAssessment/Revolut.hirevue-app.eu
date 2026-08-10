export function ProgressBar({ current, total }) {
  const percentage = Math.min(100, Math.max(0, Math.round((current / total) * 100)));

  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <div
        style={{
          width: "100%",
          height: 6,
          background: "#E2E8F0",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: "var(--color-brand-primary)",
            borderRadius: 999,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
