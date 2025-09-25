import React from "react";
import { formatDate } from "../utils/formatDate.js";

const ResourceCard = ({ resource, onClick }) => {
  if (!resource) return null;
  const { id, title, type, description, authorId, createdAt } = resource;
  const formattedDate = formatDate(createdAt);

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-300 ease-in-out flex flex-col h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        {type && (
          <span className="text-sm font-medium text-highlight-light bg-highlight-light/10 px-3 py-1 rounded-full">
            {type}
          </span>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">{description}</p>
      <div className="text-xs text-gray-500 flex flex-col space-y-1 mt-auto">
        {authorId && <span className="flex items-center">Autor-ID: {authorId}</span>}
        {createdAt && <span className="flex items-center">Erstellt: {formattedDate}</span>}
      </div>
    </div>
  );
};

export default ResourceCard;
