import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './AboutPage.scss';

const AboutPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

    return (
        <div ref={containerRef} className="about">
            <motion.div className="about__container" style={{ opacity, y }}>
                <div className="about__header">
                    <h1 className="about__title">ჩემს შესახებ</h1>
                    <div className="about__subtitle">
                        <p>ტექნოლოგიური გამოცდილება და კრეატიული პერსპექტივა</p>
                    </div>
                </div>

                <div className="about__content">
                    <div className="about__image-container">
                        <motion.div
                            className="about__image"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src="/assets/images/profile/profile.jpg" alt="Nikoloz Kuridze" />
                        </motion.div>
                    </div>

                    <div className="about__text">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2>პროფესიონალი მიღმა კოდისა</h2>
                            <p>
                                როგორც სენიორ .NET დეველოპერს 5+ წლიანი გამოცდილებით, ჩემი კარიერა მოიცავს
                                მრავალფეროვან გამოცდილებას ფინანსურ, სამთავრობო და კორპორატიულ სექტორებში.
                                ჩემი ვნება მაღალი წარმადობის და უსაფრთხო პროგრამული უზრუნველყოფის
                                შექმნაა მაღალი დატვირთვის სისტემებისთვის.
                            </p>
                            <p>
                                ვსპეციალიზდები თანამედროვე .NET ეკოსისტემაში და მაქვს ღრმა ცოდნა ASP.NET Core,
                                Entity Framework, და Clean Architecture პრინციპების მიმართულებით. ჩემს ტექნიკურ უნარებს
                                მუდმივად ვავითარებ, რაც დამეხმარა მომეწოდებინა ინოვაციური გადაწყვეტილებები რთული
                                ბიზნეს პრობლემებისთვის.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h2>კრეატიული მიდგომა</h2>
                            <p>
                                ტექნიკური ექსპერტიზის გარდა, მე ვარ ვნებიანი ვიდეო და ფოტო რედაქტორი.
                                ეს კრეატიული საქმიანობა მაძლევს უნიკალურ პერსპექტივას ვიზუალური პრობლემების
                                გადაჭრაში, რაც ზრდის ჩემს მიდგომას დეველოპმენტის, განსაკუთრებით UI/UX
                                დიზაინის მიმართულებით.
                            </p>
                            <p>
                                ჩემი გამოცდილება Adobe Creative Suite-ში, განსაკუთრებით Premiere Pro და After Effects-ში,
                                მაძლევს უნარს შევქმნა დინამიური ვიზუალური კონტენტი კომპლექსური პოსტ-პროდაქშენით.
                                ეს ზრდის ჩემს შესაძლებლობას ვიხილო პროექტები როგორც ტექნიკური, ასევე
                                მომხმარებლის გამოცდილების პერსპექტივიდან.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="about__skills"
                        >
                            <h2>ტექნიკური უნარები</h2>
                            <div className="about__skills-grid">
                                <div className="about__skill-category">
                                    <h3>პროგრამირების ენები</h3>
                                    <ul>
                                        <li>C#</li>
                                        <li>JavaScript/TypeScript</li>
                                        <li>SQL</li>
                                        <li>HTML/CSS</li>
                                    </ul>
                                </div>

                                <div className="about__skill-category">
                                    <h3>ფრეიმვორკები & ბიბლიოთეკები</h3>
                                    <ul>
                                        <li>.NET Core / .NET 8</li>
                                        <li>ASP.NET Core</li>
                                        <li>Entity Framework Core</li>
                                        <li>Dapper</li>
                                        <li>React</li>
                                    </ul>
                                </div>

                                <div className="about__skill-category">
                                    <h3>არქიტექტურა & მეთოდოლოგიები</h3>
                                    <ul>
                                        <li>Clean Architecture</li>
                                        <li>CQRS & Mediator</li>
                                        <li>Domain-Driven Design</li>
                                        <li>Microservices</li>
                                        <li>RESTful APIs</li>
                                    </ul>
                                </div>

                                <div className="about__skill-category">
                                    <h3>DevOps & ხელსაწყოები</h3>
                                    <ul>
                                        <li>Azure DevOps</li>
                                        <li>CI/CD</li>
                                        <li>Docker</li>
                                        <li>Git</li>
                                        <li>SQL Server</li>
                                    </ul>
                                </div>

                                <div className="about__skill-category">
                                    <h3>კრეატიული ხელსაწყოები</h3>
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
            </motion.div>
        </div>
    );
};

export default AboutPage;