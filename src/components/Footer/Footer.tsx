import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container container">
        <motion.div
          className="footer__content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer__brand">
            <h3 className="footer__logo">NK</h3>
            <p className="footer__tagline">
              Building enterprise solutions that matter
            </p>
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">
              © {currentYear} Nikoloz Kuridze. All rights reserved.
            </p>
            <p className="footer__made">
              Crafted with <Heart size={16} className="footer__heart" /> and precision
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
