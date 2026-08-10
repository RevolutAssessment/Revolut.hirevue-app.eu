import { ScenarioCard } from "../common/ScenarioCard.jsx";
import { Check } from "lucide-react";

export function ScaleListStep({ item, answer, setAnswer }) {
  return (
    <div className="animate-fade-in">
      <ScenarioCard text={item.question} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {item.options.map((opt) => {
          const isSelected = answer === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setAnswer(opt)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                position: "relative",
                border: isSelected ? "2px solid var(--color-brand-primary)" : "1px solid #D7D3C7",
                background: isSelected ? "var(--color-brand-light)" : "#ffffff",
                borderRadius: 8,
                padding: "14px 44px 14px 44px",
                fontSize: 14.5,
                fontWeight: isSelected ? 600 : 400,
                cursor: "pointer",
                color: isSelected ? "var(--color-brand-primary)" : "#23272E",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ textAlign: "center", width: "100%" }}>{opt}</span>
              {isSelected && (
                <Check
                  size={18}
                  color="var(--color-brand-primary)"
                  style={{ position: "absolute", right: 18 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
