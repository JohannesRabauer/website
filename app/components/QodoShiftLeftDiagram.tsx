import ZoomableDiagram from './ZoomableDiagram';

interface Copy {
  ariaLabel: string;
  ticket: string;
  plan: string;
  agent: [string, string];
  review: [string, string];
  prAgent: string;
  lateLoop: string;
  toolboxTitle: string;
  toolboxSubtitle: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Diagram of the loop Filip Hric drew on stream: ticket, plan, coding agent, review of uncommitted changes, and the PR agent. A dashed red arrow from the PR agent back to the coding agent marks the classic loop, where findings arrive only after the pull request exists. Below, a green box for the Agentic Toolbox (skills, MCP and CLI on top of Qodo context) feeds all five steps: the PR agent uses it, and so can the ticket, the plan, the coding agent and the review of uncommitted changes, long before there is a pull request.',
    ticket: 'Ticket',
    plan: 'Plan',
    agent: ['Coding', 'Agent'],
    review: ['Review', 'uncommitted'],
    prAgent: 'PR Agent',
    lateLoop: 'classic loop: findings arrive after the PR',
    toolboxTitle: 'Agentic Toolbox',
    toolboxSubtitle: 'skills · MCP · CLI, on Qodo context: rules, PR history, codebase graph, tickets',
  },
  de: {
    ariaLabel:
      'Diagramm der Schleife, die Filip Hric im Stream gezeichnet hat: Ticket, Plan, Coding-Agent, Review nicht committeter Änderungen und der PR-Agent. Ein gestrichelter roter Pfeil vom PR-Agent zurück zum Coding-Agent markiert die klassische Schleife, in der Findings erst nach dem Pull Request ankommen. Darunter speist ein grüner Kasten für die Agentic Toolbox (Skills, MCP und CLI auf Qodo-Kontext) alle fünf Schritte: Der PR-Agent nutzt sie, und ebenso Ticket, Plan, Coding-Agent und Review nicht committeter Änderungen, lange bevor es einen Pull Request gibt.',
    ticket: 'Ticket',
    plan: 'Plan',
    agent: ['Coding-', 'Agent'],
    review: ['Review vor', 'dem Commit'],
    prAgent: 'PR-Agent',
    lateLoop: 'klassische Schleife: Findings erst nach dem PR',
    toolboxTitle: 'Agentic Toolbox',
    toolboxSubtitle: 'Skills · MCP · CLI, auf Qodo-Kontext: Regeln, PR-Historie, Codebase-Graph, Tickets',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

const NODE_W = 150;
const NODE_H = 64;
const GAP = 40;
const LEFT = 20;
const TOP = 72;

export default function QodoShiftLeftDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];

  const labels: (string | [string, string])[] = [t.ticket, t.plan, t.agent, t.review, t.prAgent];
  const xs = labels.map((_, i) => LEFT + i * (NODE_W + GAP));
  const cx = (i: number) => xs[i] + NODE_W / 2;
  const midY = TOP + NODE_H / 2;

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 970 340" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="qsld-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
          <marker id="qsld-arrow-rust" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#B5351A" />
          </marker>
          <marker id="qsld-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#2A5C45" />
          </marker>
        </defs>

        {/* classic late loop: PR agent back to coding agent */}
        <path
          d={`M${cx(4)},${TOP} C${cx(4)},14 ${cx(2)},14 ${cx(2)},${TOP - 7}`}
          fill="none"
          stroke="#B5351A"
          strokeWidth={2}
          strokeDasharray="5 4"
          markerEnd="url(#qsld-arrow-rust)"
        />
        <rect x={cx(3) - 150} y={14} width={300} height={22} rx={4} fill="#F8F7F4" opacity={0.95} />
        <text x={cx(3)} y={29} textAnchor="middle" fontSize="12" fontWeight={600} fill="#B5351A">{t.lateLoop}</text>

        {/* top row */}
        {labels.map((label, i) => {
          const isPr = i === 4;
          return (
            <g key={i}>
              <rect
                x={xs[i]}
                y={TOP}
                width={NODE_W}
                height={NODE_H}
                rx={12}
                fill={isPr ? '#FFFFFF' : '#EDE8F5'}
                stroke="#3D2B6B"
                strokeWidth={1.5}
              />
              {typeof label === 'string' ? (
                <text x={cx(i)} y={midY + 5} textAnchor="middle" fontSize="14" fontWeight={700} fill="#3D2B6B">{label}</text>
              ) : (
                <text x={cx(i)} y={midY - 3} textAnchor="middle" fontSize="14" fontWeight={700} fill="#3D2B6B">
                  <tspan x={cx(i)}>{label[0]}</tspan>
                  <tspan x={cx(i)} dy={17}>{label[1]}</tspan>
                </text>
              )}
            </g>
          );
        })}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={xs[i] + NODE_W}
            y1={midY}
            x2={xs[i + 1] - 7}
            y2={midY}
            stroke="#7C5CBF"
            strokeWidth={2}
            markerEnd="url(#qsld-arrow-purple)"
          />
        ))}

        {/* Agentic Toolbox */}
        <rect x={LEFT} y={250} width={xs[4] + NODE_W - LEFT} height={70} rx={16} fill="#E6F0EC" stroke="#2A5C45" strokeWidth={2} />
        <text x={(LEFT + xs[4] + NODE_W) / 2} y={279} textAnchor="middle" fontSize="15" fontWeight={700} fill="#2A5C45">{t.toolboxTitle}</text>
        <text x={(LEFT + xs[4] + NODE_W) / 2} y={300} textAnchor="middle" fontSize="11" fill="#2A5C45">{t.toolboxSubtitle}</text>

        {/* toolbox feeds every step, the PR agent included */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={cx(i)}
            y1={250}
            x2={cx(i)}
            y2={TOP + NODE_H + 7}
            stroke="#2A5C45"
            strokeWidth={2}
            markerEnd="url(#qsld-arrow-green)"
          />
        ))}
      </svg>
    </ZoomableDiagram>
  );
}
