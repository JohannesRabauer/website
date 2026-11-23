import ZoomableDiagram from './ZoomableDiagram';

interface Copy {
  ariaLabel: string;
  attackTitle: string;
  attackSubtitle: string;
  agentTitle: string;
  agentSubtitle: string;
  wanakuTitle: string;
  policyTitle: string;
  policySubtitle: string;
  policyResult: string;
  evaluatorTitle: string;
  evaluatorSubtitle: string;
  evaluatorResult: string;
  camelTitle: string;
  camelSubtitle: string;
  shopTitle: string;
  shopSubtitle: string;
  caption: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Diagram of the demo setup: an attack review reaches the AI moderation agent, which calls tools only through Wanaku. Inside Wanaku sit two checks. Action policies, the guest list, deny tools like refundOrder and listCustomers by name and blocked both attacker calls. The LLM evaluator, the gut feeling, rates every call green, yellow or red and let the attack review itself through. Calls that pass go on to the Camel MCP server and from there to the shop API.',
    attackTitle: 'Attack review',
    attackSubtitle: 'posted by mallory',
    agentTitle: 'Moderator',
    agentSubtitle: 'LangChain4j agent',
    wanakuTitle: 'Wanaku 0.3.1',
    policyTitle: 'Guest list: action policies',
    policySubtitle: 'deny refundOrder, listCustomers, …',
    policyResult: 'held: both calls blocked',
    evaluatorTitle: 'Gut feeling: LLM evaluator',
    evaluatorSubtitle: 'rates each call green, yellow, red',
    evaluatorResult: 'guessed: review approved 3×',
    camelTitle: 'Camel MCP',
    camelSubtitle: 'ai-tool routes',
    shopTitle: 'Shop API',
    shopSubtitle: 'Quarkus REST',
    caption: 'the agent only talks to Wanaku, so every tool call passes both checks before it reaches the shop',
  },
  de: {
    ariaLabel:
      'Diagramm des Demo-Aufbaus: Eine Angriffs-Bewertung erreicht den KI-Moderationsagenten, der Tools nur über Wanaku aufruft. In Wanaku sitzen zwei Prüfungen. Die Action Policies, die Gästeliste, sperren Tools wie refundOrder und listCustomers per Name und haben beide Aufrufe des Angreifers blockiert. Der LLM-Evaluator, das Bauchgefühl, bewertet jeden Aufruf mit Grün, Gelb oder Rot und hat die Angriffs-Bewertung selbst durchgelassen. Erlaubte Aufrufe gehen weiter an den Camel-MCP-Server und von dort an die Shop-API.',
    attackTitle: 'Angriffs-Bewertung',
    attackSubtitle: 'gepostet von mallory',
    agentTitle: 'Moderator',
    agentSubtitle: 'LangChain4j-Agent',
    wanakuTitle: 'Wanaku 0.3.1',
    policyTitle: 'Gästeliste: Action Policies',
    policySubtitle: 'sperrt refundOrder, listCustomers, …',
    policyResult: 'hielt: beide Aufrufe blockiert',
    evaluatorTitle: 'Bauchgefühl: LLM-Evaluator',
    evaluatorSubtitle: 'bewertet jeden Aufruf grün, gelb, rot',
    evaluatorResult: 'geraten: Bewertung 3× freigegeben',
    camelTitle: 'Camel MCP',
    camelSubtitle: 'ai-tool-Routen',
    shopTitle: 'Shop-API',
    shopSubtitle: 'Quarkus REST',
    caption: 'der Agent spricht nur mit Wanaku, jeder Tool-Aufruf passiert also beide Prüfungen, bevor er den Shop erreicht',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

export default function WanakuGuestListDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 990 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="wgl-arrow-rust" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#B5351A" />
          </marker>
          <marker id="wgl-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
          <marker id="wgl-arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF" />
          </marker>
        </defs>

        {/* attack review */}
        <rect x={10} y={110} width={130} height={60} rx={30} fill="#FFFFFF" stroke="#B5351A" strokeWidth={1.5} />
        <text x={75} y={136} textAnchor="middle" fontSize="12" fontWeight={700} fill="#B5351A">{t.attackTitle}</text>
        <text x={75} y={153} textAnchor="middle" fontSize="9.5" fill="#6B7280">{t.attackSubtitle}</text>

        {/* moderator agent */}
        <rect x={175} y={105} width={130} height={70} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={240} y={136} textAnchor="middle" fontSize="13" fontWeight={700} fill="#3D2B6B">{t.agentTitle}</text>
        <text x={240} y={154} textAnchor="middle" fontSize="9.5" fill="#3D2B6B">{t.agentSubtitle}</text>

        {/* Wanaku container */}
        <rect x={345} y={20} width={320} height={240} rx={16} fill="#F8F7F4" stroke="#2A5C45" strokeWidth={2} />
        <text x={505} y={46} textAnchor="middle" fontSize="13" fontWeight={700} fill="#2A5C45">{t.wanakuTitle}</text>

        {/* guest list: action policies */}
        <rect x={365} y={60} width={280} height={90} rx={12} fill="#E6F0EC" stroke="#2A5C45" strokeWidth={1.5} />
        <text x={505} y={86} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#2A5C45">{t.policyTitle}</text>
        <text x={505} y={104} textAnchor="middle" fontSize="9.5" fill="#2A5C45">{t.policySubtitle}</text>
        <rect x={410} y={116} width={190} height={22} rx={11} fill="#2A5C45" />
        <text x={505} y={131} textAnchor="middle" fontSize="10" fontWeight={700} fill="#FFFFFF">{t.policyResult}</text>

        {/* gut feeling: LLM evaluator */}
        <rect x={365} y={160} width={280} height={90} rx={12} fill="#FFFFFF" stroke="#B5351A" strokeWidth={1.5} strokeDasharray="5 4" />
        <text x={505} y={186} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#B5351A">{t.evaluatorTitle}</text>
        <text x={505} y={204} textAnchor="middle" fontSize="9.5" fill="#6B7280">{t.evaluatorSubtitle}</text>
        <rect x={410} y={216} width={190} height={22} rx={11} fill="#B5351A" />
        <text x={505} y={231} textAnchor="middle" fontSize="10" fontWeight={700} fill="#FFFFFF">{t.evaluatorResult}</text>

        {/* Camel MCP */}
        <rect x={705} y={105} width={125} height={70} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={767} y={136} textAnchor="middle" fontSize="13" fontWeight={700} fill="#3D2B6B">{t.camelTitle}</text>
        <text x={767} y={154} textAnchor="middle" fontSize="9.5" fill="#3D2B6B">{t.camelSubtitle}</text>

        {/* shop */}
        <rect x={860} y={105} width={120} height={70} rx={12} fill="#FFFFFF" stroke="#9CA3AF" strokeWidth={1.5} />
        <text x={920} y={136} textAnchor="middle" fontSize="13" fontWeight={700} fill="#1A1A2E">{t.shopTitle}</text>
        <text x={920} y={154} textAnchor="middle" fontSize="9.5" fill="#6B7280">{t.shopSubtitle}</text>

        {/* arrows */}
        <line x1={140} y1={140} x2={168} y2={140} stroke="#B5351A" strokeWidth={2} markerEnd="url(#wgl-arrow-rust)" />
        <line x1={305} y1={140} x2={338} y2={140} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#wgl-arrow-purple)" />
        <line x1={665} y1={140} x2={698} y2={140} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#wgl-arrow-purple)" />
        <line x1={830} y1={140} x2={853} y2={140} stroke="#9CA3AF" strokeWidth={2} markerEnd="url(#wgl-arrow-gray)" />

        <text x={495} y={286} textAnchor="middle" fontSize="10" fill="#6B7280">{t.caption}</text>
      </svg>
    </ZoomableDiagram>
  );
}
