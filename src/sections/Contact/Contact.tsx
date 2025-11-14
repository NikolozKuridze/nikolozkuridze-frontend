import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle } from 'lucide-react';
import { profile } from '../../data/profile';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="contact section">
      <div className="contact__container container">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="contact__subtitle">Get In Touch</span>
          <h2 className="contact__title">Let's Build Something Great</h2>
          <p className="contact__intro">
            Have a project in mind or want to discuss enterprise architecture? Let's connect!
          </p>
        </motion.div>

        <div className="contact__content">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact-card glass">
              <Mail size={24} className="contact-card__icon" />
              <h3 className="contact-card__title">Email</h3>
              <p className="contact-card__text">{profile.email}</p>
            </div>

            <div className="contact-card glass">
              <MapPin size={24} className="contact-card__icon" />
              <h3 className="contact-card__title">Location</h3>
              <p className="contact-card__text">{profile.location}</p>
            </div>

            <div className="contact-card glass">
              <Linkedin size={24} className="contact-card__icon" />
              <h3 className="contact-card__title">LinkedIn</h3>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card__link"
              >
                Connect with me
              </a>
            </div>

            <div className="contact-card glass">
              <Github size={24} className="contact-card__icon" />
              <h3 className="contact-card__title">GitHub</h3>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card__link"
              >
                View my code
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form className="contact-form glass" onSubmit={handleSubmit}>
              {submitted ? (
                <motion.div
                  className="contact-form__success"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <CheckCircle size={48} />
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                      rows={6}
                      required
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary btn-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Send Message</span>
                    <Send size={20} />
                  </motion.button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
