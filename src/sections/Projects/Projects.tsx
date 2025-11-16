import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ExternalLink, Github } from 'lucide-react';
import { projectService } from '../../services/api.service';
import type { Project } from '../../types/api';
import './Projects.css';

export const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAll();
      // Handle the API response structure
      const projectsList: Project[] = Array.isArray(response) 
        ? response 
        : (response as any).projects || [];
      
      // Only show published projects on the public site
      const publishedProjects = projectsList.filter((project: Project) => project.published);
      
      // Sort by order (lower numbers first) and then by featured status
      const sortedProjects = publishedProjects.sort((a: Project, b: Project) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.order || 0) - (b.order || 0);
      });
      
      setProjects(sortedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // You can show a toast error here if you want
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  // Get unique categories from projects
  const dynamicCategories = ['All', ...new Set(projects.map(p => p.category))];

  if (loading) {
    return (
      <section id="projects" className="projects section">
        <div className="projects__container container">
          <div className="projects__header">
            <span className="projects__subtitle">Portfolio</span>
            <h2 className="projects__title">Featured Projects</h2>
          </div>
          <div className="projects__grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="project-card glass" style={{ opacity: 0.5 }}>
                <div className="project-card__image">
                  <div className="project-card__image-placeholder">
                    <TrendingUp size={48} />
                  </div>
                </div>
                <div className="project-card__content">
                  <div style={{ height: '20px', background: '#333', borderRadius: '4px', marginBottom: '10px' }}></div>
                  <div style={{ height: '60px', background: '#333', borderRadius: '4px', opacity: 0.7 }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

        {dynamicCategories.length > 1 && (
          <motion.div
            className="projects__filters"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {dynamicCategories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'filter-btn--active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="projects__grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProjects.length === 0 ? (
              <motion.div
                className="projects__empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#666'
                }}
              >
                <TrendingUp size={48} style={{ opacity: 0.3, marginBottom: '20px' }} />
                <h3>No projects found</h3>
                <p>Projects will appear here once they are published.</p>
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={(project as any).id || project.id}
                  className="project-card glass"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="project-card__image">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={typeof project.title === 'object' ? project.title.en : String(project.title)}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextSibling = e.currentTarget.nextElementSibling;
                          if (nextSibling && nextSibling instanceof HTMLElement) {
                            nextSibling.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div 
                      className="project-card__image-placeholder"
                      style={{ 
                        display: project.image ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        background: 'linear-gradient(135deg, #1e293b, #334155)'
                      }}
                    >
                      <TrendingUp size={48} />
                    </div>
                    <div className="project-card__category">{project.category}</div>
                    {project.featured && (
                      <div className="project-card__featured" style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#fbbf24',
                        color: '#000',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        FEATURED
                      </div>
                    )}
                  </div>

                  <div className="project-card__content">
                    <h3 className="project-card__title">
                      {typeof project.title === 'object' ? project.title.en : String(project.title)}
                    </h3>
                    <p className="project-card__description">
                      {typeof project.description === 'object' ? project.description.en : String(project.description)}
                    </p>

                    {/* Display links if available */}
                    {(project.demoUrl || project.githubUrl) && (
                      <div className="project-card__links" style={{
                        display: 'flex',
                        gap: '10px',
                        margin: '15px 0'
                      }}>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '6px 12px',
                              background: 'rgba(59, 130, 246, 0.1)',
                              color: '#3b82f6',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontSize: '14px',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                            }}
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '6px 12px',
                              background: 'rgba(100, 116, 139, 0.1)',
                              color: '#64748b',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontSize: '14px',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(100, 116, 139, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(100, 116, 139, 0.1)';
                            }}
                          >
                            <Github size={16} />
                            GitHub
                          </a>
                        )}
                      </div>
                    )}

                    <div className="project-card__technologies">
                      {project.technologies && project.technologies.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                      {project.technologies && project.technologies.length > 4 && (
                        <span className="tech-tag tech-tag--more">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};