import { ScenarioCard } from "../common/ScenarioCard.jsx";
import { QNumbered } from "../common/QNumbered.jsx";
import { Dropdown } from "../common/Dropdown.jsx";

export function SJTStep({ item, answer, setAnswer }) {
  const most = answer?.most || "";
  const least = answer?.least || "";

  return (
    <div className="animate-fade-in" style={{ width: "100%", maxWidth: 820, margin: "0 auto" }}>
      <ScenarioCard text={item.scenario} />

      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 24 }}>
        <QNumbered n={1} label="Which statement is MOST like how you would respond?">
          <Dropdown
            placeholder="Select a statement"
            value={most}
            options={item.options}
            onChange={(v) => setAnswer({ ...answer, most: v })}
          />
        </QNumbered>

        <QNumbered n={2} label="Which statement is LEAST like how you would respond?">
          <Dropdown
            placeholder="Select a statement"
            value={least}
            options={item.options}
            onChange={(v) => setAnswer({ ...answer, least: v })}
          />
        </QNumbered>
      </div>
    </div>
  );
}
