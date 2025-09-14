import React from 'react';
import YouTubePlaylist from './YouTubePlaylist';

const Youtube: React.FC = () => {
    return (
        <div className="certifications items-center justify-center text-center ">
            <h2 className="text-cyber-purple text-2xl md:text-3xl font-semibold mb-6 animate-fade-in delay-100">YouTube</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start mt-8 space-x-4 py-6">
                <YouTubePlaylist
                    title="Local AI Chatbot Game in Java"
                    url="https://www.youtube.com/embed/videoseries?list=PLiY7ZRy4r3ybRddlcvxgnZt2h8odeqUm8&pp=gAQB"
                />
                <YouTubePlaylist
                    title="Tech & Conference Talks"
                    url="https://www.youtube.com/embed/videoseries?list=PLiY7ZRy4r3ybVkunRsGPkc-VBG3-pIBQ2&pp=gAQB"
                />
            </div>
        </div>
    );
};

export default Youtube;