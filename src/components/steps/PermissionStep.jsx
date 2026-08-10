import { useEffect } from "react";
import { Video, CheckCircle2 } from "lucide-react";

export function PermissionStep({ stream, streamStatus, onRequest, onNext }) {
  useEffect(() => {
    if (stream && onNext) {
      // Camera & mic access granted
    }
  }, [stream, onNext]);

  return (
    <div className="animate-fade-in" style={{ width: "100%", maxWidth: 640, margin: "40px auto", textAlign: "center" }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "var(--color-brand-light)",
          color: "var(--color-brand-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px auto",
        }}
      >
        <Video size={28} />
      </div>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--color-text-main)", marginBottom: 12, fontFamily: "var(--font-heading)" }}>
        Permission to Record
      </h1>

      <p style={{ fontSize: 14.5, color: "#6B7280", lineHeight: 1.6, marginBottom: 28, maxWidth: 480, margin: "0 auto 28px auto" }}>
        Permission to access your camera and microphone is required before continuing. Please click the button below to grant access.
      </p>

      {!stream && (
        <button
          type="button"
          onClick={onRequest}
          disabled={streamStatus === "requesting"}
          className="btn-primary"
          style={{ padding: "13px 32px", fontSize: 15 }}
        >
          <Video size={18} />
          {streamStatus === "requesting"
            ? "Requesting Permission…"
            : "Request Permission"}
        </button>
      )}

      {stream && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-success)", fontSize: 14.5, fontWeight: 700, background: "var(--color-success-bg)", padding: "12px 20px", borderRadius: 10 }}>
          <CheckCircle2 size={20} /> Camera and microphone access granted! Click Continue to proceed.
        </div>
      )}

      {streamStatus === "denied" && (
        <div style={{ marginTop: 20, color: "var(--color-danger)", background: "var(--color-danger-bg)", border: "1px solid #F5C2C0", borderRadius: 10, padding: "12px 18px", fontSize: 13.5, maxWidth: 480, margin: "20px auto 0 auto" }}>
          Permission was denied. Please click the camera/lock icon in your browser address bar to allow camera and microphone access, then click <strong>Request Permission</strong> again.
        </div>
      )}
    </div>
  );
}
