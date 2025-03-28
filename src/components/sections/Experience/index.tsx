import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
                <h2 className="experience__title">პროფესიული გამოცდილება</h2>
                <p className="experience__subtitle">
                    თითოეული როლი მაძლევდა საშუალებას შემექმნა ინოვაციური გადაწყვეტილებები
                    რთული პრობლემებისთვის.
                </p>
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
                        <div className="experience__item-header">
                            <div className="experience__item-title">
                                <h3>{job.role}</h3>
                                <h4>{job.company}</h4>
                            </div>
                            <div className="experience__item-date">
                                <span>{job.period}</span>
                                <span>{job.location}</span>
                            </div>
                        </div>

                        <div className="experience__item-content">
                            <ul className="experience__item-responsibilities">
                                {job.responsibilities.map((responsibility, idx) => (
                                    <li key={idx}>{responsibility}</li>
                                ))}
                            </ul>

                            <div className="experience__item-tags">
                                {job.technologies.map((tech, idx) => (
                                    <span key={idx} className="experience__item-tag">{tech}</span>
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