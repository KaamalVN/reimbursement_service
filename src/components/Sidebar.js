// src/components/Sidebar.js
'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/Sidebar.module.css';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/context/AuthContext';
import { 
  RiDashboardLine, 
  RiFileAddLine, 
  RiFileListLine, 
  RiCheckboxCircleLine,
  RiNotification3Line,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiLogoutBoxLine
} from 'react-icons/ri';

export default function Sidebar() {
  const pathname = usePathname();
  const { isExpanded, setIsExpanded } = useSidebar();
  const { user, logout } = useAuth();

  // Ensure that the user has a role property
  const userRole = user ? user.role : null; // Get the user's role from the user object

  // Define the menu items based on the user role
  const menuItems = [
    {
      icon: <RiFileListLine size={24} />,
      label: 'Companies',
      path: '/companies',
      roles: ['productAdmin'] // Visible only to Product Admin
    },
    {
      icon: <RiFileAddLine size={24} />,
      label: 'Create Company',
      path: '/company',
      roles: ['productAdmin'] // Visible only to Product Admin
    },
    {
      icon: <RiFileListLine size={24} />,
      label: 'My Company',
      path: '/mycompany',
      roles: ['companyAdmin'] // Visible only to Product Admin
    },
    {
      icon: <RiFileAddLine size={24} />,
      label: 'Employee',
      path: '/employee',
      roles: ['companyAdmin'] // Visible only to Company Admin
    },
    {
      icon: <RiFileListLine size={24} />,
      label: 'Employees',
      path: '/employees',
      roles: ['companyAdmin'] // Visible only to Company Admin
    },
    {
      icon: <RiDashboardLine size={24} />,
      label: 'Dashboard',
      path: '/dashboard',
      roles: ['employee', 'lowLevelEmployee'] // Visible to all roles
    },
    {
      icon: <RiFileAddLine size={24} />,
      label: 'New Request',
      path: '/newrequest',
      roles: ['employee','lowLevelEmployee'] // Visible to Product Admin, Company Admin, and Employee
    },
    {
      icon: <RiFileListLine size={24} />,
      label: 'My Requests',
      path: '/requests',
      roles: ['employee', 'lowLevelEmployee'] // Visible to all roles
    },
    {
      icon: <RiCheckboxCircleLine size={24} />,
      label: 'Approvals',
      path: '/approvals',
      roles: ['employee'] // Visible to Product Admin and Company Admin
    },
    {
      icon: <RiNotification3Line size={24} />,
      label: 'Notifications',
      path: '/notifications',
      roles: ['productAdmin', 'companyAdmin', 'employee', 'lowLevelEmployee'] // Visible to all roles
    }

  ];

  // If user is not authenticated, do not render the sidebar
  if (!user) return null;

  return (
    <aside className={`${styles.sidebar} ${!isExpanded ? styles.collapsed : ''} desktop-sidebar`}>
      <div className={styles.sidebarHeader}>
        <button 
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <RiMenuFoldLine size={24} /> : <RiMenuUnfoldLine size={24} />}
        </button>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          item.roles.includes(userRole) && ( // Only render if the user's role matches
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.menuItem} ${
                pathname === item.path ? styles.active : ''
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {isExpanded && <span className={styles.label}>{item.label}</span>}
            </Link>
          )
        ))}
      </nav>

      <div className={styles.profile}>
        <div className={styles.userInfo}>
          <img src={user.avatar} alt={user.name} />
          {isExpanded && (
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          )}
        </div>
        <button className={styles.logoutBtn} onClick={logout}>
          <RiLogoutBoxLine size={20} />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
