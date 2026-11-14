import ZoomableDiagram from './ZoomableDiagram';

interface Copy {
  ariaLabel: string;
  jobsBand: string;
  liveBand: string;
  homeDeckTitle: string;
  homeDeckSubtitle: string;
  prepareTitle: string;
  prepareSubtitle: string;
  trainTitle: string;
  trainSubtitle: string;
  modelTitle: string;
  modelSubtitle: string;
  awayDeckTitle: string;
  awayDeckSubtitle: string;
  webcamTitle: string;
  webcamSubtitle: string;
  classifyTitle: string;
  classifySubtitle: string;
  guessTitle: string;
  guessSubtitle: string;
  mismatchLabel: string;
  mismatchSubLabel: string;
}

const COPY: Record<'en' | 'de', Copy> = {
  en: {
    ariaLabel:
      'Diagram of the card classifier built live. Top row, running as JobRunr background jobs: the home deck, about 30 webcam photos per card taken in Ronald\'s room, goes into a prepare job that splits and crops the images, then into a train job that trains a small head on top of a pretrained ResNet 18, which writes the file head.jd. Bottom row, a live synchronous call: the away deck, Johannes holding cards in his own room, gives a webcam frame, which ResNet 18 plus head.jd classify into a card guess. A red dashed line between the two decks marks the mismatch: different room, light and prints.',
    jobsBand: 'JobRunr background jobs: slow, minutes',
    liveBand: 'Live synchronous call: no job, no waiting',
    homeDeckTitle: 'Home deck',
    homeDeckSubtitle: "Ronald's room, ~30 photos/card",
    prepareTitle: 'Prepare job',
    prepareSubtitle: 'split ~80/20, crop',
    trainTitle: 'Train job',
    trainSubtitle: 'ResNet 18 + new head',
    modelTitle: 'head.jd',
    modelSubtitle: 'the trained head',
    awayDeckTitle: 'Away deck',
    awayDeckSubtitle: "Johannes's room, live",
    webcamTitle: 'Webcam frame',
    webcamSubtitle: 'one picture',
    classifyTitle: 'Classify',
    classifySubtitle: 'ResNet 18 + head.jd',
    guessTitle: 'Card guess',
    guessSubtitle: 'name + confidence',
    mismatchLabel: 'different room,',
    mismatchSubLabel: 'light and prints',
  },
  de: {
    ariaLabel:
      'Diagramm des live gebauten Karten-Klassifikators. Obere Reihe, als JobRunr-Hintergrundjobs: Das Heimdeck, etwa 30 Webcam-Fotos pro Karte aus Ronalds Zimmer, geht in einen Prepare-Job, der die Bilder aufteilt und zuschneidet, dann in einen Train-Job, der einen kleinen Kopf auf einem vortrainierten ResNet 18 trainiert und die Datei head.jd schreibt. Untere Reihe, ein synchroner Live-Aufruf: Das Auswärtsdeck, Johannes hält Karten in seinem eigenen Zimmer, liefert ein Webcam-Bild, das ResNet 18 mit head.jd einer Karte zuordnet. Eine rote gestrichelte Linie zwischen den beiden Decks markiert den Unterschied: anderes Zimmer, anderes Licht, andere Ausdrucke.',
    jobsBand: 'JobRunr-Hintergrundjobs: langsam, Minuten',
    liveBand: 'Synchroner Live-Aufruf: kein Job, kein Warten',
    homeDeckTitle: 'Heimdeck',
    homeDeckSubtitle: 'Ronalds Zimmer, ~30 Fotos/Karte',
    prepareTitle: 'Prepare-Job',
    prepareSubtitle: 'Aufteilung ~80/20, Zuschnitt',
    trainTitle: 'Train-Job',
    trainSubtitle: 'ResNet 18 + neuer Kopf',
    modelTitle: 'head.jd',
    modelSubtitle: 'der trainierte Kopf',
    awayDeckTitle: 'Auswärtsdeck',
    awayDeckSubtitle: 'Johannes’ Zimmer, live',
    webcamTitle: 'Webcam-Bild',
    webcamSubtitle: 'ein Foto',
    classifyTitle: 'Klassifizieren',
    classifySubtitle: 'ResNet 18 + head.jd',
    guessTitle: 'Erkannte Karte',
    guessSubtitle: 'Name + Konfidenz',
    mismatchLabel: 'anderes Zimmer,',
    mismatchSubLabel: 'Licht, Ausdrucke',
  },
};

interface Props {
  locale?: 'en' | 'de';
}

