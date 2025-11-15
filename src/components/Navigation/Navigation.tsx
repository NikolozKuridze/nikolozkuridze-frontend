import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { Logo } from '../Logo/Logo';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import './Navigation.css';

const navItems = [
  { id: 'home', label: 'Home', isSection: true },
  { id: 'about', label: 'About', isSection: true },
  { id: 'experience', label: 'Experience', isSection: true },
  { id: 'achievements', label: 'Achievements', isSection: true },
  { id: 'projects', label: 'Projects', isSection: true },
  { id: 'blogs', label: 'Blog', isSection: false, path: '/blogs' },
  { id: 'contact', label: 'Contact', isSection: true },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.filter(item => item.isSection).map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems.filter(item => item.isSection)[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isSection) {
      if (location.pathname !== '/') {
        // If not on home page, navigate to home first
        window.location.href = `/#${item.id}`;
      } else {
        scrollToSection(item.id);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="nav__container container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Logo />
          </motion.div>

          <motion.ul
            className="nav__menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                {item.isSection ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`nav__link ${activeSection === item.id ? 'nav__link--active' : ''}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.path || '#'}
                    onClick={() => handleNavClick(item)}
                    className={`nav__link ${location.pathname === item.path ? 'nav__link--active' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="nav__actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className="nav__toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="nav__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="nav__mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <ul className="nav__mobile-menu">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.isSection ? (
                      <button
                        onClick={() => handleNavClick(item)}
                        className={`nav__mobile-link ${activeSection === item.id ? 'nav__mobile-link--active' : ''}`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        to={item.path || '#'}
                        onClick={() => handleNavClick(item)}
                        className={`nav__mobile-link ${location.pathname === item.path ? 'nav__mobile-link--active' : ''}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
