import React from 'react';

export default function GenerateCTA({
  loading = false,
  disabled = false,
  onClick,
}) {
  return (
    <div className="flex items-center gap-3">
      <a
        href="/topics-skills"
        className="px-4 py-2 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50"
      >
        Auswahl bearbeiten
      </a>
      <button
        onClick={onClick}
        disabled={loading || disabled}
        className="px-4 py-2 rounded-xl bg-main-dark text-white hover:opacity-95 disabled:opacity-50 shadow-sm"
      >
        {loading ? 'Wird erzeugt…' : 'Learning Path erzeugen'}
      </button>
    </div>
  );
}
