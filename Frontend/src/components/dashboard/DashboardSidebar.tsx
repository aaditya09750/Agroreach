import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n/useTranslation';
import {
  DashboardIcon,
  OrderHistoryIcon,
  ShoppingCartIcon,
  SettingsIcon,
  LogoutIcon
} from '../icons/dashboard';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  activeIcon: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, activeIcon }) => {
  const location = useLocation();
  
  let isActive = location.pathname === to;

  // Keep 'Order History' active on the order detail page
  if (to === '/order-history' && location.pathname.startsWith('/dashboard/order')) {
    isActive = true;
  }
  
  // Prevent 'Dashboard' from being active on other dashboard sub-pages
  if (to === '/dashboard' && location.pathname !== '/dashboard' && location.pathname.startsWith('/dashboard/')) {
    isActive = false;
  }


  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 px-5 py-4 rounded-md transition-colors relative ${
        isActive ? 'bg-primary-light' : 'hover:bg-gray-100'
      }`}
    >
      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
      <span className={isActive ? 'text-text-dark' : 'text-gray-300'}>
        {isActive ? activeIcon : icon}
      </span>
      <span className={`font-medium text-base ${isActive ? 'text-text-dark' : 'text-text-dark-gray'}`}>
        {label}
      </span>
    </Link>
  );
};

const DashboardSidebar: React.FC = () => {
  const { t } = useTranslation();
  
  const navLinks = [
    { to: '/dashboard', label: t('dashboard.dashboard'), icon: <DashboardIcon active={false} />, activeIcon: <DashboardIcon active={true} /> },
    { to: '/order-history', label: t('dashboard.orderHistory'), icon: <OrderHistoryIcon active={false}/>, activeIcon: <OrderHistoryIcon active={true}/> },
    { to: '/cart', label: t('dashboard.shoppingCart'), icon: <ShoppingCartIcon active={false}/>, activeIcon: <ShoppingCartIcon active={true}/> },
    { to: '/settings', label: t('dashboard.settings'), icon: <SettingsIcon active={false}/>, activeIcon: <SettingsIcon active={true}/> },
    { to: '/logout', label: t('dashboard.logout'), icon: <LogoutIcon active={false}/>, activeIcon: <LogoutIcon active={true}/> },
  ];

  return (
    <div className="border border-border-color rounded-lg p-2">
      <div className="px-5 py-4 border-b border-border-color">
        <h3 className="text-xl font-medium text-text-dark">{t('dashboard.navigation')}</h3>
      </div>
      <nav className="p-3 space-y-1">
        {navLinks.map((link) => (
          <SidebarLink key={link.to} {...link} />
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
