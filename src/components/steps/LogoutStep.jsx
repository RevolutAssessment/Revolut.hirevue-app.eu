export function LogoutStep() {
  return (
    <div className="animate-fade-in" style={{ padding: "60px 20px", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          background: "#F8FAFC",
          border: "1px solid #E2E8F0",
          borderRadius: 12,
          padding: "48px 36px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", marginBottom: 16, fontFamily: "var(--font-heading)" }}>
          You have been logged out
        </h1>

        <p style={{ fontSize: 14, color: "#475467", lineHeight: 1.6 }}>
          To continue with your experience, please navigate back to your invitation email and follow the link again to pick up where you left off.
        </p>
      </div>
    </div>
  );
}
