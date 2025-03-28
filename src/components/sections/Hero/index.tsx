import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.scss';

const Hero: React.FC = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Handle parallax effect
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const translateY = useTransform(scrollYProgress, [0, 1], [0, 200]);

    // Handle video loading
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('loadeddata', () => {
                setIsVideoLoaded(true);
            });
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadeddata', () => {
                    setIsVideoLoaded(true);
                });
            }
        };
    }, []);

    // Subtle mouse parallax effect for content
    useEffect(() => {
        if (!contentRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Calculate distance from center (normalized)
            const moveX = (clientX - centerX) / centerX * 20;
            const moveY = (clientY - centerY) / centerY * 10;

            if (contentRef.current) {
                contentRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section ref={heroRef} className="hero">
            <motion.div
                className="hero__background"
                style={{ opacity }}
            >
                <div className="hero__background-gradient"></div>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`hero__video ${isVideoLoaded ? 'hero__video--loaded' : ''}`}
                >
                    <source src="/assets/videos/showreel.mp4" type="video/mp4" />
                </video>

                {/* Fallback background for video loading */}
                <div className={`hero__background-fallback ${isVideoLoaded ? 'hero__background-fallback--hidden' : ''}`}></div>
            </motion.div>

            <motion.div
                className="hero__content"
                style={{ y: translateY }}
            >
                <motion.div
                    ref={contentRef}
                    className="hero__content-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.div
                        className="hero__heading"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <h1 className="hero__title">
                            <span className="hero__name">Nikoloz Kuridze</span>
                            <span className="hero__occupation">Senior .NET Developer</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        className="hero__description"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        Specializing in high-performance, secure software solutions with a creative approach to technical challenges.
                    </motion.p>

                    <motion.div
                        className="hero__cta"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                    >
                        <Link to="/projects" className="hero__button hero__button--primary">
                            View Projects
                            <svg className="hero__button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>

                        <Link to="/contact" className="hero__button hero__button--secondary">
                            Get in Touch
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

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