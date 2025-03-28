import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.scss';

const Hero: React.FC = () => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!textRef.current) return;

            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            textRef.current.style.transform = `translate(${x}px, ${y}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="hero">
            <div className="hero__background">
                <div className="hero__gradient"></div>
                <video autoPlay muted loop className="hero__video">
                    <source src="/assets/videos/showreel.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="hero__content">
                <motion.div
                    ref={textRef}
                    className="hero__text-container"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="hero__title">
                        <span className="hero__name">ნიკოლოზ ქურიძე</span>
                        <span className="hero__role">Senior .NET Developer</span>
                    </h1>
                    <p className="hero__description">
                        ვაკავშირებ ტექნიკურ გადაწყვეტილებებს კრეატიულ ხედვასთან, რათა შევქმნა
                        უაღრესად უსაფრთხო, მაღალი წარმადობის პროგრამული უზრუნველყოფა.
                    </p>

                    <div className="hero__cta">
                        <Link to="/projects" className="hero__button hero__button--primary">
                            <span>ნამუშევრები</span>
                            <svg className="hero__button-arrow" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link to="/contact" className="hero__button hero__button--secondary">
                            <span>დამიკავშირდით</span>
                        </Link>
                    </div>
                </motion.div>
            </div>

            <div className="hero__scroll-indicator">
                <div className="hero__mouse">
                    <div className="hero__scroll"></div>
                </div>
                <p>სქროლი ქვემოთ</p>
            </div>
        </section>
    );
};

export default Hero;