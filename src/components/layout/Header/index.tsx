import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
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
    const [isOpen, setIsOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('up');
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if user has scrolled down enough to change header style
            setIsScrolled(currentScrollY > 50);

            // Determine scroll direction
            if (currentScrollY > prevScrollY) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollY]);

    // Close mobile menu when location changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <motion.nav
                className={`header ${scrollDirection === 'down' && isScrolled ? 'hidden' : 'visible'} ${isScrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: scrollDirection === 'down' && isScrolled ? -100 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="header__container">
                    <div className="header__logo">
                        <Link to="/">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                NK
                            </motion.span>
                        </Link>
                    </div>

                    <div className="header__desktop">
                        {navigationItems.map((item, index) => (
                            <motion.div
                                key={item.path}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link
                                    to={item.path}
                                    className={`header__link ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <button
                        className="header__toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        <span className={isOpen ? 'open' : ''}></span>
                        <span className={isOpen ? 'open' : ''}></span>
                        <span className={isOpen ? 'open' : ''}></span>
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="mobile-menu__content">
                            <button
                                className="mobile-menu__close"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close Menu"
                            >
                                <span></span>
                                <span></span>
                            </button>

                            {navigationItems.map((item, index) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={item.path}
                                        className={`mobile-menu__link ${location.pathname === item.path ? 'active' : ''}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;