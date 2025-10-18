import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import img1 from '../../assets/Home/img (1).png';
import img2 from '../../assets/Home/img (2).png';
import img3 from '../../assets/Home/img (3).png';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const heroSlides = [
    {
      id: 1,
      tag: t('hero.welcomeTag'),
      title: t('hero.title1'),
      saleText: t('hero.saleText1'),
      saleAmount: t('hero.saleAmount1'),
      description: t('hero.description1'),
      image: img1,
      bgClass: 'bg-[#EDF2EE]'
    },
    {
      id: 2,
      tag: t('hero.summerSaleTag'),
      title: t('hero.title2'),
      saleText: t('hero.saleText2'),
      saleAmount: t('hero.saleAmount2'),
      description: t('hero.description2'),
      image: img2,
      bgClass: 'bg-[#FFF3E6]'
    },
    {
      id: 3,
      tag: t('hero.newArrivalsTag'),
      title: t('hero.title3'),
      saleText: t('hero.saleText3'),
      saleAmount: t('hero.saleAmount3'),
      description: t('hero.description3'),
      image: img3,
      bgClass: 'bg-[#E8F5E9]'
    }
  ];

  // Create extended slides array with first slide duplicated at the end for seamless loop
  const extendedSlides = [...heroSlides, heroSlides[0]];

  // Infinite auto-scroll functionality - only left to right
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  // Pre-defined translate classes for each slide position (keeps Tailwind JIT happy)
  const translateClasses = [
    'translate-x-[0%]',
    '-translate-x-[100%]',
    '-translate-x-[200%]',
    '-translate-x-[300%]'
  ];

  // Handle seamless loop - reset to first slide when reaching the duplicate
  useEffect(() => {
    if (currentSlide === heroSlides.length) {
      // Wait for transition to complete, then instantly reset to first slide
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
        // Re-enable transition after reset
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 700); // Match transition duration

      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 xl:px-12">
      {/* Hero Section */}
      <div 
        className="relative rounded-lg overflow-hidden max-w-[1400px] mx-auto"
      >
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className={`flex transform ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''} ${translateClasses[currentSlide] || 'translate-x-[0%]'}`}
          >
            {extendedSlides.map((slide, index) => (
              <div 
                key={`${slide.id}-${index}`}
                className="min-w-full"
              >
                <div 
                  className={`relative rounded-lg overflow-hidden ${slide.bgClass}`}
                >
                  {/* Main Hero Container */}
                  <div className="relative px-8 md:px-12 lg:px-16 pt-10 md:pt-12 lg:pt-16 pb-20 md:pb-24 lg:pb-28">
                    
                    {/* Left Content Section */}
                    <div className="relative z-10 max-w-lg">
                      <p className="text-xs md:text-sm font-semibold text-[#00B207] tracking-wider uppercase mb-3">
                        {slide.tag}
                      </p>

                      <h1 className="text-1xl md:text-3xl lg:text-5xl xl:text-6xl font-semibold text-[#1A1A1A] leading-tight mb-5">
                        {slide.title.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < slide.title.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </h1>
                      
                      <div className="mb-6">
                        <p className="text-xl md:text-2xl lg:text-[28px] text-[#1A1A1A] mb-2 leading-tight">
                          {slide.saleText}{' '}
                          <span className="font-semibold text-[#FF8A00]">{slide.saleAmount}</span>
                        </p>
                        <p className="text-xs md:text-sm text-[#999999] leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                      
                      <button 
                        onClick={handleShopNowClick}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        className="bg-[#00B207] text-white font-semibold text-sm md:text-base py-3 md:py-4 px-8 md:px-10 rounded-full inline-flex items-center gap-2 md:gap-3 hover:bg-[#2C742F] transition-all duration-300"
                      >
                        {t('hero.shopNow')} <ArrowRight size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                    
                    {/* Right Image Section - Positioned absolutely (refined sizing/placement) */}
                    <div className="absolute right-10 bottom-20 md:bottom-10 lg:bottom-12 w-1/2 md:w-[48%] lg:w-[45%] h-[260px] md:h-[320px] lg:h-[380px] pointer-events-none flex justify-end items-end pr-4">
                      <img
                        src={slide.image}
                        alt="Fresh organic vegetables in a basket"
                        className="h-full w-auto max-w-[520px] md:max-w-[600px] lg:max-w-[700px] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-16 md:bottom-18 lg:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                (currentSlide % heroSlides.length) === index ? 'bg-[#00B207] w-6' : 'bg-[#C4C4C4] hover:bg-[#00B207]/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;