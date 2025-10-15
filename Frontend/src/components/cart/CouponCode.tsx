import React from 'react';

const CouponCode: React.FC = () => {
  return (
    <div className="border border-border-color rounded-lg p-6">
      <h3 className="text-lg font-medium text-text-dark mb-4">Coupon Code</h3>
      <div className="flex">
        <input 
          type="text" 
          placeholder="Enter code"
          className="w-full px-4 py-3 border border-border-color rounded-l-full text-text-dark-gray placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
        <button className="bg-text-dark text-white font-semibold px-6 rounded-r-full hover:bg-opacity-90 transition-colors">
          Apply Coupon
        </button>
      </div>
    </div>
  );
};

export default CouponCode;
