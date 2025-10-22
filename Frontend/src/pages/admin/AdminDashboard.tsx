import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminOverview from '../../components/admin/AdminOverview';
import AdminAddProduct from '../../components/admin/AdminAddProduct';
import AdminOrders from '../../components/admin/AdminOrders';
import AdminHeader from '../../components/admin/AdminHeader';

type AdminView = 'overview' | 'add-product' | 'orders';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<AdminView>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <AdminOverview />;
      case 'add-product':
        return <AdminAddProduct />;
      case 'orders':
        return <AdminOrders />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <main className={`flex-1 transition-all duration-300 bg-white ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
