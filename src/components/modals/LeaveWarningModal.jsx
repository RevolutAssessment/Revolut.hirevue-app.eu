   import { X, AlertCircle } from "lucide-react";

    export function LeaveWarningModal({ isOpen, onResume }) {
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
              onClick={onResume}
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
                  background: "#F1F5F9",
                  color: "#1E293B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AlertCircle size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0, fontFamily: "var(--font-heading)" }}>
                  Please Complete Section First
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                  Session in progress
                </p>
              </div>
            </div>

            <p style={{ fontSize: 14, color: "#475467", lineHeight: 1.6, marginBottom: 24 }}>
              Please complete all questions in this section first before exiting or going back.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button onClick={onResume} className="btn-primary" style={{ padding: "10px 22px", fontSize: 13.5 }}>
                OK
              </button>
            </div>
          </div>
        </div>
      );
    }

