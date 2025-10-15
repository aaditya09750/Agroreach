import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import DashboardBanner from '../../components/sections/DashboardBanner';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import ProfileCard from '../../components/dashboard/ProfileCard';
import BillingAddressCard from '../../components/dashboard/BillingAddressCard';
import OrderHistoryTable from '../../components/dashboard/OrderHistoryTable';

const DashboardPage: React.FC = () => {
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
            <section className="lg:col-span-9 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProfileCard />
                <BillingAddressCard />
              </div>
              <OrderHistoryTable />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
