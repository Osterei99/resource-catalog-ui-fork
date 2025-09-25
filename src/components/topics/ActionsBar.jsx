import React from 'react';

export default function ActionsBar({ onReset, to = '/generate', className = '', mobile = false }) {
  return (
    <div className={`flex gap-3 ${mobile ? 'sm:hidden' : ''} ${className}`}>
      <button
        onClick={onReset}
        className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50"
      >
        Zurücksetzen
      </button>
      <a
        href={to}
        className="flex-1 sm:flex-none text-center px-4 py-2 rounded-xl bg-main-dark text-white hover:opacity-95 shadow-sm"
      >
        Weiter
      </a>
    </div>
  );
}
