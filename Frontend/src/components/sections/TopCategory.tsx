import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import vegetablesImg from '../../assets/vegetables 1.png';
import fruitsImg from '../../assets/fruits 1.png';
import dairyImg from '../../assets/Dairy 1.png';
import { useProduct } from '../../context/ProductContext';


interface CategoryCardProps {
  image: string;
  title: string;
  count: number;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, count, onClick }) => (
  <div 
    onClick={onClick}
    className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-20px)] text-center p-6 border border-border-color hover:border-primary hover:bg-primary-extra-light hover:shadow-product-hover rounded-md flex flex-col items-center gap-3 cursor-pointer transition-all duration-300"
  >
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
  const { products } = useProduct();
  const navigate = useNavigate();

  // Handle category click to navigate to shop with filter
  const handleCategoryClick = (categoryTitle: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/shop', { state: { category: categoryTitle } });
  };

  // Calculate category counts dynamically from products
  const getCategoryCount = (categoryName: string): number => {
    return products.filter(product => {
      const productCategory = product.category?.toLowerCase() || '';
      const searchCategory = categoryName.toLowerCase();
      
      // Match category names
      if (searchCategory.includes('vegetable')) {
        return productCategory.includes('vegetable');
      } else if (searchCategory.includes('fruit')) {
        return productCategory.includes('fruit');
      } else if (searchCategory.includes('dairy')) {
        return productCategory.includes('dairy') || productCategory.includes('egg');
      }
      return false;
    }).length;
  };

  const baseCategories = [
    { image: vegetablesImg, title: 'Vegetables', count: getCategoryCount('Vegetables'), onClick: () => handleCategoryClick('Vegetables') },
    { image: fruitsImg, title: 'Fresh Fruit', count: getCategoryCount('Fresh Fruit'), onClick: () => handleCategoryClick('Fresh Fruit') },
    { image: dairyImg, title: 'Dairy & Eggs', count: getCategoryCount('Dairy & Eggs'), onClick: () => handleCategoryClick('Dairy & Eggs') },
    { image: vegetablesImg, title: 'Vegetables', count: getCategoryCount('Vegetables'), onClick: () => handleCategoryClick('Vegetables') },
    { image: fruitsImg, title: 'Fresh Fruit', count: getCategoryCount('Fresh Fruit'), onClick: () => handleCategoryClick('Fresh Fruit') },
    { image: dairyImg, title: 'Dairy & Eggs', count: getCategoryCount('Dairy & Eggs'), onClick: () => handleCategoryClick('Dairy & Eggs') },
    { image: vegetablesImg, title: 'Vegetables', count: getCategoryCount('Vegetables'), onClick: () => handleCategoryClick('Vegetables') },
    { image: fruitsImg, title: 'Fresh Fruit', count: getCategoryCount('Fresh Fruit'), onClick: () => handleCategoryClick('Fresh Fruit') },
    { image: dairyImg, title: 'Dairy & Eggs', count: getCategoryCount('Dairy & Eggs'), onClick: () => handleCategoryClick('Dairy & Eggs') },
    { image: vegetablesImg, title: 'Vegetables', count: getCategoryCount('Vegetables'), onClick: () => handleCategoryClick('Vegetables') },
    { image: fruitsImg, title: 'Fresh Fruit', count: getCategoryCount('Fresh Fruit'), onClick: () => handleCategoryClick('Fresh Fruit') },
    { image: dairyImg, title: 'Dairy & Eggs', count: getCategoryCount('Dairy & Eggs'), onClick: () => handleCategoryClick('Dairy & Eggs') },
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
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setActiveIndicator(prev => (prev + 1) % 3);
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
      setActiveIndicator(prev => (prev - 1 + 3) % 3);
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
