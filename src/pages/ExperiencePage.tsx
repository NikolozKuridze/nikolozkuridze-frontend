import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../constants/experience';

const ExperiencePage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="experience-page" ref={containerRef}>
            <div className="container">
                <motion.div
                    className="experience-page__header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>Professional Experience</h1>
                    <p className="experience-page__subtitle">
                        My career journey spanning government, financial, and corporate sectors
                    </p>
                </motion.div>

                <div className="experience-page__timeline">
                    {experienceData.map((job, index) => (
                        <motion.div
                            key={index}
                            className="experience-page__item"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="experience-page__item-header">
                                <div className="experience-page__item-title">
                                    <h3>{job.role}</h3>
                                    <h4>{job.company}</h4>
                                </div>
                                <div className="experience-page__item-date">
                                    <span>{job.period}</span>
                                    <span>{job.location}</span>
                                </div>
                            </div>

                            <div className="experience-page__item-content">
                                <ul className="experience-page__item-responsibilities">
                                    {job.responsibilities.map((responsibility, idx) => (
                                        <li key={idx}>{responsibility}</li>
                                    ))}
                                </ul>

                                <div className="experience-page__item-tags">
                                    {job.technologies.map((tech, idx) => (
                                        <span key={idx} className="experience-page__item-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExperiencePage;