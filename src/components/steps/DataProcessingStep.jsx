import { dataProcessingContent } from "../../data/introData.js";
import { ExternalLink, ShieldCheck } from "lucide-react";

export function DataProcessingStep() {
  const REVOLUT_PRIVACY_URL = "https://www.revolut.com/legal/data-privacy-for-candidates/";
  const HIREVUE_PRIVACY_URL = "https://www.hirevue.com/legal/privacy";

  return (
    <div className="animate-fade-in" style={{ width: "100%", maxWidth: 880, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--color-brand-light)",
            color: "var(--color-brand-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldCheck size={18} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-brand-primary)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Revolut Candidate Assessment
        </span>
      </div>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--color-text-main)", marginBottom: 4, fontFamily: "var(--font-heading)" }}>
        {dataProcessingContent.title}
      </h1>
      <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 20 }}>
        {dataProcessingContent.updated}
      </p>

      <div
        style={{
          fontSize: 14,
          color: "#334155",
          lineHeight: 1.7,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          background: "#ffffff",
          border: "1px solid #E2E8F0",
          borderRadius: 14,
          padding: "24px 28px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        }}
      >
        {dataProcessingContent.paragraphs.map((p, idx) => {
          if (idx === 2) {
            return (
              <p key={idx} style={{ margin: 0 }}>
                The responsible entity for any personal data that is collected, generated and otherwise used as a result of your usage of the Platform and Services is the entity to whom the Candidate submitted an employment application as specified in the respective job posting or the entity through whom Candidate accessed the Platform (i.e. our Client and the "Data Controller"). We collect, use and transfer the Personal Data as the "Data Processor" at the direction of the Data Controller. For more information about how Revolut processes your personal data, please see their Data Privacy Statement for Candidates (accessible{" "}
                <a
                  href={REVOLUT_PRIVACY_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "var(--color-brand-primary)",
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                >
                  here
                </a>
                ).
              </p>
            );
          }
          return <p key={idx} style={{ margin: 0 }}>{p}</p>;
        })}

        <div style={{ marginTop: 12, paddingTop: 18, borderTop: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--color-text-main)", marginBottom: 12, letterSpacing: "0.03em" }}>
            {dataProcessingContent.consentTesting.heading}
          </h3>
          {dataProcessingContent.consentTesting.body.map((p, idx) => (
            <p key={idx} style={{ marginBottom: 12, margin: 0 }}>{p}</p>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, paddingTop: 14, borderTop: "1px solid var(--color-border-subtle)", display: "flex", gap: 20, flexWrap: "wrap" }}>
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
          Revolut Data Privacy Statement for Candidates <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
