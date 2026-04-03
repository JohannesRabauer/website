import ExternalContentGate from './ExternalContentGate';

interface Props {
  videoId: string;
  title?: string;
}

export default function YoutubeEmbed({ videoId, title = 'YouTube video' }: Props) {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-blog-border shadow-md ring-1 ring-blog-purple/10 bg-blog-surface">
      <ExternalContentGate
        title="YouTube-Video laden"
        description="Mit einem Klick wird das Video von YouTube geladen. Dabei können personenbezogene Daten an YouTube oder Google übermittelt und Cookies gesetzt werden."
        loadLabel="Video laden"
        externalHref={watchUrl}
        externalLabel="Auf YouTube öffnen"
        preview={
          <div className="relative aspect-video overflow-hidden bg-blog-purple-light">
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        }
      >
        <div className="relative pb-[56.25%] h-0">
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </ExternalContentGate>
    </div>
  );
}
