
import React from 'react';

interface IconProps {
  className?: string;
}

export const BugIcon: React.FC<IconProps> = ({ className }) => (
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
        <path d="M12 20a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8z"></path>
        <path d="M18 12h-6"></path>
        <path d="M12 18V6"></path>
        <path d="M12 22v-2"></path>
        <path d="M12 4V2"></path>
        <path d="M18 18l2 2"></path>
        <path d="M6 6l-2-2"></path>
        <path d="M6 18l-2 2"></path>
        <path d="M18 6l2-2"></path>
    </svg>
);
