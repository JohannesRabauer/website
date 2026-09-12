import ZoomableDiagram from './ZoomableDiagram';

interface Copy {
  ariaLabel: string;
  startLabel: string;
  agentTitle: string;
  agentSubtitle: string;
  cloudRunTitle: string;
  cloudRunSubtitle: string;
  firestoreTitle: string;
  firestoreSubtitle: string;
  actionsTitle: string;
  actionsSubtitle: string;
  oauthTitle: string;
  oauthSubtitle: string;
  secretLabel: string;
  caption: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Diagram of the session\'s workflow. A voice or chat prompt goes to an AI agent, first GitHub Copilot, then Claude Code, which automates three things directly: deploying to Cloud Run with minimum instances at zero, writing to Firestore which has no idle cost, and running the GitHub Actions CI/CD pipeline. A dashed line breaks that pattern: the AI agent could not create the Google OAuth client itself, so a human had to open the Google Cloud console and create it by hand, muting the stream twice to hide the secret, before feeding the result to GitHub Actions as a secret.',
    startLabel: 'Voice / chat prompt',
    agentTitle: 'AI agent',
    agentSubtitle: 'Copilot, then Claude Code',
    cloudRunTitle: 'Cloud Run deploy',
    cloudRunSubtitle: 'min-instances = 0',
    firestoreTitle: 'Firestore data',
    firestoreSubtitle: 'no idle cost',
    actionsTitle: 'GitHub Actions CI/CD',
    actionsSubtitle: 'build + deploy on push',
    oauthTitle: 'Google OAuth console',
    oauthSubtitle: 'created by hand, screen muted twice',
    secretLabel: 'as a GitHub secret',
    caption: 'Every solid arrow ran through a prompt. The dashed one didn\'t, and that\'s where the debugging happened.',
  },
  de: {
    ariaLabel:
      'Diagramm des Workflows dieser Session. Ein gesprochener oder getippter Prompt geht an einen KI-Agenten, zuerst GitHub Copilot, dann Claude Code, der drei Dinge direkt automatisiert: das Deployment auf Cloud Run mit minimaler Instanzzahl null, das Schreiben nach Firestore, das keine Leerlaufkosten verursacht, und den GitHub-Actions-CI/CD-Workflow. Eine gestrichelte Linie durchbricht dieses Muster: Der KI-Agent konnte den Google-OAuth-Client nicht selbst anlegen, also musste ein Mensch die Google-Cloud-Konsole öffnen und ihn von Hand erstellen, wobei der Stream zweimal stummgeschaltet wurde, um das Secret zu verbergen, bevor es als GitHub-Secret an GitHub Actions übergeben wurde.',
    startLabel: 'Sprach- / Chat-Prompt',
    agentTitle: 'KI-Agent',
    agentSubtitle: 'Copilot, dann Claude Code',
    cloudRunTitle: 'Cloud-Run-Deployment',
    cloudRunSubtitle: 'min-instances = 0',
    firestoreTitle: 'Firestore-Daten',
    firestoreSubtitle: 'keine Leerlaufkosten',
    actionsTitle: 'GitHub Actions CI/CD',
    actionsSubtitle: 'Build + Deploy bei jedem Push',
    oauthTitle: 'Google-OAuth-Konsole',
    oauthSubtitle: 'von Hand angelegt, Bild zweimal stummgeschaltet',
    secretLabel: 'als GitHub-Secret',
    caption: 'Jeder durchgezogene Pfeil lief über einen Prompt. Der gestrichelte nicht, und genau dort begann das Debugging.',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

export default function ZeroCostQuarkusOpsDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 990 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="zcod-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
          <marker id="zcod-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#2A5C45" />
          </marker>
        </defs>

        {/* start pill */}
        <rect x={20} y={175} width={170} height={50} rx={25} fill="#FFFFFF" stroke="#9CA3AF" strokeWidth={1.5} />
        <text x={105} y={205} textAnchor="middle" fontSize="11" fontWeight={600} fill="#1A1A2E">{t.startLabel}</text>

        {/* AI agent box */}
        <rect x={230} y={155} width={190} height={90} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={325} y={196} textAnchor="middle" fontSize="13" fontWeight={700} fill="#3D2B6B">{t.agentTitle}</text>
        <text x={325} y={214} textAnchor="middle" fontSize="9.5" fill="#3D2B6B">{t.agentSubtitle}</text>

        {/* automated targets */}
        <rect x={500} y={20} width={210} height={70} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={605} y={50} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#3D2B6B">{t.cloudRunTitle}</text>
        <text x={605} y={68} textAnchor="middle" fontSize="9.5" fill="#3D2B6B">{t.cloudRunSubtitle}</text>

        <rect x={500} y={165} width={210} height={70} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={605} y={195} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#3D2B6B">{t.firestoreTitle}</text>
        <text x={605} y={213} textAnchor="middle" fontSize="9.5" fill="#3D2B6B">{t.firestoreSubtitle}</text>

        <rect x={500} y={300} width={210} height={70} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={605} y={330} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#3D2B6B">{t.actionsTitle}</text>
        <text x={605} y={348} textAnchor="middle" fontSize="9.5" fill="#3D2B6B">{t.actionsSubtitle}</text>

        {/* manual OAuth box */}
        <rect x={230} y={300} width={190} height={70} rx={12} fill="#E6F0EC" stroke="#2A5C45" strokeWidth={2} />
        <text x={325} y={330} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#2A5C45">{t.oauthTitle}</text>
        <text x={325} y={348} textAnchor="middle" fontSize="9" fill="#2A5C45">{t.oauthSubtitle}</text>

        {/* arrows: start -> agent */}
        <line x1={190} y1={200} x2={222} y2={200} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#zcod-arrow-purple)" />

        {/* agent -> automated targets */}
        <path d="M420,175 L492,58" fill="none" stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#zcod-arrow-purple)" />
        <line x1={420} y1={200} x2={492} y2={200} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#zcod-arrow-purple)" />
        <path d="M420,228 L492,325" fill="none" stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#zcod-arrow-purple)" />

        {/* agent -> manual OAuth step (dashed) */}
        <line x1={325} y1={247} x2={325} y2={293} stroke="#2A5C45" strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#zcod-arrow-green)" />

        {/* OAuth -> GitHub Actions secret (dashed) */}
        <line x1={420} y1={335} x2={492} y2={335} stroke="#2A5C45" strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#zcod-arrow-green)" />
        <rect x={430} y={352} width={82} height={20} rx={4} fill="#F8F7F4" opacity={0.9} />
        <text x={471} y={366} textAnchor="middle" fontSize="9.5" fontWeight={600} fill="#2A5C45">{t.secretLabel}</text>

        <text x={495} y={393} textAnchor="middle" fontSize="10" fill="#6B7280">{t.caption}</text>
      </svg>
    </ZoomableDiagram>
  );
}
