import { aiBiasInfoContent } from "../../data/introData.js";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function AIConsentStep({ consent, setConsent, onNext }) {
  function handleConsent(val) {
    setConsent(val);
    if (val === true && onNext) {
      onNext();
    }
  }

  return (
    <div className="animate-fade-in" style={{ width: "100%", maxWidth: 860, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text-main)", marginBottom: 14, fontFamily: "var(--font-heading)", lineHeight: 1.3 }}>
        {aiBiasInfoContent.title}
      </h1>

      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, marginBottom: 20 }}>
        {aiBiasInfoContent.intro}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 24 }}>
        {aiBiasInfoContent.bullets.map((b, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <CheckCircle2 size={20} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--color-text-main)", marginBottom: 3 }}>
                {b.title}
              </div>
              <div style={{ fontSize: 13.5, color: "#4B5563", lineHeight: 1.55 }}>
                {b.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 20, marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--color-text-main)", marginBottom: 14 }}>
          {aiBiasInfoContent.aiScoredDetails.heading}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {aiBiasInfoContent.aiScoredDetails.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <CheckCircle2 size={18} color="#6B7280" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--color-text-main)" }}>
                  {b.title}:{" "}
                </span>
                <span style={{ fontSize: 13.5, color: "#4B5563", lineHeight: 1.5 }}>
                  {b.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 14.5, fontWeight: 700, color: "var(--color-text-main)", marginBottom: 16 }}>
          {aiBiasInfoContent.question}
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: consent === false ? 16 : 0 }}>
          <button
            type="button"
            onClick={() => handleConsent(true)}
            className="btn-primary"
            style={{
              padding: "11px 28px",
              background: consent === true ? "var(--color-brand-primary)" : "#1B4FD6",
              boxShadow: "0 4px 14px rgba(27,79,214,0.25)",
            }}
          >
            Yes, I Consent
          </button>
          <button
            type="button"
            onClick={() => handleConsent(false)}
            className="btn-secondary"
            style={{
              padding: "11px 22px",
              background: consent === false ? "#FEE2E2" : "#ffffff",
              color: consent === false ? "#DC2626" : "inherit",
              border: consent === false ? "1px solid #FCA5A5" : "1px solid #E2E8F0",
            }}
          >
            I do not consent
          </button>
        </div>

        {consent === false && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 8, padding: "10px 16px", fontSize: 13, fontWeight: 600 }}>
            <AlertCircle size={16} /> Consent is required to continue with this AI-assisted assessment. Please select "Yes, I Consent" to proceed.
          </div>
        )}
      </div>
    </div>
  );
}
