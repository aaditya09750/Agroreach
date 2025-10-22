import React, { useState } from 'react';
import { Home, Package, ShoppingBag, DollarSign, Users, HelpCircle, LogOut, ChevronDown } from 'lucide-react';

interface AdminSidebarProps {
  activeView: 'overview' | 'add-product' | 'orders';
  setActiveView: (view: 'overview' | 'add-product' | 'orders') => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, setActiveView, isCollapsed, setIsCollapsed }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const menuItems = [
    { id: 'overview', label: 'Home', icon: Home, view: 'overview' as const },
    { id: 'products', label: 'Products', icon: Package, view: 'add-product' as const },
    { 
      id: 'customers', 
      label: 'Customers', 
      icon: Users, 
      view: 'overview' as const, 
      hasDropdown: true,
      subItems: ['Customer List', 'Add Customer', 'Customer Groups']
    },
    { 
      id: 'shop', 
      label: 'Orders', 
      icon: ShoppingBag, 
      view: 'orders' as const, 
      hasDropdown: true,
      subItems: ['All Orders', 'Pending', 'Completed']
    },
    { 
      id: 'income', 
      label: 'Income', 
      icon: DollarSign, 
      view: 'overview' as const, 
      hasDropdown: true,
      subItems: ['Reports', 'Analytics', 'Revenue']
    },
  ];

  const toggleExpand = (itemId: string) => {
    if (isCollapsed) return;
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [itemId] // Only keep the newly opened item, closing all others
    );
  };

  return (
    <aside className={`bg-white border-r border-border-color h-[calc(100vh-61px)] fixed left-0 top-[61px] shadow-sm transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} overflow-hidden`}>
      {/* Toggle Button */}
      <div className={`border-b border-border-color ${isCollapsed ? 'p-2' : 'p-3'}`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center gap-2.5 w-full rounded-lg hover:bg-gray-50 transition-colors ${
            isCollapsed ? 'p-2.5 justify-center' : 'p-2.5'
          }`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <svg 
            className="w-5 h-5 text-text-dark-gray" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {!isCollapsed && (
            <span className="text-sm font-medium text-text-dark">Menu</span>
          )}
        </button>
      </div>

      <nav className={`flex flex-col h-[calc(100%-57px)] ${isCollapsed ? 'p-2' : 'p-3'}`}>
        {/* Main Menu */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.view;
              const isExpanded = expandedItems.includes(item.id);
              
              return (
                <li key={item.id}>
                  <div>
                    <button
                      onClick={() => {
                        setActiveView(item.view);
                        if (item.hasDropdown && !isCollapsed) {
                          toggleExpand(item.id);
                        }
                      }}
                      className={`w-full flex items-center rounded-lg transition-all relative group ${
                        isCollapsed 
                          ? 'p-2.5 justify-center' 
                          : 'px-3 py-2.5 gap-2.5'
                      } ${
                        isActive
                          ? 'bg-primary-light text-text-dark'
                          : 'text-text-dark-gray hover:bg-gray-50'
                      }`}
                      title={isCollapsed ? item.label : ''}
                    >
                      {isActive && !isCollapsed && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>
                      )}
                      <Icon size={18} className="flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                          {item.hasDropdown && (
                            <ChevronDown 
                              size={16} 
                              className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          )}
                        </>
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                          {item.label}
                          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                        </div>
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {item.hasDropdown && !isCollapsed && (
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <ul className="ml-9 space-y-1 border-l-2 border-gray-100 pl-4">
                          {item.subItems?.map((subItem, index) => (
                            <li key={index}>
                              <button
                                className="w-full text-left px-3 py-2 text-sm text-text-dark-gray hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                              >
                                {subItem}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Menu */}
        <div className="border-t border-border-color pt-4 mt-4">
          <ul className="space-y-1">
            <li>
              <button 
                className={`w-full flex items-center rounded-lg text-text-dark-gray hover:bg-gray-50 transition-colors relative group ${
                  isCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-2.5'
                }`}
                title={isCollapsed ? 'Help' : ''}
              >
                <HelpCircle size={18} className="flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="text-sm font-medium flex-1 text-left">Help</span>
                    <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium flex-shrink-0">
                      8
                    </span>
                  </>
                )}
                {isCollapsed && (
                  <>
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium z-10">
                      8
                    </span>
                    <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                      Help
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  </>
                )}
              </button>
            </li>
            <li>
              <button 
                className={`w-full flex items-center rounded-lg text-text-dark-gray hover:bg-gray-50 transition-colors relative group ${
                  isCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-2.5'
                }`}
                title={isCollapsed ? 'Logout' : ''}
              >
                <LogOut size={18} className="flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium flex-1 text-left">Logout</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                    Logout
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
