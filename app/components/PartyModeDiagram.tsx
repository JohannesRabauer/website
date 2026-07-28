interface Persona {
  label: string;
  cx: number;
  cy: number;
  color: string;
  anchorX: number;
  anchorY: number;
}

const PERSONAS: Persona[] = [
  { label: 'Product Manager', cx: 90, cy: 56, color: '#3D2B6B', anchorX: 205, anchorY: 100 },
  { label: 'Architect', cx: 430, cy: 56, color: '#7C5CBF', anchorX: 315, anchorY: 100 },
  { label: 'Analyst', cx: 90, cy: 224, color: '#2A5C45', anchorX: 205, anchorY: 180 },
  { label: 'Scrum Master', cx: 430, cy: 224, color: '#B5351A', anchorX: 315, anchorY: 180 },
];

function PersonaNode({ label, cx, cy, color, anchorX, anchorY }: Persona) {
  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={anchorX}
        y2={anchorY}
        stroke={color}
        strokeOpacity={0.35}
        strokeWidth={2}
      />
      <circle cx={cx} cy={cy} r={26} fill="#FFFFFF" stroke={color} strokeWidth={2} />
      <circle cx={cx} cy={cy - 6} r={7} fill={color} />
      <path
        d={`M ${cx - 13} ${cy + 15} a 13 11 0 0 1 26 0`}
        fill={color}
      />
      <text
        x={cx}
        y={cy + 46}
        textAnchor="middle"
        fontSize="13"
        fontWeight={600}
        fill="#1A1A2E"
      >
        {label}
      </text>
    </g>
  );
}

interface Props {
  personaLabels?: [string, string, string, string];
  caption?: string;
  ariaLabel?: string;
}

export default function PartyModeDiagram({
  personaLabels = ['Product Manager', 'Architect', 'Analyst', 'Scrum Master'],
  caption = 'same brief, four perspectives',
  ariaLabel = 'Diagram of Party Mode: four AI personas — Product Manager, Architect, Analyst, and Scrum Master — surrounding and reviewing a single shared document at the center',
}: Props) {
  const personas = PERSONAS.map((persona, index) => ({
    ...persona,
    label: personaLabels[index] ?? persona.label,
  }));

  return (
    <figure
      role="img"
      aria-label={ariaLabel}
      className="not-prose my-8 rounded-2xl border border-blog-border bg-gradient-to-b from-white to-blog-purple-light/40 p-4 sm:p-6"
    >
      <svg viewBox="0 0 520 280" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {personas.map((persona) => (
          <PersonaNode key={persona.label} {...persona} />
        ))}

        {/* Shared document at the center */}
        <rect
          x={200}
          y={98}
          width={120}
          height={84}
          rx={10}
          fill="#F0EDF8"
          stroke="#3D2B6B"
          strokeWidth={2}
        />
        <line x1={216} y1={122} x2={304} y2={122} stroke="#3D2B6B" strokeWidth={2} strokeOpacity={0.5} />
        <line x1={216} y1={138} x2={304} y2={138} stroke="#3D2B6B" strokeWidth={2} strokeOpacity={0.5} />
        <line x1={216} y1={154} x2={280} y2={154} stroke="#3D2B6B" strokeWidth={2} strokeOpacity={0.5} />
        <text x={260} y="70" textAnchor="middle" fontSize="12" fontWeight={600} fill="#6B7280" letterSpacing="0.02em">
          {caption}
        </text>
      </svg>
    </figure>
  );
}
