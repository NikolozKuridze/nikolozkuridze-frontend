import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../../../constants/projects';
import './Projects.scss';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
    type: 'web' | 'backend' | 'corporate' | 'financial';
}

const Projects: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = selectedFilter === 'all'
        ? projectsData
        : projectsData.filter(project => project.type === selectedFilter);

    const filters = [
        { id: 'all', label: 'ყველა' },
        { id: 'web', label: 'ვებ აპლიკაციები' },
        { id: 'backend', label: 'ბექენდ სისტემები' },
        { id: 'corporate', label: 'კორპორატიული' },
        { id: 'financial', label: 'ფინანსური' },
    ];

    return (
        <section className="projects">
            <div className="projects__header">
                <h2 className="projects__title">პროექტები</h2>
                <p className="projects__subtitle">
                    ჩემი გამორჩეული პროექტები, რომლებიც ასახავს .NET დეველოპმენტში ჩემს გამოცდილებას და მიდგომას.
                </p>

                <div className="projects__filters">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`projects__filter ${selectedFilter === filter.id ? 'active' : ''}`}
                            onClick={() => setSelectedFilter(filter.id)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                className="projects__grid"
                layout
            >
                <AnimatePresence>
                    {filteredProjects.map(project => (
                        <motion.div
                            key={project.id}
                            className="projects__item"
                            layoutId={`project-${project.id}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="projects__item-image">
                                <img src={project.image} alt={project.title} />
                            </div>
                            <div className="projects__item-content">
                                <h3>{project.title}</h3>
                                <div className="projects__item-technologies">
                                    {project.technologies.slice(0, 3).map((tech, index) => (
                                        <span key={index} className="projects__item-tech">
                      {tech}
                    </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="projects__item-tech projects__item-tech--more">
                      +{project.technologies.length - 3}
                    </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="project-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="project-modal__content"
                            layoutId={`project-${selectedProject.id}`}
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            exit={{ y: 50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <button
                                className="project-modal__close"
                                onClick={() => setSelectedProject(null)}
                            >
                                <span></span>
                                <span></span>
                            </button>

                            <div className="project-modal__image">
                                <img src={selectedProject.image} alt={selectedProject.title} />
                            </div>

                            <div className="project-modal__details">
                                <h2>{selectedProject.title}</h2>
                                <p>{selectedProject.description}</p>

                                <div className="project-modal__technologies">
                                    <h4>ტექნოლოგიები:</h4>
                                    <div className="project-modal__tags">
                                        {selectedProject.technologies.map((tech, index) => (
                                            <span key={index} className="project-modal__tag">
                        {tech}
                      </span>
                                        ))}
                                    </div>
                                </div>


                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-modal__link"
                                >
                                პროექტის ნახვა
                                <svg viewBox="0 0 24 24">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                    </motion.div>
                    )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;