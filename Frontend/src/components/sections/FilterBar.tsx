import React from 'react';
import ShopDropdown from '../ui/ShopDropdown';
import { X } from 'lucide-react';

interface ActiveFilterTagProps {
  label: string;
  onRemove: () => void;
}

const ActiveFilterTag: React.FC<ActiveFilterTagProps> = ({ label, onRemove }) => (
  <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1 text-sm text-text-dark font-medium">
    <span>{label}</span>
    <button onClick={onRemove} className="hover:bg-gray-200 rounded transition-colors">
      <X size={14} className="text-gray-500" />
    </button>
  </div>
);

interface FilterBarProps {
  selectedCategory: string | null;
  selectedPrice: string | null;
  selectedSort: string | null;
  onCategoryChange: (category: string | null) => void;
  onPriceChange: (price: string | null) => void;
  onSortChange: (sort: string | null) => void;
  resultCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  selectedPrice,
  selectedSort,
  onCategoryChange,
  onPriceChange,
  onSortChange,
  resultCount,
}) => {
  const categories = [
    'All Categories',
    'Fresh Fruit',
    'Vegetables',
    'Meat & Fish',
    'Dairy & Eggs',
  ];

  const priceRanges = [
    'All Prices',
    'Under $10',
    '$10 - $25',
    '$25 - $50',
    '$50 - $100',
    'Over $100',
  ];

  const sortOptions = [
    'Latest',
    'Price: Low to High',
    'Price: High to Low',
    'Name: A-Z',
    'Name: Z-A',
    'Rating: High to Low',
  ];

  // Build active filters array
  const activeFilters: { label: string; onRemove: () => void }[] = [];
  
  if (selectedCategory && selectedCategory !== 'All Categories') {
    activeFilters.push({
      label: selectedCategory,
      onRemove: () => onCategoryChange(null),
    });
  }
  
  if (selectedPrice && selectedPrice !== 'All Prices') {
    activeFilters.push({
      label: selectedPrice,
      onRemove: () => onPriceChange(null),
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-border-color">
        <div className="flex items-center gap-4">
          <ShopDropdown 
            label="Select Category" 
            options={categories}
            onSelect={onCategoryChange}
            value={selectedCategory}
          />
          <ShopDropdown 
            label="Select Price" 
            options={priceRanges}
            onSelect={onPriceChange}
            value={selectedPrice}
          />
        </div>
        <div className="flex items-center gap-4">
          <ShopDropdown 
            label="Sort by: Latest" 
            options={sortOptions}
            onSelect={onSortChange}
            value={selectedSort}
          />
        </div>
      </div>
      
      {/* Only show active filters section if there are filters */}
      {activeFilters.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted">Active Filters:</span>
            {activeFilters.map((filter, index) => (
              <ActiveFilterTag 
                key={index} 
                label={filter.label} 
                onRemove={filter.onRemove}
              />
            ))}
          </div>
          <span className="text-sm text-text-dark">{resultCount.toLocaleString()} Results found.</span>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
