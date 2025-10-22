import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import ARLogo from '../../assets/AR Logo.png';

const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-border-color sticky top-0 z-50">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={ARLogo} alt="AgroReach Logo" className="h-6" />
            <div className="h-6 w-px bg-border-color"></div>
            <span className="text-base font-semibold text-text-dark">Agroreach Admin</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                placeholder="Search or type a command..."
                className="w-full pl-10 pr-4 py-1.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors text-sm text-text-dark placeholder:text-text-muted"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button className="bg-primary text-white px-4 py-1.5 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center gap-1.5">
              <span className="text-base leading-none">+</span>
              Create
            </button>
            <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors relative" title="Notifications">
              <Bell size={18} className="text-text-dark-gray" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-sale rounded-full"></span>
            </button>
            <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors" title="User Profile">
              <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                <User size={15} className="text-primary" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
