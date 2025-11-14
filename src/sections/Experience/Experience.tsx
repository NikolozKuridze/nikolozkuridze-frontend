import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { experience } from '../../data/profile';
import './Experience.css';

export const Experience = () => {
  return (
    <section id="experience" className="experience section">
      <div className="experience__container container">
        <motion.div
          className="experience__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="experience__subtitle">Career Journey</span>
          <h2 className="experience__title">Professional Experience</h2>
          <p className="experience__intro">
            Over 5 years of architecting enterprise-scale solutions across government, banking, and fintech sectors
          </p>
        </motion.div>

        <div className="experience__timeline">
          <div className="timeline__line" />

          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="experience-card__timeline-marker">
                <motion.div
                  className="timeline-marker__ring"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                />
                <motion.div
                  className="timeline-marker__icon"
                  initial={{ scale: 0, rotate: 180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <Briefcase size={24} />
                </motion.div>
              </div>

              <motion.div
                className="experience-card__content glass-premium"
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 60px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(99, 102, 241, 0.1)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="experience-card__header">
                  <div className="experience-card__title-group">
                    <h3 className="experience-card__role">{exp.role}</h3>
                    <div className="experience-card__company-badge">
                      <TrendingUp size={18} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="experience-card__meta">
                    <div className="meta-item meta-item--primary">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="experience-card__description">{exp.description}</p>

                <div className="experience-card__highlights">
                  <div className="highlights__header">
                    <div className="highlights__label">Key Impact</div>
                    <div className="highlights__count">{exp.highlights.length} achievements</div>
                  </div>
                  <ul className="highlights__list">
                    {exp.highlights.map((highlight, hIndex) => (
                      <motion.li
                        key={hIndex}
                        className="highlight-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.15 + hIndex * 0.08 }}
                      >
                        <span className="highlight-item__bullet" />
                        <span className="highlight-item__text">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="experience-card__footer">
                  <div className="tech-stack">
                    <span className="tech-stack__label">Tech Stack</span>
                    <div className="tech-stack__tags">
                      {exp.technologies.slice(0, 6).map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="tech-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.15 + techIndex * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {exp.technologies.length > 6 && (
                        <span className="tech-tag tech-tag--more">
                          +{exp.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
