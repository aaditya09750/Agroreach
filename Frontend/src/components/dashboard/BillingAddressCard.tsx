import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const BillingAddressCard: React.FC = () => {
  const { billingAddress } = useUser();

  return (
    <div className="border border-border-color rounded-lg p-8 h-full">
      <p className="text-sm font-medium text-text-nav uppercase tracking-wider">Billing Address</p>
      <div className="mt-4 space-y-2 text-text-dark-gray">
        {billingAddress.firstName || billingAddress.lastName ? (
          <>
            <p className="text-lg font-medium text-text-dark">
              {billingAddress.firstName} {billingAddress.lastName}
            </p>
            {billingAddress.streetAddress && (
              <p className="text-base">
                {billingAddress.streetAddress}
                {billingAddress.state && `, ${billingAddress.state}`}
                {billingAddress.zipCode && ` ${billingAddress.zipCode}`}
              </p>
            )}
            {billingAddress.email && (
              <p className="text-base text-text-dark">{billingAddress.email}</p>
            )}
            {billingAddress.phone && (
              <p className="text-base text-text-dark">{billingAddress.phone}</p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-400 ">No billing address added yet</p>
        )}
      </div>
      <Link 
        to="/settings" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="mt-6 inline-block text-base font-medium text-primary hover:underline"
      >
        {billingAddress.firstName ? 'Edit Address' : 'Add Address'}
      </Link>
    </div>
  );
};

export default BillingAddressCard;
