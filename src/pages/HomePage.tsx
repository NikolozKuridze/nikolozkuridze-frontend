import React from 'react';
import Hero from '../components/sections/Hero';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <Experience />
            <Projects />
            <Contact />
        </>
    );
};

export default HomePage;