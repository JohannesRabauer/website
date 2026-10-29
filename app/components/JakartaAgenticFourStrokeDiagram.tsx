import ZoomableDiagram from './ZoomableDiagram';

interface Copy {
  ariaLabel: string;
  strokeLabel: string;
  triggerSubtitle: string;
  decisionSubtitle: string;
  actionSubtitle: string;
  outcomeSubtitle: string;
  skipLabel: string;
  passLabel: string;
  exceptionSubtitle: string;
  captionTop: string;
  captionBottom: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Diagram of a Jakarta Agentic AI workflow as four strokes. Stroke one, the trigger, starts the workflow when a CDI event is fired; there is exactly one. Stroke two, decisions, can stop the workflow: returning false or null skips straight to the outcome. Stroke three, actions, always run and pass their result to the next action. Stroke four, the outcome, receives the last result. Underneath, exception handlers catch failures from any step, and the handler for the most specific exception type wins.',
    strokeLabel: 'Stroke',
    triggerSubtitle: 'CDI event fired, exactly one',
    decisionSubtitle: 'checks, can stop the run',
    actionSubtitle: 'does work, result passed on',
    outcomeSubtitle: 'receives the last result',
    skipLabel: 'false / null: skip straight to the outcome',
    passLabel: 'true / object',
    exceptionSubtitle: 'any step fails: the most specific handler wins',
    captionTop: 'zero or many decisions and actions,',
    captionBottom: 'run by order() or source order',
  },
  de: {
    ariaLabel:
      'Diagramm eines Jakarta-Agentic-AI-Workflows als vier Takte. Takt eins, der Trigger, startet den Workflow, sobald ein CDI-Event gefeuert wird; es gibt genau einen. Takt zwei, die Decisions, können den Workflow stoppen: Gibt eine false oder null zurück, geht es direkt zum Outcome. Takt drei, die Actions, laufen immer und reichen ihr Ergebnis an die nächste Action weiter. Takt vier, das Outcome, bekommt das letzte Ergebnis. Darunter fangen Exception-Handler Fehler aus jedem Schritt ab, und der Handler für den spezifischsten Exception-Typ gewinnt.',
    strokeLabel: 'Takt',
    triggerSubtitle: 'CDI-Event gefeuert, genau einer',
    decisionSubtitle: 'prüft, kann den Lauf stoppen',
    actionSubtitle: 'arbeitet, reicht Ergebnis weiter',
    outcomeSubtitle: 'bekommt das letzte Ergebnis',
    skipLabel: 'false / null: direkt zum Outcome',
    passLabel: 'true / Objekt',
    exceptionSubtitle: 'ein Schritt scheitert: der spezifischste Handler gewinnt',
    captionTop: 'null bis viele Decisions und Actions,',
    captionBottom: 'nach order() oder Quelltext-Reihenfolge',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

const STROKES = [
  { x: 20, title: '@Trigger', fill: '#EDE8F5', stroke: '#3D2B6B', key: 'triggerSubtitle' },
  { x: 260, title: '@Decision', fill: '#FBEAE5', stroke: '#B5351A', key: 'decisionSubtitle' },
  { x: 500, title: '@Action', fill: '#E6F0EC', stroke: '#2A5C45', key: 'actionSubtitle' },
  { x: 740, title: '@Outcome', fill: '#EDE8F5', stroke: '#3D2B6B', key: 'outcomeSubtitle' },
] as const;

export default function JakartaAgenticFourStrokeDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];
  const boxWidth = 200;

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 960 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="jafs-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
          <marker id="jafs-arrow-rust" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#B5351A" />
          </marker>
          <marker id="jafs-arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF" />
          </marker>
        </defs>

        {/* decision -> outcome skip arc above the row */}
        <path d="M360,95 C360,30 840,30 840,88" fill="none" stroke="#B5351A" strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#jafs-arrow-rust)" />
        <rect x={480} y={30} width={240} height={20} rx={4} fill="#F8F7F4" opacity={0.95} />
        <text x={600} y={44} textAnchor="middle" fontSize="11" fontWeight={700} fill="#B5351A">{t.skipLabel}</text>

        {/* the four strokes */}
        {STROKES.map((s, i) => (
          <g key={s.title}>
            <rect x={s.x} y={95} width={boxWidth} height={90} rx={12} fill={s.fill} stroke={s.stroke} strokeWidth={1.5} />
            <text x={s.x + boxWidth / 2} y={116} textAnchor="middle" fontSize="9.5" fontWeight={600} fill="#6B7280">
              {t.strokeLabel} {i + 1}
            </text>
            <text x={s.x + boxWidth / 2} y={142} textAnchor="middle" fontSize="14" fontWeight={700} fill={s.stroke}>{s.title}</text>
            <text x={s.x + boxWidth / 2} y={164} textAnchor="middle" fontSize="10" fill={s.stroke}>{t[s.key]}</text>
          </g>
        ))}

        {/* forward arrows between strokes */}
        <line x1={220} y1={140} x2={253} y2={140} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#jafs-arrow-purple)" />
        <line x1={460} y1={140} x2={493} y2={140} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#jafs-arrow-purple)" />
        <text x={477} y={205} textAnchor="middle" fontSize="9.5" fontWeight={600} fill="#7C5CBF">{t.passLabel}</text>
        <line x1={700} y1={140} x2={733} y2={140} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#jafs-arrow-purple)" />

        {/* exception handler band */}
        {[120, 360, 600].map((x) => (
          <line key={x} x1={x} y1={185} x2={x} y2={243} stroke="#9CA3AF" strokeWidth={1.5} strokeDasharray="3 4" markerEnd="url(#jafs-arrow-gray)" />
        ))}
        <rect x={20} y={245} width={680} height={44} rx={12} fill="#FFFFFF" stroke="#9CA3AF" strokeWidth={1.5} />
        <text x={360} y={264} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#1A1A2E">@OnException</text>
        <text x={360} y={280} textAnchor="middle" fontSize="10" fill="#6B7280">{t.exceptionSubtitle}</text>

        <text x={840} y={262} textAnchor="middle" fontSize="10" fill="#6B7280">{t.captionTop}</text>
        <text x={840} y={277} textAnchor="middle" fontSize="10" fill="#6B7280">{t.captionBottom}</text>
      </svg>
    </ZoomableDiagram>
  );
}
