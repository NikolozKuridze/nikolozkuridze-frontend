import React from 'react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            <div className="container">
                <motion.div
                    className="about-page__header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>About Me</h1>
                    <p className="about-page__subtitle">
                        Technical expertise with a creative perspective
                    </p>
                </motion.div>

                <div className="about-page__content">
                    <div className="about-page__image-container">
                        <motion.div
                            className="about-page__image"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src="/assets/images/profile.jpg" alt="Nikoloz Kuridze" />
                        </motion.div>
                    </div>

                    <div className="about-page__text">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2>Professional Beyond Code</h2>
                            <p>
                                As a Senior .NET Developer with 5+ years of experience, my career spans diverse
                                experiences across financial, government, and corporate sectors. My passion lies
                                in creating high-performance, secure software solutions for high-load systems.
                            </p>
                            <p>
                                I specialize in the modern .NET ecosystem with deep knowledge of ASP.NET Core,
                                Entity Framework, and Clean Architecture principles. I continuously develop my
                                technical skills, which has enabled me to deliver innovative solutions for complex
                                business problems.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h2>Creative Approach</h2>
                            <p>
                                Beyond technical expertise, I'm a passionate video and photo editor.
                                This creative pursuit gives me a unique perspective on visual problem-solving,
                                which enhances my approach to development, especially in UI/UX design.
                            </p>
                            <p>
                                My experience with Adobe Creative Suite, particularly Premiere Pro and After Effects,
                                allows me to create dynamic visual content with complex post-production. This broadens
                                my ability to view projects from both technical and user experience perspectives.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="about-page__skills"
                        >
                            <h2>Technical Skills</h2>
                            <div className="about-page__skills-grid">
                                <div className="about-page__skill-category">
                                    <h3>Programming Languages</h3>
                                    <ul>
                                        <li>C#</li>
                                        <li>JavaScript/TypeScript</li>
                                        <li>SQL</li>
                                        <li>HTML/CSS</li>
                                    </ul>
                                </div>

                                <div className="about-page__skill-category">
                                    <h3>Frameworks & Libraries</h3>
                                    <ul>
                                        <li>.NET Core / .NET 8</li>
                                        <li>ASP.NET Core</li>
                                        <li>Entity Framework Core</li>
                                        <li>Dapper</li>
                                    </ul>
                                </div>

                                <div className="about-page__skill-category">
                                    <h3>Architecture & Methodologies</h3>
                                    <ul>
                                        <li>Clean Architecture</li>
                                        <li>CQRS & Mediator</li>
                                        <li>Domain-Driven Design</li>
                                        <li>Microservices</li>
                                        <li>RESTful APIs</li>
                                    </ul>
                                </div>

                                <div className="about-page__skill-category">
                                    <h3>DevOps & Tools</h3>
                                    <ul>
                                        <li>Azure DevOps</li>
                                        <li>CI/CD</li>
                                        <li>Docker</li>
                                        <li>SQL Server</li>
                                    </ul>
                                </div>

                                <div className="about-page__skill-category">
                                    <h3>Creative Tools</h3>
                                    <ul>
                                        <li>Adobe Premiere Pro</li>
                                        <li>Adobe After Effects</li>
                                        <li>Adobe Photoshop</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;