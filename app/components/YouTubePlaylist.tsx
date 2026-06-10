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
    <div className="youtube-playlist w-full h-full">
      <a
        href={playlistUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm text-white shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-cyber-cyan/40 hover:shadow-[0_0_28px_rgba(0,242,254,0.1)]"
      >
        <div className="relative aspect-video overflow-hidden bg-black/40">
          <Image
            src={`https://img.youtube.com/vi/${thumbnailVideoId}/maxresdefault.jpg`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-13 w-13 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg shadow-black/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500 group-hover:shadow-red-500/30">
              <FaPlay className="ml-1 h-5 w-5" aria-hidden="true" />
            </span>
          </div>
          {/* Overlay text */}
          <div className="absolute inset-x-0 bottom-0 p-4 text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55 mb-1">
              {"// playlist"}
            </p>
            <h3 className="text-base font-semibold leading-snug text-white">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3 text-left text-xs text-white/50">
          <span>Watch on YouTube</span>
          <span className="font-mono font-medium text-cyber-cyan/80 transition-colors duration-200 group-hover:text-cyber-green">
            Open →
          </span>
        </div>
      </a>
    </div>
  );
};

export default YouTubePlaylist;