import { Dropdown } from "../common/Dropdown.jsx";
import { Send } from "lucide-react";

export function FeedbackStep({ answer, setAnswer, onSkip, onSubmit }) {
  const responses = answer?.responses || {};
  const comments = answer?.comments || "";

  const options = ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"];

  const statements = [
    {
      id: "q1",
      label: "The information presented when I started the experience was useful to me.",
    },
    {
      id: "q2",
      label: "Having participated in the experience, I am better equipped to determine if the role is right for me.",
    },
    {
      id: "q3",
      label: "The experience provided me with a better understanding of the role.",
    },
    {
      id: "q4",
      label: "Based on my experience, I would gladly tell my friends about employment opportunities at this company.",
    },
  ];

  function handleSelect(id, val) {
    const updated = { ...responses, [id]: val };
    setAnswer({ ...answer, responses: updated });
  }

  function handleComments(c) {
    setAnswer({ ...answer, comments: c });
  }

  return (
    <div className="animate-fade-in" style={{ width: "100%", maxWidth: 820, margin: "0 auto" }}>
      {/* Step Header */}
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--color-text-main)", marginBottom: 8, fontFamily: "var(--font-heading)" }}>
        Share Your Feedback!
      </h1>
      <p style={{ fontSize: 14, color: "#475467", lineHeight: 1.6, marginBottom: 24, maxWidth: 720 }}>
        We'd like to hear what you think about your experience. Your optional candid feedback will help us refine our process and will in no way impact your status as a candidate.
      </p>

      {/* Main Feedback Form Card */}
      <div style={{ background: "#ffffff", border: "1px solid #E2E8F0", borderRadius: 14, padding: "24px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#334155", marginBottom: 20 }}>
          Agree or disagree with the following statements.
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {statements.map((s) => (
            <div key={s.id}>
              <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "#1E293B", marginBottom: 8 }}>
                {s.label}
              </label>
              <Dropdown
                placeholder="Select an option…"
                value={responses[s.id] || ""}
                options={options}
                onChange={(val) => handleSelect(s.id, val)}
              />
            </div>
          ))}

          <div style={{ paddingTop: 6 }}>
            <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "#1E293B", marginBottom: 8 }}>
              Please provide any additional comments you wish to share about the experience.
            </label>
            <textarea
              value={comments}
              onChange={(e) => handleComments(e.target.value)}
              rows={4}
              placeholder="Enter your comments here…"
              style={{
                width: "100%",
                border: "1px solid #CBD5E1",
                borderRadius: 8,
                padding: "12px 14px",
                fontSize: 13.5,
                color: "#1E293B",
                fontFamily: "inherit",
                resize: "vertical",
                background: "#ffffff",
              }}
            />
          </div>
        </div>

        {/* Footer Actions inside Card matching image */}
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-start", marginTop: 24, paddingTop: 18, borderTop: "1px solid #F1F5F9" }}>
          <button type="button" onClick={onSkip} className="btn-secondary" style={{ padding: "10px 22px", fontSize: 13.5 }}>
            Skip
          </button>
          <button type="button" onClick={onSubmit} className="btn-primary" style={{ padding: "10px 24px", fontSize: 13.5 }}>
            <Send size={15} /> Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
