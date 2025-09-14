import React from 'react';

interface YouTubePlaylistProps {
  title: string;
  url: string;
}

const YouTubePlaylist: React.FC<YouTubePlaylistProps> = ({ title, url }) => {
  return (
    <div className="youtube-playlist">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <iframe
        width="100%"
        height="315"
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default YouTubePlaylist;