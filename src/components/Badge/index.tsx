import React from 'react';
import styles from './Badge.module.scss';

type BadgeType = 'success' | 'info' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  type?: BadgeType;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, type = 'neutral', className = '' }) => {
  return (
    <span className={`${styles.badge} ${styles[type]} ${className}`.trim()}>
      {children}
    </span>
  );
};

export default Badge;
