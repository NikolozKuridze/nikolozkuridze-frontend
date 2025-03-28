import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.scss';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState({
        submitting: false,
        success: false,
        error: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus({ submitting: true, success: false, error: false });

        try {
            // აქ შეგიძლიათ გამოიყენოთ თქვენი API მისამართი ან სერვისი
            await new Promise(resolve => setTimeout(resolve, 1500));

            // წარმატებული გაგზავნის სიმულაცია
            setFormStatus({ submitting: false, success: true, error: false });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setFormStatus({ submitting: false, success: false, error: true });
        }
    };

    return (
        <section className="contact">
            <div className="contact__container">
                <motion.div
                    className="contact__info"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="contact__title">დამიკავშირდით</h2>
                    <p className="contact__description">
                        დაინტერესებული ხართ ჩემი გამოცდილებით ან გაქვთ პროექტი, რომელშიც შემიძლია დაგეხმაროთ?
                        გამოგზავნეთ შეტყობინება და დაგიკავშირდებით უმოკლეს დროში.
                    </p>

                    <div className="contact__details">
                        <div className="contact__detail">
                            <div className="contact__detail-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="contact__detail-text">
                                <h3>ელ-ფოსტა</h3>
                                <a href="mailto:niko.quridze@gmail.com">niko.quridze@gmail.com</a>
                            </div>
                        </div>

                        <div className="contact__detail">
                            <div className="contact__detail-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="contact__detail-text">
                                <h3>ტელეფონი</h3>
                                <a href="tel:+995591212169">(+995) 591212169</a>
                            </div>
                        </div>

                        <div className="contact__detail">
                            <div className="contact__detail-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="contact__detail-text">
                                <h3>მისამართი</h3>
                                <p>ვაჟა-ფშაველა, 0186 თბილისი, საქართველო</p>
                            </div>
                        </div>

                        <div className="contact__social">
                            <h3>სოციალური ქსელები</h3>
                            <div className="contact__social-icons">
                                <a href="https://linkedin.com/in/nikolozkuridze" target="_blank" rel="noopener noreferrer" className="contact__social-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="contact__form-container"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {formStatus.success ? (
                        <div className="contact__success">
                            <div className="contact__success-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3>შეტყობინება გაგზავნილია!</h3>
                            <p>მადლობა კონტაქტისთვის. უმოკლეს დროში დაგიკავშირდებით.</p>
                            <button
                                className="contact__button"
                                onClick={() => setFormStatus({ submitting: false, success: false, error: false })}
                            >
                                ახალი შეტყობინების გაგზავნა
                            </button>
                        </div>
                    ) : (
                        <form className="contact__form" onSubmit={handleSubmit}>
                            <div className="contact__form-group">
                                <label htmlFor="name" className="contact__label">სახელი</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="contact__input"
                                    required
                                />
                            </div>

                            <div className="contact__form-group">
                                <label htmlFor="email" className="contact__label">ელ-ფოსტა</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="contact__input"
                                    required
                                />
                            </div>

                            <div className="contact__form-group">
                                <label htmlFor="subject" className="contact__label">თემა</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="contact__input"
                                    required
                                />
                            </div>

                            <div className="contact__form-group">
                                <label htmlFor="message" className="contact__label">შეტყობინება</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="contact__textarea"
                                    rows={5}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="contact__button"
                                disabled={formStatus.submitting}
                            >
                                {formStatus.submitting ? (
                                    <>
                                        <span className="contact__button-spinner"></span>
                                        გაგზავნა...
                                    </>
                                ) : (
                                    <>შეტყობინების გაგზავნა</>
                                )}
                            </button>

                            {formStatus.error && (
                                <div className="contact__error">
                                    <p>შეტყობინების გაგზავნა ვერ მოხერხდა. გთხოვთ სცადოთ მოგვიანებით.</p>
                                </div>
                            )}
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;