interface Copy {
  ariaLabel: string;
  harnessTitle: string;
  harnessSubtitle: string;
  cliTitle: string;
  cliSubtitle: string;
  commitTitle: string;
  hookTitle: string;
  hookSubtitle: string;
  arrowAgentHooks: string;
  arrowTranscript: string;
  arrowPush: string;
  repoTitle: string;
  repoSubtitle: string;
  mainBranch: string;
  mainCaption: string;
  checkpointBranch: string;
  checkpointCaption: string;
  repoFooter: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Diagram of how Entire works. An AI agent harness fires agent hooks into the Entire CLI on session start, prompt, and turn end. When you commit, a git hook fires: it adds an Entire-Checkpoint trailer to your commit and bundles the session into a checkpoint. On git push, both your code and the checkpoint are pushed to the same repository, on two different branches: main and entire/checkpoints/v1.',
    harnessTitle: 'Your AI harness',
    harnessSubtitle: 'Claude Code · Copilot · Cursor …',
    cliTitle: 'Entire CLI',
    cliSubtitle: 'session start · prompt · turn end',
    commitTitle: 'git commit',
    hookTitle: "Entire's git hook fires",
    hookSubtitle: 'checkpoint created, trailer added',
    arrowAgentHooks: 'agent hooks',
    arrowTranscript: 'session transcript',
    arrowPush: 'git push',
    repoTitle: 'Your repository',
    repoSubtitle: 'the one you already have',
    mainBranch: 'main',
    mainCaption: 'your code, untouched',
    checkpointBranch: 'entire/checkpoints/v1',
    checkpointCaption: 'prompts, reasoning, tool calls',
    repoFooter: 'different branch, same repository',
  },
  de: {
    ariaLabel:
      'Diagramm, wie Entire funktioniert. Ein KI-Agenten-Harness löst Agent Hooks in die Entire CLI aus, beim Start einer Session, bei jedem Prompt und am Ende eines Turns. Beim Commit feuert ein Git-Hook: er fügt dem Commit einen Entire-Checkpoint-Trailer hinzu und bündelt die Session zu einem Checkpoint. Beim Git Push werden Code und Checkpoint in dasselbe Repository gepusht, auf zwei verschiedene Branches: main und entire/checkpoints/v1.',
    harnessTitle: 'Dein KI-Harness',
    harnessSubtitle: 'Claude Code · Copilot · Cursor …',
    cliTitle: 'Entire CLI',
    cliSubtitle: 'Session-Start · Prompt · Turn-Ende',
    commitTitle: 'git commit',
    hookTitle: 'Entires Git-Hook feuert',
    hookSubtitle: 'Checkpoint erstellt, Trailer ergänzt',
    arrowAgentHooks: 'Agent Hooks',
    arrowTranscript: 'Session-Transkript',
    arrowPush: 'git push',
    repoTitle: 'Dein Repository',
    repoSubtitle: 'dasselbe, das du schon hast',
    mainBranch: 'main',
    mainCaption: 'dein Code, unangetastet',
    checkpointBranch: 'entire/checkpoints/v1',
    checkpointCaption: 'Prompts, Überlegungen, Tool-Aufrufe',
    repoFooter: 'anderer Branch, gleiches Repository',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

export default function EntireCheckpointDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];

  return (
    <figure
      role="img"
      aria-label={t.ariaLabel}
      className="not-prose my-8 rounded-2xl border border-blog-border bg-gradient-to-b from-white to-blog-purple-light/40 p-4 sm:p-6"
    >
      <svg viewBox="0 0 760 330" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="ecd-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
          <marker id="ecd-arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF" />
          </marker>
          <marker id="ecd-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#2A5C45" />
          </marker>
        </defs>

        {/* AI harness box */}
        <rect x={30} y={30} width={180} height={64} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={120} y={56} textAnchor="middle" fontSize="13" fontWeight={700} fill="#3D2B6B">{t.harnessTitle}</text>
        <text x={120} y={74} textAnchor="middle" fontSize="10" fill="#6B7280">{t.harnessSubtitle}</text>

        {/* Entire CLI box */}
        <rect x={270} y={30} width={180} height={64} rx={12} fill="#E6F0EC" stroke="#2A5C45" strokeWidth={1.5} />
        <text x={360} y={56} textAnchor="middle" fontSize="13" fontWeight={700} fill="#2A5C45">{t.cliTitle}</text>
        <text x={360} y={74} textAnchor="middle" fontSize="10" fill="#6B7280">{t.cliSubtitle}</text>

        {/* harness -> Entire CLI (agent hooks) */}
        <line x1={210} y1={62} x2={263} y2={62} stroke="#7C5CBF" strokeWidth={2} strokeDasharray="4 3" markerEnd="url(#ecd-arrow-purple)" />
        <text x={240} y={50} textAnchor="middle" fontSize="9" fill="#6B7280">{t.arrowAgentHooks}</text>

        {/* git commit box */}
        <rect x={30} y={230} width={180} height={60} rx={12} fill="#FFFFFF" stroke="#E5E1F0" strokeWidth={1.5} />
        <text x={120} y={265} textAnchor="middle" fontSize="13" fontWeight={700} fill="#1A1A2E">{t.commitTitle}</text>

        {/* git hook box */}
        <rect x={270} y={230} width={180} height={60} rx={12} fill="#F0EDF8" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={360} y={252} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#3D2B6B">{t.hookTitle}</text>
        <text x={360} y={269} textAnchor="middle" fontSize="9.5" fill="#6B7280">{t.hookSubtitle}</text>

        {/* harness -> commit (writes code) */}
        <line x1={120} y1={94} x2={120} y2={223} stroke="#9CA3AF" strokeWidth={1.5} markerEnd="url(#ecd-arrow-muted)" />

        {/* Entire CLI -> git hook (session transcript) */}
        <line x1={360} y1={94} x2={360} y2={223} stroke="#7C5CBF" strokeWidth={2} strokeDasharray="4 3" markerEnd="url(#ecd-arrow-purple)" />
        <text x={368} y={165} fontSize="10" fill="#6B7280">{t.arrowTranscript}</text>

        {/* commit -> git hook (on commit) */}
        <line x1={210} y1={260} x2={263} y2={260} stroke="#3D2B6B" strokeWidth={2} markerEnd="url(#ecd-arrow-purple)" />

        {/* git hook -> repository (git push) */}
        <line x1={450} y1={260} x2={504} y2={172} stroke="#2A5C45" strokeWidth={3} markerEnd="url(#ecd-arrow-green)" />
        <rect x={438} y={198} width={62} height={20} rx={4} fill="#F8F7F4" opacity={0.9} />
        <text x={469} y={212} textAnchor="middle" fontSize="12" fontWeight={700} fill="#2A5C45">{t.arrowPush}</text>

        {/* remote repository box */}
        <rect x={510} y={30} width={220} height={280} rx={16} fill="#FFFFFF" stroke="#E5E1F0" strokeWidth={1.5} />
        <text x={620} y={55} textAnchor="middle" fontSize="14" fontWeight={700} fill="#3D2B6B">{t.repoTitle}</text>
        <text x={620} y={72} textAnchor="middle" fontSize="10" fill="#6B7280">{t.repoSubtitle}</text>
        <line x1={525} y1={85} x2={715} y2={85} stroke="#E5E1F0" strokeWidth={1} />

        {/* split connectors from push entry point to the two branch tracks */}
        <path d="M508,172 C518,172 518,148 530,148" fill="none" stroke="#9CA3AF" strokeWidth={1.5} markerEnd="url(#ecd-arrow-muted)" />
        <path d="M508,172 C518,172 518,232 530,232" fill="none" stroke="#9CA3AF" strokeWidth={1.5} markerEnd="url(#ecd-arrow-muted)" />

        {/* main branch track */}
        <rect x={525} y={102} width={56} height={22} rx={11} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1} />
        <text x={553} y={117} textAnchor="middle" fontSize="10.5" fontWeight={700} fill="#3D2B6B">{t.mainBranch}</text>
        <line x1={525} y1={148} x2={715} y2={148} stroke="#E5E1F0" strokeWidth={2} />
        <circle cx={555} cy={148} r={5} fill="#7C5CBF" />
        <circle cx={605} cy={148} r={5} fill="#7C5CBF" />
        <circle cx={655} cy={148} r={5} fill="#7C5CBF" />
        <circle cx={700} cy={148} r={5} fill="#7C5CBF" />
        <text x={620} y={168} textAnchor="middle" fontSize="10" fill="#6B7280">{t.mainCaption}</text>

        {/* checkpoint branch track */}
        <rect x={525} y={186} width={170} height={22} rx={11} fill="#E6F0EC" stroke="#2A5C45" strokeWidth={1} />
        <text x={610} y={201} textAnchor="middle" fontSize="10" fontWeight={700} fill="#2A5C45" fontFamily="var(--font-mono), ui-monospace, monospace">{t.checkpointBranch}</text>
        <line x1={525} y1={232} x2={715} y2={232} stroke="#E5E1F0" strokeWidth={2} />
        <path d="M550,232 l5,-6 l5,6 l5,-6 l5,6" fill="none" stroke="#2A5C45" strokeWidth={1.5} />
        <path d="M650,232 l5,-6 l5,6 l5,-6 l5,6" fill="none" stroke="#2A5C45" strokeWidth={1.5} />
        <text x={620} y={252} textAnchor="middle" fontSize="10" fill="#6B7280">{t.checkpointCaption}</text>

        <line x1={525} y1={268} x2={715} y2={268} stroke="#E5E1F0" strokeWidth={1} />
        <text x={620} y={289} textAnchor="middle" fontSize="9.5" fontStyle="italic" fill="#6B7280">{t.repoFooter}</text>
      </svg>
    </figure>
  );
}
