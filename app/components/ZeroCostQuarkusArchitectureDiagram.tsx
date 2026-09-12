import ZoomableDiagram from './ZoomableDiagram';

interface Copy {
  ariaLabel: string;
  browserTitle: string;
  browserSubtitle: string;
  cloudRunTitle: string;
  cloudRunSubtitle: string;
  firestoreTitle: string;
  firestoreSubtitle: string;
  oauthTitle: string;
  oauthSubtitle: string;
  actionsTitle: string;
  actionsSubtitle: string;
  httpLabel: string;
  dataLabel: string;
  loginLabel: string;
  deployLabel: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Architecture diagram of the deployed app. A browser sends HTTP requests to Cloud Run, which runs the Quarkus app with minimum instances at zero, and gets back Qute-rendered HTML. Cloud Run reads and writes family, budget, and expense data in Firestore over gRPC. For login, Cloud Run redirects the browser to Google OAuth, then validates the returned token locally against a cached JWKS, with no per-request round trip back to Google. Separately, at deploy time, GitHub Actions builds the app with Maven on Java 21 and deploys a new revision to Cloud Run on every push to main, injecting the OAuth client ID and secret from GitHub Secrets as environment variables.',
    browserTitle: 'Browser',
    browserSubtitle: 'family member on their phone',
    cloudRunTitle: 'Cloud Run',
    cloudRunSubtitle: 'Quarkus app, min-instances = 0',
    firestoreTitle: 'Firestore',
    firestoreSubtitle: 'family, budget, expense data',
    oauthTitle: 'Google OAuth',
    oauthSubtitle: 'login, JWKS cached and checked locally',
    actionsTitle: 'GitHub Actions',
    actionsSubtitle: 'Maven build, Java 21, deploy on push to main',
    httpLabel: 'HTTP request / Qute HTML',
    dataLabel: 'reads + writes (gRPC)',
    loginLabel: 'OIDC login redirect',
    deployLabel: 'deploy + OAuth secrets as env vars',
  },
  de: {
    ariaLabel:
      'Architekturdiagramm der deployten App. Ein Browser schickt HTTP-Requests an Cloud Run, wo die Quarkus-App mit minimaler Instanzzahl null läuft, und bekommt Qute-gerendertes HTML zurück. Cloud Run liest und schreibt Familien-, Budget- und Ausgabendaten in Firestore über gRPC. Beim Login leitet Cloud Run den Browser zu Google OAuth weiter und prüft das zurückgegebene Token danach lokal gegen einen zwischengespeicherten JWKS, ohne Rückfrage bei Google bei jedem einzelnen Request. Getrennt davon baut GitHub Actions beim Deployment die App mit Maven auf Java 21 und deployt bei jedem Push auf main eine neue Revision auf Cloud Run, wobei OAuth-Client-ID und -Secret aus GitHub Secrets als Umgebungsvariablen eingespielt werden.',
    browserTitle: 'Browser',
    browserSubtitle: 'Familienmitglied auf dem Handy',
    cloudRunTitle: 'Cloud Run',
    cloudRunSubtitle: 'Quarkus-App, min-instances = 0',
    firestoreTitle: 'Firestore',
    firestoreSubtitle: 'Familien-, Budget-, Ausgabendaten',
    oauthTitle: 'Google OAuth',
    oauthSubtitle: 'Login, JWKS lokal zwischengespeichert und geprüft',
    actionsTitle: 'GitHub Actions',
    actionsSubtitle: 'Maven-Build, Java 21, Deploy bei Push auf main',
    httpLabel: 'HTTP-Request / Qute-HTML',
    dataLabel: 'liest + schreibt (gRPC)',
    loginLabel: 'OIDC-Login-Redirect',
    deployLabel: 'Deploy + OAuth-Secrets als Env-Vars',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

export default function ZeroCostQuarkusArchitectureDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 990 340" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="zcad-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
          <marker id="zcad-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#2A5C45" />
          </marker>
        </defs>

        {/* Browser */}
        <rect x={20} y={135} width={150} height={70} rx={12} fill="#FFFFFF" stroke="#9CA3AF" strokeWidth={1.5} />
        <text x={95} y={165} textAnchor="middle" fontSize="13" fontWeight={700} fill="#1A1A2E">{t.browserTitle}</text>
        <text x={95} y={183} textAnchor="middle" fontSize="9" fill="#6B7280">{t.browserSubtitle}</text>

        {/* Cloud Run */}
        <rect x={280} y={125} width={210} height={90} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={2} />
        <text x={385} y={163} textAnchor="middle" fontSize="14" fontWeight={700} fill="#3D2B6B">{t.cloudRunTitle}</text>
        <text x={385} y={182} textAnchor="middle" fontSize="9.5" fill="#3D2B6B">{t.cloudRunSubtitle}</text>

        {/* Firestore */}
        <rect x={620} y={30} width={200} height={70} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={720} y={60} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#3D2B6B">{t.firestoreTitle}</text>
        <text x={720} y={78} textAnchor="middle" fontSize="9" fill="#3D2B6B">{t.firestoreSubtitle}</text>

        {/* Google OAuth */}
        <rect x={620} y={190} width={200} height={70} rx={12} fill="#EDE8F5" stroke="#3D2B6B" strokeWidth={1.5} />
        <text x={720} y={220} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#3D2B6B">{t.oauthTitle}</text>
        <text x={720} y={238} textAnchor="middle" fontSize="9" fill="#3D2B6B">{t.oauthSubtitle}</text>

        {/* GitHub Actions (deploy-time, distinct color) */}
        <rect x={185} y={265} width={400} height={60} rx={12} fill="#E6F0EC" stroke="#2A5C45" strokeWidth={2} />
        <text x={385} y={292} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#2A5C45">{t.actionsTitle}</text>
        <text x={385} y={309} textAnchor="middle" fontSize="9" fill="#2A5C45">{t.actionsSubtitle}</text>

        {/* Browser <-> Cloud Run */}
        <line x1={170} y1={170} x2={278} y2={170} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#zcad-arrow-purple)" markerStart="url(#zcad-arrow-purple)" />
        <text x={224} y={158} textAnchor="middle" fontSize="9" fill="#6B7280">{t.httpLabel}</text>

        {/* Cloud Run <-> Firestore */}
        <path d="M490,140 L618,75" fill="none" stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#zcad-arrow-purple)" markerStart="url(#zcad-arrow-purple)" />
        <text x={585} y={108} textAnchor="middle" fontSize="9" fill="#6B7280">{t.dataLabel}</text>

        {/* Cloud Run -> Google OAuth */}
        <path d="M490,190 L618,215" fill="none" stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#zcad-arrow-purple)" />
        <text x={585} y={260} textAnchor="middle" fontSize="9" fill="#6B7280">{t.loginLabel}</text>

        {/* GitHub Actions -> Cloud Run (deploy-time, dashed green) */}
        <line x1={385} y1={263} x2={385} y2={217} stroke="#2A5C45" strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#zcad-arrow-green)" />
        <rect x={392} y={230} width={190} height={20} rx={4} fill="#F8F7F4" opacity={0.9} />
        <text x={487} y={244} textAnchor="middle" fontSize="9" fontWeight={600} fill="#2A5C45">{t.deployLabel}</text>
      </svg>
    </ZoomableDiagram>
  );
}
