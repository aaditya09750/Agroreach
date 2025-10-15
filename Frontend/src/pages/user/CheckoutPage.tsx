import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CheckoutBanner from '../../components/sections/CheckoutBanner';
import BillingForm from '../../components/checkout/BillingForm';
import OrderSummary from '../../components/checkout/OrderSummary';

const CheckoutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <CheckoutBanner />
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <BillingForm />
            </div>
            <div className="lg:col-span-4">
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
