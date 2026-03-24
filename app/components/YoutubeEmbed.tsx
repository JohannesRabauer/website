interface Props {
  videoId: string;
  title?: string;
}

export default function YoutubeEmbed({ videoId, title = 'YouTube video' }: Props) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-blog-border shadow-md ring-1 ring-blog-purple/10 bg-blog-surface">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
