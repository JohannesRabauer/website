import ZoomableDiagram from './ZoomableDiagram';

interface Step {
  title: string;
  lines: string[];
}

interface Copy {
  ariaLabel: string;
  humanZone: string;
  agentZone: string;
  brainstorm: Step;
  spec: Step;
  writePlan: Step;
  plan: Step;
  subagents: Step;
  reviewer: Step;
  fixLabel: string;
  caption: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      "Flowchart of Pasha Finkelshteyn's spec-first workflow, split into two zones. In the zone read by humans, brainstorming asks the developer questions and produces a short spec, the blueprint, which takes about ten minutes to read. In the zone read by agents, a planning step turns the spec into a plan, the work schedule, with eight tasks that nobody needs to read. Each task goes to its own subagent, picked by difficulty from Haiku, Sonnet or Opus and working red-green TDD, and a reviewer with a clean context checks the result and sends fixes back.",
    humanZone: 'For humans',
    agentZone: 'For agents',
    brainstorm: { title: 'Brainstorming', lines: ['agent asks,', 'you answer'] },
    spec: { title: 'Spec', lines: ['the blueprint', '~10 min to read'] },
    writePlan: { title: 'Writing plans', lines: ['spec into tasks'] },
    plan: { title: 'Plan', lines: ['the work schedule', '8 tasks, rarely read'] },
    subagents: { title: 'One subagent', lines: ['per task', 'red-green TDD'] },
    reviewer: { title: 'Fresh reviewer', lines: ['clean context,', 'knows only the task'] },
    fixLabel: 'fixes',
    caption: 'You sign off the blueprint. The crews work through the schedule.',
  },
  de: {
    ariaLabel:
      'Flussdiagramm von Pasha Finkelshteyns Spec-first-Workflow, aufgeteilt in zwei Zonen. In der Zone, die Menschen lesen, stellt das Brainstorming dem Entwickler Fragen und erzeugt eine kurze Spec, den Bauplan, den man in etwa zehn Minuten liest. In der Zone, die Agents lesen, macht ein Planungsschritt aus der Spec einen Plan, den Bauzeitenplan, mit acht Tasks, die niemand lesen muss. Jeder Task geht an einen eigenen Subagent, je nach Schwierigkeit Haiku, Sonnet oder Opus, der nach Red-Green-TDD arbeitet, und ein Reviewer mit frischem Kontext prüft das Ergebnis und schickt Korrekturen zurück.',
    humanZone: 'Für Menschen',
    agentZone: 'Für Agents',
    brainstorm: { title: 'Brainstorming', lines: ['Agent fragt,', 'du antwortest'] },
    spec: { title: 'Spec', lines: ['der Bauplan', '~10 Min. Lesezeit'] },
    writePlan: { title: 'Writing plans', lines: ['Spec in Tasks'] },
    plan: { title: 'Plan', lines: ['der Bauzeitenplan', '8 Tasks, kaum gelesen'] },
    subagents: { title: 'Ein Subagent', lines: ['pro Task', 'Red-Green-TDD'] },
    reviewer: { title: 'Frischer Reviewer', lines: ['frischer Kontext,', 'kennt nur den Task'] },
    fixLabel: 'Korrekturen',
    caption: 'Du gibst den Bauplan frei. Die Gewerke arbeiten den Zeitplan ab.',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  step: Step;
  fill: string;
  stroke: string;
  text: string;
  rx?: number;
  strokeWidth?: number;
}

function Node({ x, y, w, h, step, fill, stroke, text, rx = 12, strokeWidth = 1.5 }: NodeProps) {
  const cx = x + w / 2;
  const titleY = y + h / 2 - (step.lines.length * 12) / 2 + 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <text x={cx} y={titleY} textAnchor="middle" fontSize="13" fontWeight={700} fill={text}>{step.title}</text>
      {step.lines.map((line, i) => (
        <text key={line} x={cx} y={titleY + 17 + i * 12} textAnchor="middle" fontSize="9.5" fill={text}>{line}</text>
      ))}
    </g>
  );
}

export default function SpecFirstBlueprintDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 990 270" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="sfbd-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
          <marker id="sfbd-arrow-rust" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#B5351A" />
          </marker>
        </defs>

        {/* zones */}
        <rect x={10} y={20} width={320} height={200} rx={16} fill="#E6F0EC" opacity={0.5} stroke="#2A5C45" strokeWidth={1} strokeDasharray="4 4" />
        <text x={170} y={42} textAnchor="middle" fontSize="11" fontWeight={700} fill="#2A5C45">{t.humanZone}</text>
        <rect x={345} y={20} width={635} height={200} rx={16} fill="#EDE8F5" opacity={0.5} stroke="#7C5CBF" strokeWidth={1} strokeDasharray="4 4" />
        <text x={662} y={42} textAnchor="middle" fontSize="11" fontWeight={700} fill="#3D2B6B">{t.agentZone}</text>

        {/* human zone: brainstorming -> spec (blueprint) */}
        <Node x={28} y={90} w={120} h={70} step={t.brainstorm} fill="#FFFFFF" stroke="#2A5C45" text="#2A5C45" />
        <Node x={182} y={70} w={130} h={110} step={t.spec} fill="#FFFFFF" stroke="#2A5C45" text="#2A5C45" rx={16} strokeWidth={2.5} />

        {/* agent zone: writing plans -> plan -> subagents -> reviewer */}
        <Node x={362} y={90} w={110} h={70} step={t.writePlan} fill="#FFFFFF" stroke="#3D2B6B" text="#3D2B6B" />
        <Node x={500} y={70} w={135} h={110} step={t.plan} fill="#FFFFFF" stroke="#3D2B6B" text="#3D2B6B" rx={16} strokeWidth={2} />
        <Node x={665} y={90} w={130} h={70} step={t.subagents} fill="#F8F7F4" stroke="#7C5CBF" text="#3D2B6B" />
        <Node x={830} y={90} w={135} h={70} step={t.reviewer} fill="#F8F7F4" stroke="#B5351A" text="#B5351A" />

        {/* flow arrows */}
        <line x1={148} y1={125} x2={175} y2={125} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#sfbd-arrow-purple)" />
        <line x1={312} y1={125} x2={355} y2={125} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#sfbd-arrow-purple)" />
        <line x1={472} y1={125} x2={493} y2={125} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#sfbd-arrow-purple)" />
        <line x1={635} y1={125} x2={658} y2={125} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#sfbd-arrow-purple)" />
        <line x1={795} y1={125} x2={823} y2={125} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#sfbd-arrow-purple)" />

        {/* reviewer -> subagent fix loop */}
        <path d="M897,160 C897,205 730,205 730,167" fill="none" stroke="#B5351A" strokeWidth={1.75} strokeDasharray="5 4" markerEnd="url(#sfbd-arrow-rust)" />
        <rect x={778} y={192} width={72} height={18} rx={4} fill="#F8F7F4" opacity={0.95} />
        <text x={814} y={205} textAnchor="middle" fontSize="10.5" fontWeight={700} fill="#B5351A">{t.fixLabel}</text>

        <text x={495} y={252} textAnchor="middle" fontSize="11" fill="#6B7280">{t.caption}</text>
      </svg>
    </ZoomableDiagram>
  );
}
