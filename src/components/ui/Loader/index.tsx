import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Loader.scss';

const Loader: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 5;
            });
        }, 50);

        return () => clearInterval(timer);
    }, []);

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const progressVariants = {
        hidden: { width: 0 },
        visible: {
            width: `${progress}%`,
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="loader">
            <div className="loader__content">
                <motion.div
                    className="loader__logo"
                    variants={logoVariants}
                    initial="hidden"
                    animate="visible"
                >
                    NK
                </motion.div>

                <div className="loader__progress-container">
                    <motion.div
                        className="loader__progress-bar"
                        variants={progressVariants}
                        initial="hidden"
                        animate="visible"
                    />
                </div>

                <div className="loader__percentage">{progress}%</div>
            </div>
        </div>
    );
};

export default Loader;