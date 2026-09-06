import { useRef, useState } from "react";
import SeatingChart from "../SeatingChart.jsx";
import NumberField from "../NumberField.jsx";
import { SEATING_SECTIONS, sectionTotal } from "../../data/options.js";

const STRINGS = SEATING_SECTIONS.filter((s) => s.kind === "simple");
const GROUPS = SEATING_SECTIONS.filter((s) => s.kind === "group");

export default function InstrumentationStep({ value, onChange }) {
  const [flashId, setFlashId] = useState(null);
  const panelRefs = useRef({});

  const total = SEATING_SECTIONS.reduce(
    (sum, section) => sum + sectionTotal(section, value[section.id]),
    0
  );

  function setSimple(id, v) {
    onChange({ ...value, [id]: v });
  }

  function setGroupInstrument(sectionId, instrumentId, v) {
    onChange({ ...value, [sectionId]: { ...value[sectionId], [instrumentId]: v } });
  }

  function focusSection(id) {
    panelRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setFlashId(id);
    window.setTimeout(() => setFlashId((current) => (current === id ? null : current)), 900);
  }

  return (
    <section className="step">
      <div className="step__head">
        <span className="step__eyebrow">Step 04</span>
        <h1 className="step__title">Who's in the room?</h1>
        <p className="step__hint">
          Fill in how many of each instrument are on stage. Leave one at zero to leave
          it out entirely.
        </p>
      </div>

      <SeatingChart
        sections={SEATING_SECTIONS}
        value={value}
        total={total}
        activeId={flashId}
        onSelect={focusSection}
      />

      <div className="seating-panels">
        <div className="seating-panel">
          <div className="seating-panel__head">
            <h2 className="seating-panel__title">Strings</h2>
            <span className="seating-panel__total">
              {STRINGS.reduce((sum, s) => sum + sectionTotal(s, value[s.id]), 0)} players
            </span>
          </div>
          <div className="seating-panel__row">
            {STRINGS.map((section) => (
              <div
                key={section.id}
                ref={(el) => (panelRefs.current[section.id] = el)}
                className={"seating-panel__field" + (flashId === section.id ? " is-flashed" : "")}
              >
                <NumberField
                  label={section.label}
                  value={value[section.id]}
                  onChange={(v) => setSimple(section.id, v)}
                />
              </div>
            ))}
          </div>
        </div>

        {GROUPS.map((section) => (
          <div
            key={section.id}
            ref={(el) => (panelRefs.current[section.id] = el)}
            className={"seating-panel" + (flashId === section.id ? " is-flashed" : "")}
          >
            <div className="seating-panel__head">
              <h2 className="seating-panel__title">{section.label}</h2>
              <span className="seating-panel__total">
                {sectionTotal(section, value[section.id])} players
              </span>
            </div>
            <div className="seating-panel__row">
              {section.instruments.map((inst) => (
                <NumberField
                  key={inst.id}
                  label={inst.label}
                  value={value[section.id][inst.id]}
                  onChange={(v) => setGroupInstrument(section.id, inst.id, v)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
