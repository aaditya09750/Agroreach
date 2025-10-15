import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  isTextarea?: boolean;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  placeholder, 
  type = 'text', 
  isTextarea = false, 
  rows = 3,
  value,
  onChange,
  required = false
}) => {
  const commonClasses = "w-full px-4 py-3.5 border border-border-color rounded-md text-sm text-text-dark-gray placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors";

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-text-dark mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
          className={commonClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={commonClasses}
        />
      )}
    </div>
  );
};

export default InputField;
