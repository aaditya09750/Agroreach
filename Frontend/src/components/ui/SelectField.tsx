import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options, placeholder, value, onChange, required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

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
    setSelectedValue(option);
    setIsOpen(false);
    
    // Create synthetic event for onChange
    if (onChange) {
      const syntheticEvent = {
        target: {
          name: name,
          value: option
        }
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-text-dark mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative" ref={dropdownRef}>
        {/* Custom Select Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full appearance-none px-4 py-3.5 border border-border-color rounded-md text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white cursor-pointer hover:border-gray-400 text-left ${
            selectedValue ? 'text-text-dark-gray' : 'text-text-muted'
          }`}
        >
          {selectedValue || placeholder}
        </button>
        <ChevronDown 
          size={20} 
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />

        {/* Custom Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-border-color rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                  selectedValue === option
                    ? 'bg-primary text-white'
                    : 'text-text-dark-gray hover:bg-primary hover:text-white'
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {/* Hidden select for form compatibility */}
        <select
          id={name}
          name={name}
          value={selectedValue}
          onChange={onChange}
          className="hidden"
        >
          <option value="">{placeholder}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
