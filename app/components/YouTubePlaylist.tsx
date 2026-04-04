import Image from 'next/image';
import React from 'react';
import { FaPlay } from 'react-icons/fa';

interface YouTubePlaylistProps {
  title: string;
  playlistId: string;
  thumbnailVideoId: string;
}

const YouTubePlaylist: React.FC<YouTubePlaylistProps> = ({
  title,
  playlistId,
  thumbnailVideoId,
}) => {
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;

  return (
    <div className="youtube-playlist w-full">
      <a
        href={playlistUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-cyber-purple/30 bg-black/30 text-white shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-cyber-cyan/60"
      >
        <div className="relative aspect-video overflow-hidden bg-cyber-bg">
          <Image
            src={`https://img.youtube.com/vi/${thumbnailVideoId}/hqdefault.jpg`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/95 text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:bg-red-500">
              <FaPlay className="ml-1 h-5 w-5" aria-hidden="true" />
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
              Playlist
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-snug text-white">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between gap-4 px-5 py-4 text-left text-sm text-white/70">
          <span>Watch directly on YouTube</span>
          <span className="font-medium text-cyber-cyan transition group-hover:text-cyber-green">
            Open playlist
          </span>
        </div>
      </a>
    </div>
  );
};

export default YouTubePlaylist;