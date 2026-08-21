import ZoomableDiagram from './ZoomableDiagram';

interface Copy {
  ariaLabel: string;
  startLabel: string;
  analyzeLabel: string;
  advisorLabel: string;
  humanTitle: string;
  humanSubtitle: string;
  applyLabel: string;
  doneLabel: string;
  resumeLabel: string;
  checkpointCaption: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Flowchart of the LangGraph4j graph built live: a delay is detected, the graph analyzes it and asks an advisor for a recommendation, then hits a declared interrupt, drawn as a control tower, where it halts and waits for a human decision. Resuming calls the graph again and runs the apply-decision step to finish. A checkpoint track underneath shows that state is saved after every step, which is what makes the run resumable if it crashes.',
    startLabel: 'Delay detected',
    analyzeLabel: 'Analyze delay',
    advisorLabel: 'Advisor',
    humanTitle: 'Human decision',
    humanSubtitle: 'control tower: interrupt + wait',
    applyLabel: 'Apply decision',
    doneLabel: 'Workflow done',
    resumeLabel: 'resume',
    checkpointCaption: 'state checkpointed after every step, so a crash resumes here instead of restarting',
  },
  de: {
    ariaLabel:
      'Flussdiagramm des live gebauten LangGraph4j-Graphen: Eine Verspätung wird erkannt, der Graph analysiert sie und fragt einen Advisor nach einer Empfehlung, dann erreicht er eine deklarierte Unterbrechung, dargestellt als Kontrollturm, an der er anhält und auf eine menschliche Entscheidung wartet. Das Fortsetzen ruft den Graphen erneut auf und führt den Schritt zum Anwenden der Entscheidung aus. Eine Checkpoint-Spur darunter zeigt, dass der Zustand nach jedem Schritt gespeichert wird, wodurch der Lauf nach einem Absturz fortsetzbar ist statt neu zu starten.',
    startLabel: 'Verspätung erkannt',
    analyzeLabel: 'Verspätung analysieren',
    advisorLabel: 'Advisor',
    humanTitle: 'Menschliche Entscheidung',
    humanSubtitle: 'Kontrollturm: Unterbrechung + Warten',
    applyLabel: 'Entscheidung anwenden',
    doneLabel: 'Workflow abgeschlossen',
    resumeLabel: 'Fortsetzen',
    checkpointCaption: 'Zustand nach jedem Schritt gesichert, ein Absturz setzt hier fort statt neu zu starten',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

export default function LangGraph4jControlTowerDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];

  const checkpointX = [125, 300, 465, 700, 865];

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 990 260" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="lgtd-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
          <marker id="lgtd-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#2A5C45" />
          </marker>
        </defs>

        {/* start pill */}
        <rect x={10} y={80} width={110} height={50} rx={25} fill="#FFFFFF" stroke="#9CA3AF" strokeWidth={1.5} />
        <text x={65} y={110} textAnchor="middle" fontSize="11" fontWeight={600} fill="#1A1A2E">{t.startLabel}</text>

        {/* analyze box */}
        <rect x={175} y={70} width={140} height={70} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={245} y={110} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#3D2B6B">{t.analyzeLabel}</text>

        {/* advisor box */}
        <rect x={355} y={70} width={140} height={70} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={425} y={110} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#3D2B6B">{t.advisorLabel}</text>

        {/* human decision / control tower box */}
        <rect x={545} y={45} width={190} height={120} rx={16} fill="#E6F0EC" stroke="#2A5C45" strokeWidth={2} />
        <path d="M615,68 L665,68 L672,88 L608,88 Z" fill="#2A5C45" opacity={0.18} />
        <rect x={630} y={60} width={10} height={22} fill="#2A5C45" opacity={0.5} />
        <text x={640} y={112} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#2A5C45">{t.humanTitle}</text>
        <text x={640} y={130} textAnchor="middle" fontSize="9.5" fill="#2A5C45">{t.humanSubtitle}</text>

        {/* apply box */}
        <rect x={775} y={70} width={140} height={70} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={845} y={110} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#3D2B6B">{t.applyLabel}</text>

        {/* arrows: start -> analyze -> advisor -> human decision */}
        <line x1={120} y1={105} x2={168} y2={105} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#lgtd-arrow-purple)" />
        <line x1={315} y1={105} x2={348} y2={105} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#lgtd-arrow-purple)" />
        <line x1={495} y1={105} x2={538} y2={105} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#lgtd-arrow-purple)" />

        {/* human decision -> apply, dashed "resume" arc below */}
        <path d="M640,165 C640,210 845,210 845,147" fill="none" stroke="#2A5C45" strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#lgtd-arrow-green)" />
        <rect x={710} y={196} width={66} height={20} rx={4} fill="#F8F7F4" opacity={0.9} />
        <text x={743} y={210} textAnchor="middle" fontSize="11" fontWeight={700} fill="#2A5C45">{t.resumeLabel}</text>

        {/* apply -> done */}
        <line x1={915} y1={105} x2={928} y2={105} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#lgtd-arrow-purple)" />
        <rect x={930} y={80} width={50} height={50} rx={25} fill="#FFFFFF" stroke="#9CA3AF" strokeWidth={1.5} />
        <text x={955} y={101} textAnchor="middle" fontSize="9" fontWeight={600} fill="#1A1A2E">{locale === 'de' ? 'Fertig' : 'Done'}</text>

        {/* checkpoint track */}
        <line x1={65} y1={215} x2={955} y2={215} stroke="#E5E1F0" strokeWidth={2} />
        {checkpointX.map((x) => (
          <circle key={x} cx={x} cy={215} r={5} fill="#7C5CBF" />
        ))}
        <text x={510} y={238} textAnchor="middle" fontSize="10" fill="#6B7280">{t.checkpointCaption}</text>
      </svg>
    </ZoomableDiagram>
  );
}
