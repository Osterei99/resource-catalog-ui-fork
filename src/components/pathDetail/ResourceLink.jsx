import React from 'react';
import { Link } from 'react-router-dom';

export default function ResourceLink({ id, title }) {
  if (!id) return null;
  const text = title || `Ressource ${id}`;
  return (
    <Link to={`/resources/${id}`} className="text-main-dark hover:underline" title={text}>
      {text}
    </Link>
  );
}
