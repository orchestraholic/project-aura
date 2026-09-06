import { useMemo, useState } from "react";
import LevelStep from "./components/steps/LevelStep.jsx";
import MoodStep from "./components/steps/MoodStep.jsx";
import PeriodStep from "./components/steps/PeriodStep.jsx";
import InstrumentationStep from "./components/steps/InstrumentationStep.jsx";
import { SEATING_SECTIONS, emptySeating, sectionTotal } from "./data/options.js";

const STEPS = [
  { id: "level", label: "Level" },
  { id: "mood", label: "Mood" },
  { id: "period", label: "Period" },
  { id: "instrumentation", label: "Instrumentation" },
];

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selection, setSelection] = useState({
    level: null,
    mood: { start: null, arcEnabled: false, end: null },
    period: null,
    seating: emptySeating(),
  });

  const canAdvance = useMemo(() => {
    switch (STEPS[stepIndex].id) {
      case "level":
        return Boolean(selection.level);
      case "mood":
        return Boolean(selection.mood.start) && (!selection.mood.arcEnabled || Boolean(selection.mood.end));
      case "period":
        return Boolean(selection.period);
      case "instrumentation":
        return SEATING_SECTIONS.some(
          (section) => sectionTotal(section, selection.seating[section.id]) > 0
        );
      default:
        return false;
    }
  }, [stepIndex, selection]);

  const isLast = stepIndex === STEPS.length - 1;

  function goTo(index) {
    if (index < 0 || index >= STEPS.length) return;
    if (index > stepIndex + 1) return;
    if (index > stepIndex && !canAdvance) return;
    setStepIndex(index);
  }

  function handleGenerate() {
    console.log("Composition brief:", selection);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__mark" aria-hidden="true">
          {/* title placeholder — added later */}
        </div>
        <nav className="step-tracker" aria-label="Progress">
          {STEPS.map((step, i) => (
            <button
              key={step.id}
              type="button"
              className={
                "step-tracker__item" +
                (i === stepIndex ? " is-active" : "") +
                (i < stepIndex ? " is-done" : "")
              }
              onClick={() => goTo(i)}
              disabled={i > stepIndex + 1 || (i === stepIndex + 1 && !canAdvance)}
            >
              <span className="step-tracker__index">{String(i + 1).padStart(2, "0")}</span>
              <span className="step-tracker__label">{step.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="wizard">
        {STEPS[stepIndex].id === "level" && (
          <LevelStep
            value={selection.level}
            onChange={(level) => setSelection((s) => ({ ...s, level }))}
          />
        )}
        {STEPS[stepIndex].id === "mood" && (
          <MoodStep
            value={selection.mood}
            onChange={(mood) => setSelection((s) => ({ ...s, mood }))}
          />
        )}
        {STEPS[stepIndex].id === "period" && (
          <PeriodStep
            value={selection.period}
            onChange={(period) => setSelection((s) => ({ ...s, period }))}
          />
        )}
        {STEPS[stepIndex].id === "instrumentation" && (
          <InstrumentationStep
            value={selection.seating}
            onChange={(seating) => setSelection((s) => ({ ...s, seating }))}
          />
        )}
      </main>

      <footer className="wizard-controls">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => goTo(stepIndex - 1)}
          disabled={stepIndex === 0}
        >
          Back
        </button>
        {!isLast ? (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => goTo(stepIndex + 1)}
            disabled={!canAdvance}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleGenerate}
            disabled={!canAdvance}
          >
            Generate
          </button>
        )}
      </footer>
    </div>
  );
}
