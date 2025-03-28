import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFoundPage.scss';

const NotFoundPage: React.FC = () => {
    return (
        <div className="not-found">
            <motion.div
                className="not-found__content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="not-found__title">404</h1>
                <h2 className="not-found__subtitle">გვერდი ვერ მოიძებნა</h2>
                <p className="not-found__description">
                    თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს ან გადატანილია სხვა მისამართზე.
                </p>
                <Link to="/" className="not-found__button">
                    დაბრუნება მთავარ გვერდზე
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;