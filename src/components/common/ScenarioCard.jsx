export function ScenarioCard({ title, text, image }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-card)",
        padding: "20px 24px",
        marginBottom: 20,
        boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "var(--color-text-main)",
            marginBottom: 10,
            fontFamily: "var(--font-heading)",
          }}
        >
          {title}
        </h3>
      )}

      {image && (
        <div
          style={{
            width: "100%",
            maxHeight: 200,
            borderRadius: 8,
            overflow: "hidden",
            marginBottom: 14,
          }}
        >
          <img src={image} alt="Scenario illustration" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      <p
        style={{
          fontSize: 14.5,
          color: "var(--color-text-body)",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}
