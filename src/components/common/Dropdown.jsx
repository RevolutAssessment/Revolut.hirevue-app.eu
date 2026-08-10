import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export function Dropdown({ value, options = [], placeholder = "Select an option…", onChange, label }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize options array to handle both plain strings and { value, label } objects
  const normalizedOptions = options.map((opt, index) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }
    if (typeof opt === "object" && opt !== null) {
      return {
        value: opt.value ?? opt.label ?? String(index),
        label: opt.label ?? opt.value ?? String(index),
      };
    }
    return { value: String(opt), label: String(opt) };
  });

  const selectedOption = normalizedOptions.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", textAlign: "left" }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 700,
            color: "var(--color-text-main)",
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "12px 16px",
          background: "#ffffff",
          border: open ? "1.5px solid var(--color-brand-primary)" : "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-card)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 13.5,
          color: selectedOption ? "var(--color-text-main)" : "var(--color-text-muted)",
          cursor: "pointer",
          boxShadow: open ? "0 0 0 3px rgba(27,79,214,0.12)" : "none",
          transition: "all 0.15s ease",
        }}
      >
        <span style={{ fontWeight: selectedOption ? 600 : 400, flex: 1, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", textAlign: "left" }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          color="var(--color-text-muted)"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 999,
            background: "#ffffff",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-card)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.14)",
            maxHeight: 280,
            overflowY: "auto",
            padding: "6px 0",
          }}
        >
          {normalizedOptions.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                style={{
                  padding: "10px 16px",
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: isSelected ? "var(--color-brand-primary)" : "var(--color-text-main)",
                  fontWeight: isSelected ? 700 : 400,
                  background: isSelected ? "var(--color-brand-light)" : "transparent",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "#F8FAFC";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ flex: 1 }}>{option.label}</span>
                {isSelected && <Check size={16} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: 2 }} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
