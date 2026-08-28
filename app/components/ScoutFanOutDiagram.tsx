import ZoomableDiagram from './ZoomableDiagram';

interface Copy {
  ariaLabel: string;
  deployLabel: string;
  scoutTitle: string;
  scoutSubtitle: string;
  aksLabel: string;
  aksCaption: string;
  azureLabel: string;
  azureCaption: string;
  postgresLabel: string;
  postgresCaption: string;
  actionsLabel: string;
  actionsCaption: string;
  bottomCaption: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Diagram of one deploy prompt fanning out through Microsoft Scout into roughly 21 parallel sub-agents provisioning four Azure resources: an AKS cluster, which came up cleanly; an Azure OpenAI deployment, where a sub-agent had to swap a just-discontinued GPT-4o for GPT-5.6 mid-run; a Postgres instance with pgvector, which Scout deployed as a managed cloud database instead of the local container the plan called for; and a GitHub Actions workflow, whose first run failed because secrets were not yet wired up. A caption at the bottom reads: one prompt, about 21 agents, three real bugs a human still had to catch.',
    deployLabel: 'Deploy prompt',
    scoutTitle: 'Scout',
    scoutSubtitle: '~21 parallel sub-agents, one codebase',
    aksLabel: 'AKS cluster',
    aksCaption: 'came up clean',
    azureLabel: 'Azure OpenAI / Foundry',
    azureCaption: 'GPT-4o just discontinued, swapped to GPT-5.6 mid-run',
    postgresLabel: 'Postgres + pgvector',
    postgresCaption: 'deployed managed in the cloud, plan said local container',
    actionsLabel: 'GitHub Actions CI',
    actionsCaption: 'first run failed, secrets not wired up yet',
    bottomCaption: 'One prompt, about 21 agents, three real bugs a human still had to catch.',
  },
  de: {
    ariaLabel:
      'Diagramm eines einzelnen Deploy-Prompts, der über Microsoft Scout in rund 21 parallele Sub-Agenten auffächert, die vier Azure-Ressourcen bereitstellen: einen AKS-Cluster, der sauber hochkam; ein Azure-OpenAI-Deployment, bei dem ein Sub-Agent mitten im Lauf ein gerade eingestelltes GPT-4o durch GPT-5.6 ersetzen musste; eine Postgres-Instanz mit pgvector, die Scout als verwaltete Cloud-Datenbank bereitstellte statt des im Plan vorgesehenen lokalen Containers; und einen GitHub-Actions-Workflow, dessen erster Lauf fehlschlug, weil die Secrets noch nicht verdrahtet waren. Eine Bildunterschrift unten liest: ein Prompt, etwa 21 Agenten, drei echte Bugs, die ein Mensch trotzdem abfangen musste.',
    deployLabel: 'Deploy-Prompt',
    scoutTitle: 'Scout',
    scoutSubtitle: '~21 parallele Sub-Agenten, eine Codebasis',
    aksLabel: 'AKS-Cluster',
    aksCaption: 'sauber hochgekommen',
    azureLabel: 'Azure OpenAI / Foundry',
    azureCaption: 'GPT-4o gerade eingestellt, mitten im Lauf auf GPT-5.6 gewechselt',
    postgresLabel: 'Postgres + pgvector',
    postgresCaption: 'verwaltet in der Cloud bereitgestellt, Plan sah lokalen Container vor',
    actionsLabel: 'GitHub Actions CI',
    actionsCaption: 'erster Lauf fehlgeschlagen, Secrets noch nicht verdrahtet',
    bottomCaption: 'Ein Prompt, etwa 21 Agenten, drei echte Bugs, die ein Mensch trotzdem abfangen musste.',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

export default function ScoutFanOutDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];

  const nodes = [
    { y: 14, label: t.aksLabel, caption: t.aksCaption, color: '#2A5C45', fill: '#E6F0EC', captionColor: '#2A5C45' },
    { y: 112, label: t.azureLabel, caption: t.azureCaption, color: '#3D2B6B', fill: '#EDE8F5', captionColor: '#B5351A' },
    { y: 210, label: t.postgresLabel, caption: t.postgresCaption, color: '#3D2B6B', fill: '#EDE8F5', captionColor: '#B5351A' },
    { y: 308, label: t.actionsLabel, caption: t.actionsCaption, color: '#3D2B6B', fill: '#EDE8F5', captionColor: '#B5351A' },
  ];
  const nodeWidth = 300;
  const nodeHeight = 82;
  const nodeX = 460;

  const hubCenterY = 202;

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 800 410" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="sfd-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
        </defs>

        {/* deploy prompt pill */}
        <rect x={10} y={177} width={130} height={50} rx={25} fill="#FFFFFF" stroke="#9CA3AF" strokeWidth={1.5} />
        <text x={75} y={207} textAnchor="middle" fontSize="11" fontWeight={600} fill="#1A1A2E">{t.deployLabel}</text>

        {/* arrow to Scout */}
        <line x1={140} y1={202} x2={183} y2={202} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#sfd-arrow-purple)" />

        {/* Scout hub */}
        <rect x={190} y={102} width={180} height={200} rx={16} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={2} />
        <text x={280} y={193} textAnchor="middle" fontSize="17" fontWeight={700} fill="#3D2B6B">{t.scoutTitle}</text>
        {wrapText(t.scoutSubtitle, 22).map((line, i) => (
          <text key={i} x={280} y={215 + i * 14} textAnchor="middle" fontSize="10" fill="#3D2B6B">{line}</text>
        ))}

        {/* fan-out lines + nodes */}
        {nodes.map((n) => {
          const nodeCenterY = n.y + nodeHeight / 2;
          return (
            <g key={n.label}>
              <path
                d={`M370,${hubCenterY} C415,${hubCenterY} 415,${nodeCenterY} ${nodeX},${nodeCenterY}`}
                fill="none"
                stroke="#9CA3AF"
                strokeWidth={1.5}
                markerEnd="url(#sfd-arrow-purple)"
              />
              <rect x={nodeX} y={n.y} width={nodeWidth} height={nodeHeight} rx={12} fill={n.fill} stroke={n.color} strokeWidth={1.5} />
              <text x={nodeX + nodeWidth / 2} y={n.y + 24} textAnchor="middle" fontSize="12.5" fontWeight={700} fill={n.color}>{n.label}</text>
              {wrapText(n.caption, 40).map((line, i) => (
                <text
                  key={i}
                  x={nodeX + nodeWidth / 2}
                  y={n.y + 42 + i * 13}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight={n.captionColor === '#B5351A' ? 700 : 400}
                  fill={n.captionColor}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        <text x={400} y={400} textAnchor="middle" fontSize="10.5" fontWeight={600} fill="#6B7280">{t.bottomCaption}</text>
      </svg>
    </ZoomableDiagram>
  );
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}
