import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ShopSaleBanner from '../../components/sections/ShopSaleBanner';
import FilterBar from '../../components/sections/FilterBar';
import ProductGrid from '../../components/sections/ProductGrid';
import Pagination from '../../components/ui/Pagination';
import ProductDetailModal from '../../components/modal/ProductDetailModal';
import { useProduct } from '../../context/ProductContext';
import { shopProducts } from '../../data/products';

const ShopPage: React.FC = () => {
  const { isModalOpen, selectedProduct, closeModal, openModal } = useProduct();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const hasProcessedState = useRef(false);
  const PRODUCTS_PER_PAGE = 16;

  // Handle navigation state (from search)
  useEffect(() => {
    if (location.state && !hasProcessedState.current) {
      const state = location.state as { searchQuery?: string; productId?: number };
      
      if (state.searchQuery) {
        setSearchQuery(state.searchQuery);
        // Reset filters when searching
        setSelectedCategory(null);
        setSelectedPrice(null);
        setCurrentPage(1);
      }
      
      if (state.productId) {
        const product = shopProducts.find(p => p.id === state.productId);
        if (product) {
          openModal(product);
        }
      }

      // Mark state as processed and clear it
      hasProcessedState.current = true;
      
      // Clear the navigation state to prevent reopening modal
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, openModal, navigate]);

  // Reset the ref when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      hasProcessedState.current = false;
    }
  }, [isModalOpen]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...shopProducts];

    // Filter by search query first
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter((product) => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price range
    if (selectedPrice && selectedPrice !== 'All Prices') {
      filtered = filtered.filter((product) => {
        const price = product.price;
        
        switch (selectedPrice) {
          case 'Under $10':
            return price < 10;
          case '$10 - $25':
            return price >= 10 && price <= 25;
          case '$25 - $50':
            return price >= 25 && price <= 50;
          case '$50 - $100':
            return price >= 50 && price <= 100;
          case 'Over $100':
            return price > 100;
          default:
            return true;
        }
      });
    }

    // Sort products
    if (selectedSort) {
      switch (selectedSort) {
        case 'Price: Low to High':
          filtered.sort((a, b) => 
            a.price - b.price
          );
          break;
        case 'Price: High to Low':
          filtered.sort((a, b) => 
            b.price - a.price
          );
          break;
        case 'Name: A-Z':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'Name: Z-A':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'Rating: High to Low':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'Latest':
        default:
          // Keep original order
          break;
      }
    }

    return filtered;
  }, [selectedCategory, selectedPrice, selectedSort, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedPrice, selectedSort, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of page when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
        <div className="my-8"></div>
        {searchQuery && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              Search results for: <span className="font-semibold text-primary">"{searchQuery}"</span>
              {filteredProducts.length === 0 && (
                <span className="ml-2 text-red-600">- No products found</span>
              )}
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs text-primary hover:text-primary/80 underline"
            >
              Clear search
            </button>
          </div>
        )}
        <ShopSaleBanner />
        <div className="my-8">
          <FilterBar 
            selectedCategory={selectedCategory}
            selectedPrice={selectedPrice}
            selectedSort={selectedSort}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setSelectedPrice}
            onSortChange={setSelectedSort}
            resultCount={filteredProducts.length}
          />
        </div>
        {filteredProducts.length > 0 ? (
          <>
            <ProductGrid products={currentProducts} />
            <div className="my-12 flex justify-center">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="py-16 text-center">
            <div className="mb-4">
              <svg 
                className="mx-auto h-24 w-24 text-gray-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? `No products match "${searchQuery}". Try a different search term.`
                : 'No products match your current filters. Try adjusting your filters.'
              }
            </p>
            {(searchQuery || selectedCategory || selectedPrice) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSelectedPrice(null);
                }}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </main>
      <Footer />
      {isModalOpen && selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default ShopPage;
   