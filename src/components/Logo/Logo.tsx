import { motion } from 'framer-motion';
import './Logo.css';

export const Logo = () => {
  return (
    <motion.div
      className="logo"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <svg className="logo__svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer hexagon ring */}
        <motion.path
          d="M60 10 L95 30 L95 70 L60 90 L25 70 L25 30 Z"
          stroke="url(#logo-gradient-1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Middle hexagon ring */}
        <motion.path
          d="M60 20 L85 35 L85 65 L60 80 L35 65 L35 35 Z"
          stroke="url(#logo-gradient-2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
        />

        {/* Inner hexagon with fill */}
        <motion.path
          d="M60 30 L75 40 L75 60 L60 70 L45 60 L45 40 Z"
          fill="url(#logo-gradient-3)"
          stroke="url(#logo-gradient-2)"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
          style={{ transformOrigin: "60px 50px" }}
        />

        {/* N letter */}
        <motion.path
          d="M50 42 L50 58 M50 42 L65 58 M65 42 L65 58"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
        />

        {/* Corner accents */}
        <motion.circle
          cx="95" cy="30" r="3"
          fill="url(#logo-gradient-accent)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        <motion.circle
          cx="95" cy="70" r="3"
          fill="url(#logo-gradient-accent)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 1.3 }}
        />
        <motion.circle
          cx="25" cy="70" r="3"
          fill="url(#logo-gradient-accent)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 1.4 }}
        />

        {/* Rotating ring animation */}
        <motion.circle
          cx="60" cy="50" r="40"
          stroke="url(#logo-gradient-1)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="4 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 50px" }}
        />

        <defs>
          <linearGradient id="logo-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="logo-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="logo-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="logo-gradient-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      <span className="logo__text">NK</span>
    </motion.div>
  );
};
