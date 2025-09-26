// src/components/paths/ResourceChip.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ResourceChip({ id, title }) {
  return (
    <Link
      to={`/resources/${id}`}
      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-main-dark hover:underline"
      title={title}
    >
      {title}
    </Link>
  );
}
