import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { profile } from '../../data/profile';
import './Hero.css';

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero__background">
        <div className="hero__gradient hero__gradient--1"></div>
        <div className="hero__gradient hero__gradient--2"></div>
        <div className="hero__gradient hero__gradient--3"></div>
        <div className="hero__grid"></div>
      </div>

      <div className="hero__particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="hero__particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="hero__container container">
        <div className="hero__content">
          <motion.div
            className="hero__badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          >
            <Sparkles size={16} />
            <span>{profile.role}</span>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {profile.tagline}
            <br />
            {profile.description}
          </motion.p>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="hero__stat">
              <div className="hero__stat-value">{profile.yearsOfExperience}</div>
              <div className="hero__stat-label">Years Experience</div>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <div className="hero__stat-value">{profile.projectsDelivered}</div>
              <div className="hero__stat-label">Projects Delivered</div>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <div className="hero__stat-value">99.99%</div>
              <div className="hero__stat-label">Uptime Achieved</div>
            </div>
          </motion.div>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              <span>View Projects</span>
              <ArrowRight size={20} />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              <span>Let's Connect</span>
            </button>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="hero__sphere">
            <div className="hero__sphere-inner"></div>
            <div className="hero__sphere-ring hero__sphere-ring--1"></div>
            <div className="hero__sphere-ring hero__sphere-ring--2"></div>
            <div className="hero__sphere-ring hero__sphere-ring--3"></div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => scrollToSection('about')}
      >
        <div className="hero__scroll-line"></div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};
