import React from 'react';
import bcBanner from '../../assets/BC Banner.png';

const SignUpBanner: React.FC = () => {
  return (
    <div 
      className="h-[130px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bcBanner})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
    </div>
  );
};

export default SignUpBanner;
