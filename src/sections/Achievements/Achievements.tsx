import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Target, Zap, Users, TrendingUp, Shield, Star, LucideIcon } from 'lucide-react';
import { achievements } from '../../data/profile';
import './Achievements.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }> | typeof LucideIcon> = {
  trophy: Trophy,
  award: Award,
  target: Target,
  zap: Zap,
  users: Users,
  trending: TrendingUp,
  shield: Shield,
  star: Star,
};

export const Achievements = () => {
  return (
    <section id="achievements" className="achievements section">
      <div className="achievements__container container">
        <motion.div
          className="achievements__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="achievements__subtitle">Excellence & Impact</span>
          <h2 className="achievements__title">Key Achievements</h2>
          <p className="achievements__intro">
            Delivering measurable impact through innovative solutions and technical excellence
          </p>
        </motion.div>

        <div className="achievements__stats">
          {achievements.stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card glass-premium"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="stat-card__icon">
                {stat.icon && iconMap[stat.icon] && React.createElement(iconMap[stat.icon], { size: 28 })}
              </div>
              <div className="stat-card__content">
                <div className="stat-card__value">{stat.value}</div>
                <div className="stat-card__label">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="achievements__grid">
          {achievements.milestones.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || Star;

            return (
              <motion.div
                key={achievement.id}
                className="achievement-card glass-premium"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`achievement-card__icon achievement-card__icon--${achievement.category}`}>
                  <motion.div
                    className="icon-wrapper"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={32} />
                  </motion.div>
                </div>

                <div className="achievement-card__content">
                  <div className="achievement-card__header">
                    <h3 className="achievement-card__title">{achievement.title}</h3>
                    {achievement.year && (
                      <span className="achievement-card__year">{achievement.year}</span>
                    )}
                  </div>

                  <p className="achievement-card__description">{achievement.description}</p>

                  {achievement.metrics && achievement.metrics.length > 0 && (
                    <div className="achievement-card__metrics">
                      {achievement.metrics.map((metric, mIndex) => (
                        <div key={mIndex} className="metric-item">
                          <span className="metric-item__value">{metric.value}</span>
                          <span className="metric-item__label">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {achievement.tags && achievement.tags.length > 0 && (
                    <div className="achievement-card__tags">
                      {achievement.tags.map((tag, tIndex) => (
                        <motion.span
                          key={tIndex}
                          className="achievement-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 + tIndex * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                <div className={`achievement-card__accent achievement-card__accent--${achievement.category}`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
