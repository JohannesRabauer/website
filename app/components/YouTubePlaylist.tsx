import ExternalContentGate from './ExternalContentGate';
import React from 'react';

interface YouTubePlaylistProps {
  title: string;
  playlistId: string;
}

const YouTubePlaylist: React.FC<YouTubePlaylistProps> = ({ title, playlistId }) => {
  const embedUrl = `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`;
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;

  return (
    <div className="youtube-playlist w-full">
      <ExternalContentGate
        title={title}
        description="Mit einem Klick wird die Playlist von YouTube geladen. Dabei können personenbezogene Daten an YouTube oder Google übermittelt und Cookies gesetzt werden."
        loadLabel="Playlist laden"
        externalHref={playlistUrl}
        externalLabel="Auf YouTube öffnen"
        variant="dark"
      >
        <div>
          <h3 className="mb-2 text-lg font-semibold">{title}</h3>
          <iframe
            width="100%"
            height="315"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </ExternalContentGate>
    </div>
  );
};

export default YouTubePlaylist;