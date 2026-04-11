import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import styles from './Layout.module.scss';
import { toast } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Insurixa Admin' }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auth Check
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true' && router.pathname !== '/login') {
      router.push('/login');
    } else {
      setIsLoading(false);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const handleResize = () => {
      if (window.innerWidth > 991) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  const toggleSidebar = () => {
    if (window.innerWidth < 992) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    const theme = newMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (isLoading && router.pathname !== '/login') {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F6F9', flexDirection: 'column', gap: '20px' }}>
         <div style={{ width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTopColor: '#1A3C6E', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
         <p style={{ color: '#1A3C6E', fontWeight: 600 }}>Verifying Access...</p>
         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // If on login page, just render children without sidebar/topbar
  if (router.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className={`${styles.layout} ${isMobileMenuOpen ? styles.mobile_open : ''}`.trim()}>
      <Head>
        <title>{title} | Insurixa</title>
      </Head>

      <Sidebar 
        isCollapsed={isCollapsed} 
        isMobileOpen={isMobileMenuOpen}
        toggleSidebar={toggleSidebar} 
        onLogout={handleLogout}
      />

      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <main className={`${styles.main_content} ${isCollapsed ? styles.collapsed : ''}`.trim()}>
        <Topbar 
          toggleSidebar={toggleSidebar} 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <div className={styles.page_wrapper}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
