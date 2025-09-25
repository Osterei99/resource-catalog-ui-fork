import React from 'react';

export default function ResourceChip({ id, title }) {
  return (
    <a
      href={`/resources/${id}`}
      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-main-dark hover:underline"
      title={title}
    >
      {title}
    </a>
  );
}
