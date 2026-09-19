import ZoomableDiagram from './ZoomableDiagram';

interface Copy {
  ariaLabel: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  sandboxTitle: string;
  sandboxSubtitle: string;
  sessionA: string;
  sessionB: string;
  sessionC: string;
  githubTitle: string;
  githubSubtitle: string;
  createLabel: string;
  prLabel: string;
  syncLabel: string;
  caption: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Diagram of biomelab\'s architecture: the biomelab dashboard on the host creates worktrees inside one Docker Sandbox microVM per project. Three agent sessions run inside that same sandbox at once, isolated from each other only by filesystem path, not by separate virtual machines. Each session opens its own pull request on GitHub, and that pull request state syncs back into the dashboard\'s kanban board, so the board always reflects the real repository state.',
    dashboardTitle: 'biomelab dashboard',
    dashboardSubtitle: 'kanban board, runs on the host',
    sandboxTitle: 'Docker Sandbox',
    sandboxSubtitle: 'one microVM per project, shared filesystem',
    sessionA: 'Session A',
    sessionB: 'Session B',
    sessionC: 'Session C',
    githubTitle: 'GitHub',
    githubSubtitle: 'branches & pull requests',
    createLabel: 'creates worktrees',
    prLabel: 'push & open PR',
    syncLabel: 'PR state syncs back',
    caption: 'One sandbox VM, three parallel agent sessions, isolated by path, not by machine.',
  },
  de: {
    ariaLabel:
      'Diagramm der biomelab-Architektur: Das biomelab-Dashboard auf dem Host erstellt Worktrees innerhalb einer Docker-Sandbox-microVM pro Projekt. Drei Agenten-Sessions laufen gleichzeitig in derselben Sandbox, voneinander nur durch den Dateisystempfad getrennt, nicht durch eigene virtuelle Maschinen. Jede Session öffnet ihren eigenen Pull Request auf GitHub, und dieser PR-Status synchronisiert sich zurück ins Kanban-Board des Dashboards, sodass das Board immer den echten Repository-Zustand zeigt.',
    dashboardTitle: 'biomelab-Dashboard',
    dashboardSubtitle: 'Kanban-Board, läuft auf dem Host',
    sandboxTitle: 'Docker Sandbox',
    sandboxSubtitle: 'eine microVM pro Projekt, geteiltes Dateisystem',
    sessionA: 'Session A',
    sessionB: 'Session B',
    sessionC: 'Session C',
    githubTitle: 'GitHub',
    githubSubtitle: 'Branches & Pull Requests',
    createLabel: 'erstellt Worktrees',
    prLabel: 'Push & PR öffnen',
    syncLabel: 'PR-Status synct zurück',
    caption: 'Eine Sandbox-VM, drei parallele Agenten-Sessions, getrennt per Pfad, nicht per Maschine.',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

export default function BiomelabSandboxDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 920 340" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="bsd-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
          <marker id="bsd-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#2A5C45" />
          </marker>
          <marker id="bsd-arrow-rust" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#B5351A" />
          </marker>
        </defs>

        {/* dashboard box */}
        <rect x={20} y={110} width={170} height={100} rx={14} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={105} y={150} textAnchor="middle" fontSize="13" fontWeight={700} fill="#3D2B6B">{t.dashboardTitle}</text>
        <text x={105} y={168} textAnchor="middle" fontSize="9.5" fill="#3D2B6B">{t.dashboardSubtitle}</text>

        {/* sandbox outer container */}
        <rect x={280} y={40} width={340} height={240} rx={16} fill="#E6F0EC" stroke="#2A5C45" strokeWidth={2} />
        <text x={450} y={65} textAnchor="middle" fontSize="13" fontWeight={700} fill="#2A5C45">{t.sandboxTitle}</text>
        <text x={450} y={81} textAnchor="middle" fontSize="9.5" fill="#2A5C45">{t.sandboxSubtitle}</text>

        {/* three sessions inside the sandbox */}
        <rect x={305} y={100} width={290} height={44} rx={10} fill="#FFFFFF" stroke="#2A5C45" strokeWidth={1.25} />
        <text x={450} y={127} textAnchor="middle" fontSize="11.5" fontWeight={600} fill="#1A1A2E">{t.sessionA}</text>

        <rect x={305} y={154} width={290} height={44} rx={10} fill="#FFFFFF" stroke="#2A5C45" strokeWidth={1.25} />
        <text x={450} y={181} textAnchor="middle" fontSize="11.5" fontWeight={600} fill="#1A1A2E">{t.sessionB}</text>

        <rect x={305} y={208} width={290} height={44} rx={10} fill="#FFFFFF" stroke="#2A5C45" strokeWidth={1.25} />
        <text x={450} y={235} textAnchor="middle" fontSize="11.5" fontWeight={600} fill="#1A1A2E">{t.sessionC}</text>

        {/* github box */}
        <rect x={730} y={110} width={170} height={100} rx={14} fill="#FBEAE4" stroke="#B5351A" strokeWidth={1.5} />
        <text x={815} y={150} textAnchor="middle" fontSize="13" fontWeight={700} fill="#B5351A">{t.githubTitle}</text>
        <text x={815} y={168} textAnchor="middle" fontSize="9.5" fill="#B5351A">{t.githubSubtitle}</text>

        {/* dashboard -> sandbox */}
        <line x1={192} y1={135} x2={276} y2={100} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#bsd-arrow-purple)" />
        <text x={230} y={100} textAnchor="middle" fontSize="9.5" fill="#6B7280">{t.createLabel}</text>

        {/* sessions -> github */}
        <line x1={597} y1={122} x2={726} y2={140} stroke="#2A5C45" strokeWidth={1.75} markerEnd="url(#bsd-arrow-green)" />
        <line x1={597} y1={176} x2={726} y2={160} stroke="#2A5C45" strokeWidth={1.75} markerEnd="url(#bsd-arrow-green)" />
        <line x1={597} y1={230} x2={726} y2={180} stroke="#2A5C45" strokeWidth={1.75} markerEnd="url(#bsd-arrow-green)" />
        <text x={660} y={106} textAnchor="middle" fontSize="9.5" fill="#6B7280">{t.prLabel}</text>

        {/* github -> dashboard, sync back */}
        <path d="M815,214 C815,300 105,300 105,214" fill="none" stroke="#9CA3AF" strokeWidth={1.75} strokeDasharray="5 4" markerEnd="url(#bsd-arrow-rust)" />
        <rect x={370} y={288} width={160} height={20} rx={4} fill="#F8F7F4" opacity={0.9} />
        <text x={450} y={302} textAnchor="middle" fontSize="10" fontWeight={600} fill="#6B7280">{t.syncLabel}</text>

        {/* caption */}
        <text x={450} y={330} textAnchor="middle" fontSize="10" fill="#6B7280">{t.caption}</text>
      </svg>
    </ZoomableDiagram>
  );
}
