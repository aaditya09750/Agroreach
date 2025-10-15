import React from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <div className="text-center">
    <h2 className="text-4xl font-semibold text-text-dark">{title}</h2>
    <div className="flex justify-center items-center gap-1 mt-4">
      <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
      <div className="w-10 h-1 bg-primary rounded-full"></div>
      <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
    </div>
  </div>
);

export default SectionHeader;
