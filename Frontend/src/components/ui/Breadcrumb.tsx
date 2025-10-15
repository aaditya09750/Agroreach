import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  paths: {
    name: string;
    path?: string;
  }[];
  theme?: 'light' | 'dark';
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-gray-300' : 'text-gray-500';
  const linkColor = isDark ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-primary';
  const iconColor = isDark ? 'text-gray-300' : 'text-gray-400';
  const activeColor = isDark ? 'text-white' : 'text-primary';

  return (
    <nav className={`flex items-center text-sm ${textColor}`}>
      <Link to="/" className={`flex items-center gap-2 ${linkColor}`}>
        <Home size={16} />
      </Link>
      {paths.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={16} className={`mx-3 ${iconColor}`} />
          {item.path && index < paths.length -1 ? (
            <Link to={item.path} className={linkColor}>
              {item.name}
            </Link>
          ) : (
            <span className={`${activeColor} font-medium`}>{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
