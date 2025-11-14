import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { experienceData } from '../../../constants/experience';
import './Experience.scss';

const Experience: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    return (
        <motion.section
            ref={containerRef}
            className="experience"
            style={{ opacity, scale }}
        >
            <div className="experience__header">
                <motion.div
                    className="experience__badge"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring" }}
                >
                    <TrendingUp size={16} />
                    <span>Career Journey</span>
                </motion.div>
                <motion.h2
                    className="experience__title"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Professional Experience
                </motion.h2>
                <motion.p
                    className="experience__subtitle"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Architecting enterprise solutions and leading digital transformation across
                    banking, government, and technology sectors.
                </motion.p>
            </div>

            <div className="experience__timeline">
                {experienceData.map((job, index) => (
                    <motion.div
                        key={index}
                        className="experience__item"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <div className="experience__item-accent"></div>
                        <div className="experience__item-header">
                            <div className="experience__item-title">
                                <div className="experience__item-icon">
                                    <Briefcase size={24} />
                                </div>
                                <div>
                                    <h3>{job.role}</h3>
                                    <h4>{job.company}</h4>
                                </div>
                            </div>
                            <div className="experience__item-meta">
                                <div className="experience__item-meta-item">
                                    <Calendar size={16} />
                                    <span>{job.period}</span>
                                </div>
                                <div className="experience__item-meta-item">
                                    <MapPin size={16} />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="experience__item-content">
                            <ul className="experience__item-responsibilities">
                                {job.responsibilities.map((responsibility, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                                    >
                                        {responsibility}
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="experience__item-tags">
                                {job.technologies.map((tech, idx) => (
                                    <motion.span
                                        key={idx}
                                        className="experience__item-tag"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.5 + idx * 0.03 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default Experience;