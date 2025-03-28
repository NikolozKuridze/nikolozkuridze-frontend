import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.scss';

const navigationItems = [
    { path: '/', label: 'მთავარი' },
    { path: '/about', label: 'ჩემს შესახებ' },
    { path: '/experience', label: 'გამოცდილება' },
    { path: '/projects', label: 'პროექტები' },
    { path: '/video-portfolio', label: 'ვიდეო პორტფოლიო' },
    { path: '/contact', label: 'კონტაქტი' },
];

const Navigation: React.FC = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('up');
    const [prevScrollY, setPrevScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
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

    return (
        <>
            <motion.nav
                className={`navigation ${scrollDirection === 'down' ? 'hidden' : 'visible'}`}
                initial={{ y: -100 }}
                animate={{ y: scrollDirection === 'down' ? -100 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="navigation__logo">
                    <Link to="/">NK</Link>
                </div>
                <div className="navigation__desktop">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`navigation__link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                <button className="navigation__toggle" onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
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

export default Navigation;