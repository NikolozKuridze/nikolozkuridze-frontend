import React from 'react';
import Contact from '../components/sections/Contact';

const ContactPage: React.FC = () => {
    return (
        <div className="contact-page">
            <div className="container">
                <div className="contact-page__header">
                    <h1>Contact</h1>
                    <p className="contact-page__subtitle">
                        Get in touch with me for collaboration or inquiries
                    </p>
                </div>

                <Contact />
            </div>
        </div>
    );
};

export default ContactPage;