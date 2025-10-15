import React from 'react';
import Header from '../../components/layout/Header';
import Hero from '../../components/sections/Hero';
import Features from '../../components/sections/Features';
import FeaturedProducts from '../../components/sections/FeaturedProducts';
import TopCategory from '../../components/sections/TopCategory';
import NewestProducts from '../../components/sections/NewestProducts';
import Testimonials from '../../components/sections/Testimonials';
import FAQ from '../../components/sections/FAQ';
import Footer from '../../components/layout/Footer';
import ProductDetailModal from '../../components/modal/ProductDetailModal';
import { useProduct } from '../../context/ProductContext';

const HomePage: React.FC = () => {
  const { isModalOpen, selectedProduct, closeModal } = useProduct();

  return (
    <div className="bg-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
            <Hero />
        </div>
        <div className="relative -mt-16 z-10">
            <Features />
        </div>
        <div className="mt-24">
            <FeaturedProducts />
        </div>
        <div className="mt-24">
            <TopCategory />
        </div>
        <div className="mt-24">
            <NewestProducts />
        </div>
      </main>
      <div className="mt-24">
        <Testimonials />
      </div>
      <div className="mt-24">
        <FAQ />
      </div>
      <div className="mt-24">
        <Footer />
      </div>
      {isModalOpen && selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default HomePage;
