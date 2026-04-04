import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Drawer.module.scss';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, footer }) => {
  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0, visibility: 'hidden' as const },
    visible: { 
      opacity: 1, 
      visibility: 'visible' as const,
      transition: { duration: 0.3 } 
    }
  };

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 200 } 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className={`${styles.drawer_overlay} ${styles.open}`}
            onClick={onClose}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
          />
          <motion.div 
            className={`${styles.drawer} ${styles.open}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
          >
            <div className={styles.drawer_header}>
              <h2>{title}</h2>
              <button className={styles.close_btn} onClick={onClose}>
                <X size={24} />
              </button>
            </div>
            
            <div className={styles.drawer_body}>
              {children}
            </div>

            {footer && (
              <div className={styles.drawer_footer}>
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
