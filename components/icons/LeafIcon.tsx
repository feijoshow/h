
import React from 'react';

interface IconProps {
  className?: string;
}

export const LeafIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10v-3Z"></path>
        <path d="M12 14a7 7 0 0 1 7-7h1a10 10 0 0 0-10-10v3Z"></path>
    </svg>
);
