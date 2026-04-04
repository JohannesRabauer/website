import React from 'react';
import YouTubePlaylist from './YouTubePlaylist';

const Youtube: React.FC = () => {
    return (
        <section aria-labelledby="youtube-heading" className="certifications w-full max-w-6xl px-4 pb-6 text-center">
            <h2 id="youtube-heading" className="text-cyber-purple text-2xl md:text-3xl font-semibold mb-6 animate-fade-in delay-100">YouTube</h2>
            <div className="grid grid-cols-1 gap-6 pt-2 pb-6 md:grid-cols-2 xl:grid-cols-4">
                <YouTubePlaylist
                    title="Local AI Chatbot Game in Java"
                    playlistId="PLiY7ZRy4r3ybRddlcvxgnZt2h8odeqUm8"
                    thumbnailVideoId="kZVYYqCFVM8"
                />
                <YouTubePlaylist
                    title="Tech & Conference Talks"
                    playlistId="PLiY7ZRy4r3ybVkunRsGPkc-VBG3-pIBQ2"
                    thumbnailVideoId="KUv1xFTjxKw"
                />
                <YouTubePlaylist
                    title="Vibe Coding in Java"
                    playlistId="PLiY7ZRy4r3yantT13lFvvi5fWtqo0fcBQ"
                    thumbnailVideoId="SVJC4DuFwsY"
                />
                <YouTubePlaylist
                    title="Collaborations"
                    playlistId="PLiY7ZRy4r3yah08kElCyzHtiIKzlWmh6K"
                    thumbnailVideoId="7oVisn4cVxY"
                />
            </div>
        </section>
    );
};

export default Youtube;