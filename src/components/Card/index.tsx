import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  noPadding?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ 
    children, 
    title, 
    extra, 
    footer, 
    noPadding, 
    className = '',
    style
}) => {
  const cardClasses = `${styles.card} ${noPadding ? styles.no_padding : ''} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <div className={cardClasses} style={style}>
      {title && (
        <div className={styles.card_header}>
          <h3>{title}</h3>
          {extra && <div className={styles.extra}>{extra}</div>}
        </div>
      )}
      <div className={styles.card_body}>{children}</div>
      {footer && <div className={styles.card_footer}>{footer}</div>}
    </div>
  );
};

export default Card;
