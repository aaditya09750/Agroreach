import React from 'react';

interface RadioInputProps {
  name: string;
  label: string;
  value: string;
  defaultChecked?: boolean;
}

const RadioInput: React.FC<RadioInputProps> = ({ name, label, value, defaultChecked = false }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative flex items-center">
        <input
          type="radio"
          name={name}
          value={value}
          className="peer appearance-none w-5 h-5 border-2 border-border-color rounded-full checked:border-primary transition-colors"
          defaultChecked={defaultChecked}
        />
        <div className="absolute w-2.5 h-2.5 bg-primary rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block"></div>
      </div>
      <span className="text-text-dark-gray text-sm">{label}</span>
    </label>
  );
};

export default RadioInput;
