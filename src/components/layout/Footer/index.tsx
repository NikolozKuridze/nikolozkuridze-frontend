import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.scss';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__content">
                    <div className="footer__info">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="footer__logo"
                        >
                            <Link to="/">NK</Link>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="footer__description"
                        >
                            სენიორ .NET დეველოპერი 5+ წლიანი გამოცდილებით. სპეციალიზებული მაღალი წარმადობის,
                            უსაფრთხო პროგრამული უზრუნველყოფის შექმნაში.
                        </motion.p>
                    </div>

                    <div className="footer__links">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="footer__links-column"
                        >
                            <h3>ნავიგაცია</h3>
                            <ul>
                                <li><Link to="/">მთავარი</Link></li>
                                <li><Link to="/about">ჩემს შესახებ</Link></li>
                                <li><Link to="/experience">გამოცდილება</Link></li>
                                <li><Link to="/projects">პროექტები</Link></li>
                                <li><Link to="/video-portfolio">ვიდეო პორტფოლიო</Link></li>
                                <li><Link to="/contact">კონტაქტი</Link></li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="footer__links-column"
                        >
                            <h3>კონტაქტი</h3>
                            <ul>
                                <li>
                                    <a href="mailto:niko.quridze@gmail.com">
                                        niko.quridze@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+995591212169">
                                        (+995) 591212169
                                    </a>
                                </li>
                                <li>
                                    ვაჟა-ფშაველა, 0186 <br />
                                    თბილისი, საქართველო
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="footer__links-column"
                        >
                            <h3>სოციალური</h3>
                            <ul className="footer__social-links">
                                <li>
                                    <a href="https://linkedin.com/in/nikolozkuridze" target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a href="https://vimeo.com/628993851" target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.396 7.164c-.093 2.026-1.507 4.799-4.245 8.32C15.322 19.161 12.928 21 10.97 21c-1.214 0-2.24-1.119-3.079-3.359-.56-2.053-1.119-4.106-1.68-6.159-.622-2.24-1.29-3.359-2.006-3.359-.156 0-.701.328-1.634.98l-.978-1.261c1.027-.902 2.04-1.805 3.037-2.708C6.001 3.95 7.03 3.327 7.715 3.264c1.619-.156 2.616.951 2.99 3.321.404 2.557.685 4.147.841 4.769.467 2.121.981 3.181 1.542 3.181.435 0 1.09-.687 1.963-2.065.871-1.376 1.338-2.422 1.401-3.142.125-1.187-.343-1.782-1.401-1.782-.498 0-1.012.115-1.541.341 1.023-3.35 2.977-4.977 5.862-4.884 2.139.063 3.148 1.45 3.024 4.161z"/>
                                        </svg>
                                        Vimeo
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="footer__bottom"
                >
                    <p>&copy; {currentYear} Nikoloz Kuridze. ყველა უფლება დაცულია.</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;