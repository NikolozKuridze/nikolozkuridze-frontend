import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Send,
  CheckCircle,
  Phone,
  Calendar,
  Video,
  MessageSquare,
  Sparkles
} from 'lucide-react';
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

  // Quick action CTAs
  const quickActions = [
    {
      icon: Calendar,
      title: 'Schedule a Meeting',
      description: 'Book a 30-min consultation',
      action: 'Book Now',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      delay: 0.2
    },
    {
      icon: Video,
      title: 'Virtual Consultation',
      description: 'Connect via video call',
      action: 'Start Call',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      delay: 0.3
    },
    {
      icon: Phone,
      title: 'Quick Chat',
      description: 'Speak with me directly',
      action: 'Call Now',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      delay: 0.4
    }
  ];

  return (
    <section id="contact" className="contact section">
      {/* Background effects */}
      <div className="contact__background">
        <div className="contact__bg-gradient contact__bg-gradient--1" />
        <div className="contact__bg-gradient contact__bg-gradient--2" />
        <div className="contact__particles">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="contact__particle"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      <div className="contact__container container">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="contact__subtitle"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles size={16} />
            <span>Let's Connect</span>
          </motion.span>
          <motion.h2
            className="contact__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            className="contact__intro"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have a project in mind or want to discuss enterprise architecture? I'm here to help bring your vision to life.
          </motion.p>
        </motion.div>

        {/* Quick Actions CTA Section */}
        <motion.div
          className="contact__quick-actions"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {quickActions.map((action) => (
            <motion.div
              key={action.title}
              className="quick-action-card"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: action.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <div className="quick-action-card__glow" style={{ background: action.gradient }} />
              <div className="quick-action-card__content">
                <div
                  className="quick-action-card__icon"
                  style={{ background: action.gradient }}
                >
                  <action.icon size={28} />
                </div>
                <h3 className="quick-action-card__title">{action.title}</h3>
                <p className="quick-action-card__description">{action.description}</p>
                <motion.button
                  className="quick-action-card__button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {action.action}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="contact__divider"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span>Or send me a message</span>
        </motion.div>

        <div className="contact__content">
          {/* Contact Info Cards */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              className="contact-info-card"
              whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(99, 102, 241, 0.2)' }}
            >
              <div className="contact-info-card__icon-wrapper">
                <Mail size={24} className="contact-info-card__icon" />
              </div>
              <h3 className="contact-info-card__title">Email Me</h3>
              <p className="contact-info-card__text">{profile.email}</p>
              <motion.a
                href={`mailto:${profile.email}`}
                className="contact-info-card__link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Email
              </motion.a>
            </motion.div>

            <motion.div
              className="contact-info-card"
              whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(99, 102, 241, 0.2)' }}
            >
              <div className="contact-info-card__icon-wrapper">
                <MapPin size={24} className="contact-info-card__icon" />
              </div>
              <h3 className="contact-info-card__title">Location</h3>
              <p className="contact-info-card__text">{profile.location}</p>
            </motion.div>

            <motion.div
              className="contact-info-card"
              whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(14, 165, 233, 0.2)' }}
            >
              <div className="contact-info-card__icon-wrapper contact-info-card__icon-wrapper--linkedin">
                <Linkedin size={24} className="contact-info-card__icon" />
              </div>
              <h3 className="contact-info-card__title">LinkedIn</h3>
              <motion.a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-card__link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect with me
              </motion.a>
            </motion.div>

            <motion.div
              className="contact-info-card"
              whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(139, 92, 246, 0.2)' }}
            >
              <div className="contact-info-card__icon-wrapper contact-info-card__icon-wrapper--github">
                <Github size={24} className="contact-info-card__icon" />
              </div>
              <h3 className="contact-info-card__title">GitHub</h3>
              <motion.a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-card__link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View my code
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="contact-form">
              <div className="contact-form__header">
                <MessageSquare size={32} className="contact-form__icon" />
                <h3 className="contact-form__title">Send a Message</h3>
                <p className="contact-form__subtitle">I'll respond within 24 hours</p>
              </div>

              {submitted ? (
                <motion.div
                  className="contact-form__success"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                >
                  <CheckCircle size={64} />
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Your Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="How can I help you?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                      rows={6}
                      required
                      placeholder="Tell me about your project, goals, and timeline..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary btn-full btn-contact"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 20px 60px rgba(99, 102, 241, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Send Message</span>
                    <Send size={20} />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
