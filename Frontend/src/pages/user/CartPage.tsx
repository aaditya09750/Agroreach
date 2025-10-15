import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CartBanner from '../../components/sections/CartBanner';
import CartItemsTable from '../../components/cart/CartItemsTable';
import CartTotal from '../../components/cart/CartTotal';
import CouponCode from '../../components/cart/CouponCode';

const CartPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <CartBanner />
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <CartItemsTable />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <CartTotal />
              <CouponCode />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
