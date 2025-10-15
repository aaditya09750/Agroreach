import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import vegetablesImg from '../../assets/vegetables 1.png';
import fruitsImg from '../../assets/fruits 1.png';
import fishImg from '../../assets/fish 1.png';


interface CategoryCardProps {
  image: string;
  title: string;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, count }) => (
  <div className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-20px)] text-center p-6 border border-border-color hover:border-primary hover:bg-primary-extra-light hover:shadow-product-hover rounded-md flex flex-col items-center gap-3 cursor-pointer transition-all duration-300">
    <div className="w-16 h-16 flex items-center justify-center">
      <img src={image} alt={title} className="w-full h-full object-contain" />
    </div>
    <div>
      <h4 className="font-medium text-sm text-text-dark">{title}</h4>
      <p className="text-xs text-text-muted">{count} Products</p>
    </div>
  </div>
);

const TopCategory: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndicator, setActiveIndicator] = useState(0); // 0, 1, or 2 for the 3 dots

  const baseCategories = [
    { image: vegetablesImg, title: 'Vegetables', count: 165 },
    { image: fruitsImg, title: 'Fresh Fruit', count: 47 },
    { image: fishImg, title: 'River Fish', count: 34 },
    { image: vegetablesImg, title: 'Vegetables', count: 15 },
    { image: fruitsImg, title: 'Fresh Fruit', count: 98 },
    { image: fishImg, title: 'River Fish', count: 34 },
    { image: vegetablesImg, title: 'Vegetables', count: 574 },
    { image: fruitsImg, title: 'Fresh Fruit', count: 137 },
    { image: fishImg, title: 'River Fish', count: 34 },
    { image: vegetablesImg, title: 'Vegetables', count: 84 },
    { image: fruitsImg, title: 'Fresh Fruit', count: 48 },
    { image: fishImg, title: 'River Fish', count: 34 },
  ];

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('div')?.offsetWidth || 0;
      const gap = 24; // gap-6 = 24px
      const scrollAmount = cardWidth + gap;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      // Move indicator to the right, loop to left if at end
      setActiveIndicator(prev => (prev + 1) % 3);
      // Update after scroll animation completes
      setTimeout(() => updateScrollButtons(), 400);
    }
  };

  const scrollToPrevious = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('div')?.offsetWidth || 0;
      const gap = 24; // gap-6 = 24px
      const scrollAmount = cardWidth + gap;
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
      // Move indicator to the left, loop to right if at start
      setActiveIndicator(prev => (prev - 1 + 3) % 3);
      // Update after scroll animation completes
      setTimeout(() => updateScrollButtons(), 400);
    }
  };

  // Update scroll buttons on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons(); // Initial check
      
      // Window resize handler
      const handleResize = () => updateScrollButtons();
      window.addEventListener('resize', handleResize);
      
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <section className="relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-text-dark">Top Category</h2>
        <div className="flex justify-center items-center gap-1 mt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div 
              key={index} 
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeIndicator 
                  ? 'w-10 bg-primary' 
                  : 'w-3 bg-primary/30'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={scrollToPrevious}
          disabled={!canScrollLeft}
          className={`w-11 h-11 flex-shrink-0 rounded-full border border-border-color flex items-center justify-center transition-all duration-300 ${
            canScrollLeft 
              ? 'hover:bg-primary hover:text-white hover:border-primary active:scale-95 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Previous categories"
        >
          <ArrowLeft size={20} />
        </button>
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-hidden pb-4 scrollbar-hide scroll-smooth flex-1"
        >
          {baseCategories.map((cat, index) => (
            <CategoryCard key={`${cat.title}-${index}`} {...cat} />
          ))}
        </div>
        <button 
          onClick={scrollToNext}
          disabled={!canScrollRight}
          className={`w-11 h-11 flex-shrink-0 rounded-full border border-border-color flex items-center justify-center transition-all duration-300 ${
            canScrollRight 
              ? 'hover:bg-primary hover:text-white hover:border-primary active:scale-95 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Next categories"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default TopCategory;
