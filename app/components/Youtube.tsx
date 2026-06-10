import React from 'react';
import YouTubePlaylist from './YouTubePlaylist';
import SectionHeading from './SectionHeading';

const Youtube: React.FC = () => {
    return (
        <section aria-labelledby="youtube-heading" className="w-full max-w-6xl px-4 pb-16 text-center">
            <SectionHeading
                id="youtube-heading"
                kicker="// watch"
                title="YouTube"
                colorClass="text-cyber-purple"
                dividerColor="#7b2ff7"
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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