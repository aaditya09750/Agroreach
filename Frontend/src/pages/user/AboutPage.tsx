import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AboutBanner from '../../components/sections/AboutBanner';
import AboutIntro from '../../components/sections/AboutIntro';
import AboutFeatures from '../../components/sections/AboutFeatures';
import WeDeliveredSection from '../../components/sections/WeDeliveredSection';
import AwesomeTeam from '../../components/sections/AwesomeTeam';
import Testimonials from '../../components/sections/Testimonials';
import LatestBlog from '../../components/sections/LatestBlog';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <AboutBanner />
        <div className="py-24 container mx-auto px-4 sm:px-6 lg:px-[120px]">
          <AboutIntro />
        </div>
        <AboutFeatures />
        <div className="py-24 container mx-auto px-4 sm:px-6 lg:px-[120px]">
          <WeDeliveredSection />
        </div>
         <AwesomeTeam />
          <Testimonials />
          <LatestBlog />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
