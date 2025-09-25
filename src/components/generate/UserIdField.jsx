import React from 'react';

export default function UserIdField({ value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-600">User ID</span>
      <input
        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-main-dark/40 focus:ring-2 focus:ring-main-dark/10"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="z. B. demo-user"
      />
    </label>
  );
}
