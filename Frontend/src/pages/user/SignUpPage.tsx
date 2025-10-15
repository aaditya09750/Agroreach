import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SignUpBanner from '../../components/sections/SignUpBanner';
import SignUpForm from '../../components/sections/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Header />
      <main className="bg-white">
        <SignUpBanner />
        <div className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] flex justify-center">
            <SignUpForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
