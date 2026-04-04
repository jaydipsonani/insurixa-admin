import React from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props 
}) => {
  const buttonClasses = `
    ${styles.btn} 
    ${styles[variant]} 
    ${styles[size]} 
    ${fullWidth ? styles.full_width : ''} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button 
      className={buttonClasses}
      {...props}
    >
      {leftIcon && <span className={styles.icon_left}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={styles.icon_right}>{rightIcon}</span>}
    </button>
  );
};

export default Button;
