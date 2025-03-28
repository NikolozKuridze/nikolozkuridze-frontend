import React from 'react';
import Projects from '../components/sections/Projects';

const ProjectsPage: React.FC = () => {
    return (
        <div className="projects-page">
            <div className="container">
                <div className="projects-page__header">
                    <h1>Projects</h1>
                    <p className="projects-page__subtitle">
                        A showcase of my work in .NET development
                    </p>
                </div>

                <Projects />
            </div>
        </div>
    );
};

export default ProjectsPage;