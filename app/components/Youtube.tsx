import React from 'react';
import YouTubePlaylist from './YouTubePlaylist';

const Youtube: React.FC = () => {
    return (
        <section aria-labelledby="youtube-heading" className="certifications items-center justify-center text-center ">
            <h2 id="youtube-heading" className="text-cyber-purple text-2xl md:text-3xl font-semibold mb-6 animate-fade-in delay-100">YouTube</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch mt-8 py-6">
                <YouTubePlaylist
                    title="Local AI Chatbot Game in Java"
                    playlistId="PLiY7ZRy4r3ybRddlcvxgnZt2h8odeqUm8"
                />
                <YouTubePlaylist
                    title="Tech & Conference Talks"
                    playlistId="PLiY7ZRy4r3ybVkunRsGPkc-VBG3-pIBQ2"
                />
                <YouTubePlaylist
                    title="Vibe Coding in Java"
                    playlistId="PLiY7ZRy4r3yantT13lFvvi5fWtqo0fcBQ"
                />
                <YouTubePlaylist
                    title="Collaborations"
                    playlistId="PLiY7ZRy4r3yah08kElCyzHtiIKzlWmh6K"
                />
            </div>
        </section>
    );
};

export default Youtube;