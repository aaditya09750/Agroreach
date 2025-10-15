import React from 'react';

export const OrderHistoryIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2H8C4.691 2 2 4.691 2 8V16C2 19.309 4.691 22 8 22H16C19.309 22 22 19.309 22 16V8C22 4.691 19.309 2 16 2Z" stroke={active ? "#1A1A1A" : "#CCCCCC"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7V12L15 13.5" stroke={active ? "#1A1A1A" : "#CCCCCC"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
