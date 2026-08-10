import { disclaimerContent } from "../../data/introData.js";
import { ExternalLink } from "lucide-react";

export function DisclaimerStep() {
  const HIREVUE_PRIVACY_URL = "https://www.hirevue.com/legal/privacy";
  const REVOLUT_PRIVACY_URL = "https://www.revolut.com/legal/data-privacy-for-candidates/";

  return (
    <div className="animate-fade-in" style={{ width: "100%", maxWidth: 880, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text-main)", marginBottom: 16, fontFamily: "var(--font-heading)" }}>
        {disclaimerContent.title}
      </h1>

      <p style={{ fontSize: 14.5, color: "#374151", lineHeight: 1.75, marginBottom: 32 }}>
        {disclaimerContent.body}
      </p>

      <div style={{ paddingTop: 16, borderTop: "1px solid var(--color-border-subtle)", display: "flex", gap: 20, flexWrap: "wrap" }}>
        <a
          href={HIREVUE_PRIVACY_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--color-brand-primary)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          HireVue Privacy Policy <ExternalLink size={14} />
        </a>

        <a
          href={REVOLUT_PRIVACY_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--color-brand-primary)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Revolut Data Privacy Statement <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
