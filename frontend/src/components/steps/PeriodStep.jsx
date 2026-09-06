import { PERIODS } from "../../data/options.js";

export default function PeriodStep({ value, onChange }) {
  return (
    <section className="step">
      <div className="step__head">
        <span className="step__eyebrow">Step 03</span>
        <h1 className="step__title">Whose language does it speak?</h1>
        <p className="step__hint">
          Choose an era and compositional voice. This shapes harmony, form, and
          orchestration more than any other choice.
        </p>
      </div>

      <div className="option-grid option-grid--periods">
        {PERIODS.map((period) => (
          <button
            key={period.id}
            type="button"
            className={"period-card" + (value === period.id ? " is-selected" : "")}
            onClick={() => onChange(period.id)}
            aria-pressed={value === period.id}
          >
            <div className="period-card__head">
              <span className="period-card__title">{period.title}</span>
              <span className="period-card__range">{period.range}</span>
            </div>
            <span className="period-card__voice">{period.voice}</span>
            <span className="period-card__detail">{period.detail}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
