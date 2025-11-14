import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
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
          <span className="experience__subtitle">Professional Journey</span>
          <h2 className="experience__title">Experience & Achievements</h2>
          <p className="experience__intro">
            A track record of delivering enterprise-scale solutions across government, banking, and fintech sectors
          </p>
        </motion.div>

        <div className="experience__timeline">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="timeline-item__marker">
                <motion.div
                  className="timeline-item__dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                >
                  <Briefcase size={20} />
                </motion.div>
              </div>

              <motion.div
                className="timeline-item__content glass"
                whileHover={{ y: -5, boxShadow: 'var(--shadow-xl)' }}
              >
                <div className="timeline-item__header">
                  <div>
                    <h3 className="timeline-item__role">{exp.role}</h3>
                    <h4 className="timeline-item__company">{exp.company}</h4>
                  </div>
                  <div className="timeline-item__meta">
                    <div className="timeline-item__period">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="timeline-item__location">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="timeline-item__description">{exp.description}</p>

                <div className="timeline-item__highlights">
                  <h5 className="timeline-item__highlights-title">Key Achievements:</h5>
                  <ul className="timeline-item__highlights-list">
                    {exp.highlights.map((highlight, hIndex) => (
                      <motion.li
                        key={hIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + hIndex * 0.05 }}
                      >
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="timeline-item__technologies">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
