import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './VideoGallery.scss';

const videos = [
    {
        id: 1,
        title: 'Creative Showreel',
        thumbnail: '/assets/images/videos/thumbnail1.jpg',
        url: 'https://vimeo.com/628993851',
        description: 'პროფესიონალური ვიდეო რედაქტირება Adobe Premiere Pro-ში',
    },
    {
        id: 2,
        title: 'Motion Graphics',
        thumbnail: '/assets/images/videos/thumbnail2.jpg',
        url: 'https://vimeo.com/628993354',
        description: 'მოძრავი გრაფიკები After Effects-ის გამოყენებით',
    },
    {
        id: 3,
        title: 'Visual Effects',
        thumbnail: '/assets/images/videos/thumbnail3.jpg',
        url: 'https://vimeo.com/628992830',
        description: 'ვიზუალური ეფექტები და კომპოზიცია',
    },
    {
        id: 4,
        title: 'Cinematic Edit',
        thumbnail: '/assets/images/videos/thumbnail4.jpg',
        url: 'https://vimeo.com/628992686',
        description: 'კინემატოგრაფიული ვიდეო რედაქტირება',
    },
];

const VideoGallery: React.FC = () => {
    const [activeVideo, setActiveVideo] = useState<number | null>(null);
    const videoRefs = useRef<Array<HTMLIFrameElement | null>>([]);

    const openVideo = (index: number) => {
        setActiveVideo(index);
    };

    const closeVideo = () => {
        if (activeVideo !== null && videoRefs.current[activeVideo]) {
            // პაუზა ვიდეოზე როცა იხურება
            const iframe = videoRefs.current[activeVideo];
            const iframeSrc = iframe?.src;
            if (iframe && iframeSrc) {
                iframe.src = iframeSrc;
            }
        }
        setActiveVideo(null);
    };

    return (
        <section className="video-gallery">
            <div className="video-gallery__header">
                <h2 className="video-gallery__title">ვიდეო პორტფოლიო</h2>
                <p className="video-gallery__subtitle">
                    ჩემი შემოქმედებითი ნამუშევრების კოლექცია, რომელიც აჩვენებს ჩემს უნარებს
                    ვიდეო რედაქტირებასა და ვიზუალურ დიზაინში.
                </p>
            </div>

            <div className="video-gallery__grid">
                {videos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        className="video-gallery__item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => openVideo(index)}
                    >
                        <div className="video-gallery__thumbnail">
                            <img src={video.thumbnail} alt={video.title} />
                            <div className="video-gallery__play">
                                <svg viewBox="0 0 24 24">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                            </div>
                        </div>
                        <div className="video-gallery__info">
                            <h3>{video.title}</h3>
                            <p>{video.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {activeVideo !== null && (
                <motion.div
                    className="video-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="video-modal__content">
                        <button className="video-modal__close" onClick={closeVideo}>
                            <span></span>
                            <span></span>
                        </button>
                        <div className="video-modal__video-container">
                            <iframe
                                ref={(el) => (videoRefs.current[activeVideo] = el)}
                                src={`${videos[activeVideo].url}?autoplay=1&title=0&byline=0&portrait=0`}
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="video-modal__info">
                            <h3>{videos[activeVideo].title}</h3>
                            <p>{videos[activeVideo].description}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </section>
    );
};

export default VideoGallery;