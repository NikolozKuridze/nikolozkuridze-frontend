import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { projects } from '../../data/profile';
import './Projects.css';

const categories = ['All', 'Enterprise', 'Financial', 'AI/ML', 'Web Platform'];

export const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects section">
      <div className="projects__container container">
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="projects__subtitle">Portfolio</span>
          <h2 className="projects__title">Featured Projects</h2>
          <p className="projects__intro">
            Showcasing enterprise-scale solutions that power critical infrastructure and serve millions of users
          </p>
        </motion.div>

        <motion.div
          className="projects__filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="projects__grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card glass"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-card__image">
                  <div className="project-card__image-placeholder">
                    <TrendingUp size={48} />
                  </div>
                  <div className="project-card__category">{project.category}</div>
                </div>

                <div className="project-card__content">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__description">{project.description}</p>

                  <div className="project-card__metrics">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="project-metric">
                        <div className="project-metric__value">{value}</div>
                        <div className="project-metric__label">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="project-card__technologies">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-tag tech-tag--more">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
