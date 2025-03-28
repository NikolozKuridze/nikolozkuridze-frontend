import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.scss';

const Hero: React.FC = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Parallax effect for text elements
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!textRef.current) return;

            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Calculate distance from center (normalized)
            const moveX = (clientX - centerX) / centerX * 15;
            const moveY = (clientY - centerY) / centerY * 10;

            textRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Handle video loading
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('loadeddata', () => {
                setIsVideoLoaded(true);
            });
        }
    }, []);

    return (
        <section className="hero">
            <div className="hero__background">
                <div className="hero__gradient"></div>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`hero__video ${isVideoLoaded ? 'loaded' : ''}`}
                >
                    <source src="/assets/videos/showreel.mp4" type="video/mp4" />
                </video>

                {/* Fallback background for video loading */}
                <div className={`hero__fallback ${isVideoLoaded ? 'hidden' : ''}`}></div>
            </div>

            <div className="hero__content">
                <motion.div
                    ref={textRef}
                    className="hero__text-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.div
                        className="hero__title"
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.7,
                            type: "spring",
                            stiffness: 100
                        }}
                    >
                        <span className="hero__name">Nikoloz Kuridze</span>
                        <span className="hero__role">Senior .NET Developer</span>
                    </motion.div>

                    <motion.p
                        className="hero__description"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        Connecting technical solutions with creative vision to build highly secure,
                        high-performance software.
                    </motion.p>

                    <motion.div
                        className="hero__cta"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                    >
                        <Link to="/projects" className="hero__button hero__button--primary">
                            <span>View Projects</span>
                            <svg className="hero__button-arrow" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link to="/contact" className="hero__button hero__button--secondary">
                            <span>Contact Me</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="hero__scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="hero__mouse">
                    <div className="hero__scroll"></div>
                </div>
                <p>Scroll Down</p>
            </motion.div>
        </section>
    );
};

export default Hero;