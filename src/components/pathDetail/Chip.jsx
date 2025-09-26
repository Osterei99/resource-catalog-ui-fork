import React from 'react';

export default function Chip({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-800 ${className}`}>
      {children}
    </span>
  );
}
