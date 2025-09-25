import React from 'react';

export default function SearchInput({
  label = 'Suchen',
  value,
  onChange,
  placeholder = 'Tippen…',
  className = '',
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm text-gray-600">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-main-dark/40 focus:ring-2 focus:ring-main-dark/10"
      />
    </label>
  );
}
