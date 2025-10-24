import React from 'react';
import bcBanner from '../../assets/BC Banner.png';

const AdminSignInBanner: React.FC = () => {
  return (
    <div 
      className="h-[130px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bcBanner})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 flex items-center justify-left pl-8">
        <h1 className="text-white text-3xl font-semibold">Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default AdminSignInBanner;
