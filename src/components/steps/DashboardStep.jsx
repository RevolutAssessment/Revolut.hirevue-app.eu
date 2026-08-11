 import { useState, useEffect } from "react";
    import { Video, CheckCircle2 } from "lucide-react";

    export function DashboardStep({ submitted, onContinue }) {
      const [countdown, setCountdown] = useState(5);
      const redirectUrl = "https://www.revolut.com/en-IN/careers/";

      useEffect(() => {
        if (!submitted) return;

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              window.location.href = redirectUrl;
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      }, [submitted]);

      return (
        <div className="animate-fade-in" style={{ width: "100%", maxWidth: 860, margin: "0 auto" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", marginBottom: 20, fontFamily: "var(--font-heading)" }}>
            Your opportunity at Revolut
          </h1>

          {submitted && (
            <div
              style={{
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: 12,
                padding: "14px 20px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justify: "space-between",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle2 size={20} color="#2563EB" />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1E3A8A" }}>
                  Assessment Completed & Submitted.
                </span>
              </div>

              <div style={{ fontSize: 13, fontWeight: 700, color: "#2563EB" }}>
                Redirecting to Revolut Careers in {countdown}s…
              </div>
            </div>
          )}

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #E2E8F0",
              borderRadius: 14,
              padding: "24px 28px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            }}
          >
            {/* Row 1: On-Demand Web/Video Section 1 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justify: "space-between",
                paddingBottom: 20,
                marginBottom: 20,
                borderBottom: "1px solid #F1F5F9",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#F1F5F9",
                    color: "#475467",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Video size={18} />
                </div>

                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1E293B" }}>
                    On-Demand - Web/Video
                  </div>
                  <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
                    {submitted ? "Complete" : "In Progress"}
                  </div>
                </div>
              </div>

              <div>
                {submitted ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--color-success)", fontSize: 13.5, fontWeight: 700 }}>
                    <CheckCircle2 size={16} /> Complete
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onContinue}
                    className="btn-primary"
                    style={{ padding: "9px 20px", fontSize: 13.5 }}
                  >
                    Continue &gt;
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: On-Demand Web/Video Section 2 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justify: "space-between",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#F1F5F9",
                    color: "#475467",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Video size={18} />
                </div>

                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1E293B" }}>
                    On-Demand - Web/Video
                  </div>
                  <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
                    {submitted ? "Complete" : "In Progress"}
                  </div>
                </div>
              </div>

              <div>
                {submitted ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--color-success)", fontSize: 13.5, fontWeight: 700 }}>
                    <CheckCircle2 size={16} /> Complete
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onContinue}
                    className="btn-primary"
                    style={{ padding: "9px 20px", fontSize: 13.5 }}
                  >
                    Continue &gt;
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
