
    import { useEffect, useState } from "react";

    export function LogoutStep() {
      const [countdown, setCountdown] = useState(5);
      const redirectUrl = "https://www.revolut.com/en-IN/careers/";

      // Auto-redirect to Revolut Careers in the SAME tab after 5 seconds with live countdown
      useEffect(() => {
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
      }, []);

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

            <p style={{ fontSize: 14, color: "#475467", lineHeight: 1.6, marginBottom: 14 }}>
              Your assessment progress has been saved.
            </p>

            <p style={{ fontSize: 14.5, color: "#475467", lineHeight: 1.6, marginBottom: 20 }}>
              We are returning you back to the applicant tracking system in{" "}
              <strong style={{ color: "#2563EB", fontSize: 16 }}>{countdown} seconds</strong>…
            </p>

            <div>
              <a
                href={redirectUrl}
                target="_self"
                style={{
                  fontSize: 13.5,
                  color: "var(--color-brand-primary)",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                If you are not redirected automatically, redirect now &gt;
              </a>
            </div>
          </div>
        </div>
      );
    }
