import { useRef, useEffect } from "react";
import { Check } from "lucide-react";

export function MonitoringConsentStep({ agreed, setAgreed, stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.play().catch((err) => {
        console.warn("Video play error in MonitoringConsentStep:", err);
      });
    }
  }, [stream]);

  return (
    <div className="animate-fade-in" style={{ width: "100%", maxWidth: 760, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text-main)", marginBottom: 10, fontFamily: "var(--font-heading)", textAlign: "center" }}>
        Your test requires monitoring
      </h1>

      <p style={{ fontSize: 13.5, color: "#475467", lineHeight: 1.6, textAlign: "center", marginBottom: 20, maxWidth: 620, margin: "0 auto 20px auto" }}>
        To monitor your test you will need to activate your webcam. Images will be captured at random points throughout your experience. You will see a thumbnail of the image being captured.
      </p>

      {/* Center Camera Preview Container */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
        <div
          style={{
            width: 220,
            height: 160,
            background: "#0F172A",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #334155",
            boxShadow: "0 8px 20px rgba(15,23,42,0.18)",
            marginBottom: 8,
          }}
        >
          {stream ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", fontSize: 12 }}>
              Camera Active
            </div>
          )}
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#475467" }}>
          Can you see yourself? Please ensure that you are facing the camera.
        </div>
      </div>

      {/* Activity Monitoring Checkboxes */}
      <div style={{ marginBottom: 22 }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "var(--color-text-main)", marginBottom: 12, letterSpacing: "0.02em" }}>
          Activity monitoring
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "Copy and paste actions will not be permitted on written answer questions.",
            "Browser visibility and focus will be captured.",
            "Monitoring data is available for review by a human. AI is not used for this purpose.",
          ].map((text, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#334155" }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: "var(--color-brand-primary)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Check size={13} strokeWidth={3} />
              </div>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Agreement Checkbox Card */}
      <div
        onClick={() => setAgreed(!agreed)}
        style={{
          border: agreed ? "2px solid var(--color-brand-primary)" : "1px solid #CBD5E1",
          background: agreed ? "var(--color-brand-light)" : "#FFFFFF",
          borderRadius: 12,
          padding: "16px 18px",
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      >
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          style={{ width: 18, height: 18, accentColor: "var(--color-brand-primary)", cursor: "pointer", marginTop: 2 }}
        />
        <p style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.6, margin: 0 }}>
          As part of our commitment to a fair and consistent hiring process, this assessment includes measures to ensure the integrity of candidate responses. During this session, your activity may be monitored—including browser focus and interaction patterns—and your device camera may be accessed at intervals for identity verification. Please note that certain actions, such as copy and paste, are restricted. By proceeding, you confirm that all responses are your own, reflect your personal experience, and are completed without external assistance or AI tools. Please be aware that any suspected breach of these guidelines may impact your application.
        </p>
      </div>
    </div>
  );
}
