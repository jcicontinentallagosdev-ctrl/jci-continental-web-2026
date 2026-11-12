/** One ring of petals around the centre (300, 300). */
function Petals({ count, from, to, width, offset = 0, fill, className }: {
  count: number;
  from: number;
  to: number;
  width: number;
  offset?: number;
  fill: string;
  className: string;
}) {
  const mid = from + (to - from) * 0.45;
  const d = `M0 ${-from} C ${width} ${-mid} ${width * 1.1} ${-to + (to - from) * 0.25} 0 ${-to} C ${-width * 1.1} ${-to + (to - from) * 0.25} ${-width} ${-mid} 0 ${-from} Z`;
  return (
    <g className={className}>
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={d} fill={fill} transform={`translate(300 300) rotate(${offset + (360 / count) * i})`} />
      ))}
    </g>
  );
}

/**
 * Hero backdrop for "Beacon in Bloom": a big flat flower whose centre is the beacon's light.
 * Its three rings of petals open on load, outside in, then the outer two turn very slowly in
 * opposite directions (convention.css, "cv-bloom-art"). Drawn in code so it costs no download.
 */
export function BloomArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" className={`cv-bloom-art ${className ?? ""}`} aria-hidden="true" focusable="false">
      <Petals className="cv-petals cv-petals-outer" count={12} from={96} to={294} width={64} fill="var(--cv-brand)" />
      <Petals className="cv-petals cv-petals-middle" count={12} from={70} to={222} width={50} offset={15} fill="var(--cv-mint)" />
      <Petals className="cv-petals cv-petals-inner" count={8} from={42} to={148} width={40} offset={22.5} fill="var(--cv-coral)" />
      <g className="cv-petals cv-petals-centre">
        <circle cx="300" cy="300" r="70" fill="var(--cv-sun)" stroke="var(--cv-ink)" strokeWidth="6" />
        <circle cx="300" cy="300" r="32" fill="var(--cv-paper)" stroke="var(--cv-ink)" strokeWidth="6" />
      </g>
    </svg>
  );
}
