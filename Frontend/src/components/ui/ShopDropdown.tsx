import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ShopDropdownProps {
  label: string;
  widthClass?: string;
  options?: string[];
  onSelect?: (option: string) => void;
  value?: string | null;
}

const ShopDropdown: React.FC<ShopDropdownProps> = ({ 
  label, 
  widthClass = 'w-48',
  options = [],
  onSelect,
  value
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const displayLabel = value || label;

  return (
    <div className={`relative ${widthClass}`} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left px-4 py-2.5 border border-border-color rounded-md text-text-light text-sm hover:border-primary transition-colors duration-200 bg-white"
      >
        <span className={value ? 'text-text-dark font-medium' : ''}>{displayLabel}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
      
      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full left-0 right-0 mt-2 bg-white border border-border-color rounded-md shadow-lg z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 max-h-60' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'
        }`}
      >
        <div className="max-h-60 overflow-y-auto scrollbar-hide">
          {options.length > 0 ? (
            options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                  value === option ? 'bg-primary/10 text-primary font-medium' : 'text-text-dark'
                }`}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="px-4 py-2.5 text-sm text-text-muted">No options available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDropdown;

