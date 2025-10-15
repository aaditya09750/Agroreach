import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import DashboardBanner from '../../components/sections/DashboardBanner';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import OrderDetailContent from '../../components/dashboard/OrderDetailContent';
import { useOrder } from '../../context/OrderContext';

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrder();

  // Get order from context
  const order = orderId ? getOrderById(parseInt(orderId)) : undefined;

  if (!order) {
    return <Navigate to="/order-history" replace />;
  }

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
              <OrderDetailContent order={order} />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
