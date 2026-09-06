import { LEVELS } from "../../data/options.js";

export default function LevelStep({ value, onChange }) {
  return (
    <section className="step">
      <div className="step__head">
        <span className="step__eyebrow">Step 01</span>
        <h1 className="step__title">Who's playing this?</h1>
        <p className="step__hint">
          Choose the ensemble this piece is written for. This sets the technical ceiling —
          range, rhythmic complexity, and how much is left to chance.
        </p>
      </div>

      <div className="option-grid option-grid--levels">
        {LEVELS.map((level) => (
          <button
            key={level.id}
            type="button"
            className={"option-card" + (value === level.id ? " is-selected" : "")}
            onClick={() => onChange(level.id)}
            aria-pressed={value === level.id}
          >
            <span className="option-card__title">{level.title}</span>
            <span className="option-card__tagline">{level.tagline}</span>
            <span className="option-card__desc">{level.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
