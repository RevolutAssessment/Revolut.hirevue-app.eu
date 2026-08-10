export function IntroStep({ page }) {
  return (
    <div className="animate-fade-in">
      <h2
        style={{
          fontSize: 24,
          color: "var(--color-text-main)",
          marginBottom: 18,
          fontWeight: 800,
          fontFamily: "var(--font-heading)",
        }}
      >
        {page.title}
      </h2>
      {page.body.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize: 15,
            color: "var(--color-text-body)",
            lineHeight: 1.7,
            marginBottom: 16,
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}
