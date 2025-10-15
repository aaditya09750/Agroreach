import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SignInBanner from '../../components/sections/SignInBanner';
import SignInForm from '../../components/sections/SignInForm';

const SignInPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Header />
      <main className="bg-white">
        <SignInBanner />
        <div className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] flex justify-center">
            <SignInForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignInPage;
