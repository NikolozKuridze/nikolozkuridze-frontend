import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin, TrendingUp, Zap, Target } from 'lucide-react';
import { experience } from '../../data/profile';
import './Experience.css';
import { useRef } from 'react';

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="experience" className="experience section" ref={sectionRef}>
      {/* Animated background */}
      <div className="experience__background">
        <motion.div
          className="experience__bg-shape experience__bg-shape--1"
          style={{ y }}
        />
        <motion.div
          className="experience__bg-shape experience__bg-shape--2"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        />
        <div className="experience__grid-pattern" />
      </div>

      <div className="experience__container container">
        <motion.div
          className="experience__header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="experience__subtitle"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Career Journey
          </motion.span>
          <motion.h2
            className="experience__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Professional Experience
          </motion.h2>
          <motion.p
            className="experience__intro"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Over 5 years of architecting enterprise-scale solutions across government, banking, and fintech sectors
          </motion.p>
        </motion.div>

        <div className="experience__journey">
          {/* Animated timeline path */}
          <svg className="experience__timeline-svg" viewBox="0 0 100 1000" preserveAspectRatio="none">
            <motion.path
              d="M 50 0 Q 30 100 50 200 Q 70 300 50 400 Q 30 500 50 600 Q 70 700 50 800 Q 30 900 50 1000"
              fill="none"
              stroke="url(#timeline-gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.8)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0.3)" />
              </linearGradient>
            </defs>
          </svg>

          {experience.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                className={`experience-item ${isEven ? 'experience-item--left' : 'experience-item--right'}`}
                initial={{ opacity: 0, x: isEven ? -100 : 100, rotateY: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 80
                }}
              >
                {/* Timeline marker */}
                <motion.div
                  className="experience-item__marker"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                >
                  <motion.div
                    className="marker__outer-ring"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                  <motion.div
                    className="marker__inner"
                    whileHover={{ scale: 1.3, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Briefcase size={20} />
                  </motion.div>
                </motion.div>

                {/* Content card */}
                <motion.div
                  className="experience-item__card"
                  whileHover={{
                    scale: 1.02,
                    rotateY: isEven ? 2 : -2,
                    z: 50
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card__glow" />

                  <div className="card__header">
                    <div className="card__title-wrapper">
                      <motion.h3
                        className="card__role"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.4 }}
                      >
                        {exp.role}
                      </motion.h3>

                      <motion.div
                        className="card__company"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                      >
                        <TrendingUp size={18} />
                        <span>{exp.company}</span>
                      </motion.div>
                    </div>

                    <motion.div
                      className="card__meta"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.6 }}
                    >
                      <div className="meta-badge meta-badge--primary">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="meta-badge">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </motion.div>
                  </div>

                  <motion.p
                    className="card__description"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.7 }}
                  >
                    {exp.description}
                  </motion.p>

                  <div className="card__highlights">
                    <div className="highlights__header">
                      <Zap size={18} className="highlights__icon" />
                      <span className="highlights__title">Key Achievements</span>
                      <span className="highlights__count">{exp.highlights.length}</span>
                    </div>

                    <ul className="highlights__list">
                      {exp.highlights.map((highlight, hIndex) => (
                        <motion.li
                          key={hIndex}
                          className="highlight-item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.2 + 0.8 + hIndex * 0.1
                          }}
                          whileHover={{ x: 5, backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                        >
                          <Target size={14} className="highlight-item__icon" />
                          <span className="highlight-item__text">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.div
                    className="card__tech"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 1 }}
                  >
                    <div className="tech__label">Technologies</div>
                    <div className="tech__stack">
                      {exp.technologies.slice(0, 6).map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="tech-badge"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.2 + 1.1 + techIndex * 0.05,
                            type: "spring"
                          }}
                          whileHover={{
                            scale: 1.1,
                            y: -3,
                            boxShadow: '0 5px 20px rgba(99, 102, 241, 0.3)'
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {exp.technologies.length > 6 && (
                        <motion.span
                          className="tech-badge tech-badge--more"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.2 + 1.4
                          }}
                        >
                          +{exp.technologies.length - 6} more
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
