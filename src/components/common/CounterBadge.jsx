import React from 'react';

export default function CounterBadge({ count = 0, label = 'gewählt', className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 ${className}`}>
      {count} {label}
    </span>
  );
}
