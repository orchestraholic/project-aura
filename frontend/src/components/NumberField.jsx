export default function NumberField({ label, value, onChange, max = 20 }) {
  const num = Number(value) || 0;

  function set(next) {
    const clamped = Math.max(0, Math.min(max, next));
    onChange(clamped === 0 ? "" : String(clamped));
  }

  return (
    <div className={"number-field" + (num > 0 ? " has-value" : "")}>
      <span className="number-field__label">{label}</span>
      <div className="number-field__control">
        <button
          type="button"
          className="number-field__btn"
          onClick={() => set(num - 1)}
          disabled={num <= 0}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <input
          type="text"
          inputMode="numeric"
          className="number-field__input"
          placeholder="0"
          value={value}
          onChange={(e) => set(Number(e.target.value.replace(/[^\d]/g, "").slice(0, 2)) || 0)}
          aria-label={label}
        />
        <button
          type="button"
          className="number-field__btn"
          onClick={() => set(num + 1)}
          disabled={num >= max}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
