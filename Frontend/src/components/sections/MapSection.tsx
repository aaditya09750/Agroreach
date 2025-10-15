import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

const MapSection: React.FC = () => {
  const { currency } = useCurrency();
  
  // Map URLs based on currency
  const mapUrl = currency === 'INR' 
    ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15089.479785433014!2d73.94686635!3d19.003413249999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd30d128913813%3A0x908cd5c41e4b8673!2sManchar%2C%20Maharashtra%20410503!5e0!3m2!1sen!2sin!4v1760556909349!5m2!1sen!2sin'
    : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380511.584861088!2d-88.06153032415244!3d41.83375098311119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sin!4v1760557219475!5m2!1sen!2sin';
  
  const mapTitle = currency === 'INR' 
    ? 'Manchar, Maharashtra, India Location Map'
    : 'Chicago, Illinois, USA Location Map';

  return (
    <div className="bg-white rounded-lg shadow-[0px_0px_56px_0px_rgba(0,38,3,0.08)] overflow-hidden">
      <div className="h-[400px] w-full">
        <iframe 
          src={mapUrl}
          className="w-full h-full border-0"
          allowFullScreen={true}
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title={mapTitle}
        />
      </div>
    </div>
  );
};

export default MapSection;

