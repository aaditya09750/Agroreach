import React from 'react';

export const LogoutIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3H3V21H10" stroke={active ? "#1A1A1A" : "#CCCCCC"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17L21 12L16 7" stroke={active ? "#1A1A1A" : "#CCCCCC"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12H9" stroke={active ? "#1A1A1A" : "#CCCCCC"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
