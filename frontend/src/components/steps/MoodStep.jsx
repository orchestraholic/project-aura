import { MOODS } from "../../data/options.js";

export default function MoodStep({ value, onChange }) {
  const { start, arcEnabled, end } = value;

  function pick(field, id) {
    onChange({ ...value, [field]: id });
  }

  function toggleArc() {
    onChange({ ...value, arcEnabled: !arcEnabled, end: arcEnabled ? null : value.end });
  }

  return (
    <section className="step">
      <div className="step__head">
        <span className="step__eyebrow">Step 02</span>
        <h1 className="step__title">What does it feel like?</h1>
        <p className="step__hint">
          Pick the emotional core of the piece. Each mood is paired with a piece that
          captures it, for reference.
        </p>
      </div>

      <MoodGrid label={arcEnabled ? "Opening mood" : "Mood"} field="start" selected={start} onPick={(id) => pick("start", id)} />

      <label className="arc-toggle">
        <input type="checkbox" checked={arcEnabled} onChange={toggleArc} />
        <span>
          Give it an emotional arc — start in one mood and resolve in another, the way
          Beethoven's Fifth turns from turbulence into triumph.
        </span>
      </label>

      {arcEnabled && (
        <MoodGrid label="Closing mood" field="end" selected={end} onPick={(id) => pick("end", id)} />
      )}
    </section>
  );
}

function MoodGrid({ label, selected, onPick }) {
  return (
    <div className="mood-block">
      <h2 className="mood-block__label">{label}</h2>
      <div className="option-grid option-grid--moods">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            type="button"
            className={"mood-card" + (selected === mood.id ? " is-selected" : "")}
            onClick={() => onPick(mood.id)}
            aria-pressed={selected === mood.id}
          >
            <span className="mood-card__title">{mood.title}</span>
            <span className="mood-card__example">{mood.example}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
