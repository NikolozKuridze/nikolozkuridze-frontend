import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Globe } from 'lucide-react';
import { profile } from '../../data/profile';
import './Hero.css';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      {/* NASA-Inspired Space Background */}
      <div className="hero__background">
        <div className="hero__space-layer"></div>
        <div className="hero__stars hero__stars--1"></div>
        <div className="hero__stars hero__stars--2"></div>
        <div className="hero__stars hero__stars--3"></div>

        {/* Animated Earth/Globe */}
        <motion.div
          className="hero__earth"
          style={{ y: y1 }}
          animate={{
            rotate: 360,
          }}
          transition={{
            rotate: { duration: 200, repeat: Infinity, ease: "linear" }
          }}
        >
          <div className="hero__earth-inner">
            <Globe className="hero__earth-icon" size={120} />
          </div>
          <div className="hero__earth-glow"></div>
        </motion.div>

        {/* Floating Satellites */}
        <motion.div
          className="hero__satellite hero__satellite--1"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Rocket size={32} />
        </motion.div>

        <motion.div
          className="hero__satellite hero__satellite--2"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [0, -20, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Rocket size={24} />
        </motion.div>

        {/* Nebula effects */}
        <div className="hero__nebula hero__nebula--1"></div>
        <div className="hero__nebula hero__nebula--2"></div>
        <div className="hero__nebula hero__nebula--3"></div>

        {/* Grid overlay */}
        <div className="hero__grid-overlay"></div>
      </div>

      {/* Animated particles */}
      <div className="hero__particles">
        {[...Array(30)].map((_, i) => (
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
              y: [null, Math.random() * -200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
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
            transition={{ duration: 0.6, delay: 0.3, type: 'spring', bounce: 0.5 }}
          >
            <Sparkles size={16} />
            <span>{profile.role}</span>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="hero__greeting">Hello, I'm</span>
            <span className="hero__name">{profile.name}</span>
            <span className="hero__role">
              <span className="hero__role-highlight">Enterprise</span> Solution Architect
            </span>
          </motion.h1>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {profile.tagline}
            <br />
            {profile.description}
          </motion.p>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <motion.button
              className="btn btn-primary"
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(99, 102, 241, 0.4)' }}
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
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          style={{ y: y2 }}
        >
          <div className="hero__orb-container">
            <motion.div
              className="hero__orb"
              animate={{
                rotateY: 360,
                rotateZ: [0, 5, 0, -5, 0]
              }}
              transition={{
                rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="hero__orb-inner"></div>
              <div className="hero__orb-shine"></div>
            </motion.div>

            {/* Orbiting rings */}
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                className={`hero__orbit-ring hero__orbit-ring--${ring}`}
                animate={{ rotateX: 75, rotateZ: 360 }}
                transition={{
                  rotateZ: {
                    duration: 20 + ring * 5,
                    repeat: Infinity,
                    ease: "linear",
                    direction: ring % 2 === 0 ? "normal" : "reverse"
                  }
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
        transition={{ delay: 2, duration: 1 }}
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
