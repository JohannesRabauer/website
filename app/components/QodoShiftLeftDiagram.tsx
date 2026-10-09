import ZoomableDiagram from './ZoomableDiagram';

interface Copy {
  ariaLabel: string;
  ticket: string;
  agent: string;
  pr: string;
  review: string;
  lateLoop: string;
  contextTitle: string;
  contextSubtitle: string;
  checkTicket: string;
  checkCode: string;
  checkPr: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Diagram of where Qodo reviews. Top row: ticket, coding agent, pull request, PR review. A dashed red arrow from the PR review back to the coding agent marks the classic loop, where findings arrive only after the pull request exists. Below, a green box for Qodo context (rules, PR history, codebase graph, tickets) feeds three checks upward: reviewing the ticket before any code, giving the agent rules and review while it codes, and the same review engine on the pull request.',
    ticket: 'Ticket',
    agent: 'Coding agent',
    pr: 'Pull request',
    review: 'PR review',
    lateLoop: 'classic loop: findings arrive after the PR',
    contextTitle: 'Qodo context',
    contextSubtitle: 'rules · PR history · codebase graph · tickets',
    checkTicket: 'check the ticket',
    checkCode: 'rules + review while coding',
    checkPr: 'same engine on the PR',
  },
  de: {
    ariaLabel:
      'Diagramm, wo Qodo prüft. Obere Reihe: Ticket, Coding-Agent, Pull Request, PR-Review. Ein gestrichelter roter Pfeil vom PR-Review zurück zum Coding-Agent markiert die klassische Schleife, in der Findings erst nach dem Pull Request ankommen. Darunter speist ein grüner Kasten mit Qodo-Kontext (Regeln, PR-Historie, Codebase-Graph, Tickets) drei Prüfungen nach oben: das Ticket vor jeder Zeile Code prüfen, dem Agenten beim Coden Regeln und Review geben, und dieselbe Review-Engine auf dem Pull Request.',
    ticket: 'Ticket',
    agent: 'Coding-Agent',
    pr: 'Pull Request',
    review: 'PR-Review',
    lateLoop: 'klassische Schleife: Findings erst nach dem PR',
    contextTitle: 'Qodo-Kontext',
    contextSubtitle: 'Regeln · PR-Historie · Codebase-Graph · Tickets',
    checkTicket: 'Ticket prüfen',
    checkCode: 'Regeln + Review beim Coden',
    checkPr: 'dieselbe Engine am PR',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

export default function QodoShiftLeftDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];

  const nodes = [
    { x: 20, label: t.ticket },
    { x: 260, label: t.agent },
    { x: 500, label: t.pr },
    { x: 740, label: t.review },
  ];

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 920 330" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
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

        {/* classic late loop: PR review back to coding agent */}
        <path d="M820,70 C820,10 340,10 340,62" fill="none" stroke="#B5351A" strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#qsld-arrow-rust)" />
        <rect x={430} y={14} width={300} height={22} rx={4} fill="#F8F7F4" opacity={0.95} />
        <text x={580} y={29} textAnchor="middle" fontSize="11" fontWeight={600} fill="#B5351A">{t.lateLoop}</text>

        {/* top row */}
        {nodes.map((n) => (
          <g key={n.x}>
            <rect x={n.x} y={70} width={160} height={60} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
            <text x={n.x + 80} y={105} textAnchor="middle" fontSize="13" fontWeight={700} fill="#3D2B6B">{n.label}</text>
          </g>
        ))}
        <line x1={180} y1={100} x2={253} y2={100} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#qsld-arrow-purple)" />
        <line x1={420} y1={100} x2={493} y2={100} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#qsld-arrow-purple)" />
        <line x1={660} y1={100} x2={733} y2={100} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#qsld-arrow-purple)" />

        {/* Qodo context box */}
        <rect x={20} y={250} width={880} height={64} rx={16} fill="#E6F0EC" stroke="#2A5C45" strokeWidth={2} />
        <text x={460} y={277} textAnchor="middle" fontSize="13" fontWeight={700} fill="#2A5C45">{t.contextTitle}</text>
        <text x={460} y={297} textAnchor="middle" fontSize="10" fill="#2A5C45">{t.contextSubtitle}</text>

        {/* upward checks */}
        <line x1={100} y1={250} x2={100} y2={137} stroke="#2A5C45" strokeWidth={2} markerEnd="url(#qsld-arrow-green)" />
        <line x1={340} y1={250} x2={340} y2={137} stroke="#2A5C45" strokeWidth={2} markerEnd="url(#qsld-arrow-green)" />
        <line x1={820} y1={250} x2={820} y2={137} stroke="#2A5C45" strokeWidth={2} strokeOpacity={0.5} markerEnd="url(#qsld-arrow-green)" />
        <text x={110} y={195} fontSize="10.5" fontWeight={600} fill="#2A5C45">{t.checkTicket}</text>
        <text x={350} y={195} fontSize="10.5" fontWeight={600} fill="#2A5C45">{t.checkCode}</text>
        <text x={810} y={195} textAnchor="end" fontSize="10.5" fill="#6B7280">{t.checkPr}</text>
      </svg>
    </ZoomableDiagram>
  );
}
