import React from 'react';

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-800">
      {children}
    </span>
  );
}

export default function SelectionSummary({
  title,
  items = [],             // array of { id, name }
  emptyText = '(keine Auswahl)',
  footer = null,
}) {
  return (
    <section className="bg-white p-4 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
        <span className="text-xs text-gray-500">{items.length} ausgewählt</span>
      </div>

      {items.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map(it => (
            <Chip key={it.id}>{it.name}</Chip>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-gray-500">{emptyText}</p>
      )}

      {footer ? <div className="mt-3">{footer}</div> : null}
    </section>
  );
}
