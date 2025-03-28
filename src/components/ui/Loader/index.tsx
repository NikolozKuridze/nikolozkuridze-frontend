import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.scss';

interface LoaderProps {
    duration?: number;
}

const Loader: React.FC<LoaderProps> = ({ duration = 2000 }) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;

            const elapsed = timestamp - startTime;
            const nextProgress = Math.min(elapsed / duration * 100, 100);

            setProgress(nextProgress);

            if (elapsed < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Fade out the loader
                setTimeout(() => {
                    setIsVisible(false);
                }, 300);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [duration]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="loader"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="loader__content">
                        <motion.div
                            className="loader__logo"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            NK
                        </motion.div>

                        <div className="loader__progress-container">
                            <motion.div
                                className="loader__progress-bar"
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: [0.22, 1, 0.36, 1] }}
                            />
                        </div>

                        <div className="loader__percentage">
                            {Math.round(progress)}%
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;