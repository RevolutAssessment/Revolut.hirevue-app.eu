 import { X, Clock, Save } from "lucide-react";

    export function FinishLaterModal({ isOpen, onClose, onSaveAndExit }) {
      if (!isOpen) return null;

      return (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            className="animate-fade-in"
            style={{
              width: "100%",
              maxWidth: 480,
              background: "#ffffff",
              borderRadius: 20,
              padding: "28px 32px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "transparent",
                border: "none",
                color: "#94A3B8",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "var(--color-brand-light)",
                  color: "var(--color-brand-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Clock size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--color-text-main)", margin: 0, fontFamily: "var(--font-heading)" }}>
                  Finish Later?
                </h3>
                <p style={{ fontSize: 13, color: "var(--color-text-muted)", margin: 0 }}>
                  Your progress will be saved securely on this device.
                </p>
              </div>
            </div>

            <p style={{ fontSize: 14, color: "#475467", lineHeight: 1.6, marginBottom: 24 }}>
              You will be redirected back to Revolut Careers. All your completed answers will be preserved, and you can resume anytime using your
  assessment link.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "10px 18px", fontSize: 13.5 }}>
                Continue Assessment
              </button>
              <button onClick={onSaveAndExit} className="btn-primary" style={{ padding: "10px 20px", fontSize: 13.5 }}>
                <Save size={15} /> Save & Exit
              </button>
            </div>
          </div>
        </div>
      );
    }
