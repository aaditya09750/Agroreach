import React from 'react';

export const SecurePayment: React.FC = () => (
  <div className="flex items-center gap-2 border border-gray-700 rounded-md px-3 py-1.5">
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.25 5.04199V4.12533C8.25 2.65866 7.04167 1.45866 5.5 1.45866C3.95833 1.45866 2.75 2.65866 2.75 4.12533V5.04199" stroke="white" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.16669 10.0837H1.83335C1.37502 10.0837 1.00002 9.70866 1.00002 9.25033V5.95866C1.00002 5.50033 1.37502 5.12533 1.83335 5.12533H9.16669C9.62502 5.12533 10 5.50033 10 5.95866V9.25033C10 9.70866 9.62502 10.0837 9.16669 10.0837Z" stroke="white" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div>
      <p className="text-white text-[8px] leading-none">Secure</p>
      <p className="text-white text-[9px] font-semibold leading-tight">Payment</p>
    </div>
  </div>
);
