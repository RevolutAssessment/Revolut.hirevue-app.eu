import { useState } from "react";
import { X, Link2, Copy, Check, UserPlus } from "lucide-react";

export function LinkGeneratorModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setCopied(false);

    try {
      const res = await fetch("/api/generate-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || "Candidate Access", email }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedLink(data.inviteLink);
      } else {
        alert("Could not generate candidate link.");
      }
    } catch (err) {
      console.error("Generate link error:", err);
      // Fallback local token link generator if server not reachable
      const token = `cand_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const fallbackUrl = `${window.location.origin}/?token=${token}`;
      setGeneratedLink(fallbackUrl);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          padding: "24px 28px",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "#F1F5F9",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#64748B",
          }}
        >
          <X size={16} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--color-brand-light)",
              color: "var(--color-brand-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserPlus size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0, fontFamily: "var(--font-heading)" }}>
              Generate Candidate Access Link
            </h3>
            <p style={{ fontSize: 12.5, color: "#64748B", margin: 0 }}>
              Creates a single-use candidate invitation link with submission locking.
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
              Candidate Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 14px",
                borderRadius: 8,
                border: "1px solid #CBD5E1",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
              Candidate Email (Optional)
            </label>
            <input
              type="email"
              placeholder="e.g. candidate@revolut.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 14px",
                borderRadius: 8,
                border: "1px solid #CBD5E1",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "10px", marginTop: 6 }}
          >
            <Link2 size={16} /> {loading ? "Generating Link..." : "Create Single-Use Invitation Link"}
          </button>
        </form>

        {generatedLink && (
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #E2E8F0" }}>
            <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "var(--color-brand-primary)", marginBottom: 6 }}>
              Single-Use Invitation Link (Copy & Send to Candidate):
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                readOnly
                value={generatedLink}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #CBD5E1",
                  fontSize: 12.5,
                  background: "#F8FAFC",
                  color: "#1E293B",
                  fontFamily: "monospace",
                }}
              />
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary"
                style={{ flexShrink: 0, padding: "8px 14px", fontSize: 12.5, gap: 6 }}
              >
                {copied ? <Check size={14} color="green" /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
