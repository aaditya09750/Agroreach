import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import DashboardBanner from '../../components/sections/DashboardBanner';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import OrderHistory from '../../components/dashboard/OrderHistory';

const OrderHistoryPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <DashboardBanner />
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-3">
              <DashboardSidebar />
            </aside>
            <section className="lg:col-span-9">
              <OrderHistory />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
