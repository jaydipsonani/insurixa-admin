import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  FileText, 
  Newspaper, 
  Car, 
  Bike, 
  Package, 
  MapPin, 
  Image as ImageIcon, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronRight,
  Building2
} from 'lucide-react';
import styles from './Sidebar.module.scss';

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
  id: string;
  submenu?: { title: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'users', title: 'Users', icon: Users, path: '/users' },
  { id: 'policies', title: 'Policies', icon: ShieldCheck, path: '/policies' },
  { id: 'claims', title: 'Claims', icon: FileText, path: '/claims' },
  { 
    id: 'blogs', 
    title: 'Blogs / News', 
    icon: Newspaper, 
    path: '/blogs',
    submenu: [
      { title: 'Categories', path: '/blogs/categories' },
      { title: 'Posts', path: '/blogs/posts' }
    ]
  },
  { 
    id: 'cars', 
    title: 'Cars', 
    icon: Car, 
    path: '/cars',
    submenu: [
      { title: 'Company', path: '/cars/company' },
      { title: 'Models', path: '/cars/models' }
    ]
  },
  { 
    id: 'bikes', 
    title: 'Bikes', 
    icon: Bike, 
    path: '/bikes',
    submenu: [
      { title: 'Company', path: '/bikes/company' },
      { title: 'Models', path: '/bikes/models' }
    ]
  },
  { 
    id: 'products', 
    title: 'Products', 
    icon: Package, 
    path: '/products',
    submenu: [
      { title: 'Category', path: '/products/category' },
      { title: 'Listings', path: '/products/listings' }
    ]
  },
  { id: 'states', title: 'States', icon: MapPin, path: '/states' },
  { id: 'cities', title: 'Cities', icon: Building2, path: '/cities' },
  { id: 'banners', title: 'Banners', icon: ImageIcon, path: '/banners' },
  { id: 'analytics', title: 'Reports & Analytics', icon: BarChart3, path: '/analytics' },
  { 
    id: 'settings', 
    title: 'Settings', 
    icon: Settings, 
    path: '/settings',
    submenu: [
      { title: 'General', path: '/settings/general' },
      { title: 'Legal', path: '/settings/legal' },
      { title: 'Roles', path: '/settings/roles' }
    ]
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen?: boolean;
  toggleSidebar: () => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, isMobileOpen, toggleSidebar, onLogout }) => {
  const router = useRouter();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuToggle = (id: string) => {
    if (isCollapsed) return;
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  const isActive = (path: string) => router.pathname.startsWith(path);

  const sidebarClasses = `${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isMobileOpen ? styles.mobile_open : ''}`.trim();

  return (
    <aside className={sidebarClasses}>
      <div className={styles.sidebar_header}>
        <div className={styles.logo}>I</div>
        <span className={styles.logo_text}>INSURIXA</span>
      </div>

      <nav className={styles.menu_list}>
        {menuItems.map((item) => (
          <div key={item.id} className={styles.menu_group}>
            <div 
              className={`${styles.menu_item} ${isActive(item.path) ? styles.active : ''}`.trim()}
              onClick={() => item.submenu ? handleSubmenuToggle(item.id) : router.push(item.path)}
            >
              <item.icon className={styles.menu_icon} />
              <span className={styles.menu_label}>{item.title}</span>
              {item.submenu && !isCollapsed && (
                <ChevronRight className={`${styles.submenu_arrow} ${openSubmenu === item.id ? styles.open : ''}`.trim()} />
              )}
            </div>

            {item.submenu && openSubmenu === item.id && !isCollapsed && (
              <div className={styles.submenu_list}>
                {item.submenu.map((sub) => (
                  <Link key={sub.path} href={sub.path} legacyBehavior>
                    <a className={`${styles.submenu_item} ${router.pathname === sub.path ? styles.active : ''}`.trim()}>
                      {sub.title}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className={styles.sidebar_footer}>
        <button className={styles.logout_btn} onClick={onLogout}>
          <LogOut className={styles.menu_icon} />
          <span className={styles.menu_label}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
