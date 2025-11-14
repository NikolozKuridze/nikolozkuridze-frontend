import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2, Award, ChevronDown } from 'lucide-react';
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
        const video = videoRef.current;
        const handleLoadedData = () => {
            setIsVideoLoaded(true);
        };

        if (video) {
            video.addEventListener('loadeddata', handleLoadedData);
        }

        return () => {
            if (video) {
                video.removeEventListener('loadeddata', handleLoadedData);
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
                        className="hero__badge"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <Sparkles className="hero__badge-icon" size={16} />
                        <span>Solution Architect</span>
                    </motion.div>

                    <motion.div
                        className="hero__heading"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <h1 className="hero__title">
                            <span className="hero__name">Nikoloz Kuridze</span>
                            <span className="hero__occupation">
                                <span className="hero__occupation-highlight">Enterprise</span> Solution Architect
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        className="hero__description"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        Architecting mission-critical enterprise systems with .NET excellence.
                        Specializing in cloud-native solutions, microservices architecture, and high-performance distributed systems.
                    </motion.p>

                    <motion.div
                        className="hero__stats"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                    >
                        <div className="hero__stat">
                            <Code2 size={20} />
                            <div className="hero__stat-content">
                                <span className="hero__stat-number">5+</span>
                                <span className="hero__stat-label">Years Experience</span>
                            </div>
                        </div>
                        <div className="hero__stat">
                            <Award size={20} />
                            <div className="hero__stat-content">
                                <span className="hero__stat-number">200+</span>
                                <span className="hero__stat-label">Projects Delivered</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero__cta"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <Link to="/projects" className="hero__button hero__button--primary">
                            <span>View Projects</span>
                            <ArrowRight className="hero__button-icon" size={20} />
                        </Link>

                        <Link to="/contact" className="hero__button hero__button--secondary">
                            <span>Let's Connect</span>
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
                <ChevronDown className="hero__scroll-icon" size={24} />
                <p>Scroll to Explore</p>
            </motion.div>
        </section>
    );
};

export default Hero;