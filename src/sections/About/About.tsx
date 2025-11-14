import { motion } from 'framer-motion';
import { Code2, Cloud, Database, Zap, Shield, GitBranch } from 'lucide-react';
import { skills, profile } from '../../data/profile';
import './About.css';

const skillCategories = [
  { title: 'Architecture', items: skills.architecture, icon: Zap, color: '#6366F1' },
  { title: 'Backend', items: skills.backend, icon: Code2, color: '#8B5CF6' },
  { title: 'Cloud & DevOps', items: skills.cloud, icon: Cloud, color: '#EC4899' },
  { title: 'Databases', items: skills.databases, icon: Database, color: '#F59E0B' },
  { title: 'Messaging', items: skills.messaging, icon: GitBranch, color: '#10B981' },
  { title: 'Tools & Monitoring', items: skills.tools, icon: Shield, color: '#3B82F6' },
];

export const About = () => {
  return (
    <section id="about" className="about section">
      <div className="about__container container">
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="about__subtitle">About Me</span>
          <h2 className="about__title">Crafting Excellence in Software Architecture</h2>
          <p className="about__intro">
            With over {profile.yearsOfExperience} years of experience in software engineering and solution architecture,
            I specialize in designing and building enterprise-scale systems that power critical infrastructure.
            My expertise spans cloud-native architectures, microservices, and high-performance distributed systems.
          </p>
        </motion.div>

        <div className="about__grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="skill-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)' }}
            >
              <div className="skill-card__header">
                <div
                  className="skill-card__icon"
                  style={{ '--icon-color': category.color } as React.CSSProperties}
                >
                  <category.icon size={24} />
                </div>
                <h3 className="skill-card__title">{category.title}</h3>
              </div>
              <ul className="skill-card__list">
                {category.items.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    className="skill-card__item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                  >
                    <span className="skill-card__bullet"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="about__highlights"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="highlight-card glass">
            <div className="highlight-card__icon">🎯</div>
            <h4 className="highlight-card__title">Mission-Critical Systems</h4>
            <p className="highlight-card__text">
              Architecting systems that serve millions of users with 99.99% uptime and zero-trust security
            </p>
          </div>
          <div className="highlight-card glass">
            <div className="highlight-card__icon">⚡</div>
            <h4 className="highlight-card__title">Performance Excellence</h4>
            <p className="highlight-card__text">
              Optimizing systems for sub-100ms response times and handling 500K+ transactions per day
            </p>
          </div>
          <div className="highlight-card glass">
            <div className="highlight-card__icon">🚀</div>
            <h4 className="highlight-card__title">Modern Architecture</h4>
            <p className="highlight-card__text">
              Implementing cloud-native, event-driven microservices with Clean Architecture and DDD principles
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