function Deck({ x, y, color, fill, title, subtitle }: { x: number; y: number; color: string; fill: string; title: string; subtitle: string }) {
  return (
    <g>
      <rect x={x + 10} y={y - 8} width={170} height={70} rx={12} fill="#FFFFFF" stroke={color} strokeWidth={1} opacity={0.5} />
      <rect x={x + 5} y={y - 4} width={170} height={70} rx={12} fill="#FFFFFF" stroke={color} strokeWidth={1} opacity={0.75} />
      <rect x={x} y={y} width={170} height={70} rx={12} fill={fill} stroke={color} strokeWidth={1.5} />
      <text x={x + 85} y={y + 32} textAnchor="middle" fontSize="13" fontWeight={700} fill={color}>{title}</text>
      <text x={x + 85} y={y + 50} textAnchor="middle" fontSize="9.5" fill={color}>{subtitle}</text>
    </g>
  );
}

function Box({ x, y, w, color, fill, title, subtitle }: { x: number; y: number; w: number; color: string; fill: string; title: string; subtitle: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={70} rx={12} fill={fill} stroke={color} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + 32} textAnchor="middle" fontSize="13" fontWeight={700} fill={color}>{title}</text>
      <text x={x + w / 2} y={y + 50} textAnchor="middle" fontSize="9.5" fill={color}>{subtitle}</text>
    </g>
  );
}

export default function CardClassifierDeckDiagram({ locale = 'en' }: Props) {
  const t = COPY[locale];
  const green = '#2A5C45';
  const greenFill = '#E6F0EC';
  const purple = '#3D2B6B';
  const purpleFill = '#EDE8F5';
  const rust = '#B5351A';

  return (
    <ZoomableDiagram ariaLabel={t.ariaLabel}>
      <svg viewBox="0 0 940 340" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="ccdd-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={green} />
          </marker>
          <marker id="ccdd-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7C5CBF" />
          </marker>
          <marker id="ccdd-arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF" />
          </marker>
        </defs>

        {/* band labels */}
        <text x={20} y={24} fontSize="11" fontWeight={700} fill={green}>{t.jobsBand}</text>
        <text x={20} y={330} fontSize="11" fontWeight={700} fill={purple}>{t.liveBand}</text>

        {/* top row: background jobs */}
        <Deck x={20} y={50} color={green} fill={greenFill} title={t.homeDeckTitle} subtitle={t.homeDeckSubtitle} />
        <Box x={250} y={50} w={170} color={green} fill={greenFill} title={t.prepareTitle} subtitle={t.prepareSubtitle} />
        <Box x={480} y={50} w={170} color={green} fill={greenFill} title={t.trainTitle} subtitle={t.trainSubtitle} />
        <Box x={720} y={50} w={200} color="#1A1A2E" fill="#F8F7F4" title={t.modelTitle} subtitle={t.modelSubtitle} />

        <line x1={200} y1={85} x2={243} y2={85} stroke={green} strokeWidth={2} markerEnd="url(#ccdd-arrow-green)" />
        <line x1={420} y1={85} x2={473} y2={85} stroke={green} strokeWidth={2} markerEnd="url(#ccdd-arrow-green)" />
        <line x1={650} y1={85} x2={713} y2={85} stroke={green} strokeWidth={2} markerEnd="url(#ccdd-arrow-green)" />

        {/* bottom row: live synchronous call */}
        <Deck x={20} y={228} color={purple} fill={purpleFill} title={t.awayDeckTitle} subtitle={t.awayDeckSubtitle} />
        <Box x={250} y={228} w={170} color={purple} fill={purpleFill} title={t.webcamTitle} subtitle={t.webcamSubtitle} />
        <Box x={480} y={228} w={170} color={purple} fill={purpleFill} title={t.classifyTitle} subtitle={t.classifySubtitle} />
        <Box x={720} y={228} w={200} color={purple} fill="#FFFFFF" title={t.guessTitle} subtitle={t.guessSubtitle} />

        <line x1={200} y1={263} x2={243} y2={263} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#ccdd-arrow-purple)" />
        <line x1={420} y1={263} x2={473} y2={263} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#ccdd-arrow-purple)" />
        <line x1={650} y1={263} x2={713} y2={263} stroke="#7C5CBF" strokeWidth={2} markerEnd="url(#ccdd-arrow-purple)" />

        {/* model file feeds the live classifier */}
        <path d="M820,122 C820,175 600,170 590,214" fill="none" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="4 4" markerEnd="url(#ccdd-arrow-gray)" />

        {/* the mismatch between home and away deck */}
        <line x1={105} y1={126} x2={105} y2={210} stroke={rust} strokeWidth={2} strokeDasharray="6 4" />
        <circle cx={105} cy={168} r={11} fill="#FFFFFF" stroke={rust} strokeWidth={2} />
        <text x={105} y={172.5} textAnchor="middle" fontSize="13" fontWeight={700} fill={rust}>≠</text>
        <text x={124} y={164} fontSize="10.5" fontWeight={700} fill={rust}>{t.mismatchLabel}</text>
        <text x={124} y={179} fontSize="10.5" fontWeight={700} fill={rust}>{t.mismatchSubLabel}</text>
      </svg>
    </ZoomableDiagram>
  );
}
