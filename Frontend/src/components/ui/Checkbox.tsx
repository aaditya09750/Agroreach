import React from 'react';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, name }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative flex items-center">
        <input 
          type="checkbox" 
          name={name}
          className="peer appearance-none w-5 h-5 border border-border-color rounded-[3px] checked:bg-primary checked:border-primary transition-colors"
          checked={checked}
          onChange={onChange}
        />
        <svg
          className="absolute w-3 h-3 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden peer-checked:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span className="text-text-dark-gray text-sm">{label}</span>
    </label>
  );
};

export default Checkbox;
