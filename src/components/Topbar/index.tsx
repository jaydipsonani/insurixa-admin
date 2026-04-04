import React from 'react';
import {
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
  User,
  ChevronDown
} from 'lucide-react';
import styles from './Topbar.module.scss';

interface TopbarProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  return (
    <header className={styles.topbar}>
      <div className={styles.left_section}>
        <button className={styles.mobile_menu_btn} onClick={toggleSidebar}>
          <Menu size={20} />
        </button>

        <div className={styles.search_bar}>
          <Search size={18} className={styles.search_icon} />
          <input type="text" placeholder="Search anything..." />
        </div>
      </div>

      <div className={styles.right_section}>
        <button className={styles.action_btn} onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className={styles.notification_wrapper}>
          <button className={styles.action_btn}>
            <Bell size={20} />
            <span className={styles.badge_dot}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
