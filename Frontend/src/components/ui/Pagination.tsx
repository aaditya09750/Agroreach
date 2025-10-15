import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center gap-2" aria-label="Pagination">
      <button 
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`w-9 h-9 flex items-center justify-center rounded-full ${
          currentPage === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <ChevronLeft size={20} />
      </button>
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="text-text-light">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'text-text-light hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        )
      ))}
      
      <button 
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`w-9 h-9 flex items-center justify-center rounded-full border ${
          currentPage === totalPages
            ? 'border-border-color text-gray-400 cursor-not-allowed'
            : 'border-border-color text-text-dark hover:bg-gray-100'
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

export default Pagination;
