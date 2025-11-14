import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Code2, Database } from 'lucide-react';
import { profile } from '../../data/profile';
import './Hero.css';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      {/* High-Tech Background */}
      <div className="hero__background">
        <div className="hero__tech-grid"></div>
        <div className="hero__circuit-pattern"></div>
        <div className="hero__gradient-orbs"></div>

        {/* Animated data streams - optimized */}
        <div className="hero__data-streams">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="data-stream"
              initial={{ x: Math.random() * 100 - 50, opacity: 0 }}
              animate={{
                y: [0, -1000],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'linear',
              }}
              style={{
                left: `${10 + i * 12}%`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="hero__container container"
        style={{ opacity }}
      >
        <div className="hero__content">
          <motion.div
            className="hero__badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', bounce: 0.4 }}
          >
            <Zap size={16} />
            <span>{profile.role}</span>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="hero__greeting">Hello, I'm</span>
            <span className="hero__name">{profile.name}</span>
            <span className="hero__role">
              <span className="hero__role-highlight">Enterprise</span> Solution Architect
            </span>
          </motion.h1>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {profile.tagline}
            <br />
            {profile.description}
          </motion.p>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              className="hero__stat"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="hero__stat-value">{profile.yearsOfExperience}</div>
              <div className="hero__stat-label">Years Experience</div>
            </motion.div>
            <div className="hero__stat-divider"></div>
            <motion.div
              className="hero__stat"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="hero__stat-value">{profile.projectsDelivered}</div>
              <div className="hero__stat-label">Projects Delivered</div>
            </motion.div>
            <div className="hero__stat-divider"></div>
            <motion.div
              className="hero__stat"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="hero__stat-value">99.99%</div>
              <div className="hero__stat-label">Uptime Achieved</div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.button
              className="btn btn-primary"
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(14, 165, 233, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Projects</span>
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Let's Connect</span>
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ y: y1 }}
        >
          <div className="hero__tech-sphere">
            <motion.div
              className="tech-sphere__core"
              animate={{
                boxShadow: [
                  '0 0 60px rgba(14, 165, 233, 0.4)',
                  '0 0 80px rgba(16, 185, 129, 0.6)',
                  '0 0 60px rgba(14, 165, 233, 0.4)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="tech-sphere__hexagon"></div>
            </motion.div>

            {/* Orbiting tech icons */}
            <motion.div
              className="tech-icon tech-icon--1"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Code2 size={24} />
            </motion.div>

            <motion.div
              className="tech-icon tech-icon--2"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <Database size={24} />
            </motion.div>

            <motion.div
              className="tech-icon tech-icon--3"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <Zap size={24} />
            </motion.div>

            {/* Hexagonal rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className={`hex-ring hex-ring--${ring}`}
                animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                transition={{
                  duration: 15 + ring * 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => scrollToSection('about')}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          className="hero__scroll-line"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};
