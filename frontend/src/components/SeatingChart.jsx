import { sectionTotal } from "../data/options.js";

const CX = 310;
const CY = 280;
const R_CONDUCTOR = 40;
const RADII = {
  strings: [52, 168],
  winds: [168, 222],
  percussion: [222, 268],
};
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function wedgePath(rInner, rOuter, startAngle, endAngle) {
  const p1 = polarToCartesian(CX, CY, rOuter, startAngle);
  const p2 = polarToCartesian(CX, CY, rOuter, endAngle);
  const p3 = polarToCartesian(CX, CY, rInner, endAngle);
  const p4 = polarToCartesian(CX, CY, rInner, startAngle);
  const largeArc = startAngle - endAngle > 180 ? 1 : 0;
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
}

function labelArcPath(radius, startAngle, endAngle) {
  const p1 = polarToCartesian(CX, CY, radius, startAngle);
  const p2 = polarToCartesian(CX, CY, radius, endAngle);
  const largeArc = startAngle - endAngle > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${largeArc} 1 ${p2.x} ${p2.y}`;
}

export default function SeatingChart({ sections, value, total, activeId, onSelect }) {
  return (
    <div className="seating-chart">
      <svg viewBox="0 0 620 300" role="img" aria-label="Orchestra seating chart">
        {sections.map((section) => {
          const [rInner, rOuter] = RADII[section.ring];
          const span = section.start - section.end;
          const midRadius = (rInner + rOuter) / 2;
          const filled = sectionTotal(section, value[section.id]) > 0;
          const pathId = `label-arc-${section.id}`;
          const fontSize = span < 20 ? 9.5 : 12;

          return (
            <g
              key={section.id}
              className={
                "seating-chart__section" +
                (activeId === section.id ? " is-active" : "")
              }
              onClick={() => onSelect?.(section.id)}
            >
              <path
                d={wedgePath(rInner, rOuter, section.start, section.end)}
                className={"seating-chart__wedge" + (filled ? " has-players" : "")}
              />
              <path id={pathId} d={labelArcPath(midRadius, section.start, section.end)} className="seating-chart__label-path" />
              <text className="seating-chart__label" style={{ fontSize }}>
                <textPath href={`#${pathId}`} xlinkHref={`#${pathId}`} startOffset="50%">
                  {section.label}
                </textPath>
              </text>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r={R_CONDUCTOR} className="seating-chart__conductor" />
        <text x={CX} y={CY - 4} className="seating-chart__conductor-label">
          Conductor
        </text>
        <text x={CX} y={CY + 14} className="seating-chart__conductor-total">
          {total || 0} players
        </text>
      </svg>
    </div>
  );
}
