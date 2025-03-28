import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '@/components/ui/ThemeToggle';
import './Header.scss';

const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/video-portfolio', label: 'Video Portfolio' },
    { path: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [, setScrollY] = useState(0);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const prevScrollY = useRef(0);

    // Handle scroll logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine scroll direction
            setIsScrollingDown(currentScrollY > prevScrollY.current);

            // Determine if header should be scrolled style
            setIsScrolled(currentScrollY > 50);

            setScrollY(currentScrollY);
            prevScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <>
            <motion.header
                className={`header ${isScrolled ? 'header--scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{
                    y: isScrollingDown && isScrolled && !isMenuOpen ? -100 : 0
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="header__container">
                    <Link
                        to="/"
                        className="header__logo"
                        aria-label="Nikoloz Kuridze"
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            NK
                        </motion.span>
                    </Link>

                    <div className="header__actions">
                        <div className="header__nav">
                            {navigationItems.map((item, index) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.05,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    <Link
                                        to={item.path}
                                        className={`header__nav-link ${
                                            location.pathname === item.path ? 'header__nav-link--active' : ''
                                        }`}
                                    >
                                        {item.label}
                                        {location.pathname === item.path && (
                                            <motion.div
                                                className="header__nav-highlight"
                                                layoutId="nav-highlight"
                                                transition={{ type: 'spring', duration: 0.5 }}
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="header__controls">
                            <ThemeToggle />

                            <button
                                className="header__menu-toggle"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMenuOpen}
                            >
                                <div className={`header__menu-icon ${isMenuOpen ? 'header__menu-icon--open' : ''}`}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mobile-menu__container">
                            <div className="mobile-menu__header">
                                <Link
                                    to="/"
                                    className="mobile-menu__logo"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    NK
                                </Link>

                                <button
                                    className="mobile-menu__close"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <nav className="mobile-menu__nav">
                                {navigationItems.map((item, index) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                    >
                                        <Link
                                            to={item.path}
                                            className={`mobile-menu__nav-link ${
                                                location.pathname === item.path ? 'mobile-menu__nav-link--active' : ''
                                            }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="mobile-menu__footer">
                                <ThemeToggle />
                                <div className="mobile-menu__socials">
                                    <a href="https://linkedin.com/in/nikolozkuridze" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                    <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                    <a href="mailto:niko.quridze@gmail.com" aria-label="Email">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;