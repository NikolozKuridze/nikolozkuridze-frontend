import React from 'react';
import VideoGallery from '../components/sections/VideoGallery';

const VideoPortfolioPage: React.FC = () => {
    return (
        <div className="video-portfolio-page">
            <div className="container">
                <div className="video-portfolio-page__header">
                    <h1>Video Portfolio</h1>
                    <p className="video-portfolio-page__subtitle">
                        My creative works showcasing my video editing and visual design skills
                    </p>
                </div>

                <VideoGallery />
            </div>
        </div>
    );
};

export default VideoPortfolioPage;